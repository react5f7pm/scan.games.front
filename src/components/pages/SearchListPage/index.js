import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
  StyledCard,
  LoadingIndicator,
} from '../../styled/ui-components'

import {
  bindAllMethods,
  numberFormat,
} from '../../../utilities/common'

import Mock from './mock.json'

const PLATFORM = {
  STEAM: {
    name: 'Steam',
    logoImg: 'https://pngimage.net/wp-content/uploads/2018/06/steam-logo-png-7.png',
  },
  ORIGIN: {
    name: 'Origin',
    logoImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Origin.svg/1280px-Origin.svg.png',
  },
  PLAYSTATION: {
    name: 'PlayStation',
    logoImg: 'https://ww.namu.la/s/951f943def954ab8d00d6afdb323afbefcd4cc85eba464556e508dc4f42b7f09fa7fd7fc54995ab52df092e6af1b37404fb83650833f91247a491aeda4ee500a911997231b6536094a2af5ac134fa60fbd931d355e07fa8fc9854dd5bd67d294',
  },
}

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
    const { isLoaded, searchList } = this.state
    return (
      <SearchListContainer>
        <LoadingIndicator showLoading={ !isLoaded }>
          {
            searchList.length
            ? <>
                <SearchCount>
                  총 { searchList.length }개의 검색 결과가 있습니다.
                </SearchCount>
                <SearchList>
                  { searchList.map(this.renderSearchItem) }
                </SearchList>
              </>
            : <div><strong>검색 결과가 없습니다.</strong></div>
          }
        </LoadingIndicator>
      </SearchListContainer>
    )
  }

  renderSearchItem (searchItem, index) {
    const { productId, name, thumbnail, originalPrice, priceList } = searchItem

    // 한글 변수명도 되니까 한번 해봤는데 이런건 어떠신가요?
    let 최저가 = priceList.reduce((lowestItem, priceItem) =>
      (priceItem.price < lowestItem.price) ? priceItem : lowestItem
    )
    let 할인율 = Math.round((1 - 최저가.price / originalPrice) * 100)

    const { name: platformName, logoImg } = PLATFORM[최저가.platformId]

    return (
      <SearchItem key={ index }>
        <ThumbnailImg src={ thumbnail } />
        <ProductInfo>
          <div className="product-name">{ name }</div>
          <div className="product-lowest-price">
            <span className="lowest-price">
              최저 { numberFormat(최저가.price) }
            </span>
            {
              (할인율 > 0) &&
              <span className="discount-rate">
                { 할인율 }%
              </span>
            }
            <span className="platform-logo">
              <img src={ logoImg } alt={ platformName } />
            </span>
          </div>
          {/* TODO: 파라미터 명은 임의로 넣음 - 차후 스키마 보고 수정 */}
          {/* 애니메이션 필요하면 Link 쓰지말고 직접 구현 */}
          <DetailLink to={`/detail?productId=${productId}`}>
            + { priceList.length - 1 } more store
          </DetailLink>
        </ProductInfo>
      </SearchItem>
    )
  }

  async requestSearchList (keyword) {
    const response = await new Promise ((resolve) => {
      setTimeout(() => resolve(Mock), 1000)
    })
    await this.setState({
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
  display: flex;
  flex-flow: column nowrap;
  padding: 6px 12px;
  height: 100px;
  justify-content: space-between;

  > * {
    margin-bottom: 6px;
  }

  .product-name {
    flex: 0;
    font-size: 9pt;
    font-weight: bold;
    margin-top: 4px;
  }

  .product-lowest-price {
    flex: 1;

    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;

    .lowest-price {
      flex: 1;
      font-size: 9pt;
      margin-right: 8px;
      white-space: nowrap;
    }

    .discount-rate {
      flex: auto;
      font-size: 8.5pt;
      color: red;
      &::before {
        content: '▼';
        margin-right: 1.5px;
      }
    }

    /* 이 부분 가능하면 동일한 사이즈의 플랫폼 로고가 필요함. */    
    .platform-logo {
      flex: auto;

      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;

      height: 20px;
      overflow: hidden;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`

const DetailLink = styled(Link)`
  flex: 0;
  text-align: right;
  font-size: 9pt;
  color: gray;

  text-decoration: none;
  cursor: pointer;
`

export default SearchListPage
