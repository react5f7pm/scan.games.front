import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import SearchLayout from './components/layouts/SearchLayout'
import SearchMainPage from './components/pages/SearchMainPage'
import SearchListPage from './components/pages/SearchListPage'
import GameDetailPage from './components/pages/GameDetailPage'

class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          {/* 검색바는 모든 페이지에서 사용됨 */}
          <Route render={
            (props) => (
              <SearchLayout {...props}>
                <Switch>
                  <Route exact path="/" component={SearchMainPage} />
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
