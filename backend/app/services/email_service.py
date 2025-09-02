import os
from flask import current_app
from flask_mail import Mail, Message
from datetime import datetime

mail = Mail()

def init_email_service(app):
    """Initialize email service with Flask app"""
    app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
    app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'true').lower() == 'true'
    app.config['MAIL_USE_SSL'] = os.environ.get('MAIL_USE_SSL', 'false').lower() == 'true'
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')
    
    mail.init_app(app)

def send_lead_notification(lead, tour):
    try:
        # Format the date
        date_str = lead.preferred_date.strftime('%B %d, %Y') if lead.preferred_date and hasattr(lead.preferred_date, 'strftime') else 'Not specified'
        
        # Create email subject
        subject = f"New Tour Interest: {tour.title} - {lead.name}"
        
        # Create email body
        body = f"""
🎉 New Tour Interest Received!

Tour: {tour.title}
Location: {tour.location}
Price: ${tour.price}
Duration: {tour.duration}
Difficulty: {tour.difficulty}

Customer Details:
Name: {lead.name}
Email: {lead.email}
Preferred Date: {date_str}
Notes: {lead.notes or 'None'}

Submitted: {lead.created_at.strftime('%B %d, %Y at %I:%M %p')}

---
This is an automated notification from DAKANTOURS.
        """.strip()
        
        # Get admin email from environment or use default
        admin_email = os.environ.get('ADMIN_EMAIL', 'asanovich.02@gmail.com')
        
        # Create and send message
        msg = Message(
            subject=subject,
            recipients=[admin_email],
            body=body,
            sender=os.environ.get('MAIL_DEFAULT_SENDER', 'dacantour@gmail.com')
        )
        
        mail.send(msg)
        return True
        
    except Exception as e:
        current_app.logger.error(f"Failed to send email notification: {e}")
        return False

def send_customer_confirmation(lead, tour):
    """Send confirmation email to customer"""
    try:
        # Format the date
        date_str = lead.preferred_date.strftime('%B %d, %Y') if lead.preferred_date and hasattr(lead.preferred_date, 'strftime') else 'Not specified'
        
        # Create email subject
        subject = f"Thank you for your interest in {tour.title}!"
        
        # Create email body
        body = f"""
Dear {lead.name},

Thank you for your interest in our {tour.title} tour! 🎉

We've received your inquiry and our travel experts will review your preferences and get back to you within 24-48 hours.

Tour Details:
📍 {tour.title}
🌍 {tour.location}
💰 ${tour.price}
⏱️ {tour.duration}
🏃 {tour.difficulty} difficulty

Your Preferences:
📅 Preferred Date: {date_str}
📝 Notes: {lead.notes or 'None provided'}

What happens next:
1. Our team will review your request
2. We'll send you a personalized itinerary
3. We'll discuss any customizations you'd like
4. We'll help you plan the perfect adventure!

If you have any questions in the meantime, feel free to reach out:
📧 dacantour@gmail.com
📱 +1 (425) 546-9231

Best regards,
The DAKANTOURS Team

---
DAKANTOURS
Discover America's Natural Wonders
Coming Soon: Global Adventures! 🚀
        """.strip()
        
        # Create and send message
        msg = Message(
            subject=subject,
            recipients=[lead.email],
            body=body,
            sender=os.environ.get('MAIL_DEFAULT_SENDER', 'dacantour@gmail.com')
        )
        
        mail.send(msg)
        return True
        
    except Exception as e:
        current_app.logger.error(f"Failed to send customer confirmation: {e}")
        return False

def send_kyrgyzstan_waitlist_confirmation(lead):
    """Send special confirmation for Kyrgyzstan waitlist"""
    try:
        subject = "🚀 Welcome to the Kyrgyzstan Adventure Waitlist!"
        
        body = f"""
Dear {lead.name},

🎉 Welcome to the exclusive Kyrgyzstan Adventure Waitlist!

You're now among the first to know when we launch our exciting Kyrgyzstan tours featuring:
🏔️ Nomadic yurt stays in pristine valleys
🐎 Horseback riding through alpine meadows
🏞️ Crystal-clear alpine lakes
🏛️ Authentic Kyrgyz culture and traditions

What to expect:
📅 We'll notify you as soon as bookings open
🎯 You'll get priority access to early bird pricing
📧 Exclusive updates about tour development
🏆 Special perks for waitlist members

Your waitlist details:
📧 Email: {lead.email}
📝 Notes: {lead.notes or 'None provided'}
📅 Joined: {lead.created_at.strftime('%B %d, %Y')}

While you wait, explore our current US adventures:
🌄 Canyons Adventure - Zion, Grand Canyon, Monument Valley
🌌 Alaska Northern Lights - Aurora chasing and wilderness
🏝️ Hawaii Oahu Adventure - Surfing, diving, island culture
🌲 West Coast National Parks - Sequoia, Yosemite, Big Sur

Questions? Contact us:
📧 dacantour@gmail.com
📱 +1 (425) 546-9231

Adventure awaits! 🚀

Best regards,
The DAKANTOURS Team

---
DAKANTOURS
Discover America's Natural Wonders
Global Expansion Coming Soon! 🌍
        """.strip()
        
        # Create and send message
        msg = Message(
            subject=subject,
            recipients=[lead.email],
            body=body,
            sender=os.environ.get('MAIL_DEFAULT_SENDER', 'dacantour@gmail.com')
        )
        
        mail.send(msg)
        return True
        
    except Exception as e:
        current_app.logger.error(f"Failed to send Kyrgyzstan waitlist confirmation: {e}")
        return False
