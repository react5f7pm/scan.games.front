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
          {/* Main Page */}
          <Route exact path="/" component={SearchMainPage} />
          {/* 그 외 페이지(상단 검색바 레이아웃 적용) */}
          <Route render={
            (props) => (
              <SearchLayout {...props}>
                <Switch>
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
