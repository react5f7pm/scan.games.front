import React, { Component } from 'react'
import styled from 'styled-components'

import {
  StyledCard,
  LoadingIndicator,
} from '../../styled/ui-components'

class SearchListPage extends Component {
  render () {
    return (
      <SearchListContainer>
        {/* <SearchList>
          { 
            new Array(10).fill(1).map((i, idx) =>
              <SearchItem key={idx}>
                <ThumbnailImg src="https://steamstore-a.akamaihd.net/public/shared/images/header/globalheader_logo.png" />
                <ProductInfo>
                  어새신 구리드
                </ProductInfo>
              </SearchItem>
            )
          }
        </SearchList> */}
        <LoadingIndicator showLoading={true} fillScreen={true} />
      </SearchListContainer>
    )
  }
}

const SearchListContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: inherit;
`

const SearchList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`

const SearchItem = styled(StyledCard)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  display: flex;
  flex-direction: column;

  margin: 10px;
  padding: 0;
`

const ThumbnailImg = styled.div`
  background: url(${props => props.src}) no-repeat center;
  min-width: 100%;
  text-align: center;
  padding-top: 100%;

  border: 1px solid red;
`

const ProductInfo = styled.div`
  padding: 10px;
  height: 80px;
`

export default SearchListPage
