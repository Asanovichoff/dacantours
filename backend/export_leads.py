from app import create_app
from app.models import Lead, Tour
import csv
from datetime import datetime

def export_leads_to_csv():
    app = create_app()
    
    with app.app_context():
        leads = Lead.query.order_by(Lead.created_at.desc()).all()
        
        if not leads:
            print("No leads to export.")
            return
        
        filename = f"leads_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = [
                'ID', 'Name', 'Email', 'Telegram', 'Tour', 'Status', 
                'Preferred Date', 'Country', 'Created Date', 'Notes'
            ]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            
            for lead in leads:
                tour = Tour.query.get(lead.tour_id) if lead.tour_id else None
                tour_title = tour.title if tour else 'N/A'
                
                writer.writerow({
                    'ID': lead.id,
                    'Name': lead.name,
                    'Email': lead.email,
                    'Telegram': lead.telegram or 'N/A',
                    'Tour': tour_title,
                    'Status': lead.status,
                    'Preferred Date': lead.preferred_date.strftime('%Y-%m-%d') if lead.preferred_date else 'N/A',
                    'Country': lead.notes.split('Country: ')[1] if lead.notes and 'Country: ' in lead.notes else 'N/A',
                    'Created Date': lead.created_at.strftime('%Y-%m-%d %H:%M'),
                    'Notes': lead.notes or 'N/A'
                })
        
        print(f"✅ Exported {len(leads)} leads to {filename}")
        print(f"📁 File location: {filename}")

if __name__ == "__main__":
    export_leads_to_csv()
