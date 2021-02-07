import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  body {
    padding: 0px;
  }

  * {
    font-family: europa, sans-serif;
    font-size: 16px;
  }

  a {
    color: #ffba69;
    
    &:hover {
      text-decoration: none !important;
    }
  }


  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-bottom: 0px !important;
  }

  p {
    color: #809eaa;
  }

  

  .btn-kokomo {
    display: inline-block;
    font-family: ${({ theme }) => theme.fonts.text};
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border: none;
    border-radius: 5px;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .btn-kokomo-success {
    color: #fff;
    background-color: ${(props) => props.theme.colors.success};

    &:hover {
      background-color: #0ac09f;
    }
  }

  .btn-kokomo-grey {
    color: #fff;
    background-color: ${(props) => props.theme.colors.grey};

    &:hover {
      background-color: #0ac09f;
    }
  }

  .btn-kokomo-danger {
    color: #fff;
    background-color: ${(props) => props.theme.colors.danger};

    &:hover {
      background-color: #ff8964;
    }
  }

  .btn-kokomo-white {
    color: ${(props) => props.theme.colors.text};
    background-color: #fff;

    &:hover {
      background-color: ${(props) => props.theme.colors.cream};
    }
  }

  .btn-kokomo-google {
    color: ${(props) => props.theme.colors.text};
    background-color: #fff;
    border: 1px solid ${(props) => props.theme.colors.text};

    &:hover {
      background-color: ${(props) => props.theme.colors.cream};
      border: 1px solid ${(props) => props.theme.colors.text};
      color: ${(props) => props.theme.colors.text};
    }
  }

  .btn-kokomo-circle {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    width: 40px;
    height: 40px;
    padding: 8px;
    font-size: 1rem;
    line-height: 1.5;
    border: none;
    border-radius: 100%;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .btn-kokomo-flex {
    width: 90%;
    padding: 22px;
    border-radius: 8px;
    margin-left: 10%;
    border-color: transparent;
    background: ${(props) => props.theme.colors.success};
    color: white;
  }

  .badge-maps {
    padding: 4px 10px;
    display: inline-block;
    font-weight: 800;
    text-transform: uppercase;
    border-radius: 8px;
    font-size: 12px;
  }

  .badge-opened {
    color: ${(props) => props.theme.colors.success};
    background-color: rgb(10 197 163 / 20%);
  }

  .badge-closed {
    color: ${(props) => props.theme.colors.danger};
    background-color: rgb(255 141 105 / 20%);
  }

  .badge-tag {
    color: ${(props) => props.theme.colors.orange};
    background-color: rgb(255, 186, 105 / 0.2);
  }
`
