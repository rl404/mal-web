import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  drawer: {
    width: 240,
  },
  error: {
    image: '/images/grey.png',
  },
  overlay: {
    white: '/images/white.png',
  },
  transparent: {
    black: {
      10: 'rgba(0,0,0,0.1)',
      20: 'rgba(0,0,0,0.2)',
      30: 'rgba(0,0,0,0.3)',
      40: 'rgba(0,0,0,0.4)',
      50: 'rgba(0,0,0,0.5)',
      60: 'rgba(0,0,0,0.6)',
      70: 'rgba(0,0,0,0.7)',
      80: 'rgba(0,0,0,0.8)',
      90: 'rgba(0,0,0,0.9)',
    }
  }
});

export default customTheme;