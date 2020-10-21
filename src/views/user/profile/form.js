import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
  },
}));

const Form = (props) => {
  var classes = useStyles();

  const [state, setState] = React.useState('');

  return (
    <Grid container spacing={2} className={classes.form}>
      <Grid item xs={12}>
        <TextField
          label='MyAnimeList Username'
          placeholder='rl404'
          variant='outlined'
          required
          size='small'
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button href={`/user/${state}`} color='primary' variant='contained' size='small'>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
};

export default Form;
