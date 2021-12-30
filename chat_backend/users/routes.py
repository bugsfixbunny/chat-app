import os
from flask import Blueprint, json, send_file
from flask_socketio import emit
from json import dumps
from flask import make_response, jsonify, request
from chat_backend import db, bcrypt, socketio, app
from chat_backend.models import User, Messages
from flask_login import login_user, current_user, logout_user
from chat_backend.users.utilities import save_pic, sort_messages, sort_messages_with_id, validate_register_form, token_generator, current_time, token_still_valid

users = Blueprint('users', __name__)


@socketio.on('connect')
def connect(auth):

    valid_token = auth['userToken']
    user = User.query.filter_by(valid_token=valid_token).first()
    
    if user:
        valid = token_still_valid(user)
        if valid:
            user.sid = request.sid
            db.session.commit()
            emit('response', {'user_sid': user.sid})
        

@socketio.on('disconnect')
def disconnect():
    print('disconnected')
    emit('disconnect')


@socketio.on('seen message')
def seen_message(data):

    token = data['token']
    messages_ids = data['messages']
    friend_id = data['friendId']

    if token: 
        user = User.query.filter_by(valid_token=token).first()
        for id in messages_ids:
            message = Messages.query.get(int(id['id']))
            if message.receiver_id == user.id:
                message.has_seen = True
        db.session.commit()

    user_receiver = User.query.filter_by(id=friend_id).first()
    if user_receiver:
        room = user_receiver.sid
        emit('seen message', messages_ids, to=room)


@socketio.on('private message')
def private_message(data):

    data = data['data']
    token = data['userToken']
    message = data['message']
    receiver_id = data['receiver_id']

    if token and message and receiver_id:
        user_receiver = User.query.filter_by(id=receiver_id).first()
        user_sender = User.query.filter_by(valid_token=token).first()
        if user_receiver and user_sender and token_still_valid(user_sender):
            room = user_receiver.sid
            message = Messages(content=message, receiver_id=receiver_id, owner_id=user_sender.id)
            db.session.add(message)
            db.session.commit()
            if room:
                date = json.dumps(message.time_send)
                message_to_send_back = {
                    'receiver_id': str(user_receiver.id),
                    'owner_id': str(user_sender.id),
                    'content': message.content,
                    'id': str(message.id),
                    'date': date,
                    'has_seen': message.has_seen
                    }
                emit('private message', {'data': message_to_send_back}, to=room)
                return message_to_send_back

    

@users.route('/friends', methods=['GET'])
def friends():
    if not current_user.is_authenticated:
        return make_response(jsonify({'message': 'User is not logged in.'}), 403)

    friends = current_user.friends.all()
    if friends == []:
        return make_response(jsonify({'message': 'User has no friends.'}), 403)

    list_of_friends = []
    for friend in friends:
        list_of_messages = []
        messages_sent = current_user.messages.filter_by(receiver_id=friend.id).all()
        messages_received = friend.messages.filter_by(receiver_id=current_user.id).all()
        all_messages = messages_sent + messages_received
        if all_messages != []:
            for message in all_messages:
                list_of_messages.append(str(message.id))
        list_of_messages = sort_messages_with_id(list_of_messages)
        list_of_friends.append({
            'id': str(friend.id),
            'username': friend.username,
            'profile_pic': friend.image_file,
            'messages_id': list_of_messages
        })
    return make_response(jsonify(list_of_friends), 200)


@users.route('/messages', methods=['GET'])
def messages():
    if not current_user.is_authenticated:
        return make_response(jsonify({'message': 'User is not logged in.'}), 403)
        
    friends = current_user.friends.all()
    if friends == []:
        return make_response(jsonify({}), 202)

    list_of_messages = []
    for friend in friends:
        messages_sent = current_user.messages.filter_by(receiver_id=friend.id).all()
        messages_received = friend.messages.filter_by(receiver_id=current_user.id).all()
        all_messages = messages_sent + messages_received
        if all_messages != []:
            for message in all_messages:
                list_of_messages.append({
                    'id': str(message.id),
                    'content': message.content,
                    'date': message.time_send,
                    'owner_id': str(message.owner_id),
                    'has_seen': message.has_seen
                })
                
    list_of_messages = sort_messages(list_of_messages)
    return make_response(jsonify(list_of_messages), 200)


@users.route('/register',  methods=['POST'])
def register():

    if current_user.is_authenticated:
        return make_response(jsonify({'message': 'already logged'}), 403)

    req = request.get_json()
    username = req['name']
    email = req['email']
    password = req['password']
    is_valid, message = validate_register_form(username, email, password)

    if is_valid:
        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
        valid_token = token_generator(80)
        user = User(username=username, email=email, password=hashed_pw,
                    valid_token=valid_token, token_validity=current_time())
                    
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=True)
        
        user_data = {
            'username': user.username,
            'email': user.email,
            'profile_pic': user.image_file
        }
        return make_response(jsonify({'valid_token': user.valid_token, 'data': user_data}), 200)

    return make_response(jsonify({'message': message}), 401)


