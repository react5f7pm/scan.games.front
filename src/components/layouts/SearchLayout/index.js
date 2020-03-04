import React, { Component } from 'react'
import styled from 'styled-components'

class SearchLayout extends Component {
  render () {
    return (
      <StyledSearchLayout>
        <SearchBar>
          <h2>여기는 Search layout 검색바 영역 입니다.</h2>
        </SearchBar>
        {/* 예시) 상위 컴포넌트인 App.js에서 정의한 fade-in 클래스 사용 */}
        <ContentSection className="fade-in">
          { this.props.children }
        </ContentSection>
      </StyledSearchLayout>
    )
  }
}

/* styled-component 사용 샘플 - 대충 작성한거니 그대로 쓰지말고 참고만 해주세요 */
const StyledSearchLayout = styled.div`
  /* Override */
  .fade-in {
    animation-delay: 0.5s !important;
  }
`

const SearchBar = styled.div`
  border: 1px solid black;
  color: white;
  background-color: blueviolet;
`

const ContentSection = styled.div`
  border: 1px solid black;
  background-color: lightgray;
  min-height: 50vh;
`

export default SearchLayout
