from app import create_app
from app.models import Tour, Lead, db
from datetime import datetime

def show_menu():
    print("\n" + "="*50)
    print("🗺️  DAKANTOURS DATA MANAGER")
    print("="*50)
    print("1. View all tours")
    print("2. View all leads")
    print("3. Add new tour")
    print("4. Update tour")
    print("5. Delete tour")
    print("6. Update lead status")
    print("7. Delete lead")
    print("8. Show lead statistics")
    print("0. Exit")
    print("="*50)

def view_tours():
    print("\n🗺️  ALL TOURS:")
    print("-" * 80)
    tours = Tour.query.all()
    if not tours:
        print("No tours found.")
        return
    
    for tour in tours:
        print(f"ID: {tour.id}")
        print(f"Title: {tour.title}")
        print(f"Location: {tour.location}")
        print(f"Price: ${tour.price}")
        print(f"Duration: {tour.duration}")
        print(f"Active: {'Yes' if tour.is_active else 'No'}")
        print("-" * 40)

def view_leads():
    print("\n📧 ALL LEADS:")
    print("-" * 80)
    leads = Lead.query.order_by(Lead.created_at.desc()).all()
    if not leads:
        print("No leads found.")
        return
    
    for lead in leads:
        print(f"ID: {lead.id}")
        print(f"Name: {lead.name}")
        print(f"Email: {lead.email}")
        print(f"Telegram: {lead.telegram}")
        print(f"Status: {lead.status}")
        print(f"Date: {lead.created_at.strftime('%Y-%m-%d %H:%M')}")
        if lead.notes:
            print(f"Notes: {lead.notes}")
        print("-" * 40)

def add_tour():
    print("\n➕ ADD NEW TOUR:")
    print("-" * 40)
    
    title = input("Title: ")
    location = input("Location: ")
    description = input("Description: ")
    price = float(input("Price: "))
    image_url = input("Image URL: ")
    duration = input("Duration (e.g., '7 days'): ")
    difficulty = input("Difficulty (Easy/Moderate/Hard): ")
    max_group_size = int(input("Max group size: "))
    
    tour = Tour(
        title=title,
        location=location,
        description=description,
        price=price,
        image_url=image_url,
        duration=duration,
        difficulty=difficulty,
        max_group_size=max_group_size,
        is_active=True
    )
    
    db.session.add(tour)
    db.session.commit()
    print(f"✅ Tour '{title}' added successfully!")

def update_tour():
    tour_id = int(input("Enter tour ID to update: "))
    tour = Tour.query.get(tour_id)
    if not tour:
        print("❌ Tour not found!")
        return
    
    print(f"\n✏️  UPDATE TOUR: {tour.title}")
    print("-" * 40)
    
    print("Leave blank to keep current value:")
    title = input(f"Title ({tour.title}): ") or tour.title
    location = input(f"Location ({tour.location}): ") or tour.location
    description = input(f"Description: ") or tour.description
    price = float(input(f"Price ({tour.price}): ") or tour.price)
    duration = input(f"Duration ({tour.duration}): ") or tour.duration
    difficulty = input(f"Difficulty ({tour.difficulty}): ") or tour.difficulty
    is_active = input(f"Active (y/n) ({'y' if tour.is_active else 'n'}): ").lower()
    is_active = is_active == 'y' if is_active else tour.is_active
    
    tour.title = title
    tour.location = location
    tour.description = description
    tour.price = price
    tour.duration = duration
    tour.difficulty = difficulty
    tour.is_active = is_active
    tour.updated_at = datetime.utcnow()
    
    db.session.commit()
    print(f"✅ Tour updated successfully!")

def delete_tour():
    tour_id = int(input("Enter tour ID to delete: "))
    tour = Tour.query.get(tour_id)
    if not tour:
        print("❌ Tour not found!")
        return
    
    confirm = input(f"Are you sure you want to delete '{tour.title}'? (y/n): ")
    if confirm.lower() == 'y':
        db.session.delete(tour)
        db.session.commit()
        print(f"✅ Tour '{tour.title}' deleted successfully!")
    else:
        print("❌ Deletion cancelled.")

def update_lead_status():
    lead_id = int(input("Enter lead ID to update: "))
    lead = Lead.query.get(lead_id)
    if not lead:
        print("❌ Lead not found!")
        return
    
    print(f"\n✏️  UPDATE LEAD: {lead.name}")
    print("-" * 40)
    print("Current status:", lead.status)
    print("Status options: interested, contacted, converted, lost")
    
    new_status = input("New status: ")
    if new_status in ['interested', 'contacted', 'converted', 'lost']:
        lead.status = new_status
        lead.updated_at = datetime.utcnow()
        db.session.commit()
        print(f"✅ Lead status updated to '{new_status}'!")
    else:
        print("❌ Invalid status!")

def delete_lead():
    lead_id = int(input("Enter lead ID to delete: "))
    lead = Lead.query.get(lead_id)
    if not lead:
        print("❌ Lead not found!")
        return
    
    confirm = input(f"Are you sure you want to delete lead '{lead.name}'? (y/n): ")
    if confirm.lower() == 'y':
        db.session.delete(lead)
        db.session.commit()
        print(f"✅ Lead '{lead.name}' deleted successfully!")
    else:
        print("❌ Deletion cancelled.")

def show_lead_stats():
    print("\n📊 LEAD STATISTICS:")
    print("-" * 40)
    
    total_leads = Lead.query.count()
    interested = Lead.query.filter_by(status='interested').count()
    contacted = Lead.query.filter_by(status='contacted').count()
    converted = Lead.query.filter_by(status='converted').count()
    lost = Lead.query.filter_by(status='lost').count()
    
    print(f"Total leads: {total_leads}")
    print(f"Interested: {interested}")
    print(f"Contacted: {contacted}")
    print(f"Converted: {converted}")
    print(f"Lost: {lost}")
    
    if total_leads > 0:
        conversion_rate = (converted / total_leads) * 100
        print(f"Conversion rate: {conversion_rate:.1f}%")

def main():
    app = create_app()
    
    with app.app_context():
        while True:
            show_menu()
            choice = input("\nEnter your choice (0-8): ")
            
            if choice == '0':
                print("👋 Goodbye!")
                break
            elif choice == '1':
                view_tours()
            elif choice == '2':
                view_leads()
            elif choice == '3':
                add_tour()
            elif choice == '4':
                update_tour()
            elif choice == '5':
                delete_tour()
            elif choice == '6':
                update_lead_status()
            elif choice == '7':
                delete_lead()
            elif choice == '8':
                show_lead_stats()
            else:
                print("❌ Invalid choice! Please try again.")
            
            input("\nPress Enter to continue...")

if __name__ == "__main__":
    main()
