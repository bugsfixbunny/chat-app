from time import sleep
from chat_backend.models import User, Messages
from datetime import datetime, timedelta
import string
import random
import os
import secrets
from io import BytesIO
import base64
from PIL import Image
from chat_backend import app


def validate_register_form(username, email, password):
    if username and email and password:
        user = User.query.filter_by(username=username).first()
        if user:
            return False, 'Username is already in use.'
        email = User.query.filter_by(email=email).first()
        if email:
            return False, 'Email is already in use.'
        return True, 'Is valid.'
    return False, 'Must fill the form.'


def token_generator(size):
    chars = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(chars)for _ in range(size))
    

def token_still_valid(user):
    return user.token_validity > datetime.now() - timedelta(days=7)


def current_time():
    return datetime.now()


def more_than_one_day(time):
    return time > datetime.now() - timedelta(days=1)


def sort_messages(messages):

    messages = sorted(messages, key=lambda x:x['date'])
    
    return messages


def sort_messages_with_id(messages):

    list_of_messages = []

    for id in messages:
        message = Messages.query.get(int(id))
        list_of_messages.append({
            'id': str(id),
            'date': message.time_send
        })

    list_of_messages = sorted(list_of_messages, key=lambda x:x['date'])

    
    return [dict['id'] for dict in list_of_messages]


def save_pic(pic, ext):
    
    random_hex = secrets.token_hex(16)
    pic_fn = random_hex + '.' + ext

    pic_path = os.path.join(
        app.root_path, 'static\profile_pic', pic_fn)

    output_size = (260, 260)
    i = Image.open(BytesIO(base64.b64decode(pic)))
    i.thumbnail(output_size)
    i.save(pic_path)

    return pic_fn