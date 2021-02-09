import styled from 'styled-components'

export const ProfileStyled = styled.div`
  background-color: #f8fafb;
  min-height: 100vh;

  .profile-card {
    border-radius: 26px 26px 0 0;
    margin-top: -30px;
    background-color: white;
    padding-bottom: 30px;
    text-align: center;

    h2 {
      font-size: 24px;
      font-family: ${({ theme }) => theme.fonts.text};
      color: ${({ theme }) => theme.colors.darkText};
      font-weight: 700;
    }
  }

  .dark-blue {
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }

  .light-blue {
    background-color: ${({ theme }) => theme.colors.blue};
  }

  .datos-kokomo {
      display: flex;
      align-items: center;
    span {
        font-family: ${({ theme }) => theme.fonts.heading};
    }
  }
`
