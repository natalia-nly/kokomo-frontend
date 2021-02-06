import styled from "styled-components";

export const Checkbox = styled.div`
/* The container */
.container {
    display: block;
    position: relative;
    padding-left: 32px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1.2em;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 19px;
    width: 19px;
    background-color: #eee;
  }
  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: ${({theme}) => theme.colors.success};
  }
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .emoji {
    width: 40px;
    margin-top: -10px;
  }
`