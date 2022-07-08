import './App.css';
import React, {useState, useEffect} from 'react'
import {useWindowDimensions} from './functions/getWindowDimensions.js';
import $ from 'jquery'
import {imagesArray} from './assets/images/imagesArray.js'

function App() {
  const { height, width } = useWindowDimensions();
  const [imageSelected, setSelectedImage] = useState(imagesArray[2])
  const [leftButtonPressed, pressLeftButton] = useState(false)
  const [rightButtonPressed, pressRightButton] = useState(false)

  useEffect(() => {

    if (leftButtonPressed === false && rightButtonPressed === false) {
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
  }, [imageSelected, leftButtonPressed, rightButtonPressed])
  

  const switchImage = (num) => {

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


  }

  return (<>
    <div className="App-background">
      <div className="App-container" style={{height: height, width: width}}>>
        <div className="main-console" style={{height: height, width: width}}>>
        <div>
          {/* <h1 className="App-title" onClick={() => $('.App-title').css('display', 'none') }>ARCHETYPES</h1> */}
          {/* <h2 className="Left-text">ASK</h2>
          <h2 className="Right-text">ANSWER</h2> */}
        </div>
        <div style={{display: 'flex'}}>
          <div className='leftSideButton' style={{height: height, width: width/2, left: 0}} onClick={()=>{switchImage(0)}}></div>
          <div className='rightSideButton' style={{height: height, width: width/2, right: 0}} onClick={()=>{switchImage(1)}}>
          </div>
        </div>
      </div>
      {/* <script type="text/babel" src='./textInterface/textInterface.js'></script> */}
    </div>
    </div>
  </>
  );
}

export default App;
