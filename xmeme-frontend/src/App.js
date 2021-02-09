import { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import env from 'react-dotenv';
import RenderSmoothImage from 'render-smooth-image-react';
import 'render-smooth-image-react/build/style.css';
import EditMeme from './EditMeme';

//Components
import Meme from './Meme.js';
import MemeForm from './MemeForm.js';

import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

//Custom style to make navigation fixed
const navStyle = {
	position: 'fixed',
	top: '0',
	width: '100%',
};

const backendURL = 'https://xmeme-backend-sanskar.herokuapp.com/memes/';

function App() {
	//state
	const [showModal, setShowModal] = useState(false);
	const [display, setDisplay] = useState([]);
	const [loading, setLoading] = useState(true);
	const [serverError, setServerError] = useState(false);
	const [showEditMeme, setShowEditMeme] = useState(false);
	const [editID, setEditID] = useState(0);

	//function to open/close modal
	const toggleModal = () => {
		setShowModal((prev) => !prev);
	};

	const toggleShowEditMeme = (id) => {
		setEditID(id);
		setShowEditMeme((prev) => !prev);
	};

	const getMemes = async () => {
		console.log('Fetching memes...');
		setLoading(true);
		axios
			.get(backendURL)
			.then((res) => res.data)
			.then(async (data) => {
				let memes = await data.map((meme) => {
					const fullDate = new Date(meme.date);
					let time = fullDate.getTime();
					time = timeAgo.format(time, 'twitter-minute-now');
					return (
						<Meme
							key={meme.id}
							name={meme.name}
							url={meme.url}
							caption={meme.caption}
							timestamp={time}
							toggleEditMeme={() => toggleShowEditMeme(meme.id)}
						/>
					);
				});
				setLoading(false);
				setDisplay(memes);
			})
			.catch((err) => {
				setLoading(false);
				setServerError(true);
				console.log(err);
			});
	};

	useEffect(() => {
		getMemes();
	}, []);

	return (
		<div className='min-h-screen bg-white'>
			{/* Navbar */}
			<nav
				className='relative z-10 bg-white flex flex-row justify-between shadow-xl h-16'
				style={navStyle}
			>
				<div className='ml-4 sm:ml-8 md:ml-16 md:ml-20 md:mr-20 flex justify-start'>
					<div className='my-2 mr-2 w-1/5 h-4/5'>
						<RenderSmoothImage
							src='https://data.apksum.com/cb/com.jetfuel.colormeme/10.0/icon.png'
							alt='placeholder'
						/>
					</div>
					<h1 className='w-4/5 font-semibold text-2xl sm:text-4xl self-center nav-text'>
						XMEME
					</h1>
				</div>
				<h1 className='ml-4 sm:ml-8 md:mr-16 self-center mr-3 text-md sm:text-lg md:text-2xl nav-text'>
					<button
						onClick={toggleModal}
						className='bg-white px-1 sm:px-2 sm:py-2 md:py-2 md:px-2 hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow-md'
					>
						Add Meme
					</button>
				</h1>
			</nav>

			{/* Add Meme Modal */}
			<Modal open={showModal} onClose={toggleModal}>
				<MemeForm
					showModal={showModal}
					toggleModal={toggleModal}
					refreshMemes={() => getMemes()}
				/>
			</Modal>

			{/* Edit Meme Modal */}
			<Modal open={showEditMeme} onClose={(id) => toggleShowEditMeme(id)}>
				<EditMeme memeID={editID} />
			</Modal>

			{/* Content */}
			<div className='mt-24 md:mt-28 flex flex-wrap items-center justify-center max-w-full overflow-x-hidden'>
				{serverError ? (
					<div className='mx-4 my-8 max-h-1/4 self-center'>
						<RenderSmoothImage
							src='https://i.pinimg.com/originals/c3/35/f6/c335f6b435f96ca830a2e509f5a01ee0.gif'
							alt='Server Error'
						></RenderSmoothImage>
					</div>
				) : null}
				{loading ? (
					<div className='my-20 self-center'>
						<RenderSmoothImage
							src='https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif'
							alt='Loading...'
						></RenderSmoothImage>{' '}
					</div>
				) : null}
				{display}
			</div>
		</div>
	);
}

export default App;
