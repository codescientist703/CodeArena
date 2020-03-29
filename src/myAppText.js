import React from 'react'
import styled from 'styled-components'


const Styles = styled.div`
    width: 100%;
    min-height: 120vh;
	height: auto;	
    top: 5px;
	margin: 0 auto;
	position: relative;
	border-radius: 15px;
	background-color: #f4eeff;
	box-shadow: 5px 5px #BBE1FA;
`;

class MyAppText extends React.Component {
  render() {
    return (
        <Styles className="container">
        {this.props.children}
        </Styles>
    );
  }
}
export default MyAppText