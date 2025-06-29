// ------------------------------------------------------------------
// FILE: src/data/seedData.js
// DESC: (PERMANENT FIX) Updated to use reliable, locally-hosted images.
// ------------------------------------------------------------------
export const seedData = {
    portfolio: [
        { id: 'ALPHA_MALL_P12', projectName: 'AlphaOne Mall, Ahmedabad', panelId: 'ALPHA-P12', investment: 32000, status: 'Active', dailyGeneration: [ { hour: '08:00', value: 50 }, { hour: '10:00', value: 250 }, { hour: '12:00', value: 450 }, { hour: '14:00', value: 380 }, { hour: '16:00', value: 220 }, { hour: '18:00', value: 40 } ], totalSavings: 4850.50, lifetimeGeneration: 646.7, roi: 15.16 },
        { id: 'SHANTI_P07', projectName: 'Shanti Enclave, Ahmedabad', panelId: 'SHANTI-P07', investment: 32000, status: 'Active', dailyGeneration: [ { hour: '08:00', value: 45 }, { hour: '10:00', value: 240 }, { hour: '12:00', value: 430 }, { hour: '14:00', value: 370 }, { hour: '16:00', value: 210 }, { hour: '18:00', value: 35 } ], totalSavings: 5210.25, lifetimeGeneration: 694.7, roi: 16.28 },
    ],
    marketplace: [
        { id: 'GALAXY_HIGHRISE', name: 'Galaxy Highrise, Mumbai', city: 'Mumbai', totalCapacity: 250, availableShares: 150, sharePrice: 33000, expectedRoi: 14.5, status: 'available', description: "Prime commercial rooftop in the heart of Mumbai's business district. High sun exposure and professionally managed.", imageUrl: "/images/galaxy-highrise.jpg" },
        { id: 'PINNACLE_PLAZA', name: 'Pinnacle Plaza, Pune', city: 'Pune', totalCapacity: 400, availableShares: 220, sharePrice: 32500, expectedRoi: 15.0, status: 'available', description: "A large-scale installation on a modern IT park, offering stable returns and high-quality Tier-1 panels.", imageUrl: "/images/pinnacle-plaza.jpg" },
        { id: 'SURYA_WAREHOUSE', name: 'Surya Warehouse, Ahmedabad', city: 'Ahmedabad', totalCapacity: 1000, availableShares: 50, sharePrice: 31500, expectedRoi: 16.5, status: 'available', description: "Massive warehouse complex on the outskirts of Ahmedabad. One of our largest projects with excellent generation potential.", imageUrl: "/images/surya-warehouse.jpg" },
        { id: 'ECO_LOGISTICS', name: 'Eco Logistics Park, Surat', city: 'Surat', totalCapacity: 800, availableShares: 450, sharePrice: 32000, expectedRoi: 15.8, status: 'available', description: "State-of-the-art logistics park committed to green energy. A reliable project with long-term viability.", imageUrl: "/images/eco-logistics.jpg" },
    ]
};
