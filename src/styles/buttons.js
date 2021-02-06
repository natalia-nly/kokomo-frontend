import styled from 'styled-components'

export const ButtonKokomo = styled.button`
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
   color: ${({ theme, white }) => (white ? theme.colors.grey : 'white')};
   background-color: ${({ theme, danger, white, success }) =>
      success
         ? theme.colors.success
         : danger
         ? theme.colors.danger
         : white
         ? 'white'
         : theme.colors.grey};
`
export const ButtonKokomoBlock = styled(ButtonKokomo)`
   width: 100%;
   padding: 16px;
`
