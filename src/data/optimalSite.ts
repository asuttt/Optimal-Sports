import centerHero from '@/assets/Center City/Master-1315.00_00_19_00.Still001-450x450.jpg';
import centerFloor from '@/assets/Center City/Master-1315.00_01_00_19.Still003-450x450.jpg';
import centerTraining from '@/assets/Center City/Master-1315.00_02_00_10.Still005-450x450.jpg';
import centerCardio from '@/assets/Center City/Master-1315.00_02_25_05.Still008-450x450.jpg';
import centerStrength from '@/assets/Center City/Master-1315.00_03_09_23.Still014-450x450.jpg';
import centerStudio from '@/assets/Center City/short.00_00_37_20.Still005-450x450.jpg';
import newtownHero from '@/assets/Newtown/DSC02679-450x450.jpeg';
import newtownStudio from '@/assets/Newtown/DSC02601-1-450x450.jpeg';
import newtownStrength from '@/assets/Newtown/DSC02632-450x450.jpeg';
import newtownTraining from '@/assets/Newtown/DSC02650-450x450.jpeg';
import newtownCycle from '@/assets/Newtown/DSC02667-450x450.jpeg';
import newtownFloor from '@/assets/Newtown/DSC02702-450x450.jpeg';
import newtownClass from '@/assets/Newtown/DSC02726-450x450.jpeg';
import newtownRecovery from '@/assets/Newtown/DSC02748-450x450.jpeg';
import alexSuilkein from '@/assets/Trainers/Alex Suilkein.jpg';
import annaSteinStipenyuk from '@/assets/Trainers/Anna Stein-Stipenyuk.jpg';
import carlaSpence from '@/assets/Trainers/Carla Spence.jpg';
import carrieAllen from '@/assets/Trainers/Carrie Allen.jpg';
import chrisGilbert from '@/assets/Trainers/Chris Gilbert.jpg';
import danParvu from '@/assets/Trainers/Dan Parvu.jpeg';
import erikStrassman from '@/assets/Trainers/Erik Strassman.jpg';
import jimHart from '@/assets/Trainers/Jim Hart.jpg';
import joeMaurer from '@/assets/Trainers/Joe Maurer.jpg';
import joePatton from '@/assets/Trainers/Joe Patton.jpg';
import johannaBlume from '@/assets/Trainers/Johanna Blume.jpg';
import kristinNoblette from '@/assets/Trainers/Kristin Noblette.jpg';
import laurenRoseman from '@/assets/Trainers/Lauren Roseman.jpg';
import mikeNeuman from '@/assets/Trainers/Mike Neuman.jpg';
import mollyCraig from '@/assets/Trainers/Molly Craig.jpeg';
import savannaBarris from '@/assets/Trainers/Savanna Barris.jpg';

export type LocationId = 'center-city' | 'newtown';

export const locations = [
  {
    id: 'center-city' as const,
    shortName: 'Center City',
    name: 'Optimal Sport 1315',
    region: 'Philadelphia',
    address: ['The Philadelphia Building', '1315 Walnut Street', 'Philadelphia, PA 19107'],
    appleMapsUrl: 'https://maps.apple/p/rA5VsDwvxd79q2',
    phone: '215.735.1114',
    email: 'philadelphia@optimalsport.com',
    hours: ['Mon - Thurs: 5:30am - 11pm', 'Friday: 5:30am - 10pm', 'Saturday: 8am - 8pm', 'Sunday: 8am - 7pm'],
    summary: 'Center City training club built for efficient strength work, cardio, personal training, and classes before or after the workday',
    highlights: ['Strength floor', 'Personal training', 'Cardio and conditioning', 'Group fitness'],
    badge: 'Urban training oasis',
    image: centerHero,
    images: [centerHero, centerFloor, centerTraining, centerCardio, centerStrength, centerStudio],
  },
  {
    id: 'newtown' as const,
    shortName: 'Newtown',
    name: 'Optimal Sport Newtown',
    region: 'Bucks County',
    address: ['828B Newtown-Yardley Road', 'Newtown, PA 18940'],
    appleMapsUrl: 'https://maps.apple/p/oUL721DJVYBvEx',
    phone: '215.579.7600',
    email: 'newtown@optimalsport.com',
    hours: ['Mon - Thurs: 5:00am - 10:30pm', 'Friday: 5:00am - 9pm', 'Saturday: 7am - 6pm', 'Sunday: 8am - 5pm'],
    summary: 'A larger Bucks County club with a deep class schedule, multiple studio formats, training, strength, and community energy',
    highlights: ['Three studios', 'Cycle and yoga', 'Strength training', 'Full weekly schedule'],
    badge: 'Class-forward club',
    image: newtownHero,
    images: [newtownHero, newtownStudio, newtownStrength, newtownTraining, newtownCycle, newtownFloor, newtownClass, newtownRecovery],
  },
];

