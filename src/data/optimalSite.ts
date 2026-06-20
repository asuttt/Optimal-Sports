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
    trialSignupUrl: 'https://forms.club-os.com/signup/optimal/8008',
    membershipSignupUrl: 'https://www.mymemberaccount.com/member-enrollment/11407?view=offer',
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
    trialSignupUrl: 'https://forms.club-os.com/signup/optimal/8009',
    membershipSignupUrl: 'https://www.mymemberaccount.com/member-enrollment/11406/group/8762?view=offer',
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
  ['Aerobic Jab and Jam', 'Kick, punch, and dance through a sweaty cardio party'],
  ['Barre', 'Sculpt, strengthen, and balance with ballet-inspired movement'],
  ['Barrelates', 'Fuse Pilates precision and barre toning for total strength'],
  ['Body Blast', 'Keep your muscles guessing with this 30 minute total body blast'],
  ['Body Lift', 'Lift, tone, and stretch using weights, bars, and bands'],
  ['Cardio Combo', 'A total-body high and low-impact workout that builds endurance and keeps you moving'],
  ['Cardio Dance', 'High-energy dance styles that blend calorie burning, muscle toning, and new routines for every level'],
  ['Cardio Extreme', 'A more intense full-body workout with weighted options for experienced cardio lovers'],
  ['Cardio Kick', 'Punch, kick, and sweat through a high-energy cardio workout'],
  ['Cardio KickBoxing', 'An action-packed class to sweat, move differently, and kick and punch stress away'],
  ['Cardio Sculpt', 'Mix sweaty cardio bursts with cardio and strength moves'],
  ['Circuit Training', 'Move fast through dynamic strength and cardio stations'],
  ['Core Yoga', 'A flowing class that balances cardio and strength with a focus on the core'],
  ['Cross Training', 'High and low-impact aerobics with interval training using weights, bands, and balls'],
  ['Cycling', 'Ride to the beat in a heart-pumping, sweaty session'],
  ['Dance & Barre', 'Groove, tone, and balance with upbeat barre-inspired moves'],
  ['Dance & Body', 'Dance, sweat, and sculpt with music that keeps the energy moving'],
  ['Dance Body Sculpt', 'A blend of ballet, barre, Pilates, and yoga designed to build lean, sculpted muscle'],
  ['Dance Express', 'A fast-moving dance workout built around upbeat choreography'],
  ['Dance Party', 'Exercise in disguise with non-stop, feel-good dance moves'],
  ['Everything But the Kitchen Sink', 'Build body strength and cardio with everything you need and nothing you skip'],
  ['Flirty & Dirty Poms', 'Shake your poms and strut through playful, sassy dance routines'],
  ['Flow Yoga', 'Move through a breath-led sequence that builds balance and ease'],
  ['Fly Express', 'A short, high-energy dance and conditioning format'],
  ['Full Body Bootcamp', 'A total-body session that blends strength, cardio, and athletic conditioning'],
  ['Gentle Flow Yoga', 'A slower-paced starting place to relax, unwind, and learn movements properly'],
  ['Gentle Vinyasa Yoga', 'A slower vinyasa practice that pairs mindful movement with breath'],
  ['Gentle Yoga', 'Stretch, breathe, and unwind with calming yoga sequences'],
  ['Hard Bodies', 'A total-body blast that keeps muscles guessing and helps target the results you want'],
  ['High Energy Pyramid', 'Box, kick, and jump through a high-intensity cardio pyramid'],
  ['HIIT', 'High intensity interval training'],
  ['HIIT Camp', 'High intensity interval training in a bootcamp-style format'],
  ['HIIT Mix', 'Intermediate and advanced high intensity interval training with something new each class'],
  ['Interval & Strength', 'Alternate sweaty cardio blasts with muscle-building strength work'],
  ['Jab & Jam', 'A cardio-focused mix of punches, kicks, and dance'],
  ['Kick N Core', 'A calorie-torching workout pairing kickboxing combinations with core-focused exercises'],
  ['Lean Bodies', 'Cardio-forward conditioning built to help members trim down and slim down'],
  ['Mat Pilates', 'Build core strength and control with a mat-based Pilates practice'],
  ['Optimal Spin', 'A heart-pumping indoor cycling workout where you set the resistance and ride at your pace'],
  ['Pedal N Pump', 'An intense full-body workout combining cycling and floor exercises for an all-day burn'],
  ['Pilates', 'Build core strength, stability, and muscular control through re-education movements'],
  ['Pilates Balls to the Wall', 'Build power and control with wall-based Pilates training'],
  ['Pilates Burn', 'A Pilates-based workout that builds heat, core strength, and endurance'],
  ['Pilates Strength', 'Combine Pilates flow with strength-building control and balance'],
  ['Piloxing', 'A unique fusion of boxing and Pilates movements for core strength, stability, and control'],
  ['Pom Dance Party', 'A playful dance class built around upbeat movement and pom energy'],
  ['Power', 'A focused strength format for glutes, abs, legs, and total-body conditioning'],
  ['Power Vinyasa Yoga', 'A stronger vinyasa flow designed to build heat, mobility, and control'],
  ['Rhythm Ride', 'A high-energy, heart-pumping cycle workout driven by the beat of the latest music'],
  ['Rock Bottom Barre', 'Sweat, sculpt, and burn in an energetic barre class'],
  ['Saturday Dance Party', 'A weekend dance fitness session with an easy, social energy'],
  ['Sculpt Express', 'A concise sculpting class for strength, tone, and conditioning'],
  ['Silver Fit', 'Move, strengthen, and balance with upbeat low-impact training'],
  ['Silver Sneakers', 'A variety of exercises for strength, range of motion, agility, balance, and coordination'],
  ['Six Pack Abs', 'A 30-minute abdominal challenge with lower-back, abdominal, and stabilizing exercises'],
  ["Smash'T", 'Blend sweaty cardio and strength using weights and bands'],
  ['Speedwork', 'Build pace, agility, and conditioning through focused athletic intervals'],
  ['Spinervals', 'An interval-driven indoor cycling workout that builds power and endurance'],
  ['Step Booty Sculpt', 'Cardio step with intermediate choreography and plyometrics for thighs and glutes'],
  ['Step It Up', 'A challenging, complex step class set to pulse-raising music'],
  ['STRONG by Zumba', 'A music-led HIIT workout that synchronizes movement and motivation to push your limits'],
  ['Sunrise Vinyasa Yoga', 'An early-morning yoga practice that links breath and movement through a series of postures'],
  ['Total Body Bootcamp', 'A full-body test for every level featuring plyometrics, push-ups, kettlebells, and more'],
  ['Total Strength', 'Lift heavy, move strong, and build total-body power'],
  ['Train Station', 'Move through an efficient circuit of strength and conditioning stations'],
  ['Vinyasa Challenge', 'An intense class for experienced yoga students'],
  ['Vinyasa Core Yoga', 'Flow through yoga poses that fire up the core'],
  ['Vinyasa Yoga', 'A breath-led sequence of postures designed to build yoga fitness'],
  ['Work Your Assets', 'Ignite every muscle, large and small, for a strong workout'],
  ['Yoga', 'A restorative practice for managing stress, controlling breath, and building balance'],
  ['Yoga Fitness', 'A strength-minded yoga session that supports mobility, balance, and fitness'],
  ['Yogalates', 'Flow, stretch, and strengthen with yoga-meets-Pilates movement'],
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

