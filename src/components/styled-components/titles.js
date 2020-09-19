import styled from "styled-components";

export const SectionTitleStyle = styled.h1`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.text};
  padding: 10px 0;
  border-bottom: 1px solid rgba(50, 148, 187, 0.1);
  margin-bottom: 20px !important;
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-size: 26px;

  i {
    font-size: 26px;
  }
`;

export const SectionSubtitleStyle = styled.h2`
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.text};
  color: ${(props) => props.theme.colors.darkText};
  font-weight: 700;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;