export const siteImages = {
  hero: newtownClass,
  centerTraining,
  newtownStudio,
  training: centerTraining,
  classes: newtownCycle,
};

export const classes = [
  ['Body Blast', 'Keep your muscles guessing with this 30 minute total body blast'],
  ['Cardio Combo', 'A total-body high and low-impact workout that builds endurance and keeps you moving'],
  ['Cardio Dance', 'High-energy dance styles that blend calorie burning, muscle toning, and new routines for every level'],
  ['Cardio Extreme', 'A more intense full-body workout with weighted options for experienced cardio lovers'],
  ['Cardio KickBoxing', 'An action-packed class to sweat, move differently, and kick and punch stress away'],
  ['Core Yoga', 'A flowing class that balances cardio and strength with a focus on the core'],
  ['Cross Training', 'High and low-impact aerobics with interval training using weights, bands, and balls'],
  ['Dance Body Sculpt', 'A blend of ballet, barre, Pilates, and yoga designed to build lean, sculpted muscle'],
  ['Gentle Flow Yoga', 'A slower-paced starting place to relax, unwind, and learn movements properly'],
  ['Hard Bodies', 'A total-body blast that keeps muscles guessing and helps target the results you want'],
  ['HIIT', 'High intensity interval training'],
  ['HIIT Camp', 'High intensity interval training in a bootcamp-style format'],
  ['HIIT Mix', 'Intermediate and advanced high intensity interval training with something new each class'],
  ['Kick N Core', 'A calorie-torching workout pairing kickboxing combinations with core-focused exercises'],
  ['Lean Bodies', 'Cardio-forward conditioning built to help members trim down and slim down'],
  ['Optimal Spin', 'A heart-pumping indoor cycling workout where you set the resistance and ride at your pace'],
  ['Pedal N Pump', 'An intense full-body workout combining cycling and floor exercises for an all-day burn'],
  ['Pilates', 'Build core strength, stability, and muscular control through re-education movements'],
  ['Piloxing', 'A unique fusion of boxing and Pilates movements for core strength, stability, and control'],
  ['Rhythm Ride', 'A high-energy, heart-pumping cycle workout driven by the beat of the latest music'],
  ['Silver Sneakers', 'A variety of exercises for strength, range of motion, agility, balance, and coordination'],
  ['Six Pack Abs', 'A 30-minute abdominal challenge with lower-back, abdominal, and stabilizing exercises'],
  ['Step Booty Sculpt', 'Cardio step with intermediate choreography and plyometrics for thighs and glutes'],
  ['Step It Up', 'A challenging, complex step class set to pulse-raising music'],
  ['STRONG by Zumba', 'A music-led HIIT workout that synchronizes movement and motivation to push your limits'],
  ['Sunrise Vinyasa Yoga', 'An early-morning yoga practice that links breath and movement through a series of postures'],
  ['Total Body Bootcamp', 'A full-body test for every level featuring plyometrics, push-ups, kettlebells, and more'],
  ['Vinyasa Challenge', 'An intense class for experienced yoga students'],
  ['Vinyasa Yoga', 'A breath-led sequence of postures designed to build yoga fitness'],
  ['Yoga', 'A restorative practice for managing stress, controlling breath, and building balance'],
  ['Zumba', 'An interval-style dance fitness class that mixes low and high-intensity movement'],
];

