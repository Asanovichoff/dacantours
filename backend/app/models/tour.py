from datetime import datetime
from . import db

class Tour(db.Model):
    __tablename__ = 'tours'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    duration = db.Column(db.String(50), nullable=True)  # e.g., "7 days", "3 days"
    difficulty = db.Column(db.String(50), nullable=True)  # e.g., "Easy", "Moderate", "Hard"
    max_group_size = db.Column(db.Integer, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with leads
    leads = db.relationship('Lead', backref='tour', lazy=True)
    
    def __repr__(self):
        return f'<Tour {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'location': self.location,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'duration': self.duration,
            'difficulty': self.difficulty,
            'max_group_size': self.max_group_size,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
