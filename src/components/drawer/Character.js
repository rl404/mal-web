import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as cons from '../../constant';
import { slugify } from '../../utils';
import EllipsisText from '../text/EllipsisText';
import CharacterDrawerLoading from './loading/Character';
import ErrorArea from '../error/Error';
import StyledDivider from '../styled/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 240,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    paddingTop: theme.spacing(2),
    lineHeight: theme.typography.body1.lineHeight,
    '& a': {
      color: 'black',
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.primary.main
      }
    }
  },
  center: {
    textAlign: 'center'
  },
  categoryName: {
    color: theme.palette.primary.main
  },
  synopsis: {
    whiteSpace: 'pre-line'
  }
}));

const CharacterDrawer = (props) => {
  const classes = useStyles();
  const state = props.state;

  return (
    <>
      {!state ? null : state.loading ? <CharacterDrawerLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <>
            <Typography variant="subtitle1" gutterBottom align='center' className={classes.title}>
              <Link to={`/character/${state.entryId}/${slugify(state.data.name)}`}>
                <b>{state.data.name}</b>
              </Link>
            </Typography>
            <Typography align='center'>
              {state.data.kanjiName}
            </Typography>
            <StyledDivider />
            <Grid container spacing={1}>
              <Grid item xs={12} className={classes.center}>
                <img src={state.data.image} alt={state.data.name} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" className={classes.categoryName}>
                  About
              </Typography>
                <Typography variant="body2" className={classes.synopsis}>
                  <EllipsisText text={state.data.about} limit={500} />
                </Typography>
              </Grid>
            </Grid>
          </>
      }
    </>
  );
};

CharacterDrawer.propTypes = {
  state: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
      kanjiName: PropTypes.string,
      about: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string,
    }),
    entryType: PropTypes.oneOf([cons.CHAR_TYPE]).isRequired,
    entryId: PropTypes.number.isRequired,
  }),
};

export default CharacterDrawer;
