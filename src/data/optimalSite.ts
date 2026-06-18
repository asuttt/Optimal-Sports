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
  ['Rhythm Ride', 'Beat-driven cycling with climbs, sprints, and endurance intervals'],
  ['Body Blast', 'A full-body strength and conditioning format built for steady progress'],
  ['Vinyasa Yoga', 'Flow-based yoga for mobility, control, and breath-led strength'],
  ['HIIT Mix', 'Fast-paced intervals using weights, bands, and bodyweight work'],
  ['Silver Sneakers', 'Accessible strength, balance, and range-of-motion training'],
  ['Zumba', 'Cardio dance training with high energy and easy-to-follow movement'],
  ['Pilates', 'Core stability, muscular control, and low-impact strength'],
  ['Total Body Bootcamp', 'Athletic conditioning for members who want a harder push'],
];

export const trainers = [
  {
    name: 'Dan Parvu',
    location: 'Center City',
    role: 'Personal Trainer',
    credentials: 'NASM CPT, CES, FNS',
    focus: ['Corrective exercise', 'Strength', 'Nutrition'],
    image: centerTraining,
    bio: 'Technical coaching for members who want safer movement, stronger lifts, and a plan that fits real life',
  },
  {
    name: 'Kristin Noblette',
    location: 'Center City',
    role: 'Performance Coach',
    credentials: 'Strength and conditioning',
    focus: ['Strength', 'Mobility', 'Accountability'],
    image: centerStrength,
    bio: 'Focused sessions for building confidence in the weight room and turning workouts into a repeatable habit',
  },
  {
    name: 'Chris Gilbert',
    location: 'Newtown',
    role: 'Head of Personal Training',
    credentials: 'CSCS',
    focus: ['Athletic training', 'Programming', 'Leadership'],
    image: newtownTraining,
    bio: 'Structured coaching for members who want measurable progress and a clear training path',
  },
  {
    name: 'Savanna Barris',
    location: 'Newtown',
    role: 'Group Exercise Director',
    credentials: 'Group fitness specialist',
    focus: ['Classes', 'Community', 'Conditioning'],
    image: newtownStudio,
    bio: 'Class-first energy with programming that keeps the Newtown schedule varied, full, and approachable',
  },
  {
    name: 'Johanna Blume',
    location: 'Newtown',
    role: 'Personal Trainer',
    credentials: 'NASM CPT, CNC',
    focus: ['Adaptive training', 'Nutrition', 'Strength'],
    image: newtownRecovery,
    bio: 'Supportive coaching for members who need thoughtful progressions, nutrition context, and consistency',
  },
  {
    name: 'Carrie Allen',
    location: 'Newtown',
    role: 'Strength Coach',
    credentials: 'CSCS, BS Exercise Science',
    focus: ['Strength', 'Technique', 'Performance'],
    image: newtownStrength,
    bio: 'Evidence-led training with a practical eye for technique, progression, and sustainable performance',
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
