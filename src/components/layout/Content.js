import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

// routes config
import routes from '../../routes'

const loading = (
  <>
    loading
  </>
)

const Content = (props) => {
  return (
    <Suspense fallback={loading}>
      <Switch>
        {routes.map((route, idx) => {
          return route.component && (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={props => (
                  <route.component {...props} />
              )} />
          )
        })}
        <Redirect from="/" to="/home" />
      </Switch>
    </Suspense>
  )
}

export default Content