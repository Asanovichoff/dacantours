from flask import Blueprint, request, jsonify
from datetime import datetime
from ..models import Lead, Tour, db
from ..services.email_service import send_lead_notification, send_customer_confirmation, send_kyrgyzstan_waitlist_confirmation

interests_bp = Blueprint('interests', __name__)

@interests_bp.route('/', methods=['POST'])
def create_interest():
    data = request.get_json()
    # Telegram no longer required
    required_fields = ['tour_id', 'name', 'email']

    if not all(field in data and data[field] for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Parse preferred date if provided
        preferred_date = None
        if data.get('date'):
            try:
                preferred_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

        # Optional extras
        notes = data.get('notes')

        # Create new lead (telegram deprecated -> store empty string)
        lead = Lead(
            tour_id=data['tour_id'],
            name=data['name'],
            email=data['email'],
            telegram=data.get('telegram', ''),
            preferred_date=preferred_date,
            status='interested',
            notes=notes
        )
        
        db.session.add(lead)
        db.session.commit()
        
        # Get the tour details for email notifications
        tour = Tour.query.get(data['tour_id'])
        
        # Send email notifications
        try:
            # Send notification to admin
            send_lead_notification(lead, tour)
            
            # Send confirmation to customer based on tour type
            if tour.title == "Kyrgyzstan Preview - Coming Soon!":
                send_kyrgyzstan_waitlist_confirmation(lead)
            else:
                send_customer_confirmation(lead, tour)
                
        except Exception as e:
            # Log error but don't fail the request
            print(f"Email notification failed: {e}")
        
        return jsonify({
            "message": "Thanks! We've received your interest. We'll reach out to your email soon.",
            "lead": lead.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to save interest. Please try again."}), 500

@interests_bp.route('/', methods=['GET'])
def list_interests():
    try:
        leads = Lead.query.order_by(Lead.created_at.desc()).all()
        return jsonify([lead.to_dict() for lead in leads])
    except Exception as e:
        return jsonify({"error": "Failed to fetch leads"}), 500

@interests_bp.route('/<int:lead_id>', methods=['GET'])
def get_interest(lead_id):
    try:
        lead = Lead.query.get_or_404(lead_id)
        return jsonify(lead.to_dict())
    except Exception as e:
        return jsonify({"error": "Lead not found"}), 404

@interests_bp.route('/<int:lead_id>', methods=['PUT'])
def update_interest(lead_id):
    try:
        lead = Lead.query.get_or_404(lead_id)
        data = request.get_json()
        
        # Update allowed fields
        if 'status' in data:
            lead.status = data['status']
        if 'notes' in data:
            lead.notes = data['notes']
        
        lead.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            "message": "Lead updated successfully",
            "lead": lead.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update lead"}), 500