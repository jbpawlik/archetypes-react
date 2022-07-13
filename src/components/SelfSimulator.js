import '../App.css';
import React, {useState, useEffect} from 'react'
// import {useWindowDimensions} from '../functions/getWindowDimensions.js';
import $ from 'jquery'
import {imagesArray} from '../assets/images/imagesArray.js'
import useSound from 'use-sound';
import tap from '../assets/sounds/tap.wav'
import woodTap from '../assets/sounds/woodtap.wav'

function SelfSimulator({titleRemoved}) {
  // const { height, width } = useWindowDimensions();
  const [clicked, setClicked] = useState(false)
  const [clickToggle, toggleClick] = useState(false)
  const [imageSelected, setSelectedImage] = useState(imagesArray[8])
  const [leftButtonPressed, pressLeftButton] = useState(false)
  const [rightButtonPressed, pressRightButton] = useState(false)
  const [counter, setCounter] = useState(0)
  const [playTap] = useSound(tap)
  const [playWoodTap] = useSound(woodTap)

  useEffect(() => {
    if (!titleRemoved && counter === 0) {
      setSelectedImage(imagesArray[8])
    } else if (imageSelected === imagesArray[8] && !clicked && clickToggle) {
      toggleClick(true)
    } else if (!clicked && clickToggle && counter === 1) {
      setSelectedImage(imagesArray[2])
      setClicked(true)
      // setCounter(2)
    } else if (clicked && clickToggle && counter === 2) {
      setSelectedImage(imagesArray[2])
      setClicked(false)
    } else if (leftButtonPressed === false && rightButtonPressed === false) {
      setSelectedImage(imagesArray[2])
    } else if (leftButtonPressed === true && rightButtonPressed === false) {
      setSelectedImage(imagesArray[0])
    } else if (leftButtonPressed === true && rightButtonPressed === true) {
      setSelectedImage(imagesArray[1])
    } else if (leftButtonPressed === false && rightButtonPressed === true) {
      setSelectedImage(imagesArray[3])
    }
    $('.main-console').css('background-image', `url("${imageSelected}")`)
    // setSelectedImage(imageSelected)

    return () => {

    }
  }, [ clicked, clickToggle, counter, imageSelected, leftButtonPressed, rightButtonPressed])
  

  const switchImage = (num) => {
    if (counter === 0) {
      setCounter(1)
      playWoodTap()
    } 
    if (titleRemoved && counter === 1) {
    playTap()
    if (num === 0 && leftButtonPressed === false) {
      pressLeftButton(true)
      // $('.Left-text').css('display', 'none')
    } else if (num === 0 && leftButtonPressed === true) {
      pressLeftButton(false)
      // $('.Left-text').css('display', 'block')
    }
    if (num === 1 && rightButtonPressed === false) {
      pressRightButton(true)
      // $('.Right-text').css('display', 'none')

    } else if (num === 1 && rightButtonPressed === true) {
      pressRightButton(false)
      // $('.Right-text').css('display', 'block')
    }
  }}

  return (
      <>
        <div className="main-console">
          <div>
            {/* <h2 className="Left-text">ASK</h2>
            <h2 className="Right-text">ANSWER</h2> */}
          </div>
            <div className='leftSideButton' onClick={()=>{switchImage(0)}}></div>
            <div className='rightSideButton' onClick={()=>{switchImage(1)}}>
          </div>
        </div>
  </>
  );
}

export default SelfSimulator;