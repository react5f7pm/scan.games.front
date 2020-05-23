import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

// fillScreen이 아니라면 사용시 parent의 min-height를 설정하세요.
const propTypes = {
  showLoading: PropTypes.bool.isRequired,
  fillScreen: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
}

const defaultProps = {
  fillScreen: false,
  width: '100%',
  height: '100%',
}

const PLATFORM_LOGO_PATH = 'static/img/platform'

const pickRandomLogoList = (count) => {
  const logoList = [
    '/playstation/logo.png',
    '/steam/logo.png',
    '/nintendo/logo.png',
    '/origin/logo.png',
  ]

  let iteration = Math.random() * 10 + 1
  let randomLogoList = logoList
  while (iteration-- > 0) {
    randomLogoList = randomLogoList.sort((a, b) => Math.random() < 0.5 ? 1 : -1)
    randomLogoList = Math.random() < 0.5
                     ? randomLogoList.reverse()
                     : randomLogoList
  }
  return randomLogoList.splice(0, count)
}

export const LoadingIndicator = (props) => {
  const [logo1, logo2, logo3] = pickRandomLogoList(3)
  return props.showLoading
         ? <LoadingWrapper {...props}>
             <AnimateDot delay="0.33" src={ PLATFORM_LOGO_PATH + logo1 } />
             <AnimateDot delay="0.75" src={ PLATFORM_LOGO_PATH + logo2 } />
             <AnimateDot delay="1.2" src={ PLATFORM_LOGO_PATH + logo3 } />
           </LoadingWrapper>
         : props.children
}

LoadingIndicator.propTypes = propTypes
LoadingIndicator.defaultProps = defaultProps

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  min-width: inherit;
  min-height: inherit;
  max-width: inherit;
  max-height: inherit;

  ${(props) => css`
    width: ${props.width};
    height: ${props.height};
  `}

  ${(props) => props.fillScreen ? css`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  ` : ''}

  background-color: #00000016;
`

const AnimateDot = styled.img`
  display: block;

  width: 50px;
  margin: 15px;

  animation-name: bouncing;
  animation-duration: ${(props) => props.delay / 1.618 + 1.618}s;
  animation-delay: ${(props) => props.delay}s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;

  @keyframes bouncing {
    0% {
      transform: translateY(0);  
    }
    5% {
      transform: scale(1.2, 0.6);
    }
    15% {
      transform: scale(0.8, 1.1) translateY(-70px);
    }
    25% {
      transform: scale(1.05, 0.8) translateY(0);
    }
    30% {
      transform: scale(0.9, 1.05) translateY(-40px);
    }
    40% {
      transform: scale(1.025, 0.9) translateY(0);
    }
    50% {
      transform: scale(1) translateY(-22px);
    }
    55% {
      transform: translateY(0);
    }
    65% {
      transform: translateY(-12px);
    }
    75% {
      transform: translateY(0);
    }
    80% {
      transform: translateY(-6px);
    }
    90% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0);
    }
  }
`