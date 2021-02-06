import styled from "styled-components";

export const CategoriesStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  overflow: scroll;
  padding: 0 0 50px 20px;

  div {
    display: flex;
    flex-direction: column;
    width: 90px;
    background-color: ${(props) => props.theme.colors.blue};
    border-radius: 80px;
    padding: 12px;
    align-items: center;
    text-align: center;
    justify-content: center;
    transition: all ease 0.3s;

    &:hover {
      background-color: #2f8aaf;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }

    p {
      color: white;
      font-size: 14px;
      padding-top: 10px;
      padding-bottom: 14px;
    }

    img {
      width: 100%;
      background-color: white;
      border-radius: 100%;
      padding: 16px;
      box-shadow: 0 0 10px #106688;
    }
  }

  @media all and (min-width: 768px) {
    width: 560px;
    overflow: hidden;
  }
`;

export const CarouselPropStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0;
  overflow: scroll;
  padding: 20px;

  .property-card {
    width: 45vw;
    padding: 14px;
    margin-top: -60px;

    img {
      width: 100%;
      height: 50vw;
      object-fit: cover;
      border-radius: 20px;
    }

    .blur-image {
      position: relative;
      top: -58vw;
      z-index: -1;
      filter: blur(10px);
      opacity: 0.5;
      margin-bottom: -60vw;
    }

    h3 {
      font-family: europa, sans-serif;
      font-weight: 800;
      color: #809eaa;
      font-size: 18px;
      margin-top: -10px;
      padding-bottom: 10px;
    }

    p {
      color: #809eaa;
      font-weight: 200;
      font-size: 14px;
    }
  }

  @media all and (min-width: 768px) {
    padding: 20px 0 40px 0;

    .property-card {
      width: 30vw;
      padding: 20px;

      img {
        height: 18vw;
        border-radius: 40px;
      }

      .blur-image {
        position: relative;
        top: -40vw;
        z-index: -1;
        filter: blur(10px);
        opacity: 0.5;
        margin-bottom: -60vw;
      }

      h3 {
        font-size: 22px;
        padding-top: 10px;
      }

      p {
        color: #809eaa;
        font-weight: 200;
        font-size: 16px;
      }
    }
  }
`;
