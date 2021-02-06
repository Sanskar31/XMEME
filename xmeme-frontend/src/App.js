import { useEffect, useState } from 'react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from 'axios';
import env from "react-dotenv";

//Components
import Meme from './Meme.js';
import MemeForm from './MemeForm.js';

//Custom style to make navigation fixed
const navStyle= {
  position: "fixed",
  top: "0",
  width: "100%"
}

const placeholderImage= "https://cdn.sstatic.net/Sites/stackoverflow/img/404.svg";

const backendURL= env.BACKEND_URL;

function App() {

  //state
  const [showModal, setShowModal]= useState(false);
  const [display, setDisplay]= useState([]);

  //function to open/close modal
  const toggleModal= () => {
    setShowModal(prev => !prev);
  }

  const getMemes= async() => {
    axios.get(backendURL)
      .then(res => res.data)
      .then(async(data) => {
        let memes= await data.map(meme => {
          const fullDate= new Date(meme.date);
          let year= fullDate.getFullYear();
          year= year.toString().slice(2,4);
          let month= fullDate.getMonth()+1;
          let day= fullDate.getDay();
          let date= `${day}/${month}/${year}`;
          return (
            <Meme key={meme.id} name={meme.name} url={meme.url} caption={meme.caption} date={date}/>  
          )
        })
        setDisplay(memes);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log("HELLO");
    getMemes();
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className= "bg-white flex flex-row justify-between shadow-xl h-16" style={navStyle}>
          <div className="ml-4 sm:ml-8 md:ml-16 md:ml-20 md:mr-20 flex justify-start">
            <img className="mr-2 my-2" src="https://data.apksum.com/cb/com.jetfuel.colormeme/10.0/icon.png" alt="placeholder"/>
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
        <MemeForm showModal= {showModal} toggleModal= {toggleModal} refreshMemes= {() => getMemes()}/>
      </Modal>

      {/* Content */}
      <div className="mt-24 md:mt-28 flex flex-wrap items-center justify-center max-w-full overflow-x-hidden">
          {
            display
          }
      </div>
    </div>
  );
}

export default App;
