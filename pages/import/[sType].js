import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import * as cons from '../../lib/constant'
import { capitalize, setHeadMeta } from '../../lib/utils'
import Entry from '../../components/table/Table'
import Button from '@material-ui/core/Button'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import DoneIcon from '@material-ui/icons/Done'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'
import { useMediaQuery, useTheme } from '@material-ui/core'
import EventNoteIcon from '@material-ui/icons/EventNote'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
  link: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.link,
      cursor: 'pointer',
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  statusCurrent: {
    color: theme.palette.success.main,
  },
  statusCompleted: {
    color: theme.palette.info.main,
  },
  statusOnhold: {
    color: theme.palette.warning.main,
  },
  statusDropped: {
    color: theme.palette.error.main,
  },
}))

const Import = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.down('xs'))
  const mainType = props.sType

  const [state, setState] = React.useState({
    user: '',
    list: null,
    error: null,
  })
  const deleteUser = () => {
    localStorage.removeItem(mainType + 'username')
    localStorage.removeItem(mainType + 'list')
    setStepState(0)
    setState({ user: '', list: null, error: null })
  }

  const [loadingState, setLoadingState] = React.useState(false)

  const [stepState, setStepState] = React.useState(0)
  const nextStep = () => {
    setStepState(stepState + 1)
  }
  const prevStep = () => {
    setStepState(stepState - 1)
  }

  const steps = [
    {
      title: 'Login',
      content:
        <Typography>
          If you have not logged in yet, you need to login to <a href='https://myanimelist.net' target='_blank' rel='noopener noreferrer' className={classes.link}>MyAnimeList</a> first.
        </Typography>,
    },
    {
      title: 'Export',
      content:
        <Typography>
          Export your {mainType}list. Go to your {mainType}list page, there should be an export button on the top.
          Or you can go <a href={`${cons.MAL_URL}/panel.php?go=export`} target='_blank' rel='noopener noreferrer' className={classes.link}>here</a>.
        </Typography>,
    },
    {
      title: 'Extract',
      content:
        <Typography>
          Extract the <code>.xml.gz</code> file. If you don't know how to do it, come <a href='https://extract.me/' target='_blank' rel='noopener noreferrer' className={classes.link}>here</a>.
        </Typography>,
    },
    {
      title: 'Upload',
      content:
        <Typography>
          Now, upload the extracted file. {!state.error ? null : <span className={classes.statusDropped}>{state.error}</span>}
        </Typography>,
    },
  ]

  let fileReader
  const handleUploadFile = (e) => {
    setLoadingState(true)
    var file = e.target.files[0]
    if (file.type !== 'text/xml') {
      setState({ ...state, error: 'Invalid file type.' })
      setLoadingState(false)
      return
    }

    fileReader = new FileReader()
    fileReader.readAsText(file, 'UTF-8')
    fileReader.onloadend = handleReadFile
  }

  const handleReadFile = (e) => {
    const content = fileReader.result
    const parser = new DOMParser()
    const xml = parser.parseFromString(content, "text/xml")

    var username = xml.getElementsByTagName('user_name')[0].textContent
    var dataList = {}
    var tagName = {
      id: mainType === cons.ANIME_TYPE ? 'series_animedb_id' : 'manga_mangadb_id',
      title: mainType === cons.ANIME_TYPE ? 'series_title' : 'manga_title',
      score: 'my_score',
      status: 'my_status',
    }

    var datas = xml.getElementsByTagName(mainType)
    for (var i = 0; i < datas.length; i++) {
      var id = parseInt(datas[i].getElementsByTagName(tagName.id)[0].textContent)
      var title = datas[i].getElementsByTagName(tagName.title)[0].textContent
      var score = parseInt(datas[i].getElementsByTagName(tagName.score)[0].textContent)
      var status = datas[i].getElementsByTagName(tagName.status)[0].textContent
      dataList[id] = {
        id: id,
        title: title,
        score: score,
        status: mainType === cons.ANIME_TYPE ? cons.ANIME_STATUS_ID[status] : cons.MANGA_STATUS_ID[status],
      }
    }

    localStorage.setItem(mainType + 'username', username)
    localStorage.setItem(mainType + 'list', JSON.stringify(dataList))

    setState({ user: username, list: dataList, error: null })
    setLoadingState(false)
  }

  const statusIcon = {
    1: <PlayArrowIcon className={classes.statusCurrent} fontSize='small' />,
    2: <DoneIcon className={classes.statusCompleted} fontSize='small' />,
    3: <PauseIcon className={classes.statusOnhold} fontSize='small' />,
    4: <StopIcon className={classes.statusDropped} fontSize='small' />,
    6: <EventNoteIcon fontSize='small' />,
  }

  React.useEffect(() => {
    const user = localStorage.getItem(mainType + 'username') ? localStorage.getItem(mainType + 'username') : ''
    const list = localStorage.getItem(mainType + 'list') ? JSON.parse(localStorage.getItem(mainType + 'list')) : null
    setState({ user: user, list: list, error: null })
    setStepState(0)
  }, [mainType])

  const [queryState, setQueryState] = React.useState('')
  const handleQuery = (e) => {
    setQueryState(e.target.value)
  }

  React.useEffect(() => {
    if (state.list === null) return
    const timeout = setTimeout(() => {
      const list = JSON.parse(localStorage.getItem(mainType + 'list'))
      if (queryState.length === 0) {
        setState({ ...state, list: list, error: null })
      } else {
        var queries = queryState.trim().split(" ")
        var tmp = list
        Object.keys(state.list).forEach(l => {
          queries.forEach(q => {
            if (list[l] && !list[l].title.toLowerCase().includes(q)) {
              delete tmp[l]
            }
          })
        })
        setState({ ...state, list: tmp, error: null })
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [queryState])

  return (
    <>
      {setHeadMeta(`${capitalize(props.sType)} Import`, `Import your ${mainType} list and get additional feature to show your current ${mainType} status/progress on this website.`, '')}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {state.user === '' ?
            <Typography variant='h6'>
              Upload Your {capitalize(mainType)} List.
            <Tooltip
                placement='right'
                interactive
                title='You will get an extra feature when uploading your anime/manga list.
                    You can see your anime/manga status/progress in every pages on this web containing your anime/manga.
                    Your data is processed and saved on client only. Nothing is sent to the server or database.'>
                <IconButton>
                  <HelpOutlineIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </Typography> :
            <Grid container spacing={1}>
              <Grid item xs={12} sm>
                <Typography variant='h6'>
                  <a href={`${cons.MAL_URL}/profile/${state.user}`} target='_blank' rel='noopener noreferrer' className={classes.link}>
                    {state.user}
                  </a>
            's {capitalize(mainType)} List
              <Tooltip placement='right' title='remove'>
                    <IconButton onClick={deleteUser}>
                      <HighlightOffIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </Grid>
              <Grid item xs align='right'>
                <TextField
                  label='Title'
                  placeholder='search...'
                  variant='outlined'
                  size='small'
                  margin="dense"
                  onChange={handleQuery}
                  value={queryState}
                  fullWidth={isXS}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          }
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          {!state.list && queryState === '' ?
            <Stepper activeStep={stepState} orientation='vertical'>
              {steps.map((s, i) => (
                <Step key={i}>
                  <StepLabel>{s.title}</StepLabel>
                  <StepContent>
                    {s.content}
                    <Button
                      className={classes.button}
                      disabled={stepState === 0}
                      size='small'
                      onClick={prevStep}>
                      Back
                  </Button>
                    {stepState === steps.length - 1 ?
                      <>
                        <input
                          id='upload-button'
                          type='file'
                          onChange={handleUploadFile}
                          hidden />
                        <label htmlFor='upload-button'>
                          <Button
                            variant='contained'
                            className={classes.button}
                            component='span'
                            size='small'
                            disabled={loadingState}
                            startIcon={loadingState ? <CircularProgress size={15} /> : <CloudUploadIcon />}>
                            Upload
                        </Button>
                        </label>
                      </> :
                      <Button
                        className={classes.button}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={nextStep}>
                        Next
                    </Button>
                    }
                  </StepContent>
                </Step>
              ))}
            </Stepper> :
            <Entry
              dense
              pagination={true}
              header={[
                { value: 'No', hide: isXS },
                { value: 'Title', sortable: true },
                { value: 'Score', align: 'center', hide: isXS, sortable: true },
                { value: 'Status', align: 'center', sortable: true },
              ]}
              data={Object.keys(state.list).map((k, i) => {
                return ([
                  {
                    value: i + 1,
                    label: i + 1 + '.',
                    hide: isXS
                  },
                  {
                    value: state.list[k].title,
                    label:
                      <span onClick={() => props.showEntryDrawer(mainType, state.list[k].id)} className={classes.link}>
                        {state.list[k].title}
                      </span>
                  },
                  {
                    value: state.list[k].score,
                    align: 'center',
                    hide: isXS,
                  },
                  {
                    value: state.list[k].status,
                    label: <Tooltip placement='left' title={mainType === cons.ANIME_TYPE ?
                      cons.ANIME_USER_STATUS[state.list[k].status] :
                      cons.MANGA_USER_STATUS[state.list[k].status]} >
                      {statusIcon[state.list[k].status]}
                    </Tooltip>,
                    align: 'center',
                  },
                ])
              })}
            />
          }
        </Grid>
      </Grid >
    </>
  )
}

export async function getStaticProps({ params }) {
  const sType = params.sType
  return {
    props: {
      sType,
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { sType: 'anime' }, },
      { params: { sType: 'manga' }, },
    ],
    fallback: false,
  }
}

Import.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
}

export default Import