type MembershipPlan = {
  name: string;
  payment: string;
  price: string;
  cadence?: string;
  detail: string;
  badge?: string;
};

type MembershipLocationPlans = {
  plans: MembershipPlan[];
  promo: {
    label: string;
    title: string;
    price: string;
    detail: string;
  };
  partnerRates?: {
    title: string;
    detail: string;
    rates: Array<{ term: string; price: string }>;
  };
};

export const membershipPlans: Record<LocationId, MembershipLocationPlans> = {
  'center-city': {
    plans: [
      {
        name: '12 Month Membership',
        payment: 'Annual',
        price: '$49.99',
        cadence: '/mo',
        detail: 'A full-year commitment with the club’s best standard monthly rate',
        badge: 'Best monthly rate',
      },
      {
        name: 'Month to Month',
        payment: 'Monthly',
        price: '$59.99',
        cadence: '/mo',
        detail: 'Flexible monthly access, no long-term commitment',
      },
      {
        name: 'One Month Membership',
        payment: 'Paid in full',
        price: '$120',
        detail: 'One month of club access, paid in full at sign-up',
      },
    ],
    promo: {
      label: 'Short-Term',
      title: 'Three Month Package',
      price: '$99',
      detail: 'A simple three-month membership option for the {season} season',
    },
    partnerRates: {
      title: 'Apartment Partner Rates',
      detail: 'Available to residents of Westbury and Chancellor Apartments',
      rates: [
        { term: '12 Month Annual', price: '$29.99/mo' },
        { term: 'Month to Month', price: '$39.99/mo' },
      ],
    },
  },
  newtown: {
    plans: [
      {
        name: 'Student (25 & Under)',
        payment: 'Youth',
        price: '$59.99',
        cadence: '/mo',
        detail: 'A lower monthly rate for students',
      },
      {
        name: '12 Month Membership',
        payment: 'Annual',
        price: '$64.99',
        cadence: '/mo',
        detail: 'Full club access with a 12-month commitment',
        badge: 'Best value',
      },
      {
        name: 'Month to Month',
        payment: 'Monthly',
        price: '$74.99',
        cadence: '/mo',
        detail: 'Flexible membership, cancel any time',
      },
    ],
    promo: {
      label: 'New Member Offer',
      title: '$1 Until July 1',
      price: '$1',
      detail: 'For new member sign-ups with a 12-month commitment. See full terms',
    },
  },
};

