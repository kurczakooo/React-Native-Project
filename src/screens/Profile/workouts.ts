import { Workout } from 'src/types';

const workouts: Workout[] = [
    {
        id: 'w0',
        userId: 'u0',
        title: 'First workout',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1733002073, // 2 weeks ago
        totalDuration: 3600,
        totalSets: 12,
        totalVolume: 8500,
        targetMuscles: [
            { muscleName: 'shoulders', numberOfSets: 6 },
            { muscleName: 'chest', numberOfSets: 6 }
        ]
    },
    {
        id: 'w1',
        userId: 'u0',
        title: 'Push Day',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1732397273, // 3 weeks ago
        totalDuration: 4200,
        totalSets: 15,
        totalVolume: 9500,
        targetMuscles: [
            { muscleName: 'triceps', numberOfSets: 5 },
            { muscleName: 'chest', numberOfSets: 5 },
            { muscleName: 'shoulders', numberOfSets: 5 }
        ]
    },
    {
        id: 'w2',
        userId: 'u0',
        title: 'Leg Workout',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731792473, // 4 weeks ago
        totalDuration: 4800,
        totalSets: 18,
        totalVolume: 12000,
        targetMuscles: [
            { muscleName: 'quadriceps', numberOfSets: 6 },
            { muscleName: 'hamstrings', numberOfSets: 6 },
            { muscleName: 'glutes', numberOfSets: 6 }
        ]
    },
    {
        id: 'w3',
        userId: 'u0',
        title: 'Pull Day',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731187673, // 5 weeks ago
        totalDuration: 3600,
        totalSets: 10,
        totalVolume: 7200,
        targetMuscles: [
            { muscleName: 'lats', numberOfSets: 4 },
            { muscleName: 'middle back', numberOfSets: 3 },
            { muscleName: 'biceps', numberOfSets: 3 }
        ]
    },
    {
        id: 'w4',
        userId: 'u0',
        title: 'Core Focus',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1730582873, // 6 weeks ago
        totalDuration: 3000,
        totalSets: 8,
        totalVolume: 4500,
        targetMuscles: [
            { muscleName: 'abdominals', numberOfSets: 4 },
            { muscleName: 'lower back', numberOfSets: 4 }
        ]
    },
    {
        id: 'w5',
        userId: 'u0',
        title: 'Shoulder and Chest Burn',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1733606873, // 1 week ago
        totalDuration: 3300,
        totalSets: 10,
        totalVolume: 7800,
        targetMuscles: [
            { muscleName: 'shoulders', numberOfSets: 5 },
            { muscleName: 'chest', numberOfSets: 5 }
        ]
    },
    {
        id: 'w6',
        userId: 'u0',
        title: 'Leg Strength Session',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1733614073, // 1 week ago (slightly offset)
        totalDuration: 4200,
        totalSets: 14,
        totalVolume: 10500,
        targetMuscles: [
            { muscleName: 'quadriceps', numberOfSets: 5 },
            { muscleName: 'hamstrings', numberOfSets: 5 },
            { muscleName: 'glutes', numberOfSets: 4 }
        ]
    },
    {
        id: 'w7',
        userId: 'u0',
        title: 'Back and Biceps Focus',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1733002073, // 2 weeks ago
        totalDuration: 3600,
        totalSets: 12,
        totalVolume: 8600,
        targetMuscles: [
            { muscleName: 'lats', numberOfSets: 6 },
            { muscleName: 'biceps', numberOfSets: 6 }
        ]
    },
    {
        id: 'w8',
        userId: 'u0',
        title: 'Core and Stability',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1732397273, // 3 weeks ago
        totalDuration: 3000,
        totalSets: 9,
        totalVolume: 5000,
        targetMuscles: [
            { muscleName: 'abdominals', numberOfSets: 5 },
            { muscleName: 'lower back', numberOfSets: 4 }
        ]
    },
    {
        id: 'w9',
        userId: 'u0',
        title: 'Triceps and Shoulders Power',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1732404473, // 3 weeks ago (slightly offset)
        totalDuration: 3700,
        totalSets: 11,
        totalVolume: 7600,
        targetMuscles: [
            { muscleName: 'triceps', numberOfSets: 5 },
            { muscleName: 'shoulders', numberOfSets: 6 }
        ]
    },
    {
        id: 'w10',
        userId: 'u0',
        title: 'Leg Burnout',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731792473, // 4 weeks ago
        totalDuration: 4400,
        totalSets: 16,
        totalVolume: 11000,
        targetMuscles: [
            { muscleName: 'quadriceps', numberOfSets: 8 },
            { muscleName: 'hamstrings', numberOfSets: 8 }
        ]
    },
    {
        id: 'w11',
        userId: 'u0',
        title: 'Pull Day - Advanced',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731187673, // 5 weeks ago
        totalDuration: 3900,
        totalSets: 13,
        totalVolume: 8800,
        targetMuscles: [
            { muscleName: 'lats', numberOfSets: 4 },
            { muscleName: 'middle back', numberOfSets: 5 },
            { muscleName: 'biceps', numberOfSets: 4 }
        ]
    },
    {
        id: 'w12',
        userId: 'u0',
        title: 'Push Day - Intensity',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731194873, // 5 weeks ago (slightly offset)
        totalDuration: 4300,
        totalSets: 15,
        totalVolume: 9600,
        targetMuscles: [
            { muscleName: 'chest', numberOfSets: 5 },
            { muscleName: 'shoulders', numberOfSets: 5 },
            { muscleName: 'triceps', numberOfSets: 5 }
        ]
    },
    {
        id: 'w13',
        userId: 'u0',
        title: 'Full Body Blast',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1734211273, // this week
        totalDuration: 5400,
        totalSets: 15,
        totalVolume: 13000,
        targetMuscles: [
            { muscleName: 'chest', numberOfSets: 5 },
            { muscleName: 'quadriceps', numberOfSets: 5 },
            { muscleName: 'biceps', numberOfSets: 5 }
        ]
    },
    {
        id: 'w14',
        userId: 'u0',
        title: 'Upper Body Strength',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1734297673, // this week
        totalDuration: 4800,
        totalSets: 15,
        totalVolume: 11000,
        targetMuscles: [
            { muscleName: 'shoulders', numberOfSets: 5 },
            { muscleName: 'triceps', numberOfSets: 5 },
            { muscleName: 'chest', numberOfSets: 5 }
        ]
    },
    {
        id: 'w15',
        userId: 'u0',
        title: 'Lower Body Power',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1734384073, // this week
        totalDuration: 4500,
        totalSets: 14,
        totalVolume: 11500,
        targetMuscles: [
            { muscleName: 'quadriceps', numberOfSets: 6 },
            { muscleName: 'glutes', numberOfSets: 5 },
            { muscleName: 'hamstrings', numberOfSets: 3 }
        ]
    }
];

export default workouts;
