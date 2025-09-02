from datetime import datetime
from . import db

class Lead(db.Model):
    __tablename__ = 'leads'
    
    id = db.Column(db.Integer, primary_key=True)
    tour_id = db.Column(db.Integer, db.ForeignKey('tours.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    telegram = db.Column(db.String(50), nullable=False)
    preferred_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), default='interested')  # interested, contacted, converted, lost
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    notes = db.Column(db.Text, nullable=True)
    
    def __repr__(self):
        return f'<Lead {self.name} - {self.email}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'tour_id': self.tour_id,
            'name': self.name,
            'email': self.email,
            'telegram': self.telegram,
            'preferred_date': self.preferred_date.isoformat() if self.preferred_date else None,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'notes': self.notes
        }
