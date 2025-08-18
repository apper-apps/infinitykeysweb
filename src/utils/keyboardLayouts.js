// Keyboard layout configurations for piano mapping
export const keyboardLayouts = {
  azerty: {
    name: 'AZERTY',
    keys: ['q', 'z', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', 'm', 'ù', '$'],
    display: 'q-z-s-e-d-f-t-g-y-h-u-j-k-o-l-p-m-ù-$'
  },
  qwerty: {
    name: 'QWERTY',
    keys: ['q', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', 'm', '[', ']'],
    display: 'q-w-s-e-d-f-t-g-y-h-u-j-k-o-l-p-m-[-]'
  },
  qwertz: {
    name: 'QWERTZ',
    keys: ['q', 'w', 's', 'e', 'd', 'f', 't', 'g', 'z', 'h', 'u', 'j', 'k', 'o', 'l', 'p', 'm', 'ü', 'ö'],
    display: 'q-w-s-e-d-f-t-g-z-h-u-j-k-o-l-p-m-ü-ö'
  },
  dvorak: {
    name: 'DVORAK',
    keys: ["'", ',', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', 'r', 'l', 'a', 'g', 'v', 'm', 'w', 'z'],
    display: "'-,-o-e-u-i-d-h-t-n-s-r-l-a-g-v-m-w-z"
  },
  colemak: {
    name: 'COLEMAK',
    keys: ['q', 'w', 'f', 'p', 'g', 'j', 'l', 'u', 'y', 'h', 'a', 'r', 's', 't', 'd', 'n', 'e', 'i', 'o'],
    display: 'q-w-f-p-g-j-l-u-y-h-a-r-s-t-d-n-e-i-o'
  }
};

// Auto-detect keyboard layout based on common key positions
export const detectKeyboardLayout = () => {
  // Simple detection based on common patterns
  // In a real implementation, this could be more sophisticated
  const userAgent = navigator.userAgent.toLowerCase();
  const language = navigator.language.toLowerCase();
  
  if (language.startsWith('fr')) return 'azerty';
  if (language.startsWith('de') || language.startsWith('at') || language.startsWith('ch')) return 'qwertz';
  
  // Default to QWERTY for most English-speaking regions
  return 'qwerty';
};

export const getLayoutKeys = (layoutId) => {
  return keyboardLayouts[layoutId] || keyboardLayouts.qwerty;
};