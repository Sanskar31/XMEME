import { useState } from 'react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

//Components
import Meme from './Meme.js';
import MemeForm from './MemeForm.js';

//Custom style to make navigation fixed
const navStyle= {
  position: "fixed",
  top: "0",
  width: "100%"
}

function App() {

  //state
  const [showModal, setShowModal]= useState(false);

  //function to open/close modal
  const toggleModal= () => {
    setShowModal(prev => !prev);
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className= "bg-white flex flex-row justify-between shadow-xl h-16" style={navStyle}>
          <div className="ml-4 sm:ml-8 md:ml-16 md:ml-20 md:mr-20 flex justify-start">
            <img className="mr-2 my-2" src="https://data.apksum.com/cb/com.jetfuel.colormeme/10.0/icon.png" />
            <h1 className="font-semibold text-3xl sm:text-5xl self-center nav-text">XMEME</h1>
          </div>
          <h1 className="ml-4 sm:ml-8 md:mr-16 self-center mr-3 text-md sm:text-lg md:text-2xl nav-text">
            <button onClick={toggleModal} className="bg-white px-1 sm:px-2 sm:py-2 md:py-2 md:px-2 hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow-md">
              Add Meme
            </button>
          </h1>
      </nav>

      {/* Add Meme Modal */}
      <Modal open={showModal} onClose={toggleModal}>
        <MemeForm showModal= {showModal} toggleModal= {toggleModal}/>
      </Modal>

      {/* Content */}
      <div className="mt-24 md:mt-28 mx-5 flex flex-col justify-center max-w-full overflow-x-hidden">
          <Meme name="Sanskar Agarwal" url="https://picsum.photos/600/400/?random" caption="Loving It!! The view is just amazing...😎😎" date="14/4/19"/>  
          <Meme name="Sanskar Agarwal" url="https://picsum.photos/600/400/?random" caption="Loving It!!" date="14/4/19"/>  
          <Meme name="Sanskar Agarwal" url="https://picsum.photos/600/400/?random" caption="Loving It!!" date="14/4/19"/>  
          <Meme name="Sanskar Agarwal" url="https://picsum.photos/600/400/?random" caption="Loving It!!" date="14/4/19"/>  
          <Meme name="Sanskar Agarwal" url="https://picsum.photos/600/400/?random" caption="Loving It!!" date="14/4/19"/>  
          <Meme name="Sanskar Agarwal" url="https://picsum.photos/600/400/?random" caption="Loving It!!" date="14/4/19"/>  
          <Meme name="Sanskar Agarwal" url="https://picsum.photos/600/400/?random" caption="Loving It!!" date="14/4/19"/>  
          <Meme name="Sanskar Agarwal" url="https://picsum.photos/600/400/?random" caption="Loving It!!" date="14/4/19"/>  
      </div>
    </div>
  );
}

export default App;