@users.route('/login', methods=['POST'])
def login():

    if current_user.is_authenticated:
        logout_user()
    
    req = request.get_json(force=True)
    if req == {}:
        return make_response(jsonify({'message': 'Where is the body?'}), 400)
    email = req['email']
    password = req['password']
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user, remember=True)
        user_data = {
            'id': str(user.id),
            'username': user.username,
            'email': user.email,
            'profile_pic': user.image_file
        }
        user.valid_token = token_generator(80)
        user.token_validity = current_time()
        db.session.commit()
        return make_response(jsonify({'valid_token': user.valid_token, 'data': user_data}), 200)
    return make_response(jsonify({'message': 'Email or password are incorrect.'}), 401)


@users.route('/user-data')
def user_data():
    if current_user.is_authenticated:
        user_data = {
            'id': str(current_user.id),
            'username': current_user.username,
            'email': current_user.email,
            'profile_pic': current_user.image_file
        }
        response = {
            'data': user_data,
            'valid_token': current_user.valid_token,
            'is_logged_in': True
        }
        return make_response(jsonify(response), 200)
    return make_response(jsonify({'message': 'User is not logged in'}), 401)


@users.route('/user-exists', methods=['POST'])
def user_exists():
    req = request.get_json(force=True)
    if req == {}:
        return make_response(jsonify({'message': 'where is the body?'}), 400)
    email = req['email']
    user = User.query.filter_by(email=email).first()
    if user:
        return make_response(jsonify({'message': 'User already exists'}), 200)
    else:
        return make_response(jsonify({'message': 'Looks like you do not have an account.'}), 404)


@users.route('/available', methods=['POST'])
def available():
    req = request.get_json(force=True)
    if req == {}:
        return make_response(jsonify({'message': 'where is the body?'}), 400)
    field = req['field']
    message = {
        'name': False,
        'email':  False
    }
    if field == 'name':
        name = req['name']
        user = User.query.filter_by(username=name).first()
        if user:
            message['name'] = True
    if field == 'email':
        email = req['email']
        user = User.query.filter_by(email=email).first()
        if user:
            message['email'] = True
    return make_response(jsonify(message), 200)


@users.route('/logout')
def logout():

    if current_user.is_authenticated:
        logout_user()
    return make_response(jsonify({'loged_out': True}), 200)


@users.route('/add-friend', methods=['POST'])
def add_friend():

    if not current_user.is_authenticated:
        return make_response(jsonify({'message': 'User is not logged in.'}), 403)
    req = request.get_json(force=True)
    if req == {}:
        return make_response(jsonify({'message': 'Where is the body?'}), 400)

    name = req['name']
    new_friend = User.query.filter_by(username=name).first()

    if new_friend:
        current_user.add_friend(new_friend)
        db.session.commit()
        return make_response(jsonify({'message': 'Friend added'}), 200)
    return make_response(jsonify({'message': 'Looks like this man is an myth'}), 404)


@users.route('/remove-friend', methods=['POST'])
def remove_friend():

    if not current_user.is_authenticated:
        return make_response(jsonify({'message': 'User is not logged in.'}), 403)
    req = request.get_json(force=True)
    if req == {}:
        return make_response(jsonify({'message': 'Where is the body?'}), 400)

    name = req['name']
    old_friend = User.query.filter_by(username=name).first()

    if old_friend:
        current_user.remove_friend(old_friend)
        db.session.commit()
        return make_response(jsonify({'message': 'Friend removed'}), 200)
    return make_response(jsonify({'message': 'Looks like this man is an myth'}), 404)


@users.route('upload-profile-image', methods=['POST'])
def upload_profile_image():

    if not current_user.is_authenticated:
        return make_response(jsonify({'message': 'User is not logged in.'}), 403)

    req = request.get_json(force=True)
    new_pic = save_pic(pic=req['image'], ext=req['ext'])
    old_pic = current_user.image_file
    current_user.image_file = new_pic
    if old_pic != 'default.jpg':
        os.remove(os.path.join(app.root_path,
                                'static/profile_pic', old_pic))
    db.session.commit()

    response = {
        'data': {
            'profile_pic': new_pic
        }
    }

    return make_response(jsonify(response), 200)


@users.route('/get-profile-image/<file_name>', methods=['GET', 'POST'])
def get_profile_image(file_name):

    pic_path = os.path.join(
        app.root_path, 'static/profile_pic', file_name)

    return send_file(pic_path, mimetype='image/gif')