export const schedule = {
  'center-city': {
    start: 6,
    studios: ['Studio'],
    sessions: [
      ['Monday', '5:45 PM', 'Full Body Bootcamp', 'Studio', ''],
      ['Tuesday', '10:30 AM', 'Silver Sneakers', 'Studio', ''],
      ['Tuesday', '5:30 PM', 'Yoga Fitness', 'Studio', ''],
      ['Wednesday', '12:00 PM', 'Circuit Training', 'Studio', ''],
      ['Wednesday', '5:30 PM', 'Speedwork', 'Studio', ''],
      ['Thursday', '10:30 AM', 'Silver Sneakers', 'Studio', ''],
      ['Thursday', '12:00 PM', 'Spinervals', 'Studio', ''],
      ['Thursday', '5:30 PM', 'Yoga Fitness', 'Studio', ''],
      ['Friday', '12:00 PM', 'Power', 'Studio', ''],
    ],
  },
  newtown: {
    start: 5,
    studios: ['Studio 1', 'Studio 2', 'Studio 3'],
    sessions: [
      ['Monday', '8:00 AM', 'Cycling', 'Studio 3', 'Renee'],
      ['Monday', '8:30 AM', 'Pilates Burn', 'Studio 3', 'Chris'],
      ['Monday', '9:30 AM', 'Vinyasa Yoga', 'Studio 3', 'June'],
      ['Monday', '9:30 AM', 'Dance & Barre', 'Studio 1', 'Tisha'],
      ['Monday', '10:45 AM', 'Hard Bodies', 'Studio 1', 'Rose'],
      ['Monday', '5:00 PM', 'Barre', 'Studio 3', 'Savanna'],
      ['Monday', '5:45 PM', 'High Energy Pyramid', 'Studio 1', 'Kelly'],
      ['Monday', '6:00 PM', 'Dance Express', 'Studio 3', 'Chris / Addie'],
      ['Monday', '6:30 PM', 'Sculpt Express', 'Studio 3', 'Chris / Addie'],
      ['Tuesday', '6:00 AM', 'Hard Bodies', 'Studio 1', 'Kelly'],
      ['Tuesday', '8:00 AM', 'Cycling', 'Studio 2', 'Dawn'],
      ['Tuesday', '8:15 AM', 'Jab & Jam', 'Studio 1', 'Rose'],
      ['Tuesday', '9:30 AM', 'Gentle Yoga', 'Studio 3', 'Liza'],
      ['Tuesday', '9:30 AM', 'Zumba', 'Studio 1', 'Doug'],
      ['Tuesday', '10:30 AM', 'Everything But the Kitchen Sink', 'Studio 1', 'Rachel B'],
      ['Tuesday', '5:00 PM', 'Core Yoga', 'Studio 3', 'June'],
      ['Tuesday', '5:30 PM', 'Cross Training', 'Studio 1', 'Raquel'],
      ['Tuesday', '6:00 PM', 'Rock Bottom Barre', 'Studio 3', 'Tisha'],
      ['Tuesday', '6:30 PM', 'Cardio Kick', 'Studio 1', 'Lisa'],
      ['Wednesday', '6:00 AM', 'Interval & Strength', 'Studio 1', 'Kelly'],
      ['Wednesday', '8:15 AM', 'Total Strength', 'Studio 1', 'Raquel'],
      ['Wednesday', '9:30 AM', 'Yogalates', 'Studio 3', 'Andrea'],
      ['Wednesday', '9:30 AM', 'Dance & Body', 'Studio 1', 'Chris'],
      ['Wednesday', '10:45 AM', 'Mat Pilates', 'Studio 3', 'Andrea'],
      ['Wednesday', '10:45 AM', 'HIIT Mix', 'Studio 1', 'Deb'],
      ['Wednesday', '11:45 AM', 'Silver Fit', 'Studio 1', 'Deb'],
      ['Wednesday', '4:45 PM', 'Dance Party', 'Studio 3', 'Addie'],
      ['Wednesday', '5:00 PM', 'Cross Training', 'Studio 1', 'Savanna'],
      ['Wednesday', '5:45 PM', 'Body Lift', 'Studio 3', 'Rachel B'],
      ['Thursday', '8:00 AM', 'Cycling', 'Studio 2', 'Deb'],
      ['Thursday', '8:15 AM', 'Barrelates', 'Studio 3', 'Chris'],
      ['Thursday', '9:15 AM', 'Zumba', 'Studio 1', 'Doug'],
      ['Thursday', '9:30 AM', 'Vinyasa Core Yoga', 'Studio 3', 'Liza'],
      ['Thursday', '10:30 AM', 'Total Strength', 'Studio 1', 'Kristin'],
      ['Thursday', '5:00 PM', 'Circuit Training', 'Studio 1', 'Jackie'],
      ['Thursday', '5:30 PM', 'Barrelates', 'Studio 3', 'Chris'],
      ['Thursday', '6:15 PM', 'Dance Express', 'Studio 1', 'Jenelle'],
      ['Thursday', '6:45 PM', 'Sculpt Express', 'Studio 1', 'Jenelle'],
      ['Friday', '6:00 AM', 'High Energy Pyramid', 'Studio 1', 'Kelly'],
      ['Friday', '8:15 AM', 'Power Vinyasa Yoga', 'Studio 3', 'Cheryl'],
      ['Friday', '9:30 AM', 'Pom Dance Party', 'Studio 3', 'Tisha'],
      ['Friday', '9:30 AM', 'Cardio Sculpt', 'Studio 1', 'Raquel'],
      ['Friday', '10:30 AM', 'Train Station', 'Studio 3', 'Rachel B'],
      ['Friday', '10:45 AM', 'Silver Fit', 'Studio 1', 'Deb'],
      ['Friday', '5:00 PM', 'Flow Yoga', 'Studio 3', 'Savanna'],
      ['Saturday', '8:00 AM', 'Step It Up', 'Studio 1', 'Kelly'],
      ['Saturday', '9:00 AM', 'Cycling', 'Studio 2', 'Allison'],
      ['Saturday', '9:15 AM', 'Saturday Dance Party', 'Studio 1', 'Chris'],
      ['Saturday', '9:00 AM', 'Gentle Vinyasa Yoga', 'Studio 3', 'Monica'],
      ['Saturday', '10:30 AM', 'Body Lift', 'Studio 3', 'Lisa'],
      ['Saturday', '10:30 AM', 'Cross Training', 'Studio 1', 'Kristin'],
      ['Sunday', '9:00 AM', 'Step It Up', 'Studio 1', 'Kelly'],
      ['Sunday', '9:00 AM', 'Cycling', 'Studio 2', 'Allison'],
      ['Sunday', '9:30 AM', 'Vinyasa Yoga', 'Studio 3', 'Monica'],
      ['Sunday', '10:15 AM', 'Fly Express', 'Studio 1', 'Jenelle / Rachel B'],
      ['Sunday', '10:45 AM', 'Sculpt Express', 'Studio 1', 'Jenelle / Rachel B'],
      ['Sunday', '10:45 AM', 'Zumba', 'Studio 3', 'Atrieve'],
    ],
  },
};
