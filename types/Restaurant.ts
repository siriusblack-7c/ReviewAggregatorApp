export interface Restaurant {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone?: string;
    website?: string;
    cuisineType: string[];
    priceRange: 1 | 2 | 3 | 4; // $ to $$$$
    imageUrl?: string;
    photos: string[];

    // Aggregated ratings
    overallRating: number;
    totalReviews: number;

    // Platform-specific ratings
    ratings: {
        google?: PlatformRating;
        yelp?: PlatformRating;
        openTable?: PlatformRating;
        tripadvisor?: PlatformRating;
    };

    // Restaurant details
    hours?: OpeningHours;
    features: RestaurantFeature[];
    coordinate: {
        latitude: number;
        longitude: number;
    };

    // Meta information
    createdAt: string;
    updatedAt: string;
}

export interface PlatformRating {
    rating: number;
    reviewCount: number;
    platformUrl: string;
    lastUpdated: string;
}

export interface OpeningHours {
    monday?: DayHours;
    tuesday?: DayHours;
    wednesday?: DayHours;
    thursday?: DayHours;
    friday?: DayHours;
    saturday?: DayHours;
    sunday?: DayHours;
}

export interface DayHours {
    open: string; // e.g., "09:00"
    close: string; // e.g., "22:00"
    closed?: boolean;
}

export interface RestaurantFeature {
    name: string;
    available: boolean;
    description?: string;
}

// Common features
export enum RestaurantFeatures {
    DELIVERY = 'delivery',
    TAKEOUT = 'takeout',
    RESERVATIONS = 'reservations',
    OUTDOOR_SEATING = 'outdoor_seating',
    WIFI = 'wifi',
    PARKING = 'parking',
    WHEELCHAIR_ACCESSIBLE = 'wheelchair_accessible',
    CREDIT_CARDS = 'credit_cards',
    ALCOHOL = 'alcohol',
    KIDS_FRIENDLY = 'kids_friendly'
}

// For search functionality
export interface SearchParams {
    query?: string;
    location?: string;
    cuisineType?: string[];
    priceRange?: number[];
    rating?: number;
    features?: string[];
    sortBy?: 'relevance' | 'rating' | 'distance' | 'price';
    limit?: number;
    offset?: number;
}

export interface SearchResult {
    restaurants: Restaurant[];
    totalCount: number;
    hasMore: boolean;
    searchParams: SearchParams;
} 