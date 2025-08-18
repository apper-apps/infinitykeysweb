// Theme system with Instagram-inspired colorful themes
export const themes = [
  {
    id: 'instagram-gradient',
    name: 'Instagram Gradient',
    description: 'Classic Instagram vibes',
    colors: {
      primary: '#833ab4',
      accent: '#fd1d1d',
      secondary: '#fcb045',
      background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)',
      cardBg: 'rgba(131, 58, 180, 0.15)',
      keyActive: '#fd1d1d',
      keyHighlight: '#fcb045'
    }
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Calm blue waters',
    colors: {
      primary: '#667eea',
      accent: '#764ba2',
      secondary: '#00d2ff',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      cardBg: 'rgba(102, 126, 234, 0.15)',
      keyActive: '#00d2ff',
      keyHighlight: '#764ba2'
    }
  },
  {
    id: 'sunset-vibes',
    name: 'Sunset Vibes',
    description: 'Warm evening colors',
    colors: {
      primary: '#ff9a9e',
      accent: '#fecfef',
      secondary: '#ffecd2',
      background: 'linear-gradient(45deg, #ff9a9e, #fecfef, #ffecd2)',
      cardBg: 'rgba(255, 154, 158, 0.15)',
      keyActive: '#fecfef',
      keyHighlight: '#ffecd2'
    }
  },
  {
    id: 'neon-nights',
    name: 'Neon Nights',
    description: 'Electric cyberpunk',
    colors: {
      primary: '#ff006e',
      accent: '#00f5ff',
      secondary: '#ffbe0b',
      background: 'linear-gradient(45deg, #ff006e, #8338ec, #00f5ff)',
      cardBg: 'rgba(255, 0, 110, 0.15)',
      keyActive: '#00f5ff',
      keyHighlight: '#ffbe0b'
    }
  },
  {
    id: 'forest-fresh',
    name: 'Forest Fresh',
    description: 'Natural green tones',
    colors: {
      primary: '#11998e',
      accent: '#38ef7d',
      secondary: '#7CB342',
      background: 'linear-gradient(45deg, #11998e, #38ef7d)',
      cardBg: 'rgba(17, 153, 142, 0.15)',
      keyActive: '#38ef7d',
      keyHighlight: '#7CB342'
    }
  },
  {
    id: 'cotton-candy',
    name: 'Cotton Candy',
    description: 'Sweet pastel dreams',
    colors: {
      primary: '#a8edea',
      accent: '#fed6e3',
      secondary: '#d299c2',
      background: 'linear-gradient(45deg, #a8edea, #fed6e3)',
      cardBg: 'rgba(168, 237, 234, 0.15)',
      keyActive: '#fed6e3',
      keyHighlight: '#d299c2'
    }
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    description: 'Northern lights magic',
    colors: {
      primary: '#667eea',
      accent: '#764ba2',
      secondary: '#f093fb',
      background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
      cardBg: 'rgba(102, 126, 234, 0.15)',
      keyActive: '#f093fb',
      keyHighlight: '#764ba2'
    }
  },
  {
    id: 'fire-flame',
    name: 'Fire Flame',
    description: 'Hot and energetic',
    colors: {
      primary: '#ff4757',
      accent: '#ff6b8a',
      secondary: '#ffa940',
      background: 'linear-gradient(45deg, #ff4757, #ff6b8a, #ffa940)',
      cardBg: 'rgba(255, 71, 87, 0.15)',
      keyActive: '#ff6b8a',
      keyHighlight: '#ffa940'
    }
  }
];

export const getTheme = (themeId) => {
  return themes.find(theme => theme.id === themeId) || themes[0];
};

export const saveTheme = (themeId) => {
  localStorage.setItem('piano-theme', themeId);
};

export const loadTheme = () => {
  return localStorage.getItem('piano-theme') || 'instagram-gradient';
};