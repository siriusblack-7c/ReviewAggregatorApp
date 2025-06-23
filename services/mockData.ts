import { Restaurant, RestaurantFeatures, Review, ReviewPlatform, SearchResult } from '@/types';

export const mockRestaurants: Restaurant[] = [
    {
        id: '1',
        name: 'Bella Vista Italian',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '(555) 123-4567',
        website: 'https://bellavista.com',
        cuisineType: ['Italian', 'European'],
        priceRange: 3,
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
        photos: [
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
            'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'
        ],
        overallRating: 4.5,
        totalReviews: 324,
        ratings: {
            google: {
                rating: 4.4,
                reviewCount: 127,
                platformUrl: 'https://google.com/maps/place/bella-vista',
                lastUpdated: '2024-01-15T10:00:00Z'
            },
            yelp: {
                rating: 4.6,
                reviewCount: 89,
                platformUrl: 'https://yelp.com/biz/bella-vista-italian',
                lastUpdated: '2024-01-15T09:30:00Z'
            },
            tripadvisor: {
                rating: 4.5,
                reviewCount: 108,
                platformUrl: 'https://tripadvisor.com/restaurant/bella-vista',
                lastUpdated: '2024-01-15T08:45:00Z'
            }
        },
        hours: {
            monday: { open: '11:00', close: '22:00' },
            tuesday: { open: '11:00', close: '22:00' },
            wednesday: { open: '11:00', close: '22:00' },
            thursday: { open: '11:00', close: '22:00' },
            friday: { open: '11:00', close: '23:00' },
            saturday: { open: '10:00', close: '23:00' },
            sunday: { open: '10:00', close: '21:00' }
        },
        features: [
            { name: RestaurantFeatures.RESERVATIONS, available: true },
            { name: RestaurantFeatures.OUTDOOR_SEATING, available: true },
            { name: RestaurantFeatures.WIFI, available: true },
            { name: RestaurantFeatures.CREDIT_CARDS, available: true },
            { name: RestaurantFeatures.ALCOHOL, available: true }
        ],
        coordinate: {
            latitude: 40.7580,
            longitude: -73.9855
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'Tokyo Sushi Bar',
        address: '456 Broadway',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        phone: '(555) 987-6543',
        cuisineType: ['Japanese', 'Sushi'],
        priceRange: 4,
        imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        photos: [
            'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
            'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400',
            'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400'
        ],
        overallRating: 4.7,
        totalReviews: 198,
        ratings: {
            google: {
                rating: 4.8,
                reviewCount: 76,
                platformUrl: 'https://google.com/maps/place/tokyo-sushi',
                lastUpdated: '2024-01-15T11:00:00Z'
            },
            yelp: {
                rating: 4.6,
                reviewCount: 122,
                platformUrl: 'https://yelp.com/biz/tokyo-sushi-bar',
                lastUpdated: '2024-01-15T10:15:00Z'
            }
        },
        features: [
            { name: RestaurantFeatures.TAKEOUT, available: true },
            { name: RestaurantFeatures.RESERVATIONS, available: true },
            { name: RestaurantFeatures.CREDIT_CARDS, available: true },
            { name: RestaurantFeatures.ALCOHOL, available: true }
        ],
        coordinate: {
            latitude: 40.7614,
            longitude: -73.9776
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z'
    },
    {
        id: '3',
        name: 'Burger Palace',
        address: '789 Fifth Avenue',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        phone: '(555) 456-7890',
        website: 'https://burgerpalace.com',
        cuisineType: ['American', 'Burgers'],
        priceRange: 2,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        photos: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
            'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400'
        ],
        overallRating: 4.2,
        totalReviews: 445,
        ratings: {
            google: {
                rating: 4.1,
                reviewCount: 203,
                platformUrl: 'https://google.com/maps/place/burger-palace',
                lastUpdated: '2024-01-15T12:00:00Z'
            },
            yelp: {
                rating: 4.3,
                reviewCount: 242,
                platformUrl: 'https://yelp.com/biz/burger-palace',
                lastUpdated: '2024-01-15T11:30:00Z'
            }
        },
        features: [
            { name: RestaurantFeatures.DELIVERY, available: true },
            { name: RestaurantFeatures.TAKEOUT, available: true },
            { name: RestaurantFeatures.OUTDOOR_SEATING, available: true },
            { name: RestaurantFeatures.KIDS_FRIENDLY, available: true },
            { name: RestaurantFeatures.CREDIT_CARDS, available: true }
        ],
        coordinate: {
            latitude: 40.7505,
            longitude: -73.9934
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z'
    },
    {
        id: '4',
        name: 'Spice Garden Indian',
        address: '321 Park Avenue',
        city: 'New York',
        state: 'NY',
        zipCode: '10004',
        phone: '(555) 234-5678',
        cuisineType: ['Indian', 'Vegetarian'],
        priceRange: 2,
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
        photos: [
            'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
            'https://images.unsplash.com/photo-1631452180539-96aca8999431?w=400'
        ],
        overallRating: 4.4,
        totalReviews: 167,
        ratings: {
            google: {
                rating: 4.3,
                reviewCount: 89,
                platformUrl: 'https://google.com/maps/place/spice-garden',
                lastUpdated: '2024-01-15T13:00:00Z'
            },
            yelp: {
                rating: 4.5,
                reviewCount: 78,
                platformUrl: 'https://yelp.com/biz/spice-garden-indian',
                lastUpdated: '2024-01-15T12:45:00Z'
            }
        },
        features: [
            { name: RestaurantFeatures.DELIVERY, available: true },
            { name: RestaurantFeatures.TAKEOUT, available: true },
            { name: RestaurantFeatures.WIFI, available: true },
            { name: RestaurantFeatures.CREDIT_CARDS, available: true }
        ],
        coordinate: {
            latitude: 40.7589,
            longitude: -73.9851
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T13:00:00Z'
    },
    {
        id: '5',
        name: 'Le Petit Bistro',
        address: '654 Madison Avenue',
        city: 'New York',
        state: 'NY',
        zipCode: '10005',
        phone: '(555) 345-6789',
        website: 'https://lepetitbistro.com',
        cuisineType: ['French', 'European'],
        priceRange: 4,
        imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400',
        photos: [
            'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400',
            'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400'
        ],
        overallRating: 4.6,
        totalReviews: 289,
        ratings: {
            google: {
                rating: 4.5,
                reviewCount: 134,
                platformUrl: 'https://google.com/maps/place/le-petit-bistro',
                lastUpdated: '2024-01-15T14:00:00Z'
            },
            yelp: {
                rating: 4.7,
                reviewCount: 155,
                platformUrl: 'https://yelp.com/biz/le-petit-bistro',
                lastUpdated: '2024-01-15T13:30:00Z'
            }
        },
        features: [
            { name: RestaurantFeatures.RESERVATIONS, available: true },
            { name: RestaurantFeatures.OUTDOOR_SEATING, available: true },
            { name: RestaurantFeatures.ALCOHOL, available: true },
            { name: RestaurantFeatures.CREDIT_CARDS, available: true }
        ],
        coordinate: {
            latitude: 40.7549,
            longitude: -73.9840
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T14:00:00Z'
    }
];

export const mockReviews: Review[] = [
    {
        id: 'r1',
        restaurantId: '1',
        platform: ReviewPlatform.GOOGLE,
        rating: 5,
        title: 'Amazing Italian Experience!',
        content: 'Had an incredible dinner here last night. The pasta was perfectly cooked and the ambiance was romantic. Staff was very attentive and knowledgeable about the wine selection.',
        author: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e96d?w=60',
            reviewCount: 23,
            isVerified: true
        },
        date: '2024-01-10T19:30:00Z',
        helpful: 12,
        photos: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300'],
        platformUrl: 'https://google.com/maps/reviews/r1',
        platformReviewId: 'google_r1',
        createdAt: '2024-01-10T19:30:00Z',
        updatedAt: '2024-01-10T19:30:00Z'
    },
    {
        id: 'r2',
        restaurantId: '1',
        platform: ReviewPlatform.YELP,
        rating: 4,
        content: 'Great food and service. The tiramisu is a must-try! Only complaint is that it can get quite noisy during peak hours.',
        author: {
            name: 'Mike Chen',
            reviewCount: 87,
            isVerified: true
        },
        date: '2024-01-08T20:15:00Z',
        helpful: 8,
        platformUrl: 'https://yelp.com/biz/bella-vista-italian/reviews/r2',
        platformReviewId: 'yelp_r2',
        createdAt: '2024-01-08T20:15:00Z',
        updatedAt: '2024-01-08T20:15:00Z'
    },
    {
        id: 'r3',
        restaurantId: '2',
        platform: ReviewPlatform.GOOGLE,
        rating: 5,
        title: 'Best Sushi in the City',
        content: 'Absolutely fresh fish and expertly crafted rolls. The chef clearly knows what they\'re doing. Worth every penny for the omakase experience.',
        author: {
            name: 'Emily Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60',
            reviewCount: 45,
            isVerified: true
        },
        date: '2024-01-12T21:00:00Z',
        helpful: 15,
        platformUrl: 'https://google.com/maps/reviews/r3',
        platformReviewId: 'google_r3',
        createdAt: '2024-01-12T21:00:00Z',
        updatedAt: '2024-01-12T21:00:00Z'
    }
];

// Mock search function
export const searchRestaurants = async (params: any): Promise<SearchResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let filteredRestaurants = [...mockRestaurants];

    // Filter by query (restaurant name or cuisine)
    if (params.query) {
        const query = params.query.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(query) ||
            restaurant.cuisineType.some(cuisine => cuisine.toLowerCase().includes(query))
        );
    }

    // Filter by location (simple city match for mock data)
    if (params.location) {
        const location = params.location.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
            restaurant.city.toLowerCase().includes(location) ||
            restaurant.address.toLowerCase().includes(location)
        );
    }

    return {
        restaurants: filteredRestaurants,
        totalCount: filteredRestaurants.length,
        hasMore: false,
        searchParams: params
    };
};

export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRestaurants.find(restaurant => restaurant.id === id) || null;
};

export const getRestaurantReviews = async (restaurantId: string): Promise<Review[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockReviews.filter(review => review.restaurantId === restaurantId);
}; 