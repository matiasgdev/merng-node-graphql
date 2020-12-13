import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.3em 0;


  button {
    max-width: 150px;
  }
`

export const Label = styled.label`
  color: var(--black-400);
  margin-bottom: .6em;
`

export const Input = styled.input`
  padding: .9em .5em;
  width: 100%;
  outline: none;
  border: none;
  border: 1px solid var(--shadow);

  &:focus {
    border-color: transparent;
    box-shadow: 0px 0px 0px 3px var(--shadow);
  }

`

