// User access configuration file - similar to application.properties in Java

// Define access levels for each user and module type
export const userAccessConfig = {
    // Free tier users (not logged in)
    anonymous: {
        video: 2, // Can access lessons 1-2
        iambic: 1, // Can access lesson 1
        anapestic: 1, // Can access lesson 1
        trochaic: 1, // Can access lesson 1
        dactylic: 1, // Can access lesson 1
    },

    // Individual user configurations
    // Add users here with their username and access levels
    john_doe: {
        video: 5, // Paid for 5 video lessons
        iambic: 3, // Paid for 3 iambic lessons
        anapestic: 2, // Paid for 2 anapestic lessons
        trochaic: 2, // Paid for 2 trochaic lessons
        dactylic: 3, // Paid for 3 dactylic lessons
    },

    jane_smith: {
        video: 11, // Full access - premium subscriber
        iambic: 8, // Full access
        anapestic: 5, // Full access
        trochaic: 9, // Full access
        dactylic: 10, // Full access
    },

    student1: {
        video: 3, // Student discount - 3 lessons
        iambic: 2, // 2 lessons
        anapestic: 1, // 1 lesson
        trochaic: 1, // 1 lesson
        dactylic: 2, // 2 lessons
    },

    // You can add subscription tiers
    basic_subscriber: {
        video: 6, // Basic tier
        iambic: 4,
        anapestic: 3,
        trochaic: 3,
        dactylic: 4,
    },

    premium_subscriber: {
        video: 11, // Premium tier - full access
        iambic: 8,
        anapestic: 5,
        trochaic: 9,
        dactylic: 10,
    },

    "michaelyn": {
        video: 11, // Premium tier - full access
        iambic: 8,
        anapestic: 5,
        trochaic: 9,
        dactylic: 10,
    },

    "hemmanngale2@gmail.com": {
        video: 11, // Premium tier - full access
        iambic: 8,
        anapestic: 5,
        trochaic: 9,
        dactylic: 10,
    },

    "kmserwe@gmail.com": {
        video: 11, // Premium tier - full access
        iambic: 8,
        anapestic: 5,
        trochaic: 9,
        dactylic: 10,
    },

    "pratibha.kelapure@gmail.com": {
        video: 11, // Premium tier - full access
        iambic: 8,
        anapestic: 5,
        trochaic: 9,
        dactylic: 10,
    },

    "rasmahaidri@pm.me": {
        video: 11, // Premium tier - full access
        iambic: 8,
        anapestic: 5,
        trochaic: 9,
        dactylic: 10,
    },

    "sanya@monica.in": {
        video: 11, // Premium tier - full access
        iambic: 8,
        anapestic: 5,
        trochaic: 9,
        dactylic: 10,
    },


    // You can also use email addresses if that's what your usernames are
    "user@example.com": {
        video: 4,
        iambic: 3,
        anapestic: 2,
        trochaic: 2,
        dactylic: 3,
    },

    "lydiwinn@gmail.com": {
        video: 11,
        iambic: 1,
        anapestic: 1,
        trochaic: 1,
        dactylic: 10,
    },

    // Default for authenticated users who aren't specifically configured
    default_authenticated: {
        video: 3, // Default access level
        iambic: 2,
        anapestic: 2,
        trochaic: 2,
        dactylic: 2,
    },
}

// Helper functions for access control
export const getUserAccessLevel = (username, moduleType, isAuthenticated) => {
    if (!isAuthenticated || !username) {
        return userAccessConfig.anonymous[moduleType] || 1
    }

    if (userAccessConfig[username]) {
        return userAccessConfig[username][moduleType] || 1
    }

    return userAccessConfig.default_authenticated[moduleType] || 1
}

export const canUserAccessLesson = (username, moduleType, lessonNumber, isAuthenticated) => {
    const accessLevel = getUserAccessLevel(username, moduleType, isAuthenticated)
    return lessonNumber <= accessLevel
}

// Function to get all accessible lessons for a user
export const getUserAccessibleLessons = (username, moduleType, isAuthenticated) => {
    const accessLevel = getUserAccessLevel(username, moduleType, isAuthenticated)
    return Array.from({ length: accessLevel }, (_, i) => i + 1)
}

// Function to check if user has full access to a module
export const hasFullAccess = (username, moduleType, totalLessons, isAuthenticated) => {
    const accessLevel = getUserAccessLevel(username, moduleType, isAuthenticated)
    return accessLevel >= totalLessons
}
