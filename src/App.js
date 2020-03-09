import React, { Component } from 'react'
import styled from 'styled-components'

import Router from './Router'

class App extends Component {
  render () {
    return (
      <StyledApp>
        <h1 className="fade-in">스코프 기반 CSS 정의 예시를 위한 샘플</h1>
        <Router />
      </StyledApp>
    )
  }
}

const StyledApp = styled.div`
  background-color: white;
  /* CSS 정의 예시 */
  .fade-in {
    animation-name: fade-in;
    animation-delay: 1s;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`

export default App
