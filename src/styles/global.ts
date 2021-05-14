import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #FAF5FF;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, button, span {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
  }
`;
