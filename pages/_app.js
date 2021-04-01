import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import ScrollTop from '../components/header/ScrollTop'
import Container from '@material-ui/core/Container'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { getTheme } from '../components/theme'
import Summary from '../components/drawer/Summary'
import History from '../components/modal/History'
import '../styles/globals.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

const MyApp = ({ Component, pageProps }) => {
  const classes = useStyles()

  const [animelist, setAnime] = React.useState(null)
  const [mangalist, setManga] = React.useState(null)

  const [mobileState, setMobileState] = React.useState(false)
  const mobileToggle = () => {
    setMobileState(!mobileState)
  }

  const [themeState, setThemeState] = React.useState('lightTheme')
  const changeTheme = (name) => {
    setThemeState(name)
  }

  const summaryRef = React.useRef(null)
  const showEntryDrawer = (type, id) => {
    summaryRef.current.showDrawer(type, id)
  }

  const historyRef = React.useRef(null)
  const showHistoryModal = (type, id) => {
    historyRef.current.showModal(type, id)
  }

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    setAnime(localStorage.getItem('animelist') ? JSON.parse(localStorage.getItem('animelist')) : null)
    setManga(localStorage.getItem('mangalist') ? JSON.parse(localStorage.getItem('mangalist')) : null)
    setThemeState(localStorage.getItem('themeState') ? localStorage.getItem('themeState') : 'lightTheme')
  }, [])

  return (
    <ThemeProvider theme={getTheme(themeState)}>
      <CssBaseline />
      <div className={classes.root}>
        <Header changeTheme={changeTheme} mobileToggle={mobileToggle} />
        <Sidebar mobileState={mobileState} mobileToggle={mobileToggle} />
        <main className={classes.content}>
          <div className={classes.toolbar} id='top-anchor' />
          <Container>
            <Component
              {...pageProps}
              showEntryDrawer={showEntryDrawer}
              showHistoryModal={showHistoryModal}
              animelist={animelist}
              mangalist={mangalist} />
          </Container>
        </main>
        <ScrollTop {...pageProps} />
      </div>
      <Summary ref={summaryRef} animelist={animelist} mangalist={mangalist} />
      <History ref={historyRef} />
    </ThemeProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default MyApp