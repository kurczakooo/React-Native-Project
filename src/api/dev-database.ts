import { DatabaseUser, Workout, PredefinedExercise, WorkoutExercise, WorkoutSet } from '../types';

interface DevApiEndpoints {
    users: DatabaseUser[];
    workouts: Workout[];
    exercises: WorkoutExercise[];
    sets: WorkoutSet[];
    'predefined-exercises': PredefinedExercise[];
}

export const endpoints: DevApiEndpoints = {
    users: [
        {
            id: 'u0',
            username: 'admin',
            password: 'admin'
        }
    ],
    workouts: [],
    exercises: [],
    sets: [],
    'predefined-exercises': [
        {
            id: 'e1',
            name: 'Push-Up',
            primaryMuscle: 'chest',
            level: 'beginner',
            force: 'push',
            mechanic: 'compound',
            instructions: [
                'Start in a high plank position with your hands directly under your shoulders.',
                'Lower your body until your chest nearly touches the floor.',
                'Push yourself back up to the starting position.',
                'Keep your body straight and core engaged throughout.'
            ]
        },
        {
            id: 'e2',
            name: 'Deadlift',
            primaryMuscle: 'hamstrings',
            level: 'expert',
            force: 'pull',
            mechanic: 'compound',
            instructions: [
                'Stand with your feet hip-width apart and the barbell on the floor in front of you.',
                'Bend at your hips and knees, keeping your back straight as you grab the barbell with both hands.',
                'Drive through your heels to lift the barbell, extending your hips and knees until you stand upright.',
                'Lower the barbell back to the ground with control.'
            ]
        },
        {
            id: 'e3',
            name: 'Plank',
            primaryMuscle: 'abdominals',
            level: 'beginner',
            force: 'static',
            mechanic: 'isolation',
            instructions: [
                'Begin in a forearm plank position with your elbows directly under your shoulders.',
                'Engage your core and keep your body in a straight line from head to toes.',
                'Hold the position for the desired duration without letting your hips sag or rise.'
            ]
        },
        {
            id: 'e4',
            name: 'Barbell Squat',
            primaryMuscle: 'quadriceps',
            level: 'expert',
            force: 'push',
            mechanic: 'compound',
            instructions: [
                'Stand with your feet shoulder-width apart, the barbell resting across your shoulders.',
                'Lower your body by bending your knees and pushing your hips back as if sitting in a chair.',
                'Keep your chest up and spine neutral.',
                'Return to the starting position by driving through your heels.'
            ]
        },
        {
            id: 'e5',
            name: 'Pull-Up',
            primaryMuscle: 'lats',
            level: 'intermediate',
            force: 'pull',
            mechanic: 'compound',
            instructions: [
                'Grip the pull-up bar with your palms facing away and hands shoulder-width apart.',
                'Pull your body up until your chin is above the bar.',
                'Lower yourself back down with control to the starting position.'
            ]
        },
        {
            id: 'e6',
            name: 'Bicep Curl',
            primaryMuscle: 'biceps',
            level: 'beginner',
            force: 'pull',
            mechanic: 'isolation',
            instructions: [
                'Hold a dumbbell in each hand with your arms fully extended and palms facing forward.',
                'Curl the weights up towards your shoulders, keeping your elbows close to your body.',
                'Lower the weights back to the starting position with control.'
            ]
        },
        {
            id: 'e7',
            name: 'Calf Raise',
            primaryMuscle: 'calves',
            level: 'beginner',
            force: 'push',
            mechanic: 'isolation',
            instructions: [
                'Stand with your feet hip-width apart and your toes pointing forward.',
                'Raise your heels off the ground, standing on the balls of your feet.',
                'Slowly lower your heels back to the starting position.'
            ]
        },
        {
            id: 'e8',
            name: 'Arnold Press',
            primaryMuscle: 'shoulders',
            level: 'intermediate',
            force: 'push',
            mechanic: 'compound',
            instructions: [
                'Hold a dumbbell in each hand at shoulder height with your palms facing your body.',
                'Press the dumbbells overhead while rotating your palms outward.',
                'Reverse the motion to return to the starting position.'
            ]
        },
        {
            id: 'e9',
            name: 'Russian Twist',
            primaryMuscle: 'abdominals',
            level: 'intermediate',
            force: 'static',
            mechanic: 'isolation',
            instructions: [
                'Sit on the ground with your knees bent and feet off the floor.',
                'Lean back slightly and twist your torso to one side, touching the ground with your hands.',
                'Twist to the other side and repeat.'
            ]
        },
        {
            id: 'e10',
            name: 'Bench Press',
            primaryMuscle: 'chest',
            level: 'expert',
            force: 'push',
            mechanic: 'compound',
            instructions: [
                'Lie on a flat bench with a barbell racked above you.',
                'Grip the barbell slightly wider than shoulder-width apart.',
                'Lower the barbell to your chest, then press it back to the starting position.'
            ]
        },
        {
            id: 'e11',
            name: 'Bent-Over Row',
            primaryMuscle: 'middle back',
            level: 'expert',
            force: 'pull',
            mechanic: 'compound',
            instructions: [
                'Hold a barbell with an overhand grip and bend at your hips until your torso is nearly parallel to the ground.',
                'Pull the barbell towards your lower chest, keeping your elbows close to your body.',
                'Lower the barbell back to the starting position.'
            ]
        },
        {
            id: 'e12',
            name: 'Overhead Tricep Extension',
            primaryMuscle: 'triceps',
            level: 'intermediate',
            force: 'push',
            mechanic: 'isolation',
            instructions: [
                'Hold a dumbbell with both hands and lift it overhead, fully extending your arms.',
                'Lower the dumbbell behind your head by bending your elbows.',
                'Press the dumbbell back up to the starting position.'
            ]
        },
        {
            id: 'e13',
            name: 'Hip Thrust',
            primaryMuscle: 'glutes',
            level: 'intermediate',
            force: 'push',
            mechanic: 'compound',
            instructions: [
                'Sit on the ground with your upper back against a bench and a barbell over your hips.',
                'Drive through your heels to lift your hips until your thighs are parallel to the ground.',
                'Lower your hips back to the starting position.'
            ]
        },
        {
            id: 'e14',
            name: 'Face Pull',
            primaryMuscle: 'traps',
            level: 'beginner',
            force: 'pull',
            mechanic: 'isolation',
            instructions: [
                'Set a cable machine at head height and attach a rope handle.',
                'Pull the rope towards your face, flaring your elbows outward.',
                'Slowly return to the starting position.'
            ]
        },
        {
            id: 'e15',
            name: 'Farmer’s Carry',
            primaryMuscle: 'forearms',
            level: 'beginner',
            force: 'static',
            mechanic: 'compound',
            instructions: [
                'Hold a heavy dumbbell in each hand and stand tall.',
                'Walk forward while keeping your core engaged and shoulders back.',
                'Continue for the desired distance or time.'
            ]
        },
        {
            id: 'e16',
            name: 'Good Morning',
            primaryMuscle: 'lower back',
            level: 'intermediate',
            force: 'pull',
            mechanic: 'compound',
            instructions: [
                'Hold a barbell across your shoulders and stand with your feet shoulder-width apart.',
                'Hinge at your hips to lower your torso, keeping your back straight.',
                'Return to the starting position by engaging your lower back and glutes.'
            ]
        },
        {
            id: 'e17',
            name: 'Leg Curl',
            primaryMuscle: 'hamstrings',
            level: 'beginner',
            force: 'pull',
            mechanic: 'isolation',
            instructions: [
                'Lie face down on a leg curl machine and position your ankles under the pad.',
                'Curl your legs towards your glutes as far as possible.',
                'Slowly lower the pad back to the starting position.'
            ]
        },
        {
            id: 'e18',
            name: 'Lateral Raise',
            primaryMuscle: 'shoulders',
            level: 'intermediate',
            force: 'push',
            mechanic: 'isolation',
            instructions: [
                'Hold a dumbbell in each hand and stand with your arms by your sides.',
                'Raise the dumbbells out to the sides until they are at shoulder height.',
                'Lower the dumbbells back to the starting position.'
            ]
        },
        {
            id: 'e19',
            name: 'Step-Up',
            primaryMuscle: 'quadriceps',
            level: 'intermediate',
            force: 'push',
            mechanic: 'compound',
            instructions: [
                'Stand in front of a bench or step with a dumbbell in each hand.',
                'Step onto the bench with one foot, driving through your heel to lift your body.',
                'Step down with control and repeat with the other leg.'
            ]
        },
        {
            id: 'e20',
            name: 'Shrug',
            primaryMuscle: 'traps',
            level: 'beginner',
            force: 'pull',
            mechanic: 'isolation',
            instructions: [
                'Hold a dumbbell in each hand with your arms hanging at your sides.',
                'Keep your shoulders relaxed and your arms straight.',
                'Lift (shrug) your shoulders as high as possible towards your ears.',
                'Pause at the top of the movement, then slowly lower your shoulders back to the starting position.',
                'Avoid using momentum or bending your elbows during the exercise.'
            ]
        }
    ]
};
