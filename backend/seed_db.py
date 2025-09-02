from app import create_app
from app.models import Tour, db

def seed_tours():
    app = create_app()

    with app.app_context():
        # Check if tours already exist
        if Tour.query.count() > 0:
            print("Database already has tours. Skipping seeding.")
            return

        # Create sample tours - requested set only + upcoming Kyrgyzstan
        tours = [
            {
                "title": "Canyons Adventure",
                "location": "Zion, Antelope Canyon, Horseshoe Bend, Monument Valley, Grand Canyon",
                "description": "Iconic Southwest loop: Zion's Angels Landing, Antelope Canyon beams, panoramic Horseshoe Bend, Navajo lands in Monument Valley, and the mighty Grand Canyon.",
                "price": 2300.0,
                "image_url": "/src/assets/canyons_adventure.jpg",
                "duration": "8 days",
                "difficulty": "Moderate",
                "max_group_size": 12
            },
            {
                "title": "Alaska Northern Lights & Wilderness",
                "location": "Fairbanks, Anchorage, Chena Hot Springs, Denali region",
                "description": "Chase the Aurora, relax at Chena Hot Springs, try dog sledding and snowmobile tours, and explore Alaska's pristine wilderness.",
                "price": 2800.0,
                "image_url": "/src/assets/alaska_northern_lights__wilderness.webp",
                "duration": "8 days",
                "difficulty": "Easy",
                "max_group_size": 12
            },
            {
                "title": "Hawaii Oahu Adventure",
                "location": "Oahu, Honolulu",
                "description": "Surf Waikiki, dive vibrant reefs, swim with dolphins, visit Byodo-In Temple, hike to waterfalls, and enjoy panoramic island views.",
                "price": 2600.0,
                "image_url": "/src/assets/hawaii_oahu_adventure.jpg",
                "duration": "7 days",
                "difficulty": "Easy",
                "max_group_size": 12
            },
            {
                "title": "West Coast National Parks",
                "location": "Sequoia, Yosemite, Big Sur, Pacific Coast",
                "description": "See the world's largest trees in Sequoia, hike Yosemite's granite valleys, and cruise the dramatic Big Sur coastline along the Pacific.",
                "price": 2100.0,
                "image_url": "/src/assets/west_coast_national_parks.jpg",
                "duration": "7 days",
                "difficulty": "Moderate",
                "max_group_size": 12
            },
            {
                "title": "Kyrgyzstan Preview - Coming Soon!",
                "location": "Tien Shan Mountains, Kyrgyzstan",
                "description": "Upcoming: nomadic yurt stays, horseback riding through pristine valleys, alpine lakes, and authentic Kyrgyz culture. Join the waitlist for early access!",
                "price": 3200.0,
                "image_url": "/src/assets/kyrgyzstan_preview_-_coming_soon.jpg",
                "duration": "10 days",
                "difficulty": "Moderate",
                "max_group_size": 10,
                "is_active": False
            },
            {
                "title": "Custom Adventure - Your Way",
                "location": "Your Choice of Destination",
                "description": "Design your perfect adventure! Choose your destination, dates, group size, and activities. From solo expeditions to family trips, we'll create a personalized itinerary just for you.",
                "price": 0.0,
                "image_url": "/src/assets/custom_adventure_-_your_way.jpg",
                "duration": "Custom",
                "difficulty": "Custom",
                "max_group_size": 20,
                "is_active": True
            }
        ]

        for tour_data in tours:
            tour = Tour(**tour_data)
            db.session.add(tour)

        db.session.commit()
        print(f"Successfully seeded {len(tours)} tours!")

if __name__ == "__main__":
    seed_tours()
