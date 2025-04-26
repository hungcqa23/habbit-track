/**
 * Constants used in the profile setup process
 */

/**
 * Available avatar features
 */
export const AVATAR_FEATURES = {
  FACE_SHAPES: ['round', 'square', 'oval', 'heart', 'diamond'],
  HAIR_STYLES: ['short', 'medium', 'long', 'curly', 'wavy', 'bald'],
  EYE_TYPES: ['round', 'almond', 'wide', 'narrow'],
  MOUTH_TYPES: ['smile', 'neutral', 'serious'],
  NOSE_TYPES: ['small', 'medium', 'large'],
  ACCESSORIES: ['glasses', 'earrings', 'hat', 'none']
};

/**
 * Available categories for habits
 */
export const HABIT_CATEGORIES = [
  { id: 'health', label: 'Health & Fitness', icon: 'dumbbell' },
  { id: 'learning', label: 'Learning & Growth', icon: 'book' },
  { id: 'productivity', label: 'Productivity', icon: 'clock' },
  { id: 'mindfulness', label: 'Mindfulness', icon: 'brain' },
  { id: 'creativity', label: 'Creativity', icon: 'palette' },
  { id: 'social', label: 'Social', icon: 'users' },
  { id: 'finance', label: 'Finance', icon: 'dollar-sign' },
  { id: 'other', label: 'Other', icon: 'more-horizontal' }
];

/**
 * Initial focus options
 */
export const INITIAL_FOCUS_OPTIONS = [
  { id: 'health', label: 'Improve Health', description: 'Focus on physical well-being and fitness' },
  { id: 'learning', label: 'Learn New Skills', description: 'Focus on education and personal growth' },
  { id: 'productivity', label: 'Boost Productivity', description: 'Focus on getting more done and being efficient' },
  { id: 'mindfulness', label: 'Practice Mindfulness', description: 'Focus on mental well-being and awareness' }
];

/**
 * Steps in the profile setup process
 */
export const SETUP_STEPS = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'avatar', title: 'Avatar' },
  { id: 'profile', title: 'Profile' },
  { id: 'preferences', title: 'Preferences' },
  { id: 'complete', title: 'Complete' }
];
