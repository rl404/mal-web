import { createMuiTheme } from '@material-ui/core/styles';

const lightTheme = createMuiTheme({
  drawer: {
    width: 240,
  },
  logo: {
    image: '/images/logo.svg',
  },
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#3d5afe'
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    icon: '#6573c3',
    appBar: {
      background: 'linear-gradient(90deg, rgba(63,81,181,1) 0%, rgba(61,90,254,1) 100%)',
      color: '#fff',
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
  },
  overlay: '/images/white.png',
});

const darkTheme = createMuiTheme({
  drawer: {
    width: 240,
  },
  logo: {
    image: '/images/logo-dark.svg',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#651fff',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    icon: '#8561c5',
    appBar: {
      background: 'linear-gradient(90deg, rgba(103,58,183,1) 0%, rgba(101,31,255,1) 100%)',
      color: '#fff',
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
  },
  overlay: '/images/black.png',
});

const themes = {
  'lightTheme': lightTheme,
  'darkTheme': darkTheme,
};

export const getTheme = (name) => {
  if (themes[name]) {
    return themes[name];
  }

  if (localStorage.getItem(name + 'Theme')) {
    return localStorage.getItem(name + 'Theme');
  }

  return lightTheme;
};