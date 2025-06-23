export interface Review {
    id: string;
    restaurantId: string;
    platform: ReviewPlatform;

    // Review content
    rating: number;
    title?: string;
    content: string;

    // Author information
    author: {
        name: string;
        avatar?: string;
        reviewCount?: number;
        isVerified?: boolean;
    };

    // Review metadata
    date: string;
    helpful?: number;
    photos?: string[];

    // Platform-specific data
    platformUrl: string;
    platformReviewId: string;

    // Meta information
    createdAt: string;
    updatedAt: string;
}

export enum ReviewPlatform {
    GOOGLE = 'google',
    YELP = 'yelp',
    OPENTABLE = 'opentable',
    TRIPADVISOR = 'tripadvisor'
}

export interface ReviewSummary {
    platform: ReviewPlatform;
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    recentReviews: Review[];
}

export interface AggregatedReviews {
    restaurantId: string;
    overallRating: number;
    totalReviews: number;
    platformSummaries: ReviewSummary[];
    recentReviews: Review[];
    topReviews: Review[];
} 