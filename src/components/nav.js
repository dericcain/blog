import React, { Component } from 'react'
import styled from 'styled-components'

const StyledNav = styled.nav`
  position: fixed;
  width: 300px;
  top: 0;
  left: -300px;
  height: 100%;
  z-index: 99999;
  background: red;
  transform: translateX(${({ x }) => `${x}px`});
`

export default class Nav extends Component {
  render() {
    return (
      <StyledNav x={this.props.x}>
        <h4>Navigation</h4>
      </StyledNav>
    )
  }
}
