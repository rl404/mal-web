import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

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
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormLabel component="legend">Basic</FormLabel>
            <FormControlLabel value="lightTheme" control={<Radio color='secondary' />} label="Light" />
            <FormControlLabel value="darkTheme" control={<Radio color='secondary' />} label="Dark" />
          </Grid>
          <Grid item xs={6}>
            <FormLabel component="legend">Re:Zero</FormLabel>
            <FormControlLabel value="emiliaTheme" control={<Radio color='secondary' />} label="Emilia" />
            <FormControlLabel value="echidnaTheme" control={<Radio color='secondary' />} label="Echidna" />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

ThemeChanger.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default ThemeChanger;