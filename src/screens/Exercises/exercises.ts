import { PredefinedExercise } from 'src/types';
const exercises: PredefinedExercise[] = [
    {
        id: 'e12',
        name: 'Alternate Leg Diagonal Bound',
        primaryMuscle: 'quadriceps',
        level: 'beginner',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'Assume a comfortable stance with one foot slightly in front of the other.',
            'Begin by pushing off with the front leg, driving the opposite knee forward and as high as possible before landing. Attempt to cover as much distance to each side with each bound.',
            'It may help to use a line on the ground to guage distance from side to side.',
            'Repeat the sequence with the other leg.'
        ]
    },
    {
        id: 'e13',
        name: 'Alternating Cable Shoulder Press',
        primaryMuscle: 'shoulders',
        level: 'beginner',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'Move the cables to the bottom of the tower and select an appropriate weight.',
            'Grasp the cables and hold them at shoulder height, palms facing forward. This will be your starting position.',
            'Keeping your head and chest up, extend through the elbow to press one side directly over head.',
            'After pausing at the top, return to the starting position and repeat on the opposite side.'
        ]
    },
    {
        id: 'e14',
        name: 'Alternating Deltoid Raise',
        primaryMuscle: 'shoulders',
        level: 'beginner',
        force: 'push',
        mechanic: 'isolation',
        instructions: [
            'In a standing position, hold a pair of dumbbells at your side.',
            'Keeping your elbows slightly bent, raise the weights directly in front of you to shoulder height, avoiding any swinging or cheating.',
            'Return the weights to your side.',
            'On the next repetition, raise the weights laterally, raising them out to your side to about shoulder height.',
            'Return the weights to the starting position and continue alternating to the front and side.'
        ]
    },
    {
        id: 'e15',
        name: 'Alternating Floor Press',
        primaryMuscle: 'chest',
        level: 'beginner',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'Lie on the floor with two kettlebells next to your shoulders.',
            'Position one in place on your chest and then the other, gripping the kettlebells on the handle with the palms facing forward.',
            'Extend both arms, so that the kettlebells are being held above your chest. Lower one kettlebell, bringing it to your chest and turn the wrist in the direction of the locked out kettlebell.',
            'Raise the kettlebell and repeat on the opposite side.'
        ]
    },
    {
        id: 'e16',
        name: 'Alternating Hang Clean',
        primaryMuscle: 'hamstrings',
        level: 'intermediate',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Place two kettlebells between your feet. To get in the starting position, push your butt back and look straight ahead.',
            'Clean one kettlebell to your shoulder and hold on to the other kettlebell in a hanging position. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards your shoulders. Rotate your wrist as you do so.',
            'Lower the cleaned kettlebell to a hanging position and clean the alternate kettlebell. Repeat.'
        ]
    },
    {
        id: 'e17',
        name: 'Alternating Kettlebell Press',
        primaryMuscle: 'shoulders',
        level: 'intermediate',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you pull the kettlebells towards your shoulders. Rotate your wrists as you do so.',
            'Press one directly overhead by extending through the elbow, turning it so the palm faces forward while holding the other kettlebell stationary .',
            'Lower the pressed kettlebell to the starting position and immediately press with your other arm.'
        ]
    },
    {
        id: 'e18',
        name: 'Alternating Kettlebell Row',
        primaryMuscle: 'middle back',
        level: 'intermediate',
        force: 'pull',
        mechanic: 'isolation',
        instructions: [
            'Place two kettlebells in front of your feet. Bend your knees slightly and push your butt out as much as possible. As you bend over to get into the starting position grab both kettlebells by the handles.',
            'Pull one kettlebell off of the floor while holding on to the other kettlebell. Retract the shoulder blade of the working side, as you flex the elbow, drawing the kettlebell towards your stomach or rib cage.',
            'Lower the kettlebell in the working arm and repeat with your other arm.'
        ]
    },
    {
        id: 'e19',
        name: 'Alternating Renegade Row',
        primaryMuscle: 'middle back',
        level: 'expert',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Place two kettlebells on the floor about shoulder width apart. Position yourself on your toes and your hands as though you were doing a pushup, with the body straight and extended. Use the handles of the kettlebells to support your upper body. You may need to position your feet wide for support.',
            'Push one kettlebell into the floor and row the other kettlebell, retracting the shoulder blade of the working side as you flex the elbow, pulling it to your side.',
            'Then lower the kettlebell to the floor and begin the kettlebell in the opposite hand. Repeat for several reps.'
        ]
    },
    {
        id: 'e20',
        name: 'Ankle Circles',
        primaryMuscle: 'calves',
        level: 'beginner',
        force: 'pull',
        mechanic: 'isolation',
        instructions: [
            'Use a sturdy object like a squat rack to hold yourself.',
            'Lift the right leg in the air (just around 2 inches from the floor) and perform a circular motion with the big toe. Pretend that you are drawing a big circle with it. Tip: One circle equals 1 repetition. Breathe normally as you perform the movement.',
            'When you are done with the right foot, then repeat with the left leg.'
        ]
    },
    {
        id: 'e21',
        name: 'Ankle On The Knee',
        primaryMuscle: 'glutes',
        level: 'beginner',
        force: 'static',
        mechanic: 'mixed',
        instructions: [
            'From a lying position, bend your knees and keep your feet on the floor.',
            'Place your ankle of one foot on your opposite knee.',
            'Grasp the thigh or knee of the bottom leg and pull both of your legs into the chest. Relax your neck and shoulders. Hold for 10-20 seconds and then switch sides.'
        ]
    },
    {
        id: 'e22',
        name: 'Anterior Tibialis-SMR',
        primaryMuscle: 'calves',
        level: 'intermediate',
        force: 'static',
        mechanic: 'mixed',
        instructions: [
            'Begin seated on the ground with your legs bent and your feet on the floor.',
            'Using a Muscle Roller or a rolling pin, apply pressure to the muscles on the outside of your shins. Work from just below the knee to above the ankle, pausing at points of tension for 10-30 seconds. Repeat on the other leg.'
        ]
    },
    {
        id: 'e23',
        name: 'Anti-Gravity Press',
        primaryMuscle: 'shoulders',
        level: 'beginner',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'Place a bar on the ground behind the head of an incline bench.',
            'Lay on the bench face down. With a pronated grip, pick the barbell up from the floor. Flex the elbows, performing a reverse curl to bring the bar near your chest. This will be your starting position.',
            'To begin, press the barbell out in front of your head by extending your elbows. Keep your arms parallel to the ground throughout the movement.',
            'Return to the starting position and repeat to complete the set.'
        ]
    },
    {
        id: 'e24',
        name: 'Arm Circles',
        primaryMuscle: 'shoulders',
        level: 'beginner',
        force: 'push',
        mechanic: 'isolation',
        instructions: [
            'Stand up and extend your arms straight out by the sides. The arms should be parallel to the floor and perpendicular (90-degree angle) to your torso. This will be your starting position.',
            'Slowly start to make circles of about 1 foot in diameter with each outstretched arm. Breathe normally as you perform the movement.',
            'Continue the circular motion of the outstretched arms for about ten seconds. Then reverse the movement, going the opposite direction.'
        ]
    },
    {
        id: 'e25',
        name: 'Arnold Dumbbell Press',
        primaryMuscle: 'shoulders',
        level: 'intermediate',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'Sit on an exercise bench with back support and hold two dumbbells in front of you at about upper chest level with your palms facing your body and your elbows bent. Tip: Your arms should be next to your torso. The starting position should look like the contracted portion of a dumbbell curl.',
            'Now to perform the movement, raise the dumbbells as you rotate the palms of your hands until they are facing forward.',
            'Continue lifting the dumbbells until your arms are extended above you in straight arm position. Breathe out as you perform this portion of the movement.',
            'After a second pause at the top, begin to lower the dumbbells to the original position by rotating the palms of your hands towards you. Tip: The left arm will be rotated in a counter clockwise manner while the right one will be rotated clockwise. Breathe in as you perform this portion of the movement.',
            'Repeat for the recommended amount of repetitions.'
        ]
    },
    {
        id: 'e26',
        name: 'Around The Worlds',
        primaryMuscle: 'chest',
        level: 'intermediate',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'Lay down on a flat bench holding a dumbbell in each hand with the palms of the hands facing towards the ceiling. Tip: Your arms should be parallel to the floor and next to your thighs. To avoid injury, make sure that you keep your elbows slightly bent. This will be your starting position.',
            'Now move the dumbbells by creating a semi-circle as you displace them from the initial position to over the head. All of the movement should happen with the arms parallel to the floor at all times. Breathe in as you perform this portion of the movement.',
            'Reverse the movement to return the weight to the starting position as you exhale.'
        ]
    },
    {
        id: 'e27',
        name: 'Atlas Stone Trainer',
        primaryMuscle: 'lower back',
        level: 'intermediate',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            "This trainer is effective for developing Atlas Stone strength for those who don't have access to stones, and are typically made from bar ends or heavy pipe.",
            'Begin by loading the desired weight onto the bar. Straddle the weight, wrapping your arms around the implement, bending at the hips.',
            'Begin by pulling the weight up past the knees, extending through the hips. As the weight clears the knees, it can be lapped by resting it on your thighs and sitting back, hugging it tightly to your chest.',
            'Finish the movement by extending through your hips and knees to raise the weight as high as possible. The weight can be returned to the lap or to the ground for successive repetitions.'
        ]
    },
    {
        id: 'e28',
        name: 'Atlas Stones',
        primaryMuscle: 'lower back',
        level: 'expert',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Begin with the atlas stone between your feet. Bend at the hips to wrap your arms vertically around the Atlas Stone, attempting to get your fingers underneath the stone. Many stones will have a small flat portion on the bottom, which will make the stone easier to hold.',
            'Pulling the stone into your torso, drive through the back half of your feet to pull the stone from the ground.',
            'As the stone passes the knees, lap it by sitting backward, pulling the stone on top of your thighs.',
            'Sit low, getting the stone high onto your chest as you change your grip to reach over the stone. Stand, driving through with your hips. Close distance to the loading platform, and lean back, extending the hips to get the stone as high as possible.'
        ]
    },
    {
        id: 'e29',
        name: 'Axle Deadlift',
        primaryMuscle: 'lower back',
        level: 'intermediate',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Approach the bar so that it is centered over your feet. You feet should be about hip width apart. Bend at the hip to grip the bar at shoulder width, allowing your shoulder blades to protract. Typically, you would use an over/under grip.',
            'With your feet and your grip set, take a big breath and then lower your hips and flex the knees until your shins contact the bar. Look forward with your head, keep your chest up and your back arched, and begin driving through the heels to move the weight upward.',
            'After the bar passes the knees, aggressively pull the bar back, pulling your shoulder blades together as you drive your hips forward into the bar.',
            'Lower the bar by bending at the hips and guiding it to the floor.'
        ]
    },
    {
        id: 'e30',
        name: 'Back Flyes - With Bands',
        primaryMuscle: 'shoulders',
        level: 'beginner',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Run a band around a stationary post like that of a squat rack.',
            'Grab the band by the handles and stand back so that the tension in the band rises.',
            'Extend and lift the arms straight in front of you. Tip: Your arms should be straight and parallel to the floor while perpendicular to your torso. Your feet should be firmly planted on the floor spread at shoulder width. This will be your starting position.',
            'As you exhale, move your arms to the sides and back. Keep your arms extended and parallel to the floor. Continue the movement until the arms are extended to your sides.',
            'After a pause, go back to the original position as you inhale.',
            'Repeat for the recommended amount of repetitions.'
        ]
    },
    {
        id: 'e31',
        name: 'Backward Drag',
        primaryMuscle: 'quadriceps',
        level: 'beginner',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Load a sled with the desired weight, attaching a rope or straps to the sled that you can hold onto.',
            'Begin the exercise by moving backwards for a given distance. Leaning back, extend through the legs for short steps to move as quickly as possible.'
        ]
    },
    {
        id: 'e32',
        name: 'Backward Medicine Ball Throw',
        primaryMuscle: 'shoulders',
        level: 'beginner',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'This exercise is best done with a partner. If you lack a partner, the ball can be thrown and retrieved or thrown against a wall.',
            'Begin standing a few meters in front of your partner, both facing the same direction. Begin holding the ball between your legs.',
            'Squat down and then forcefully reverse direction, coming to full extension and you toss the ball over your head to your partner.',
            'Your partner can then roll the ball back to you. Repeat for the desired number of repetitions.'
        ]
    },
    {
        id: 'e33',
        name: 'Balance Board',
        primaryMuscle: 'calves',
        level: 'beginner',
        force: 'mixed',
        mechanic: 'compound',
        instructions: [
            'Place a balance board in front of you.',
            'Stand up on it and try to balance yourself.',
            'Hold the balance for as long as desired.'
        ]
    },
    {
        id: 'e34',
        name: 'Ball Leg Curl',
        primaryMuscle: 'hamstrings',
        level: 'beginner',
        force: 'pull',
        mechanic: 'isolation',
        instructions: [
            'Begin on the floor laying on your back with your feet on top of the ball.',
            'Position the ball so that when your legs are extended your ankles are on top of the ball. This will be your starting position.',
            'Raise your hips off of the ground, keeping your weight on the shoulder blades and your feet.',
            'Flex the knees, pulling the ball as close to you as you can, contracting the hamstrings.',
            'After a brief pause, return to the starting position.'
        ]
    },
    {
        id: 'e35',
        name: 'Band Assisted Pull-Up',
        primaryMuscle: 'lats',
        level: 'beginner',
        force: 'mixed',
        mechanic: 'compound',
        instructions: [
            'Choke the band around the center of the pullup bar. You can use different bands to provide varying levels of assistance.',
            "Pull the end of the band down, and place one bent knee into the loop, ensuring it won't slip out. Take a medium to wide grip on the bar. This will be your starting position.",
            'Pull yourself upward by contracting the lats as you flex the elbow. The elbow should be driven to your side. Pull to the front, attempting to get your chin over the bar. Avoid swinging or jerking movements.',
            'After a brief pause, return to the starting position.'
        ]
    },
    {
        id: 'e36',
        name: 'Band Good Morning',
        primaryMuscle: 'hamstrings',
        level: 'beginner',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Using a 41 inch band, stand on one end, spreading your feet a small amount. Bend at the hips to loop the end of the band behind your neck. This will be your starting position.',
            'Keeping your legs straight, extend through the hips to come to a near vertical position.',
            'Ensure that you do not round your back as you go down back to the starting position.'
        ]
    },
    {
        id: 'e37',
        name: 'Band Good Morning (Pull Through)',
        primaryMuscle: 'hamstrings',
        level: 'beginner',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Loop the band around a post. Standing a little ways away, loop the opposite end around the neck. Your hands can help hold the band in position.',
            'Begin by bending at the hips, getting your butt back as far as possible. Keep your back flat and bend forward to about 90 degrees. Your knees should be only slightly bent.',
            'Return to the starting position be driving through with the hips to come back to a standing position.'
        ]
    },
    {
        id: 'e38',
        name: 'Band Hip Adductions',
        primaryMuscle: 'adductors',
        level: 'beginner',
        force: 'pull',
        mechanic: 'isolation',
        instructions: [
            'Anchor a band around a solid post or other object.',
            'Stand with your left side to the post, and put your right foot through the band, getting it around the ankle.',
            'Stand up straight and hold onto the post if needed. This will be your starting position.',
            'Keeping the knee straight, raise your right legs out to the side as far as you can.',
            'Return to the starting position and repeat for the desired rep count.',
            'Switch sides.'
        ]
    },
    {
        id: 'e39',
        name: 'Band Pull Apart',
        primaryMuscle: 'shoulders',
        level: 'beginner',
        force: 'pull',
        mechanic: 'isolation',
        instructions: [
            'Begin with your arms extended straight out in front of you, holding the band with both hands.',
            'Initiate the movement by performing a reverse fly motion, moving your hands out laterally to your sides.',
            'Keep your elbows extended as you perform the movement, bringing the band to your chest. Ensure that you keep your shoulders back during the exercise.',
            'Pause as you complete the movement, returning to the starting position under control.'
        ]
    },
    {
        id: 'e40',
        name: 'Band Skull Crusher',
        primaryMuscle: 'triceps',
        level: 'beginner',
        force: 'push',
        mechanic: 'isolation',
        instructions: [
            'Secure a band to the base of a rack or the bench. Lay on the bench so that the band is lined up with your head.',
            'Take hold of the band, raising your elbows so that the upper arm is perpendicular to the floor. With the elbow flexed, the band should be above your head. This will be your starting position.',
            'Extend through the elbow to straighten your arm, keeping your upper arm in place. Pause at the top of the motion, and return to the starting position.'
        ]
    },
    {
        id: 'e41',
        name: 'Barbell Ab Rollout',
        primaryMuscle: 'abdominals',
        level: 'intermediate',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'For this exercise you will need to get into a pushup position, but instead of having your hands of the floor, you will be grabbing on to an Olympic barbell (loaded with 5-10 lbs on each side) instead. This will be your starting position.',
            "While keeping a slight arch on your back, lift your hips and roll the barbell towards your feet as you exhale. Tip: As you perform the movement, your glutes should be coming up, you should be keeping the abs tight and should maintain your back posture at all times. Also your arms should be staying perpendicular to the floor throughout the movement. If you don't, you will work out your shoulders and back more than the abs.",
            'After a second contraction at the top, start to roll the barbell back forward to the starting position slowly as you inhale.',
            'Repeat for the recommended amount of repetitions.'
        ]
    },
    {
        id: 'e42',
        name: 'Barbell Ab Rollout - On Knees',
        primaryMuscle: 'abdominals',
        level: 'expert',
        force: 'pull',
        mechanic: 'compound',
        instructions: [
            'Hold an Olympic barbell loaded with 5-10lbs on each side and kneel on the floor.',
            'Now place the barbell on the floor in front of you so that you are on all your hands and knees (as in a kneeling push up position). This will be your starting position.',
            'Slowly roll the barbell straight forward, stretching your body into a straight position. Tip: Go down as far as you can without touching the floor with your body. Breathe in during this portion of the movement.',
            'After a second pause at the stretched position, start pulling yourself back to the starting position as you breathe out. Tip: Go slowly and keep your abs tight at all times.'
        ]
    },
    {
        id: 'e43',
        name: 'Barbell Bench Press - Medium Grip',
        primaryMuscle: 'chest',
        level: 'beginner',
        force: 'push',
        mechanic: 'compound',
        instructions: [
            'Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.',
            'From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.',
            'After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it.',
            'Repeat the movement for the prescribed amount of repetitions.',
            'When you are done, place the bar back in the rack.'
        ]
    },
    {
        id: 'e44',
        name: 'Barbell Curl',
        primaryMuscle: 'biceps',
        level: 'beginner',
        force: 'pull',
        mechanic: 'isolation',
        instructions: [
            'Stand up with your torso upright while holding a barbell at a shoulder-width grip. The palm of your hands should be facing forward and the elbows should be close to the torso. This will be your starting position.',
            'While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move.',
            'Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard.',
            'Slowly begin to bring the bar back to starting position as your breathe in.',
            'Repeat for the recommended amount of repetitions.'
        ]
    },
    {
        id: 'e45',
        name: 'Barbell Curls Lying Against An Incline',
        primaryMuscle: 'biceps',
        level: 'beginner',
        force: 'pull',
        mechanic: 'isolation',
        instructions: [
            'Lie against an incline bench, with your arms holding a barbell and hanging down in a horizontal line. This will be your starting position.',
            'While keeping the upper arms stationary, curl the weight up as high as you can while squeezing the biceps. Breathe out as you perform this portion of the movement. Tip: Only the forearms should move. Do not swing the arms.',
            'After a second contraction, slowly go back to the starting position as you inhale. Tip: Make sure that you go all of the way down.',
            'Repeat for the recommended amount of repetitions.'
        ]
    }
];

export { exercises };
