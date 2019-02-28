import React, { Component } from 'react';
import styled from 'styled-components';

const AppStyled = styled.div`
  --font-family: 'Source Sans Pro', sans-serif;

  align-items: center;
  display: flex;
  font-family: var(--font-family);
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

const Heading1Styled = styled.h1`
  font-size: 60px;
  font-weight: 600;
  text-align: center;
`;

const Heading2Styled = styled.h1`
  font-size: 80px;
  font-weight: 300;
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <AppStyled>
        <div>
          <Heading1Styled>🏕 Welcome to DevCamp!</Heading1Styled>
          <Heading2Styled>Micro-interactions Workshop</Heading2Styled>
        </div>
      </AppStyled>
    );
  }
}

export default App;
