from chat_backend import db, login_manager
from flask_login import UserMixin
from datetime import datetime


@login_manager.user_loader
def load_user(user_id):
     return User.query.get(int(user_id))


friends = db.Table('friends',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('friend_id', db.Integer, db.ForeignKey('user.id'))
)


class Messages(db.Model):

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text, nullable = False)
    time_send = db.Column(db.DateTime, nullable = False, default=datetime.utcnow)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    has_seen = db.Column(db.Boolean, nullable = False, default = False)


class User(db.Model, UserMixin):

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(20), unique = True, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    image_file = db.Column(db.String(25), nullable = False,
                           default = 'default.jpg')
    password = db.Column(db.String(60), nullable = False)
    sid = db.Column(db.String())
    valid_token = db.Column(db.String(80), nullable = False)
    token_validity = db.Column(db.DateTime, nullable = False)
    perm = db.Column(db.Integer, default = 0)
    friends = db.relationship('User', secondary = friends, lazy = 'dynamic', primaryjoin = (
        friends.c.user_id == id), secondaryjoin = (friends.c.friend_id == id))
    messages = db.relationship('Messages', backref = 'owner', lazy = 'dynamic', primaryjoin=
                                id == Messages.owner_id)

    def add_friend(self, friend):
        if friend not in self.friends and friend != self:
            self.friends.append(friend)
            friend.friends.append(self)

    def remove_friend(self, friend):
        if friend in self.friends:
            self.friends.remove(friend)
            friend.friends.remove(self)