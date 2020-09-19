import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonKokomo = styled(Link)`
  display: inline-block;
  font-family: ${props => props.theme.fonts.text};
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

const ButtonKokomoSuccess = styled(ButtonKokomo)`
  color: #fff;
  background-color: ${props => props.theme.colors.success};

  &:hover {
    color: #fff;
    background-color: #0ac09f;
  }
`;

const ButtonKokomoGrey = styled(ButtonKokomo)`
  color: #fff;
  background-color: ${props => props.theme.colors.grey};

  &:hover {
    color: #fff;
    background-color: #0ac09f;
  }
`;

export { ButtonKokomo, ButtonKokomoSuccess };