export const trainers = [
  {
    name: 'Dan Parvu',
    location: 'Center City',
    role: 'Personal Trainer',
    credentials: 'NASM CPT, CES, FNS',
    focus: ['Corrective exercise', 'Strength', 'Nutrition'],
    image: danParvu,
    bio: 'Specializing in muscle imbalances, weight loss, muscle building, and nutritional counseling',
  },
  {
    name: 'Kristin Noblette',
    location: 'Center City',
    role: 'Personal Trainer',
    credentials: 'Fitness, nutrition, wellness',
    focus: ['Physique prep', 'Nutrition', 'Functional fitness'],
    image: kristinNoblette,
    bio: 'Coaching for physique competitors, pageants, modeling, bridal, and maternity goals with strength, conditioning, and nutrition planning',
  },
  {
    name: 'Alex Suleikin',
    location: 'Center City',
    role: 'Personal Trainer',
    credentials: 'NESTA CPT, Fitness Nutrition Coach',
    focus: ['Muscle development', 'Weight management', 'Mobility'],
    image: alexSuilkein,
    bio: 'A lifelong sports and fitness professional helping members of all ages define, reach, and exceed their fitness goals',
  },
  {
    name: 'Erik Strassman',
    location: 'Center City',
    role: 'Personal Trainer',
    credentials: 'NASM CPT, PES, BioForce HRV, FMS',
    focus: ['Bodybuilding', 'Strength training', 'Weight loss'],
    image: erikStrassman,
    bio: 'Programming-led coaching for members who want goal-based workouts, better performance, and stronger movement quality',
  },
  {
    name: 'Joe Patton',
    location: 'Center City',
    role: 'Personal Trainer',
    credentials: 'Certified personal trainer',
    focus: ['Strength', 'Physique prep', 'Nutrition'],
    image: joePatton,
    bio: 'Goal-based coaching for strength, conditioning, functional training, physique competition prep, and nutritional planning for weight loss or gain',
  },
  {
    name: 'Chris Gilbert',
    location: 'Newtown',
    role: 'Head of Personal Training',
    credentials: 'CSCS, COO, General Manager',
    focus: ['Prep', 'Nutrition', 'Transformation'],
    image: chrisGilbert,
    bio: 'Structured coaching for event prep, diet, and transformation',
  },
  {
    name: 'Savanna Barris',
    location: 'Newtown',
    role: 'Group Exercise Director',
    credentials: 'ACE Group Exercise Instructor',
    focus: ['Group exercise', 'Bootcamps', 'Barre'],
    image: savannaBarris,
    bio: 'ACE certified group exercise instructor with experience in functional training, boot camps, Zumba, barre, and small-group training',
  },
  {
    name: 'Joe Maurer',
    location: 'Newtown',
    role: 'Personal Trainer',
    credentials: 'Certified personal trainer',
    focus: ['Strength training', 'Athletic performance', 'Weight loss'],
    image: joeMaurer,
    bio: 'Passionate strength and weight-training coach helping members build healthy routines and pursue goals of any size',
  },
  {
    name: 'Johanna Blume',
    location: 'Newtown',
    role: 'Personal Trainer',
    credentials: 'NASM CPT, CNC, Adaptive Needs Trainer',
    focus: ['Adaptive training', 'Nutrition', 'Success coaching'],
    image: johannaBlume,
    bio: 'NASM trainer and nutrition coach specializing in adaptive training, plan adherence, time management, and self-efficacy',
  },
  {
    name: 'Carrie Allen',
    location: 'Newtown',
    role: 'Strength Coach',
    credentials: 'CSCS, BS Exercise Science, BS Kinesiology',
    focus: ['Strength', 'Olympic lifting', 'Athlete development'],
    image: carrieAllen,
    bio: 'Exercise science and kinesiology coach with clinical training experience, USA Weightlifting, CrossFit Level 1, and volleyball coaching background',
  },
  {
    name: 'Carla Spence',
    location: 'Newtown',
    role: 'Personal Trainer',
    credentials: 'AAAI Personal Training Certification',
    focus: ['Functional training', 'Healthy habits', 'Youth strength'],
    image: carlaSpence,
    bio: 'Functional training coach helping members reintroduce fitness, pair movement with nutrition, and bring out their inner athlete',
  },
  {
    name: 'Jim Hart',
    location: 'Center City',
    role: 'Fitness Coach',
    credentials: 'Fitness coach and nutritionist',
    focus: ['Nutrition', 'Lifestyle coaching', 'Meditation'],
    image: jimHart,
    bio: 'Fitness coach, nutritionist, meditation practitioner, and chef focused on practical exercise and eating strategies that get consistent results',
  },
  {
    name: 'Lauren Roseman',
    location: 'Newtown',
    role: 'Personal Trainer',
    credentials: 'NSCA',
    focus: ['Powerlifting', 'Nutrition', 'Accountability'],
    image: laurenRoseman,
    bio: 'NSCA coach and elite USA Powerlifting athlete helping teens through seniors build strength, performance, nutrition, and accountability',
  },
  {
    name: 'Mike Neuman',
    location: 'Newtown',
    role: 'Personal Trainer',
    credentials: 'Professional Natural Bodybuilder',
    focus: ['Macro coaching', 'Contest prep', 'Transformations'],
    image: mikeNeuman,
    bio: 'Evidence-based training and nutrition coach specializing in macro coaching, event prep, contest prep, and fitness transformations',
  },
  {
    name: 'Molly Craig',
    location: 'Newtown',
    role: 'Personal Trainer',
    credentials: 'CPT, CPR, AAAI/ISMA',
    focus: ['Personal training', 'Conditioning', 'Newtown coaching'],
    image: mollyCraig,
    bio: 'Certified trainer available at Optimal Sport Newtown for members looking for practical, focused coaching support',
  },
  {
    name: 'Dr. Anna Stein-Tsipenyuk',
    location: 'Newtown',
    role: 'Physical Therapist',
    credentials: 'PT, DPT, CSCS, SFG1, SFMA-1, FRR, PN1',
    focus: ['Physical therapy', 'Strength', 'Functional movement'],
    image: annaSteinStipenyuk,
    bio: 'Doctor of Physical Therapy and strength specialist with training in kettlebells, functional movement assessment, functional range release, and nutrition',
  },
];

