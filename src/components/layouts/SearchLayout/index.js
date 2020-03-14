import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { withRouter } from "react-router-dom"

class SearchLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      placeholder: 'scan.games 검색',
      isMain: false,
    }
    this.renderContent = this.renderContent.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.detectCurrentPath = this.detectCurrentPath.bind(this)
  }

  componentDidMount () {
    if (this.searchInputRef) {
      this.searchInputRef.focus()
    }
    this.detectCurrentPath()
  }

  detectCurrentPath () {
    const currentPath = this.props.location.pathname
    this.setState({
      isMain: currentPath === '/',
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      if (this.props.location.pathname === '/') {
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
    if (e.keyCode === 13 && inputValue.trim() !== '') {
      //  TODO: 검색 API 연동
      this.props.history.push({
        pathname: '/search',
        state: {
          //  TODO: 각 페이지에서 라우트 이동시 이전 페이지 path 넘기기
          prevPath: this.props.location.pathname
        }
      })
    }
  }

  render () {
    let { placeholder, inputValue, isMain } = this.state

    return (
      <StyledSearchLayout isMain={ isMain }>
        <NavBar isMain={ isMain }>
          <Logo isMain={ isMain }>
            Scan Games
          </Logo>
          <SearchBar>
            <SearchIcon>
              <i className="fa fa-2x fa-search"></i>
            </SearchIcon>
            <SearchInput
              placeholder={ placeholder }
              ref={(input) => { this.searchInputRef = input }}
              type="search"
              value={ inputValue }
              onChange={ (e) => this.onChangeSearch(e) }
              onKeyUp={ (e) => this.onKeyUp(e) }/>
          </SearchBar>
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
const mainBackgroundImg = 'https://i.picsum.photos/id/366/1700/900.jpg'
const StyledSearchLayout = styled.div`
  ${({ isMain }) => isMain && 
    css`
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-image: url(${mainBackgroundImg});
    `}
  ${itemCenter}
`

const NavBar = styled.div`
  display: flex;
  ${({ isMain }) => isMain && 
    css`
      ${itemCenter}
    `}
`

const Logo = styled.div`
  color: #000000;
  font-weight: 300;
  font-size: 3rem;
  ${({ isMain }) => isMain && 
    css`
      color: #FFFFFF;
      top: 30vh;
      position: absolute;
    `}
`
const slideFade = keyframes`
  from {
    opacity: 20%;
  }
`
const SearchBar = styled.div`
  display: flex;
  animation: ${slideFade} 1.2s ease-in-out;
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
const Input = styled.input`
  width: 800px;
  height: 50px;
  padding-left: 20px;
  border-radius: 30px;
  border: unset;
  color: black;
  background: #ffffff;
  display: flex;
  ${itemCenter};
  :focus {
    outline: none;
  }
`
const SearchInput = styled(Input)`
  font-size: 20px;
  font-weight: 300;
  padding-right: 20px;
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
  background-color: whitesmoke;
  animation: ${slideUpContent} 1.5s ease-in-out;

  border: 4px solid green; /* 차후 제거 */
  position: relative;
  padding: 5% 10%;
  height: 100%;
`

export default withRouter(SearchLayout)
