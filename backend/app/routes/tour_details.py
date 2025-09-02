from flask import Blueprint, jsonify

tour_details_bp = Blueprint('tour_details', __name__)

@tour_details_bp.route('/canyons', methods=['GET'])
def details_canyons():
    return jsonify({
        "slug": "canyons",
        "title": "Canyons Adventure",
        "gather": "Las Vegas, Nevada",
        "highlights": [
            "Zion National Park (Angels Landing), Utah",
            "Antelope Canyon, Arizona",
            "Horseshoe Bend, Arizona",
            "Monument Valley, Utah",
            "Forrest Gump Point, Utah",
            "Grand Canyon, Arizona"
        ],
        "notes": [
            "Strenuous hike permits may be required for Angels Landing",
            "Best light for Antelope Canyon is mid-day"
        ]
    })

@tour_details_bp.route('/alaska', methods=['GET'])
def details_alaska():
    return jsonify({
        "slug": "alaska",
        "title": "Alaska Northern Lights & Wilderness",
        "gather": "Seattle, Washington",
        "highlights": [
            "Fairbanks",
            "Dog sledding",
            "Chena Hot Springs",
            "Ice skating",
            "Aurora (Northern Lights)",
            "Snowmobile adventure",
            "Anchorage",
            "Helicopter tour (optional $500–$600)",
            "Skiing or Snowboarding",
            "Hiking"
        ],
        "notes": [
            "Aurora visibility depends on weather and KP index",
            "Helicopter seat availability is limited"
        ]
    })

@tour_details_bp.route('/hawaii', methods=['GET'])
def details_hawaii():
    return jsonify({
        "slug": "hawaii",
        "title": "Hawaii Ocean & Volcano Experience",
        "gather": "Los Angeles, California",
        "highlights": [
            "Oahu Island, Honolulu",
            "Surfing",
            "Diving",
            "Swim with Dolphins",
            "Whale watching (seasonal)",
            "Parachute jump ($200–$350)",
            "Hiking",
            "Waterfalls",
            "Byodo-In Temple",
            "Panoramic viewpoints"
        ],
        "notes": [
            "Marine wildlife activities are weather dependent",
            "Parachute jump requires age/weight compliance"
        ]
    })

@tour_details_bp.route('/west-coast', methods=['GET'])
def details_west_coast():
    return jsonify({
        "slug": "west-coast",
        "title": "West Coast National Parks",
        "gather": "Los Angeles, California",
        "highlights": [
            "Sequoia National Park",
            "World's largest trees",
            "Yosemite National Park",
            "Yosemite Valley hikes",
            "Pacific Ocean",
            "Big Sur coastal drive"
        ],
        "notes": [
            "Some roads may close in winter",
            "Yosemite permits are seasonal"
        ]
    })
