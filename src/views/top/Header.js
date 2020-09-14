import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../constant';
import { capitalize } from '../../utils';
import StyledDivider from '../../components/styled/Divider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(0.5),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  typeInput: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '& .MuiInputBase-root': {
      fontFamily: theme.typography.h6.fontFamily,
      fontWeight: theme.typography.h6.fontWeight,
      fontSize: theme.typography.h6.fontSize,
      lineHeight: theme.typography.h6.lineHeight,
      letterSpacing: theme.typography.h6.letterSpacing,
      '& .MuiSelect-root': {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        '& a': {
          textDecoration: 'none',
          color: theme.palette.text.primary,
        },
      },
    },
  },
}));

const TopHeader = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    type: props.type,
    order: props.order,
  });

  const changeType = (e) => {
    const t = e.target.value;
    setState({ ...state, type: t, order: 0 });
    props.updateQuery(t, 0);
  };

  const changeOrder = (e) => {
    const order = e.target.value;
    setState({ ...state, order: order });
    props.updateQuery(state.type, order);
  };

  var orderList = {
    [cons.ANIME_TYPE]: {
      0: 'Score',
      1: 'Airing',
      2: 'Upcoming',
      3: 'TV Series',
      4: 'Movies',
      5: 'OVAs',
      6: 'ONAs',
      7: 'Specials',
      8: 'by Popularity',
      9: 'by Favorites',
    },
    [cons.MANGA_TYPE]: {
      0: 'Score',
      1: 'Manga',
      2: 'Novels',
      3: 'One-shots',
      4: 'Doujin',
      5: 'Manhwa',
      6: 'Manhua',
      7: 'by Popularity',
      8: 'by Favorites',
    },
  };

  return (
    <>
      <Grid container alignItems='center' spacing={1} className={classes.root}>
        <Grid item xs>
          <Typography variant='h6'>
            <b>Top</b>
            <TextField
              select
              variant='outlined'
              value={state.type}
              size='small'
              onChange={changeType}
              className={classes.typeInput}
            >
              {cons.MAIN_TYPES.map((s) => (
                <MenuItem key={s} value={s}>
                  <b><Link to={`/top/${s}`} className={classes.link}>{capitalize(s)}</Link></b>
                </MenuItem>
              ))}
            </TextField>

            {state.type !== cons.ANIME_TYPE && state.type !== cons.MANGA_TYPE ? null :
              <TextField
                select
                variant='outlined'
                size='small'
                value={state.order}
                onChange={changeOrder}
                className={classes.typeInput}
              >
                {Object.keys(orderList[state.type]).map((key) => (
                  <MenuItem key={key} value={key}>
                    <b>{orderList[state.type][key]}</b>
                  </MenuItem>
                ))}
              </TextField>
            }
          </Typography>
        </Grid>
      </Grid>
      <StyledDivider />
    </>
  );
};

TopHeader.propTypes = {
  type: PropTypes.oneOf(cons.MAIN_TYPES).isRequired,
  order: PropTypes.number,
  updateQuery: PropTypes.func.isRequired,
};

export default TopHeader;