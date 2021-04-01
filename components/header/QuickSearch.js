import React from 'react'
import Link from 'next/link'
import InputBase from '@material-ui/core/InputBase'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles } from '@material-ui/core/styles'
import { getSearch } from '../../lib/api'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as cons from '../../lib/constant'
import { slugify } from '../../lib/utils'
import Tooltip from '@material-ui/core/Tooltip'
import Img from '../image/Img'

const useStyles = makeStyles((theme) => ({
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
    color: theme.palette.appBar.color,
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    color: theme.palette.appBar.color,
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
    color: theme.palette.appBar.color,
  },
  inputInput: {
    color: theme.palette.appBar.color,
    padding: theme.spacing(1, 1, 1, 0),
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
  option: {
    height: '100%',
    width: '100%',
  },
  link: {
    display: 'block',
    width: '100%',
    height: '100%',
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}))

const QuickSearch = () => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    open: false,
    options: [],
    loading: false,
  })

  const getData = async (query) => {
    const result = await getSearch('', query)
    if (result.status === cons.CODE_OK) {
      setState({ ...state, options: result.data, open: true, loading: false })
    } else {
      setState({ ...state, options: [], open: true, loading: false })
    }
  }

  var timeout = 0
  const search = (e) => {
    const query = e.target.value
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (query.length >= 3) {
        setState({ ...state, loading: true })
        getData(query)
      }
    }, 1000)
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        open={state.open}
        onClose={() => setState({ ...state, open: false })}
        options={state.options}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => option.name}
        filterOptions={() => state.options}
        renderOption={option => {
          return (
            <Tooltip placement='left' title={
              !option.image ? 'no image' :
                <div style={{ width: 160, textAlign: 'center' }}>
                  <Img width={160} src={option.image} alt={option.name} />
                </div>
            }>
              <div className={classes.option}>
                <Link href={`/${option.type}/${option.id}/${slugify(option.name)}`}>
                  <a className={classes.link}>
                    {option.name}
                  </a>
                </Link>
              </div>
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
      {!state.loading ? null :
        <div className={classes.loadingIcon}>
          <CircularProgress color='inherit' size={15} />
        </div>
      }
    </div>
  )
}

export default QuickSearch