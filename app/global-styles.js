import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;800&display=swap');
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }

  #app {
    /* background-color: #fafafa; */
    height: 100vh;
    width: 100vw;
    background: #355C7D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #C06C84, #6C5B7B, #355C7D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #C06C84, #6C5B7B, #355C7D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
    height: 100vh;
    width: 100vw;
  }
  .hightlight {
    color: "red"
  }
  .full {
   width: 100% 
  }
  text {
    cursor: pointer;
  }

`;

export default GlobalStyle;
