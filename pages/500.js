import Error from '../components/error/Error'
import { setHeadMeta } from '../lib/utils'

const Custom500 = () => {
  return (
    <>
      {setHeadMeta('internal server error', '', '')}
      <Error code={500} message={'internal server error'} />
    </>
  )
}

export default Custom500