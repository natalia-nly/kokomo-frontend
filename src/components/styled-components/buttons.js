import styled from "styled-components";
import { Link } from "react-router-dom";

export const ButtonKokomo = styled(Link)`
  display: inline-block;
  font-family: ${(props) => props.theme.fonts.text};
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: none;
  border-radius: 5px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const ButtonKokomoSuccess = styled(ButtonKokomo)`
  color: #fff;
  background-color: ${(props) => props.theme.colors.success};

  &:hover {
    background-color: #0ac09f;
  }
`;

export const ButtonKokomoGrey = styled(ButtonKokomo)`
  color: #fff;
  background-color: ${(props) => props.theme.colors.grey};

  &:hover {
    background-color: #0ac09f;
  }
`;

export const ButtonKokomoDanger = styled(ButtonKokomo)`
  color: #fff;
  background-color: ${(props) => props.theme.colors.danger};

  &:hover {
    background-color: #ff8964;
  }
`;

export const ButtonKokomoWhite = styled(ButtonKokomo)`
  color: ${(props) => props.theme.colors.text};
  background-color: #fff;

  &:hover {
    background-color: ${(props) => props.theme.colors.cream};
  }
`;

