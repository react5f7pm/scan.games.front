import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import SearchLayout from './components/layouts/SearchLayout'
import SearchListPage from './components/pages/SearchListPage'
import GameDetailPage from './components/pages/GameDetailPage'

class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route render={
            (props) => (
              <SearchLayout {...props}>
                <Switch>
                  <Route exact path="/"/>
                  <Route exact path="/search" component={SearchListPage} />
                  <Route exact path="/detail" component={GameDetailPage} />
                  <Redirect to="/" />
                </Switch>
              </SearchLayout>
            )
          } />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
