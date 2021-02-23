import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const ThemeChanger = (props) => {
  const defaultThemeState = localStorage.getItem('themeState') ? localStorage.getItem('themeState') : 'lightTheme';

  const [themeName, setThemeName] = React.useState(defaultThemeState);
  const changeTheme = (event) => {
    setThemeName(event.target.value);
    props.changeTheme(event.target.value);
    localStorage.setItem('themeState', event.target.value);
  };

  return (
    <FormControl component='fieldset'>
      <RadioGroup value={themeName} onChange={changeTheme}>
      <FormControlLabel value="lightTheme" control={<Radio color='secondary' />} label="Light" />
      <FormControlLabel value="darkTheme" control={<Radio color='secondary' />} label="Dark" />
      </RadioGroup>
    </FormControl>
  );
};

ThemeChanger.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default ThemeChanger;