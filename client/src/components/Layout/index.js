import React from 'react'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  max-width: 980px;
  width: 100%;
  margin: 0 auto;
` 

function Layout({children}){
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  )
}

export default Layout