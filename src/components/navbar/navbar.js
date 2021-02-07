import styled from 'styled-components'
import Navbar from 'react-bootstrap/Navbar'

export const UserNavbarStyle = styled(Navbar)`
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
      color: ${({ theme }) => theme.colors.blue};
    }
  }

  @media all and (min-width: 1000px) {
    //display: none;
  }
`

export const UserNavbarDesktopStyle = styled(Navbar)`
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 0;

  .navbar-brand {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: rgb(255 255 255 / 0.8);

    &:hover {
      color: white;
    }

    &:focus {
      color: white;
    }
  }

  .nav-item {
    margin-left: 24px;
    color: rgb(255 255 255 / 0.7);
    padding: 14px 4px;
    border-bottom: 4px solid transparent;
  }

  .navbar-active {
    color: white;
    border-bottom: 4px solid #197ba2;
  }

  .navbar-avatar {
    width: 22px;
    height: 22px;
    border-radius: 100%;
    object-fit: cover;
    margin-right: 12px;
    margin-top: -2px;
  }
`

export const MainNavbarStyle = styled(Navbar)`
  .navbar-brand {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.blue};
  }

  .navbar-toggler,
  i {
    border: none;
    color: #3294bb;
  }

  .navbar-active-logout {
    border-bottom: 4px solid ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};
  }
`
