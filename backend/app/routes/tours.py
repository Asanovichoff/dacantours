from flask import Blueprint, jsonify, request
from ..models import Tour, db

tours_bp = Blueprint('tours', __name__)

@tours_bp.route('/', methods=['GET'])
def get_tours():
    try:
        # Get only active tours
        tours = Tour.query.filter_by(is_active=True).order_by(Tour.created_at.desc()).all()
        return jsonify([tour.to_dict() for tour in tours])
    except Exception as e:
        return jsonify({"error": "Failed to fetch tours"}), 500

@tours_bp.route('/<int:tour_id>', methods=['GET'])
def get_tour(tour_id):
    try:
        tour = Tour.query.get_or_404(tour_id)
        return jsonify(tour.to_dict())
    except Exception as e:
        return jsonify({"error": "Tour not found"}), 404

@tours_bp.route('/', methods=['POST'])
def create_tour():
    try:
        data = request.get_json()
        required_fields = ['title', 'location', 'description', 'price']
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        tour = Tour(
            title=data['title'],
            location=data['location'],
            description=data['description'],
            price=data['price'],
            image_url=data.get('image_url'),
            duration=data.get('duration'),
            difficulty=data.get('difficulty'),
            max_group_size=data.get('max_group_size')
        )
        
        db.session.add(tour)
        db.session.commit()
        
        return jsonify({
            "message": "Tour created successfully",
            "tour": tour.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to create tour"}), 500

@tours_bp.route('/<int:tour_id>', methods=['PUT'])
def update_tour(tour_id):
    try:
        tour = Tour.query.get_or_404(tour_id)
        data = request.get_json()
        
        # Update fields if provided
        if 'title' in data:
            tour.title = data['title']
        if 'location' in data:
            tour.location = data['location']
        if 'description' in data:
            tour.description = data['description']
        if 'price' in data:
            tour.price = data['price']
        if 'image_url' in data:
            tour.image_url = data['image_url']
        if 'duration' in data:
            tour.duration = data['duration']
        if 'difficulty' in data:
            tour.difficulty = data['difficulty']
        if 'max_group_size' in data:
            tour.max_group_size = data['max_group_size']
        if 'is_active' in data:
            tour.is_active = data['is_active']
        
        db.session.commit()
        
        return jsonify({
            "message": "Tour updated successfully",
            "tour": tour.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update tour"}), 500