export const memberships = {
  center: [
    ['Individual', '$69/mo', '$49 enrollment'],
    ['Couple', '$109/mo', '$79 enrollment'],
    ['Family', '$139/mo', '$99 enrollment'],
  ],
  newtown: [
    ['Individual', '$79/mo', '$49 enrollment'],
    ['Couple', '$129/mo', '$79 enrollment'],
    ['Family', '$159/mo', '$99 enrollment'],
  ],
};

export const schedule = {
  'center-city': {
    start: 6,
    studios: ['Studio'],
    sessions: [
      ['Monday', '6:15 AM', 'Body Blast', 'Studio', 'Dana'],
      ['Monday', '12:15 PM', 'Core Express', 'Studio', 'Erik'],
      ['Monday', '6:00 PM', 'Vinyasa Yoga', 'Studio', 'Kristin'],
      ['Tuesday', '7:00 AM', 'HIIT Mix', 'Studio', 'Joe'],
      ['Tuesday', '5:45 PM', 'Rhythm Ride', 'Studio', 'Alex'],
      ['Wednesday', '6:15 AM', 'Strength Circuit', 'Studio', 'Dan'],
      ['Wednesday', '12:15 PM', 'Pilates', 'Studio', 'Kristin'],
      ['Thursday', '7:00 AM', 'Cardio Combo', 'Studio', 'Joe'],
      ['Thursday', '6:00 PM', 'Yoga Flow', 'Studio', 'Dana'],
      ['Friday', '6:30 AM', 'Total Body Bootcamp', 'Studio', 'Erik'],
      ['Saturday', '9:00 AM', 'Body Blast', 'Studio', 'Kristin'],
      ['Sunday', '10:00 AM', 'Gentle Flow Yoga', 'Studio', 'Dana'],
    ],
  },
  newtown: {
    start: 5,
    studios: ['Main Studio', 'Cycle', 'Yoga Studio'],
    sessions: [
      ['Monday', '5:45 AM', 'HIIT Camp', 'Main Studio', 'Chris'],
      ['Monday', '8:30 AM', 'Rhythm Ride', 'Cycle', 'Savanna'],
      ['Monday', '9:30 AM', 'Vinyasa Yoga', 'Yoga Studio', 'JoJo'],
      ['Monday', '6:00 PM', 'Zumba', 'Main Studio', 'Lauren'],
      ['Tuesday', '6:00 AM', 'Cycle Strength', 'Cycle', 'Molly'],
      ['Tuesday', '9:00 AM', 'Silver Sneakers', 'Main Studio', 'Carrie'],
      ['Tuesday', '6:15 PM', 'Pilates', 'Yoga Studio', 'Carla'],
      ['Wednesday', '5:45 AM', 'Body Blast', 'Main Studio', 'Chris'],
      ['Wednesday', '8:30 AM', 'Rhythm Ride', 'Cycle', 'Savanna'],
      ['Wednesday', '6:00 PM', 'Total Body Bootcamp', 'Main Studio', 'Mike'],
      ['Thursday', '6:00 AM', 'HIIT Mix', 'Main Studio', 'Carrie'],
      ['Thursday', '9:30 AM', 'Gentle Flow Yoga', 'Yoga Studio', 'JoJo'],
      ['Thursday', '6:15 PM', 'Cardio Kickboxing', 'Main Studio', 'Lauren'],
      ['Friday', '5:45 AM', 'Strength Circuit', 'Main Studio', 'Chris'],
      ['Friday', '9:00 AM', 'Cycle Intervals', 'Cycle', 'Molly'],
      ['Saturday', '8:00 AM', 'Rhythm Ride', 'Cycle', 'Savanna'],
      ['Saturday', '9:00 AM', 'Bootcamp', 'Main Studio', 'Mike'],
      ['Sunday', '9:00 AM', 'Yoga Flow', 'Yoga Studio', 'JoJo'],
    ],
  },
};
