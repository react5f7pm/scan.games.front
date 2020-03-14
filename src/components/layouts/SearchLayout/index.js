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
      this.props.history.push('/search')
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
              isMain={ isMain }
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
  // TODO: 드롭다운 UI 컴포넌트 분리
  renderDeviceDropDown () {
    const currentPath = this.props.location.pathname
    let { deviceList } = this.state
    if (currentPath !== '/detail') return

    return <DropDown contentList={ deviceList } />
  }

  renderContent () {
    const { isMain } = this.state
    if (isMain) return

    return (
      <DropDownContainer isDetail={ currentPath === '/detail' }>
        <DropDownIcon>
          <i className="fa fa-2x fa-desktop"></i>
        </DropDownIcon>
        <DropDownContent>
          {
            deviceList.map((device, index) => (
              <DeviceContent key={ index }>
                <DeviceName href="#">
                  { device.name }
                </DeviceName>
              </DeviceContent>
            ))
          }
        </DropDownContent>
      </DropDownContainer>
    )
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
  background-color: #000000;
  ${({ isMain }) => isMain && 
    css`
      background-color: unset;
      ${itemCenter}
    `}
`
const Logo = styled.div`
  color: #FFFFFF;
  font-weight: 300;
  font-size: 3rem;
  ${({ isMain }) => isMain && 
    css`
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
  color: #FFFFFF;
  display: flex;
  background: #000000;
  ${itemCenter};
  :focus {
    outline: none;
  }
`
const SearchInput = styled(Input)`
  font-size: 20px;
  font-weight: 300;
  padding-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  ::placeholder {
    color: #6E6E73;
  }
  ${({ isMain }) => isMain && 
    css`
      background: #FFFFFF;
      color: unset;
    `}
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

const DropDownIcon = styled.div`
  color: gray;
  margin-top: 10px;
  margin-bottom: 10px;
`
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #FFFFFF;
  min-width: 160px;
  border-radius: 18px;
`
const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: auto;
  &: hover ${DropDownContent} {
    display: block;
  }
  &: hover ${DropDownIcon} {
    color: #FFFFFF;
  }
`
const DeviceContent = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border-top: 1px solid #d2d2d7;
  &: hover a {
    text-decoration: underline;
  }
  &: first-child {
    border-top-style: none;
  }
`
const DeviceName = styled.a`
  text-decoration: none;
  color: #000000;
`

const ContentSection = styled.div`
  border: 1px solid black;
  background-color: lightgray;
  min-height: 50vh;
`

export default withRouter(SearchLayout)
