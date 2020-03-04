import React, { Component } from 'react'

class SearchLayout extends Component {
  render () {
    return (
      <>
        <h2>여기는 Search layout 검색바 영역 입니다.</h2>
        { this.props.children }
      </>
    )
  }
}

export default SearchLayout
