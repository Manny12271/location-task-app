from flask import Blueprint, request, jsonify
from extensions import db
from models import Task
from flask_jwt_extended import jwt_required, get_jwt_identity

tasks_bp = Blueprint('tasks', __name__)

# GET ALL TASKS (with pagination)


@tasks_bp.route('/', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = int(get_jwt_identity())

    # Pagination params
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    # Query only this user's tasks
    tasks_query = Task.query.filter_by(user_id=user_id)

    paginated = tasks_query.paginate(
        page=page, per_page=per_page, error_out=False)

    result = []
    for task in paginated.items:
        result.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "location": task.location,
            "completed": task.completed
        })

    return jsonify({
        "tasks": result,
        "total": paginated.total,
        "pages": paginated.pages,
        "current_page": paginated.page
    }), 200


# CREATE TASK
@tasks_bp.route('/', methods=['POST'])
@jwt_required()
def create_task():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    if not data.get('title'):
        return jsonify({"error": "Title is required"}), 400

    new_task = Task(
        title=data.get('title'),
        description=data.get('description'),
        location=data.get('location'),
        user_id=user_id
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task created"}), 201


# UPDATE TASK
@tasks_bp.route('/<int:id>', methods=['PATCH'])
@jwt_required()
def update_task(id):
    user_id = int(get_jwt_identity())
    task = Task.query.get_or_404(id)

    # Ownership check 🔒
    if task.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.location = data.get('location', task.location)
    task.completed = data.get('completed', task.completed)

    db.session.commit()

    return jsonify({"message": "Task updated"}), 200


# DELETE TASK
@tasks_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    user_id = int(get_jwt_identity())
    task = Task.query.get_or_404(id)

    # Ownership check 🔒
    if task.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"}), 200
