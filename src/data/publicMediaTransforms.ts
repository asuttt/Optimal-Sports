import { MediaTransformMap } from '@/lib/mediaTransforms';

export const PUBLIC_MEDIA_SCOPE_KEYS = [
  'public_home_v2',
  'public_our_story_v2',
  'public_facility_v2',
  'public_clubhaus_v2',
] as const;

export type PublicMediaScopeKey = (typeof PUBLIC_MEDIA_SCOPE_KEYS)[number];

const PUBLIC_MEDIA_BASELINE_TRANSFORMS: Record<PublicMediaScopeKey, MediaTransformMap> = {
  public_home_v2: {
    'home-slide-1': {
      x: -1.834720394736678,
      y: -9.315142543859551,
      scale: 1.08798245614035,
      rotate: 0,
    },
    'home-slide-2': {
      x: 11.981668323301278,
      y: -18.70445065789424,
      scale: 1.17666541353383,
      rotate: 0,
    },
    'home-slide-3': {
      x: -1.868911732455473,
      y: -10.26171875,
      scale: 1.24148026315789,
      rotate: 0,
    },
    'home-slide-4': {
      x: -2.842170943040401e-14,
      y: -49.9765625,
      scale: 2.408500590318772,
      rotate: 0,
    },
    'home-slide-5': {
      x: 0,
      y: -19.56640625,
      scale: 1.204250295159386,
      rotate: 0,
    },
    'home-slide-6': {
      x: -1.53515625,
      y: 5.990200109649095,
      scale: 1.23148026315789,
      rotate: 0,
    },
    'home-slide-7': {
      x: 1.1306250000001796,
      y: 8.695157166422462,
      scale: 2.5,
      rotate: -4,
    },
    'home-slide-8': {
      x: 19.37229714912354,
      y: -2.640625,
      scale: 1.3414802631579,
      rotate: 0,
    },
    'home-slide-6-desktop': {
      x: 0,
      y: 16.46484375,
      scale: 1.21148026315789,
      rotate: 0,
    },
    'home-slide-1-desktop': {
      x: -11.12890625,
      y: -22.81119791666663,
      scale: 1.09798245614035,
      rotate: 0,
    },
    'home-slide-2-desktop': {
      x: 9.42336150986219,
      y: -53.70628571428432,
      scale: 1.17666541353383,
      rotate: 0,
    },
    'home-slide-3-desktop': {
      x: -2.1600499167107046e-12,
      y: -61.25000000000159,
      scale: 1.2014802631579,
      rotate: 0,
    },
    'home-slide-4-desktop': {
      x: 0,
      y: -24.28125,
      scale: 2.4084259801053247,
      rotate: 0,
    },
    'home-slide-5-desktop': {
      x: 0,
      y: -14.66015625,
      scale: 1.2042129900526624,
      rotate: 0,
    },
    'home-slide-7-desktop': {
      x: 0,
      y: 14.82421875,
      scale: 2.4084259801053247,
      rotate: 0,
    },
    'home-slide-8-desktop': {
      x: 0,
      y: -7.8828125,
      scale: 1.2013359412043625,
      rotate: 0,
    },
    'home-slide-4-mobile': {
      x: 0,
      y: -14.280633223684163,
      scale: 2.408500590318772,
      rotate: 0,
    },
    'home-slide-5-mobile': {
      x: 0,
      y: -3.448841831140385,
      scale: 1.204250295159386,
      rotate: 0,
    },
    'home-slide-6-mobile': {
      x: 0,
      y: 5.831722861841968,
      scale: 1.204250295159386,
      rotate: 0,
    },
  },
  public_our_story_v2: {
    'our-story-photo': {
      x: 43.08203125,
      y: 2.842170943040401e-14,
      scale: 1.3271808562990535,
      rotate: 0,
    },
  },
  public_facility_v2: {
    'facility-1': {
      x: -18.40016778523494,
      y: 2.842170943040401e-14,
      scale: 1.1076033203814908,
      rotate: 0,
    },
    'facility-2': {
      x: -9.40625,
      y: -16.23000395569551,
      scale: 1.2053781512605,
      rotate: 0,
    },
    'facility-3': {
      x: 0,
      y: 31.6484375,
      scale: 1.7777777777777777,
      rotate: 0,
    },
    'facility-4': {
      x: 11.421875,
      y: 0,
      scale: 1.1103415792532463,
      rotate: 0,
    },
    'facility-5-full-20260217': {
      x: -1.0800249583553523e-12,
      y: -5.8759958154408025,
      scale: 1.11471143210359,
      rotate: 0,
    },
    'facility-6': {
      x: -22.22999999999996,
      y: -12.109375,
      scale: 1.13,
      rotate: 0,
    },
    'facility-7': {
      x: 9.53515625,
      y: 2.70703125,
      scale: 1.11,
      rotate: 0,
    },
    'facility-8-reset-20260217': {
      x: 0,
      y: 17.390625,
      scale: 1.710382513661202,
      rotate: 0,
    },
    'facility-9': {
      x: 24.321844660194586,
      y: -4.371000000000265,
      scale: 1.14223300970874,
      rotate: 0,
    },
    'facility-10': {
      x: 0,
      y: 0,
      scale: 1.1084723173353117,
      rotate: 0,
    },
    'facility-11': {
      x: 0,
      y: 1.78125,
      scale: 1.777777777777778,
      rotate: 0,
    },
    'facility-12': {
      x: 0,
      y: 42.71875,
      scale: 1.5925925925925926,
      rotate: 0,
    },
  },
  public_clubhaus_v2: {
    'clubhaus-photo-1': {
      x: 0,
      y: -57.2578125,
      scale: 1.3930029296875,
      rotate: 0,
    },
    'clubhaus-photo-2': {
      x: 0,
      y: -50.83984375,
      scale: 1.3530029296875,
      rotate: 0,
    },
    'clubhaus-photo-3': {
      x: -21.33984375,
      y: 0,
      scale: 1.6629675742976235,
      rotate: 0,
    },
    'clubhaus-photo-4': {
      x: 0,
      y: -72.3484375,
      scale: 1.3530029296875,
      rotate: 0,
    },
    'clubhaus-photo-5': {
      x: -10.61369260152182,
      y: -85,
      scale: 1.4530029296875,
      rotate: 0,
    },
    'clubhaus-photo-6': {
      x: -42.60275510152181,
      y: -138.8953125,
      scale: 1.7530029296875,
      rotate: 0,
    },
    'clubhaus-photo-7': {
      x: 0,
      y: -37.6015625,
      scale: 1.3530029296875,
      rotate: 0,
    },
    'clubhaus-photo-8': {
      x: -5.39453125,
      y: -18.53515625,
      scale: 1.5530029296875,
      rotate: -7,
    },
    'clubhaus-photo-1-desktop': {
      x: -4.10546875,
      y: -63.625,
      scale: 1.3530029296875,
      rotate: 0,
    },
    'clubhaus-photo-2-desktop': {
      x: 0.75,
      y: -85.40625,
      scale: 1.3530029296875,
      rotate: 0,
    },
    'clubhaus-photo-3-desktop': {
      x: -16.95703125,
      y: 0,
      scale: 1.7850917555351051,
      rotate: 0,
    },
    'clubhaus-photo-4-desktop': {
      x: 0.4765625,
      y: -57.8359375,
      scale: 1.3530029296875,
      rotate: 0,
    },
    'clubhaus-photo-5-desktop': {
      x: -11.679994684855131,
      y: -67.39453125,
      scale: 1.4630029296875,
      rotate: 0,
    },
    'clubhaus-photo-6-desktop': {
      x: -38.93000000000009,
      y: -120.54984374999998,
      scale: 1.60043941048035,
      rotate: 0,
    },
    'clubhaus-photo-7-desktop': {
      x: -12.140625,
      y: -50,
      scale: 1.37043941048035,
      rotate: 0,
    },
    'clubhaus-photo-8-desktop': {
      x: -9.0625,
      y: -35.71484375,
      scale: 1.47043941048035,
      rotate: 8,
    },
    'clubhaus-photo-1-mobile': {
      x: 0,
      y: -142.77719268686474,
      scale: 2.1375,
      rotate: 0,
    },
    'clubhaus-photo-2-mobile': {
      x: -2.842170943040401e-14,
      y: -197.09704527354688,
      scale: 2.1375,
      rotate: 0,
    },
    'clubhaus-photo-3-mobile': {
      x: 15.716008771930007,
      y: -19.8010896381582,
      scale: 1.31263157894737,
      rotate: 0,
    },
    'clubhaus-photo-4-mobile': {
      x: 0,
      y: -175.91298246568567,
      scale: 2.1375,
      rotate: -5,
    },
    'clubhaus-photo-5-mobile': {
      x: -2.842170943040401e-14,
      y: -181.69913571194684,
      scale: 2.1375,
      rotate: 0,
    },
    'clubhaus-photo-6-mobile': {
      x: -8.800000000000011,
      y: -126.54290334077314,
      scale: 2.2475,
      rotate: 0,
    },
    'clubhaus-photo-7-mobile': {
      x: -2.842170943040401e-14,
      y: -160.14257254826668,
      scale: 2.1375,
      rotate: 0,
    },
    'clubhaus-photo-8-mobile': {
      x: 0.30048076923071676,
      y: -137.5417979545745,
      scale: 2.33625,
      rotate: 9,
    },
  },
};

export function getPublicMediaBaselineTransforms(scopeKey: string): MediaTransformMap {
  if (scopeKey in PUBLIC_MEDIA_BASELINE_TRANSFORMS) {
    return PUBLIC_MEDIA_BASELINE_TRANSFORMS[scopeKey as PublicMediaScopeKey];
  }
  return {};
}
