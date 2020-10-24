import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import { makeStyles } from '@material-ui/core/styles';
import StyledTitle from '../../../components/styled/Title';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
  },
}));

const Form = (props) => {
  var classes = useStyles();

  const [state, setState] = React.useState('');
  const [, setRecentUser] = React.useState([]);

  const getRecentUser = () => {
    if (!localStorage.getItem('recentUser')) {
      return [];
    }
    return JSON.parse(localStorage.getItem('recentUser'));
  }

  const removeRecentUser = (i) => {
    var arrUser = getRecentUser().reverse();
    arrUser.splice(i, 1);
    localStorage.setItem('recentUser', JSON.stringify(arrUser.reverse()));
    setRecentUser(arrUser);
  }

  return (
    <Grid container spacing={2} className={classes.form}>
      <Grid item xs={12}>
        <StyledTitle icon={<SearchIcon />} title='Search Username' />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Username'
          placeholder='rl404'
          variant='outlined'
          required
          size='small'
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <Button href={`/user/${state}`} color='primary' variant='contained'>
          Submit
        </Button>
      </Grid>
      {getRecentUser().length === 0 ? null :
        <Grid item xs={12}>
          <StyledTitle icon={<HistoryIcon />} title='Recent Username' />
          <Grid container spacing={1}>
            {getRecentUser().reverse().map((u, i) => {
              return <React.Fragment key={u}>
                <Grid item xs={1} align='center'>
                  <IconButton size='small' onClick={() => removeRecentUser(i)}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item xs={11}>
                  <Button href={`/user/${u}`} color="primary" size='small' style={{ textTransform: 'none' }}>
                    {u}
                  </Button>
                </Grid>
              </React.Fragment>
            })}
          </Grid>
        </Grid>
      }
    </Grid>
  )
};

export default Form;
