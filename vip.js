// This file holds the data for the "VIP" page.
// We are using placeholder images from placehold.co with a different color.
// FIX: Changed all string IDs (e.g., 'vip1') to unique integer IDs (e.g., 11)

const vipProducts = [
    { 
        id: 11, // 'vip1'
        name: 'CASPERVIP1', 
        price: 500000, 
        total_return: 600000, 
        duration: 30,
        itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPERVIP1'
    },
    { 
        id: 12, // 'vip2'
        name: 'CASPERVIP2', 
        price: 1000000, 
        total_return: 1200000, 
        duration: 30,
        itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPERVIP2'
    },
    { 
        id: 13, // 'vip3'
        name: 'CASPER3', 
        price: 2000000, 
        total_return: 2400000, 
        duration: 30,
        itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER3'
    },
    { 
        id: 14, // 'vip4'
        name: 'CASPER4', 
        price: 3000000, 
        total_return: 3600000, 
        duration: 30,
        itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER4'
    }
];

export default vipProducts;
