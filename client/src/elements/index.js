import styled from 'styled-components'

export const Button = styled.button`
  padding: 10px 20px;
  font-size: .9em;
  font-family: var(--secondary-font);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.tomato};
  color: var(--white);

  &:hover {
    box-shadow: 0 0 10px 0 var(--shadow);
  }

`

export const Title = styled.h2`
  margin: var(--spacing-24) 0;
  font-family: var(--secondary-font);
  font-size: 24px;
  color: var(--black-400);
`

export const Container = styled.div`
  max-width: 700px;
  margin: 3em auto;
`
