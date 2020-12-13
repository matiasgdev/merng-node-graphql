import styled, {keyframes} from 'styled-components'

export const Container = styled.div`
  position: relative;

`

const opacity = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`


export const Message = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  border-radius: 5px;
  line-height: 1px;
  font-size: 11px;
  top: 0;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -105%);
  width: max-content;
  height: 20px;
  background-color: black;
  color: whitesmoke;
  animation: ${opacity} 300ms forwards ease-out;


  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translate(50%, 100%);
    display: inline-block;
    border: 4px solid black;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
  }
`