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
    let { location } = this.props
    const currentPath = location.pathname
    let isMain = false
    //  NOTE: 최초 렌더시에는 props.location의 state값이 ud이다.
    if (location.state === undefined) {
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
      <StyledSearchLayout isMain={ currentPath === '/' }>
        <Logo isMain={ currentPath === '/' }>
          Scan Gamesss
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
            onChange={(e) => this.onChangeSearch(e)}
            onKeyUp={(e) => this.onKeyUp(e)}/>
        </SearchBar>
        {/* 예시) 상위 컴포넌트인 App.js에서 정의한 fade-in 클래스 사용 */}
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

const Logo = styled.div`
  color: #FFFFFF;
  font-weight: 300;
  font-size: 3rem;
  position: absolute;
  top: 30vh;
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
  background-color: whitesmoke;
  animation: ${slideUpContent} 1.5s ease-in-out;

  border: 4px solid green; /* 차후 제거 */
  position: relative;
  padding: 5% 10%;
  height: 100%;
`

export default withRouter(SearchLayout)
