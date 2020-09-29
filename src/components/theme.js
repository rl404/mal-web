import { createMuiTheme } from '@material-ui/core/styles';

const base = {
  drawer: {
    width: 240,
  },
};

const lightTheme = createMuiTheme({
  ...base,
  logo: {
    image: '/images/logo.svg',
  },
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
      chart: '#3f51b5',
    },
    gradient: {
      main: 'linear-gradient(90deg, rgba(44,56,126,1) 0%, rgba(33,150,243,1) 100%)',
    },
  },
  error: {
    image: '/images/grey.png',
  },
  overlay: {
    image: '/images/white.png',
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
    },
  },
});

const darkTheme = createMuiTheme({
  ...base,
  logo: {
    image: '/images/logo-dark.svg',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#bf9efb',
      chart: '#673ab7',
    },
    gradient: {
      main: 'linear-gradient(90deg, rgba(72,40,128,1) 0%, rgba(103,58,183,1) 100%)',
    },
  },
  error: {
    image: '/images/white.png',
  },
  overlay: {
    image: '/images/black.png',
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
    },
  },
});

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default function getTheme(theme) {
  return themes[theme];
}