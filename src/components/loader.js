import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
@keyframes ldio-5ds1hkq5hen-1 {
    0% { transform: rotate(0deg) }
   50% { transform: rotate(-45deg) }
  100% { transform: rotate(0deg) }
}
@keyframes ldio-5ds1hkq5hen-2 {
    0% { transform: rotate(180deg) }
   50% { transform: rotate(225deg) }
  100% { transform: rotate(180deg) }
}
.ldio-5ds1hkq5hen > div:nth-child(2) {
  transform: translate(-15px,0);
}
.ldio-5ds1hkq5hen > div:nth-child(2) div {
  position: absolute;
  top: 28.2px;
  left: 28.2px;
  width: 84.6px;
  height: 42.3px;
  border-radius: 84.6px 84.6px 0 0;
  background: #f8b26a;
  animation: ldio-5ds1hkq5hen-1 1s linear infinite;
  transform-origin: 42.3px 42.3px
}
.ldio-5ds1hkq5hen > div:nth-child(2) div:nth-child(2) {
  animation: ldio-5ds1hkq5hen-2 1s linear infinite
}
.ldio-5ds1hkq5hen > div:nth-child(2) div:nth-child(3) {
  transform: rotate(-90deg);
  animation: none;
}@keyframes ldio-5ds1hkq5hen-3 {
    0% { transform: translate(133.95px,0); opacity: 0 }
   20% { opacity: 1 }
  100% { transform: translate(49.349999999999994px,0); opacity: 1 }
}
.ldio-5ds1hkq5hen > div:nth-child(1) {
  display: block;
}
.ldio-5ds1hkq5hen > div:nth-child(1) div {
  position: absolute;
  top: 64.86px;
  left: -5.64px;
  width: 11.28px;
  height: 11.28px;
  border-radius: 50%;
  background: #e15b64;
  animation: ldio-5ds1hkq5hen-3 1s linear infinite
}
.ldio-5ds1hkq5hen > div:nth-child(1) div:nth-child(1) { animation-delay: -0.67s }
.ldio-5ds1hkq5hen > div:nth-child(1) div:nth-child(2) { animation-delay: -0.33s }
.ldio-5ds1hkq5hen > div:nth-child(1) div:nth-child(3) { animation-delay: 0s }
.loadingio-spinner-bean-eater-wvxnja5qh2l {
  width: 141px;
  height: 141px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-5ds1hkq5hen {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-5ds1hkq5hen div { box-sizing: content-box; }

h3{
	display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
text-shadow: 2px 2px 5px orange;
  color: purple;
}
.poso{
	padding: 50px;
	display: flex;
  justify-content: center;
  align-items: center;
}


`;

function Loader(){
	return (
		<Styles>
		<h3>Please Wait, Chef is compiling the code......</h3>
		<div className='poso'>
		<div className="loadingio-spinner-bean-eater-wvxnja5qh2l"><div className="ldio-5ds1hkq5hen">
<div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
</div></div>
</div>
</Styles>
)

}
export default Loader