import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";

export const NavbarKokomoStyle = styled(Navbar)`
  background-color: ${(props) => props.theme.colors.blue};
  box-shadow: 0px 4px 40px rgba(141, 136, 131, 0.45);
  border-radius: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 10px;
  z-index: 1000;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0;
    margin: 0;
    width: 100%;

    li {
      list-style: none;
      font-size: 20px;
      border-radius: 20px;
      background-color: #3294bb;
      padding: 0;

      a {
        font-size: 24px;
        color: #7eb9d0;
      }
    }
  }

  .navbar-active-login {
    color: ${(props) => props.theme.colors.cream};

    .dot-kokomo {
      color: ${(props) => props.theme.colors.orange};
      font-size: 6px;
      display: block;
      text-align: center;
    }
  }

  .dot-kokomo {
    display: none;
  }

  .search-icon-menu {
    background-color: ${(props) => props.theme.colors.cream};
    margin-top: -20px;
    padding: 10px 16px !important;
    box-shadow: 0px 4px 40px rgba(141, 136, 131, 0.45);

    a {
      color: ${(props) => props.theme.colors.blue};
    }
  }

  @media all and (min-width: 768px) {
    box-shadow: 0px 4px 40px rgba(141, 136, 131, 0.45);
    border-radius: 26px;
    position: fixed;
    top: 0;
    right: auto;
    width: auto;
    margin: 10px;
    z-index: 100;

    ul {
      display: flex;
      flex-direction: column;
      margin: 0;
      height: 100%;

      li {
        border-radius: 30px;
        background-color: ${(props) => props.theme.colors.blue};
        padding: 20px;

        a {
          font-size: 28px;
        }
      }
    }

    .search-icon-menu {
      background-color: ${(props) => props.theme.colors.cream};
      margin-top: -10px;
      padding: 20px !important;
      box-shadow: 0px 4px 40px rgba(141, 136, 131, 0.45);
    }
  }
`;
