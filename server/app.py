from models import User, Task
from flask import Flask
from extensions import db, bcrypt, jwt, migrate
from flask_cors import CORS

# Import routes
from routes.auth import auth_bp
from routes.tasks import tasks_bp

app = Flask(__name__)

# Enable CORS (VERY IMPORTANT for React)
CORS(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['JWT_SECRET_KEY'] = 'super-secret-key'

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)

# Import models AFTER db init (prevents circular import)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(tasks_bp, url_prefix='/api/tasks')

# Test route


@app.route('/')
def home():
    return {"message": "API is running"}
