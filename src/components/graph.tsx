import React from 'react'
import styled from '@emotion/styled'
import { Demo } from './newComponent';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`
export const StyledTreeExample = () => {
    return (
        <Demo />
    )
}