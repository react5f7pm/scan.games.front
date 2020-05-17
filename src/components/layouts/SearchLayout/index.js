import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { withRouter } from 'react-router-dom'
import {
  DropDown,
  StyledInput,
} from '../../styled/ui-components'
import {
  bindAllMethods,
} from '../../../utilities/common'

class SearchLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      placeholder: 'scan.games 검색',
      isMain: false,
      deviceList: [
        {
          name: 'desktop',
        },
        {
          name: 'switch',
        },
        {
          name: 'mobile',
        },
      ],
    }
    bindAllMethods(this)
  }

  componentDidMount () {
    if (this.searchInputRef) {
      this.searchInputRef.focus()
    }
    this.detectCurrentPath()
  }

  detectCurrentPath () {
    let { location } = this.props
    const currentPath = location.pathname
    let isMain = false
    //  NOTE: 최초 렌더시에는 props.location의 state값이 ud이다.
    if (!location.state) {
      isMain = currentPath === '/'
    }
    this.setState({ isMain })
  }

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      const currentPath = this.props.location.pathname
      if (currentPath === '/') {
        this.setState({
          inputValue: '',
        })
      }
      this.detectCurrentPath()
    }
  }

  onChangeSearch (e) {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onKeyUp (e) {
    let { inputValue } = this.state
    if (e.keyCode === 13) {
      this.props.history.push({
        pathname: '/search',
        state: {
          //  TODO: 각 페이지에서 라우트 이동시 이전 페이지 path 넘기기
          prevPath: this.props.location.pathname,
          keyword: inputValue.trim(),
        }
      })
    }
  }

  onClickLogo () {
    this.props.history.push({ pathname: '/' })
  }

  render () {
    let { placeholder, inputValue, isMain } = this.state

    return (
      <StyledSearchLayout isMain={ isMain }>
        <NavBar isMain={ isMain }>
          <Logo isMain={ isMain } onClick={ this.onClickLogo }>
            Scan Games
          </Logo>
          <SearchBar isMain={ isMain }>
            <SearchIcon isMain={ isMain } />
            <SearchInput
              placeholder={ placeholder }
              ref={(input) => { this.searchInputRef = input }}
              type="search"
              value={ inputValue }
              onChange={ (e) => this.onChangeSearch(e) }
              onKeyUp={ (e) => this.onKeyUp(e) }/>
          </SearchBar>
          { this.renderDeviceDropDown() }
        </NavBar>
        { this.renderContent() }
      </StyledSearchLayout>
    )
  }

  renderDeviceDropDown () {
    const currentPath = this.props.location.pathname
    if (currentPath !== '/detail') return
    let { deviceList } = this.state

    return <DropDown contentList={ deviceList } />
  }

  renderContent () {
    const { isMain } = this.state
    if (isMain) return

    return (
      <ContentSection>
        { this.props.children }
      </ContentSection>
    )
  }
}

const itemCenter = css`
  justify-content: center;
  align-items: center;
`
const StyledSearchLayout = styled.div`
  ${({ isMain }) => isMain &&
    css`
      display: flex;
      flex-direction: column;
    `
  }
  background: #2D485B;
  height: 100vh;
  overflow: hidden; 
  ${itemCenter}
`
const slideUpNav = keyframes`
  0% {
    opacity: 20%;
    height: 100vh;
    transform: translate(0px, -50vh);
  }
  100% {
    transform: translate(0px, -100vh);
  }
`
const NavBar = styled.div`
  display: flex;
  background: #2D485B;
  height: 7vh;
  ${({ isMain }) => isMain
    ? css`
        ${itemCenter}
      `
    : css`
        animation: ${slideUpNav} 1.5s ease-in-out;
      `} 
  } 
`
const slideFadeUpLogo = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const Logo = styled.div`
  color: #FFFFFF;
  font-weight: 300;
  font-size: 3rem;
  cursor: pointer;
  ${({ isMain }) => isMain
    ? css`
        top: 30vh;
        position: absolute;
      `
    : css`
      animation: ${slideFadeUpLogo} 4s ease-in-out;
    `}
`
const fadeIn = keyframes`
  from {
    opacity: 20%;
  }
`
const slideUpSearchBar = keyframes`
  0% {
    transform: translate(0px, 100vh);
  }
  100% {
    transform: translate(0px, 100vh);
  }
`
const SearchBar = styled.div`
  display: flex;
  ${({ isMain }) => isMain
    ? css`
        animation: ${fadeIn} 1s ease-in-out;
      `
    : css`
        animation: ${slideUpSearchBar} 1.5s ease-in-out;
      `} 
`
const SearchIcon = styled.i.attrs({ className: 'fa fa-2x fa-search' })`
  display: flex;
  ${itemCenter}
  padding-left: 10px;
  padding-right: 10px;
  color: gray;
  opacity: 0.8;
  ${({ isMain }) => isMain === false &&
    css`
      animation: ${slideUpSearchBar} 1.5s ease-in-out;
    `}
`
const SearchInput = styled(StyledInput)`
  font-size: 20px;
  font-weight: 300;
  padding-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  ::placeholder {
    color: #6E6E73;
  }
  background: #FFFFFF;
  color: #000000;
`
const slideUpContent = keyframes`
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
`
const ContentSection = styled.div`
  position: relative;
  background-color: whitesmoke;
  height: 93vh;
  overflow: auto;
  animation: ${slideUpContent} 1.5s ease-in-out;
`

export default withRouter(SearchLayout)
