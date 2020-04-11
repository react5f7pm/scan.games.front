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

export const LoadingIndicator = (props) => props.showLoading ?
  <LoadingWrapper {...props}>
    <AnimateDot delay="0.33" src="https://media.playstation.com/is/image/SCEA/playstation-store-bag-spotlight-01-us-12jun17?$native_t$" />
    <AnimateDot delay="0.75" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/768px-Steam_icon_logo.svg.png" />
    <AnimateDot delay="1.2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/768px-Steam_icon_logo.svg.png" />
  </LoadingWrapper>
  : props.children

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

  background-color: #00000022;
`

const AnimateDot = styled.div`
  /* border: 1px solid gray; */
  /* border-radius: 50%; */
  width: 50px;
  height: 50px;

  /* background-color: black; */
  background-image: url("${props => props.src}");
  background-size: cover;
  background-repeat: no-repeat;

  animation-name: bouncing;
  animation-duration: ${(props) => props.delay / 1.618 + 1.618}s;
  animation-delay: ${(props) => props.delay}s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;

  margin: 15px;
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