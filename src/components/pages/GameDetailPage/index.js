import React, { Component } from 'react'
import styled from 'styled-components'

import {
  StyledCard,
} from '../../styled/ui-components'


class GameDetailPage extends Component {
  render () {
    return (
      <Container>
        <Title>스토어 별 가격 목록</Title>
        {
         new Array(5).fill(1).map((i, idx) =>
            <PriceItem key={idx}>
              <PlatformImage>Steam</PlatformImage>
              <DataLabel> 2,4000 원 </DataLabel>
              <PercentItem>50%</PercentItem>
            </PriceItem>
          )
        }
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  background-color : white;
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
