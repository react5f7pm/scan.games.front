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
    if (e.keyCode === 13) {
      //  TODO: 검색 API 연동
      const path = '/search'
      this.props.history.push(path)
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
              type="text"
              value={ inputValue }
              onChange={ (e) => this.onChangeSearch(e) }
              onKeyUp={ (e) => this.onKeyUp(e) }/>
          </SearchBar>
        </NavBar>
        { this.renderContent() }
      </StyledSearchLayout>
    )
  }

  renderContent () {
    const currentPath = this.props.location.pathname
    if (currentPath === '/') return

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
const SearchIcon = styled.div`
  display: flex;
  ${itemCenter}
  padding-left: 10px;
  padding-right: 10px;
  color: gray;
  opacity: 0.8;
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
  ::placeholder {
    color: #6E6E73;
  }
`

const ContentSection = styled.div`
  border: 1px solid black;
  background-color: lightgray;
  min-height: 50vh;
`

export default withRouter(SearchLayout)
