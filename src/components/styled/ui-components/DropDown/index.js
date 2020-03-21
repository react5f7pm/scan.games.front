import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const propType = {
  contentList: PropTypes.array.isRequired,
}

class DropDown extends Component {

  render () {
    let { contentList } = this.props
    return (
      <DropDownContainer>
        {/* TODO: 드롭다운 아이콘 dynamic 변경 */}
        <DropDownIcon>
          <i className="fa fa-2x fa-desktop"></i>
        </DropDownIcon>
        <DropDownContent>
          {
            contentList.map((content, index) => (
              <Content key={ index }>
                <ContentName>
                  { content.name }
                </ContentName>
              </Content>
            ))
          }
        </DropDownContent>
      </DropDownContainer>
    )
  }
}

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
const Content = styled.div`
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
const ContentName = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #000000;
`

DropDown.propTypes = propType

DropDown.defaultProps = {
  contentList: [],
}

export default DropDown