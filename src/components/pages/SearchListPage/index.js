import React, { Component } from 'react'
import styled from 'styled-components'

import {
  StyledCard,
  LoadingIndicator,
} from '../../styled/ui-components'

import { bindAllMethods } from '../../../utilities/react'

import Mock from './mock.json'

class SearchListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      searchList: [],
    }
    bindAllMethods(this)
  }
  componentDidMount () {
    this.requestSearchList(this.props.keyword)
  }
  render () {
    return <SearchListContainer>{ this.renderResult() }</SearchListContainer>
  }
  renderResult () {
    const { isLoaded, searchList } = this.state
    if (!isLoaded) {
      return <LoadingIndicator showLoading={true} />
    }
    if (searchList.length === 0) {
      return <div><strong>검색 결과가 없습니다.</strong></div>
    }

    return (
      <>
        <SearchCount>
          총 { searchList.length }개의 검색 결과가 있습니다.
        </SearchCount>
        <SearchList>
          { searchList.map(this.renderSearchItem) }
        </SearchList>
      </>
    )
  }

  renderSearchItem (searchItem, index) {
    const { name, thumbnail, originalPrice, priceList } = searchItem

    // 한글 변수명도 되니까 한번 해봤는데 이런건 어떠신가요?
    let 최저가 = priceList.reduce((lowest, priceItem) =>
      (priceItem.price < lowest.price) ? lowest : priceItem
    )
    let 할인율 = Math.round(최저가.price / originalPrice * 100)

    return (
      <SearchItem key={ index }>
        <ThumbnailImg src={ thumbnail } />
        <ProductInfo>
          <div className="row-name">{ name }</div>
          <div className="row-lowest-price">
            최저 
            <span>{ 최저가.price }원</span>
            <span>{ 할인율 }%</span>
          </div>
        </ProductInfo>
      </SearchItem>
    )
  }

  async requestSearchList (keyword) {
    const response = await new Promise ((resolve) => {
      setTimeout(() => resolve(Mock), 7000)
    })
    this.setState({
      isLoaded: true,
      searchList: response,
    })
  }
}

const SearchListContainer = styled.div`
  border: 4px solid red;
  display: flex;
  flex-direction: column;
`

const SearchCount = styled.div`
  margin-bottom: 20px;
  font-weight: bold;
`

const SearchList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 30px;
`

const SearchItem = styled(StyledCard)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  display: flex;
  flex-direction: column;

  padding: 0;
`

const ThumbnailImg = styled.div`
  background: url(${props => props.src}) no-repeat center;
  background-size: 100%;
  background-color: black;

  padding-top: 100%;
`

const ProductInfo = styled.div`
  padding: 5px 10px;
  height: 80px;

  .product-name {
    font-size: 9pt;
    font-weight: bold;
  }
`

export default SearchListPage
