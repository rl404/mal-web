import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import GitHubIcon from '@material-ui/icons/GitHub';
import { fade, makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as cons from '../../constant';
import { getSearch } from '../../api';
import { slugify } from '../../utils';
import Img from '../image/Img';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.gradient.main,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.drawer.width}px)`,
      marginLeft: theme.drawer.width,
    },
  },
  menuButton: {
    color: 'white',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    color: 'white',
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    color: 'white',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    color: 'white',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    color: 'white',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  themeIcon: {
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  link: {
    width: '100%',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const Header = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const [titleState, setTitleState] = React.useState('');
  const setTitle = (title) => {
    setTitleState(title);
  };

  React.useImperativeHandle(ref, () => {
    return { setTitle: setTitle };
  });

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      setLoading(false);
    }
  }, [open]);

  const selectedValue = React.useRef(null);

  var timeout = 0;
  const search = (e) => {
    const query = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (query.length >= 3) {
        setLoading(true);

        const getData = async () => {
          const result = await getSearch('', query);
          if (result.status === cons.CODE_OK) {
            if (selectedValue.current != null) {
              result.data.push(selectedValue.current)
            }

            setOptions(result.data);
            setOpen(true);
            setLoading(false);
          }
        }
        getData();
      }
    }, 1000);
  }

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={props.mobileToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography className={classes.title} variant='h6' noWrap>
          {titleState}
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Autocomplete
            open={open}
            onClose={() => setOpen(false)}
            options={options}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.name}
            onChange={(e, v) => selectedValue.current = v}
            renderOption={option => {
              return (
                <Tooltip placement='left' title={
                  <div style={{ width: 160, textAlign: 'center' }}>
                    <Img src={option.image} alt={option.name} />
                  </div>
                }>
                  <Link to={`/${option.type}/${option.id}/${slugify(option.name)}`} className={classes.link}>
                    {option.name}
                  </Link>
                </Tooltip>
              )
            }}

            renderInput={params =>
              <InputBase
                ref={params.InputProps.ref}
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={params.inputProps}
                onChange={search}
              />
            }
          />
          {!loading ? null :
            <div className={classes.loadingIcon}>
              <CircularProgress color='inherit' size={15} />
            </div>
          }
        </div>

        <IconButton onClick={props.darkToggle} className={classes.themeIcon}>
          {!props.darkState ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

        <IconButton className={classes.themeIcon}>
          <a href='https://github.com/rl404/mal-web' target='_blank' rel='noopener noreferrer'>
            <GitHubIcon />
          </a>
        </IconButton>

      </Toolbar>
    </AppBar>
  )
})

Header.propTypes = {
  mobileToggle: PropTypes.func.isRequired,
  darkToggle: PropTypes.func.isRequired,
  darkState: PropTypes.bool.isRequired,
};

export default React.memo(Header);