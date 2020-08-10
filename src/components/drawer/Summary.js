import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { getEntryDetail } from '../../api';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Cover from '../image/Cover';
import * as cons from '../../constant'
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 240,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '& .MuiChip-sizeSmall': {
      margin: 2
    }
  },
  skeletonCover: {
    margin: 'auto'
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
  divider: {
    marginBottom: theme.spacing(1)
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
}))

const Summary = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [state, setState] = React.useState({
    show: false,
    entryId: 0,
    entryType: '',
  });

  const showSummary = (id, type) => {
    setState({ ...state, show: true, entryId: id, entryType: type });

    setLoading(true)
    const getData = async () => {
      const result = await getEntryDetail(type, id)
      if (result.status === cons.CODE_OK) {
        setData(result.data);
      } else {
        setError(result.message)
        console.error(error)
      }
      setLoading(false)
    }
    getData()
  };

  const hideSummary = () => {
    setState({ ...state, show: false })
  }

  React.useImperativeHandle(ref, () => {
    return {
      showSummary: showSummary
    };
  });

  const SummaryLoading = () => {
    return (
      <>
        <Typography variant="subtitle1" gutterBottom align='center' className={classes.title}>
          <Skeleton height={40} />
        </Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={1}>
          <Grid item xs={12} className={classes.center}>
            <Skeleton variant="rect" width={160} height={220} className={classes.skeletonCover} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" align="center" className={classes.categoryName}>
              <Skeleton height={80} />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" align="center" className={classes.categoryName}>
              <Skeleton height={80} />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" align="center" className={classes.categoryName}>
              <Skeleton height={80} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" className={classes.categoryName}>
              <Skeleton width={70} />
            </Typography>
            <Typography variant="body2" className={classes.synopsis}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider className={classes.divider} />
            <Skeleton height={40} />
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <Drawer
      variant="temporary"
      anchor={theme.direction === 'rtl' ? 'left' : 'right'}
      open={state.show}
      onClose={hideSummary}
      classes={{
        paper: classes.root,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {loading ? <SummaryLoading /> :
        <>
          <Typography variant="subtitle1" gutterBottom align='center' className={classes.title}>
            <Link to={`/${state.entryType}/${state.entryId}/${slugify(data.title)}`}>
              <b>{data.title} </b>
            </Link>
          </Typography>
          <Divider className={classes.divider} />
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.center}>
              <Cover src={data.cover} alt={data.title} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" align="center" className={classes.categoryName}>
                Rank
              </Typography>
              <Typography variant="h6" align="center">
                <b>#{data.rank.toLocaleString()}</b>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" align="center" className={classes.categoryName}>
                Score
              </Typography>
              <Typography variant="h6" align="center">
                <b>{Number(data.score).toFixed(2)}</b>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" align="center" className={classes.categoryName}>
                Popularity
              </Typography>
              <Typography variant="h6" align="center">
                <b>#{data.popularity.toLocaleString()}</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" className={classes.categoryName}>
                Synopsis
              </Typography>
              <Typography variant="body2" className={classes.synopsis}>
                {data.synopsis}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
              {data.genres.map(genre => {
                return (
                  <Chip size="small" label={genre.name} color="primary" key={genre.id} />
                )
              })}
            </Grid>
          </Grid>
        </>
      }
    </Drawer>
  )
})

export default Summary
