import React, { Component } from 'react'
import styled from 'styled-components'

import Router from './Router'

class App extends Component {
  render () {
    return (
      <StyledApp>
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
