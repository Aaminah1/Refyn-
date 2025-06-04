export const synonymMap = {
  skin: ['acne', 'blackhead', 'pores', 'face', 'glow', 'skincare', 'blemish', 'pimple', 'oil', 'dry', 'moisturize', 'clear skin'],
  hair: ['haircare', 'split ends', 'frizz', 'scalp', 'dandruff', 'oily hair', 'dry hair', 'shine'],
  grooming: ['shaving', 'nails', 'beard', 'trim', 'clean', 'tidy', 'facial hair'],
  weight: ['fat loss', 'slimming', 'burn', 'fitness', 'exercise', 'diet', 'calories', 'workout', 'lose weight'],
  posture: ['back', 'spine', 'alignment', 'sit straight', 'stand tall', 'core'],
  dental: ['teeth', 'mouth', 'oral', 'smile', 'tongue', 'dental', 'breath', 'floss', 'whitening'],
  wellness: ['stretch', 'morning', 'routine', 'wake up', 'flexibility', 'mobility', 'relaxation', 'wind down', 'breathe', 'calm'],
  energy: ['boost', 'refresh', 'midday', 'recharge', 'breathing', 'focus', 'awake', 'fatigue']
};


export const mapSearchTermToCategory = (term) => {
  for (const [main, synonyms] of Object.entries(synonymMap)) {
    if (synonyms.includes(term.toLowerCase())) return main;
  }
  return term;
};
