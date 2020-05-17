import React, { Component } from 'react'
import styled from 'styled-components'

import {
  StyledCard, LoadingIndicator, DropDown
} from '../../styled/ui-components'

import {
  bindAllMethods,
  numberFormat,
} from '../../../utilities/common'

import Mock from './mock.json'

class GameDetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      gameDetailInfo : {},
    }
    bindAllMethods(this)
  }

  componentDidMount () {
    this.requestItemInfo()
  }

  render () {
    const { isLoaded, gameDetailInfo } = this.state

    return (
      <Container>
        <LoadingIndicator showLoading={ !isLoaded }>
          {
            Object.keys(gameDetailInfo).length === 0 
            ? <div><strong>검색 결과가 없습니다.</strong></div>
            : <>
                <InfoImage src={ gameDetailInfo.thumbnail }>
                  <InfoCompany>{ gameDetailInfo.company }</InfoCompany>
                  <InfoProductTitle>{ gameDetailInfo.name }</InfoProductTitle>
                </InfoImage>
                <ItemContainer>
                  <Title>스토어 별 가격 목록</Title>
                  {
                    gameDetailInfo.priceList.map((content, idx) => (
                      <PriceItem key={idx}>
                        <PlatformImage>{ content.platformId }</PlatformImage>
                        <DataLabel>{ content.price }</DataLabel>
                        <PercentItem>{ (content.price - gameDetailInfo.originalPrice) * 100 / gameDetailInfo.originalPrice }%</PercentItem>
                      </PriceItem>
                    ))
                  }
                </ItemContainer>
              </>
          }
        </LoadingIndicator>
      </Container>
    )
  }

  async requestItemInfo () {
    await this.setState({ isLoaded: false })

    const response = await new Promise ((resolve) => {
      setTimeout(() => resolve(Mock), 1000)
    })

    await this.setState({
      isLoaded: true,
      gameDetailInfo: response,
    })
  }
}
const InfoImage = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  padding-top : 70px;
  padding-bottom : 30px;
  padding-left: 20%;
  padding-right : 20%;
`
const InfoCompany = styled.div`
  color : white;
`
const InfoProductTitle = styled.div`
  color : white;
  font-weight : bold;
  font-size : 40px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  background-color : transparent;
  width = 100%;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  background-color : transparent;
  padding-left: 20%;
  padding-right : 20%;
`

const Title = styled.div`
  font-size : 20px;
  padding-top : 10px;
  padding-bottom : 10px;
`

const PriceItem = styled(StyledCard)`
  display: inline-flex;
  flex-direction: row;
  margin : 5px;
  height : 40px;
  width : 100%;
`
const PlatformImage = styled.div`
  font-size : 20px;
  display: left;
  order : 0;
  flex-grow : 1;
`

const DataLabel = styled.div`
  font-size : 20px;
  display: inline-block;
  order : 1;
`

const PercentItem = styled.div`
  float : right;
  order : 2;
`

export default GameDetailPage
