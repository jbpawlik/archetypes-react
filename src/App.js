import './App.css';
import {useWindowDimensions} from './functions/getWindowDimensions.js';
import $ from 'jquery'
import {imagesArray} from './assets/images/imagesArray.js'

function App() {
  const { height, width } = useWindowDimensions();



  const switchImage = () => {
    console.log('clicked')
    $('.main-console').css('background-image', `url("${imagesArray[0]}")`)
  }

  return (<>
    <div className="App-background">
      <div className="App-container" style={{height: height, width: width}}>>
        <div onClick={() => switchImage()} className="main-console" >
      </div>
      <div>
      {/* <ImageGallery items={images} /> */}
      </div>
      <script type="text/babel" src='./textInterface/textInterface.js'></script>
    </div>
    </div>
  </>
  );
}

export default App;
