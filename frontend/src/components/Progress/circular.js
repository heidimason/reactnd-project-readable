import React from 'react'
import styled from 'styled-components'
import CircularProgress from 'material-ui/CircularProgress'
import { cyanA400 } from 'material-ui/styles/colors'

const LoadingAnimation = () => (
	<ProgressDiv>
	  	<CircularProgress
    		size={80}
    		thickness={5}
    		color={cyanA400}
	  	/>
	</ProgressDiv>
)

const ProgressDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

export default LoadingAnimation