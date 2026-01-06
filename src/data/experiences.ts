export interface Experience {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    description?: string;
    image: string;
    category: string;
    price?: string;
    date?: string;
    type: 'activity' | 'event';
    highlights?: string[];
    location?: string;
    hours?: string;
    rating?: number;
    reviews?: number;
    gallery?: string[];
    duration?: string;
}

export const experiences: Experience[] = [
    // Things To Do
    {
        id: 'burj-khalifa',
        slug: 'burj-khalifa',
        title: "Burj Khalifa",
        subtitle: "Touch the Sky",
        description: "Rising gracefully from the desert, the Burj Khalifa honours the city with its extraordinary union of art, engineering, and meticulous craftsmanship. At 828 metres (2,716.5 feet), the 200-plus storey Burj Khalifa has 160 habitable levels, the most of any building in the world.\n\nExperience the breathtaking views from 'At the Top, Burj Khalifa SKY' on level 148, the highest outdoor observatory in the world. Continue your journey to levels 125 and 124 for a 360-degree view of Dubai. The visit is not just about the view; it's an immersive experience that tells the story of the tower's construction and the city's rise.",
        image: "/Burj Khalifa.jpeg",
        category: "Iconic",
        price: "from AED 169",
        type: 'activity',
        highlights: [
            "World's tallest building",
            "Highest outdoor observation deck",
            "360-degree views of Dubai",
            "Multimedia presentation on Dubai's history"
        ],
        location: "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai",
        hours: "08:00 AM - 12:00 AM",
        rating: 4.8,
        reviews: 24500
    },
    {
        id: 'arabian-desert',
        slug: 'arabian-desert',
        title: "Arabian Desert",
        subtitle: "Dune Bashing",
        description: "Escape the city and venture into the golden dunes of the Arabian Desert. This safari experience offers the perfect blend of thrill and culture. Start with an adrenaline-pumping dune bashing session in a 4x4 vehicle, followed by sandboarding down the steep slopes.\n\nAs the sun sets, relax at a traditional Bedouin camp where you can enjoy camel rides, henna painting, and a delicious BBQ dinner under the stars. Live entertainment, including belly dancing and Tanoura shows, completes this authentic Arabian night.",
        image: "/Arabian Desert.jpeg",
        category: "Nature",
        price: "from AED 299",
        type: 'activity',
        highlights: [
            "4x4 Dune Bashing",
            "Camel Riding & Sandboarding",
            "BBQ Dinner under the stars",
            "Live Entertainment"
        ],
        location: "Dubai Desert Conservation Reserve",
        hours: "03:00 PM - 09:00 PM",
        rating: 4.9,
        reviews: 18000
    },
    {
        id: 'palm-jumeirah',
        slug: 'palm-jumeirah',
        title: "Palm Jumeirah",
        subtitle: "Island Life",
        description: "The Palm Jumeirah is a world-renowned man-made archipelago that resembles a stylized palm tree from above. It is home to some of Dubai's most luxurious resorts, including Atlantis, The Palm and FIVE Palm Jumeirah.\n\nVisitors can explore the Boardwalk, which stretches 11km along the crescent, offering stunning views of the Dubai coastline and the Burj Al Arab. Indulge in fine dining at The Pointe, relax on pristine beaches, or take a monorail ride for a scenic tour of this architectural marvel.",
        image: "/palm-jumeirah.png",
        category: "Luxury",
        price: "Free Entry",
        type: 'activity',
        highlights: [
            "Iconic man-made island",
            "The Pointe dining destination",
            "Palm Monorail scenic ride",
            "Luxury beach clubs"
        ],
        location: "Palm Jumeirah, Dubai",
        hours: "Open 24 Hours",
        rating: 4.7,
        reviews: 12000
    },
    {
        id: 'future-museum',
        slug: 'future-museum',
        title: "Museum of the Future",
        subtitle: "Tomorrow Today",
        description: "The Museum of the Future is a 'living museum' that explores how society could evolve in the coming decades using science and technology. It sits in a striking torus-shaped building adorned with Arabic calligraphy, representing humanity, the earth, and the unknown future.\n\nInside, immersive exhibitions challenge you to imagine a world transformed by climate change, space travel, and bioengineering. It serves as a home for inspiration, open to all, and is classified as one of the most beautiful buildings on Earth.",
        image: "/future-museum.png",
        category: "Culture",
        price: "from AED 145",
        type: 'activity',
        highlights: [
            "Architectural masterpiece",
            "Immersive future exhibits",
            "Space station simulation",
            "DNA library of thousands of species"
        ],
        location: "Sheikh Zayed Rd - Trade Centre - Trade Centre 2",
        hours: "10:00 AM - 07:30 PM",
        rating: 4.6,
        reviews: 8900
    },
    // Featured Event
    {
        id: 'atlantis-royal',
        slug: 'atlantis-royal',
        title: "Atlantis The Royal",
        subtitle: "Grand Reveal",
        description: "Welcome to the most ultra-luxury experiential resort in the world. Atlantis The Royal is strictly for those who want to experience the impossible. From 43 storeys high, gaze out upon the Dubai skyline and the Arabian Sea.\n\nThis Grand Reveal event marks a new era of luxury in Dubai. Be among the first to witness the fire and water fountains, celebrity chef restaurants, and the sky-high infinity pool, Cloud 22. This is more than a hotel; it is an icon that will redefine your perspective of luxury.",
        image: "/atlantis-royal.png",
        category: "New Opening",
        type: 'event',
        highlights: [
            "Ultra-luxury resort launch",
            "Celebrity Chef Dining",
            "Cloud 22 Infinity Pool",
            "Fire and Water spectacles"
        ],
        location: "Crescent Rd - The Palm Jumeirah - Dubai",
        hours: "Event starts 07:00 PM",
        rating: 5.0,
        reviews: 500
    },
    // Sub Events
    {
        id: 'cirque-du-soleil',
        slug: 'cirque-du-soleil',
        title: "Cirque du Soleil",
        subtitle: "Signature Show",
        description: "Cirque du Soleil returns to Dubai with a breathtaking production that defies imagination. Acrobats, contortionists, and aerialists perform death-defying feats in a show that blends theater, dance, and music.\n\n'OVO' is a headlong rush into a colorful ecosystem teeming with life, where insects work, eat, crawl, flutter, play, fight and look for love in a non-stop riot of energy and movement. Don't miss this high-energy spectacle.",
        image: "/cirque-du-soleil.png",
        category: "Show",
        date: "Jan 12 - 25",
        type: 'event',
        highlights: [
            "World-famous acrobatic troupe",
            "Stunning costume design",
            "Live musical score",
            "Family-friendly entertainment"
        ],
        location: "Coca-Cola Arena",
        hours: "Shows at 08:00 PM",
        rating: 4.9,
        reviews: 3200
    },
    {
        id: 'global-village',
        slug: 'global-village',
        title: "Global Village",
        subtitle: "World of Wonder",
        description: "Global Village is the region's first cultural, entertainment, family, and shopping destination. Every year, it brings together cultures from 90 countries across the world in one place.\n\nWander through pavilions showcasing local products, crafts, and food. Enjoy over 40,000 live entertainment shows, experience the thrill of the carnival rides, and taste authentic cuisines from around the globe. It's a festival of diversity and discovery.",
        image: "/global-village.png",
        category: "Culture",
        date: "Now Open",
        type: 'event',
        highlights: [
            "90+ Country Pavilions",
            "International Street Food",
            "Carnival Rides & Games",
            "Weekly Fireworks"
        ],
        location: "Sheikh Mohammed Bin Zayed Road",
        hours: "04:00 PM - 12:00 AM",
        rating: 4.8,
        reviews: 45000
    },
    {
        id: 'dubai-design-week',
        slug: 'dubai-design-week',
        title: "Dubai Design Week",
        subtitle: "Creative Hub",
        description: "Dubai Design Week is the region's largest creative festival, reflecting Dubai's position as the design capital of the Middle East. The festival covers a range of disciplines, including architecture, product design, interiors, and multimedia.\n\nThe hub of the festival is d3 (Dubai Design District), featuring exhibitions, installations, talks, and workshops. It celebrates the best of regional and international design, fostering dialogue and collaboration among the creative community.",
        image: "/dubai-design-week.png",
        category: "Art",
        date: "Nov 07 - 12",
        type: 'event',
        highlights: [
            "Regional design showcase",
            "Interactive installations",
            "Workshops & Masterclasses",
            "Global Grad Show"
        ],
        location: "Dubai Design District (d3)",
        hours: "10:00 AM - 10:00 PM",
        rating: 4.7,
        reviews: 1500
    },
    {
        id: 'michelin-guide',
        slug: 'michelin-guide',
        title: "Michelin Guide Reveal",
        subtitle: "Culinary Excellence",
        description: "The Michelin Guide Dubai 2024 selection will be revealed in a prestigious ceremony, celebrating the city's vibrant culinary scene. From fine dining temples to hidden gems, the guide recognizes the best restaurants in Dubai.\n\nWitness the awarding of Michelin Stars, Bib Gourmands, and Special Awards to the talented chefs and teams who are elevating Dubai's gastronomy to a world-class level.",
        image: "/michelin-guide.png",
        category: "Dining",
        date: "Coming Soon",
        type: 'event',
        highlights: [
            "Star Revelation Ceremony",
            "Gathering of Top Chefs",
            "Gala Dinner",
            "Culinary Industry Networking"
        ],
        location: "Atlantis The Royal",
        hours: "By Invitation Only",
        rating: 5.0,
        reviews: 0
    },
    // Video Section Items
    {
        id: 'skydive-dubai',
        slug: 'skydive-dubai',
        title: "Skydive Dubai",
        subtitle: "The Ultimate Thrill",
        description: "Experience the thrill of a lifetime with Skydive Dubai. Jump from 13,000 feet and enjoy freefall at 120 miles per hour over the iconic Palm Jumeirah or the Arabian Desert. Captured by a professional camera flyer, this is a bucket-list moment you will never forget.",
        image: "/video-thumb-skydive.png",
        category: "Adventure",
        price: "from AED 1799",
        duration: "3:45",
        type: 'activity',
        highlights: ["Tandem Skydive", "Palm Jumeirah View", "Professional Video & Photos", "World-class Instructors"],
        location: "Al Seyahi St - Dubai Marina",
        hours: "08:00 AM - 02:00 PM",
        rating: 4.9,
        reviews: 5000
    },
    {
        id: 'dubai-fountain',
        slug: 'dubai-fountain',
        title: "The Dubai Fountain",
        subtitle: "Water & Light Show",
        description: "Witness the world's largest choreographed fountain system. The Dubai Fountain shoots water up to 500 ft in the air accompanied by classical, contemporary, and world music. The show takes place on the 30-acre Burj Lake and is visible from every point on the lake promenade.",
        image: "/video-thumb-fountains.png",
        category: "Entertainment",
        price: "Free",
        duration: "2:15",
        type: 'activity',
        highlights: ["World's largest choreographed fountain", "Daily shows", "Music and light spectacle", "Burj Lake Boat Ride"],
        location: "Downtown Dubai",
        hours: "06:00 PM - 11:00 PM",
        rating: 5.0,
        reviews: 30000
    },
    {
        id: 'aura-skypool',
        slug: 'aura-skypool',
        title: "Aura Skypool",
        subtitle: "360° Infinity Pool",
        description: "Suspend yourself in the world's highest 360-degree infinity pool. AURA offers incredible views of the majestic Dubai skyline, Palm Jumeirah, and the shimmering horizon of the Arabian Gulf. It's a unique destination for those looking to relax in style.",
        image: "/video-thumb-aura.png",
        category: "Luxury",
        price: "from AED 200",
        duration: "1:30",
        type: 'activity',
        highlights: ["Highest 360° infinity pool", "Panoramic city views", "Luxury lounge experience", "Morning, Afternoon & Evening sessions"],
        location: "The Palm Tower, Palm Jumeirah",
        hours: "10:00 AM - 07:00 PM",
        rating: 4.8,
        reviews: 2100
    },
    {
        id: 'desert-safari',
        slug: 'desert-safari',
        title: "Desert Safari",
        subtitle: "Dune Bashing",
        description: "Escape the city and explore the red dunes of the Arabian Desert. Enjoy a thrilling dune bashing session, ride a camel, and watch a traditional Tanoura dance performance while dining under the stars.",
        image: "/video-thumb-desert.png",
        category: "Adventure",
        price: "from AED 250",
        duration: "4:00",
        type: 'activity',
        highlights: ["Dune Bashing", "Camel Riding", "BBQ Dinner", "Traditional Entertainment"],
        location: "Dubai Desert Conservation Reserve",
        hours: "03:00 PM - 09:00 PM",
        rating: 4.9,
        reviews: 12000
    },
    // Upcoming Events Additional
    {
        id: 'dubai-shopping-festival',
        slug: 'dubai-shopping-festival',
        title: "Dubai Shopping Festival",
        subtitle: "Shop, Win, Celebrate",
        description: "The world’s longest-running shopping festival returns with unbeatable deals, family entertainment, and massive giveaways. From mega raffles to drone shows and fireworks, the city comes alive with excitement.",
        image: "/event-shopping.png",
        category: "Shopping & Lifestyle",
        date: "Dec 15 - Jan 29",
        type: 'event',
        highlights: ["Mega Sales", "Daily Fireworks", "Live Concerts", "Raffle Draws"],
        location: "Citywide",
        hours: "10:00 AM - 12:00 AM",
        rating: 4.7,
        reviews: 15000
    },
    {
        id: 'art-dubai',
        slug: 'art-dubai',
        title: "Art Dubai",
        subtitle: "International Art Fair",
        description: "Art Dubai is the Middle East's leading international art fair, taking place every March. It showcases contemporary and modern art from around the world, with a special focus on artists from the Middle East, North Africa, and South Asia.",
        image: "/find-culture.png",
        category: "Arts & Culture",
        date: "Mar 01 - Mar 05",
        type: 'event',
        highlights: ["Contemporary Art Galleries", "Artist Commissions", "Global Art Forum", "Workshops"],
        location: "Madinat Jumeirah",
        hours: "02:00 PM - 09:00 PM",
        rating: 4.8,
        reviews: 1200
    },
    {
        id: 'dubai-world-cup',
        slug: 'dubai-world-cup',
        title: "Dubai World Cup",
        subtitle: "The World's Richest Race",
        description: "The pinnacle of the UAE racing season, the Dubai World Cup is one of the world's richest horse races. It combines high-stakes racing with high fashion and entertainment, attracting the world's best horses and jockeys.",
        image: "/video-thumb-skyline.png",
        category: "Sports",
        date: "Mar 25",
        type: 'event',
        highlights: ["Top-tier Horse Racing", "Fashion Contests", "Closing Ceremony Concert", "Fine Dining Hospitality"],
        location: "Meydan Racecourse",
        hours: "Gates open 12:00 PM",
        rating: 4.9,
        reviews: 5000
    },
    // Find Things To Do Additional
    {
        id: 'miracle-garden',
        slug: 'miracle-garden',
        title: "Miracle Garden",
        subtitle: "Floral Wonderland",
        description: "A world of floral wonder awaits at Dubai Miracle Garden, the world's largest natural flower garden. The park features over 50 million flowers arranged in stunning structures and designs, offering a colorful escape from the desert.",
        image: "/find-nature.png",
        category: "Nature",
        price: "from AED 55",
        type: 'activity',
        highlights: ["50 Million Flowers", "Emirates A380 Floral Structure", "Heart Passage", "Disney Avenue"],
        location: "Al Barsha South 3",
        hours: "09:00 AM - 09:00 PM",
        rating: 4.6,
        reviews: 32000
    },
    {
        id: 'underwater-dining',
        slug: 'underwater-dining',
        title: "Underwater Dining",
        subtitle: "Michelin Star Experience",
        description: "Immerse yourself in a culinary journey at Ossiano, Dubai's premier underwater restaurant. Dine with views of the Ambassador Lagoon, home to 65,000 marine animals, while enjoying a progressive fine dining tasting menu.",
        image: "/find-gastronomy.png",
        category: "Gastronomy",
        price: "from AED 1200",
        type: 'activity',
        highlights: ["Underwater views", "Michelin Star Cuisine", "Romantic Atmosphere", "Seafood Specialties"],
        location: "Atlantis The Palm",
        hours: "06:00 PM - 11:00 PM",
        rating: 4.9,
        reviews: 800
    },
    {
        id: 'fashion-avenue',
        slug: 'fashion-avenue',
        title: "Fashion Avenue",
        subtitle: "Global Luxury Brands",
        description: "Walk the runway of style at The Dubai Mall's Fashion Avenue. This dedicated luxury precinct houses the world's most coveted fashion brands, personalized shopping services, and exclusive dining experiences in a stunning architectural setting.",
        image: "/find-shopping.png",
        category: "Shopping",
        price: "Free Entry",
        type: 'activity',
        highlights: ["150+ Luxury Brands", "Personal Shoppers", "VIP Lounge", "Premium Dining"],
        location: "The Dubai Mall",
        hours: "10:00 AM - 12:00 AM",
        rating: 4.7,
        reviews: 10000
    },
    {
        id: 'royal-beach-club',
        slug: 'royal-beach-club',
        title: "Royal Beach Club",
        subtitle: "Serenity by the Sea",
        description: "Unwind at the Royal Beach Club, a sanctuary of relaxation on the pristine sands of the Palm Jumeirah. Enjoy temperature-controlled pools, private cabanas, and attentive service while soaking up the Arabian sun.",
        image: "/find-relaxation.png",
        category: "Relaxation",
        price: "from AED 400",
        type: 'activity',
        highlights: ["Private Beach Access", "Infinity Pools", "Spa Services", "Beachside Dining"],
        location: "Palm Jumeirah",
        hours: "09:00 AM - 07:00 PM",
        rating: 4.8,
        reviews: 1500
    },
    // More About Articles (Mapped as experiences)
    {
        id: 'perfect-weekend-guide',
        slug: 'perfect-weekend-guide',
        title: "The Guide: Perfect Weekend",
        subtitle: "48 Hours in Dubai",
        description: "Planning a quick getaway? Here is your ultimate itinerary for a perfect weekend in Dubai. From morning strolls on the beach to evening dinners with a view, discover how to make the most of 48 hours in the city.",
        image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=1000&auto=format&fit=crop",
        category: "Guide",
        type: 'activity',
        highlights: ["Morning at the Beach", "Old Dubai Culture Trip", "Sunset at The View", "Fine Dining Dinner"],
        location: "Dubai",
        hours: "N/A",
        rating: 4.9,
        reviews: 50
    },
    {
        id: 'michelin-star-restaurants',
        slug: 'michelin-star-restaurants',
        title: "Top Michelin Restaurants",
        subtitle: "Gastronomy Guide",
        description: "Dubai's culinary scene is world-class. Explore our curated list of Michelin Star restaurants that offer unforgettable dining experiences. From French haute cuisine to modern Japanese, taste the best the city has to offer.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
        category: "Gastronomy",
        type: 'activity',
        highlights: ["Il Ristorante - Niko Romito", "Stay by Yannick Alléno", "Tresind Studio", "Hoseki"],
        location: "Various Locations",
        hours: "N/A",
        rating: 5.0,
        reviews: 100
    },
    {
        id: 'al-fahidi-district',
        slug: 'al-fahidi-district',
        title: "Al Fahidi Historic District",
        subtitle: "Discovering History",
        description: "Step back in time at the Al Fahidi Historic Neighborhood. Wander through the winding alleyways, admire the traditional wind towers, and visit museums and galleries housed in restored heritage buildings.",
        image: "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?q=80&w=1000&auto=format&fit=crop",
        category: "Culture",
        price: "Free",
        type: 'activity',
        highlights: ["Traditional Architecture", "Dubai Museum", "Coffee Museum", "XVA Gallery"],
        location: "Bur Dubai",
        hours: "Open 24 Hours",
        rating: 4.7,
        reviews: 8000
    }
];
