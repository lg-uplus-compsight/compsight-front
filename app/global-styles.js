import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;800&display=swap');
  }

  body {
    font-family: 'Nanum Gothic', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Nanum Gothic', sans-serif;
  }

  #app {
    background-color: #fafafa;
    height: 100vh;
    width: 100vw;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .switch-wrapper {
  position: relative;
}

.switch-wrapper > div {
  position: absolute;
}
`;

export default GlobalStyle;
