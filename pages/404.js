import Error from '../components/error/Error'
import { setHeadMeta } from '../lib/utils'

const Custom404 = () => {
  return (
    <>
      {setHeadMeta('page not found', '', '')}
      <Error code={404} message={'page not found'} />
    </>
  )
}

export default Custom404