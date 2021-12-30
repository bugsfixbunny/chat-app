from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_socketio import SocketIO


app = Flask(__name__)
app.config['SECRET_KEY'] = '...'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///apps.db'
socketio = SocketIO(app)
db = SQLAlchemy(app)

bcrypt = Bcrypt()

login_manager = LoginManager(app)
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'


from chat_backend.users.routes import users
app.register_blueprint(users, url_prefix='/users')