import React, { useState } from 'react';
import Truncate from 'react-truncate';
import RenderSmoothImage from 'render-smooth-image-react';
import 'render-smooth-image-react/build/style.css';
import '../assets/image-style.css';
// import TextTruncate from 'react-text-truncate';

const altImage = 'https://cdn.sstatic.net/Sites/stackoverflow/img/404.svg';

export default function Meme({
	name,
	url,
	caption,
	timestamp,
	toggleEditMeme,
}) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	const onImageLoaded = () => {
		setImageLoaded(true);
	};

	const onImageError = () => {
		setImageError(true);
	};

	return (
		<article className='h-96 w-4/5 sm:w-4/5 md:w-2/5 lg:w-1/3 mx-10 bg-gray-50 mb-10 overflow-hidden rounded-lg shadow-lg md:shadow-xl self-center flex flex-col'>
			<div className='h-2/3 bg-gray-100 overflow-hidden items-center'>
				<img
					className={`object-contain w-full h-full smooth-image image-${
						imageLoaded ? 'visible' : 'hidden'
					}`}
					src={!imageError ? url : altImage}
					onLoad={onImageLoaded}
					onError={onImageError}
					alt='Broken Link'
				/>
				{!imageLoaded && !imageError && (
					<div className='object-contain'>
						<RenderSmoothImage
							src='https://i.imgur.com/T3Ht7S3.gif'
							alt='Broken image link'
						/>
					</div>
				)}
			</div>
			<div className='flex items-center justify-between justify-items-end p-2 md:px-4'>
				<h1 className='text-xl sm:text-2xl font-medium text-black w-4/5'>
					<Truncate lines={1} ellipsis={<span>...</span>}>
						{caption}
					</Truncate>
				</h1>
				<div className='text-gray-600 text-md'>
					<p>{timestamp}</p>
				</div>
			</div>
			<div className='w-full flex items-center justify-between  mt-4 p-2 md:px-4 text-base md:text-lg text-gray-600'>
				<div className='object-contain w-3/4 truncate ...  overflow-ellipsis overflow-clip '>
					{/* <TextTruncate line={5} element="span" truncateText="…" text={name} /> */}
					<Truncate width={120} lines={1} ellipsis={<span>...</span>}>
						{name}
					</Truncate>
					{/* <p className="object-contain max-w-1/3">{name}</p> */}
				</div>
				<button
					className='bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md'
					onClick={toggleEditMeme}
				>
					Edit
				</button>
			</div>
		</article>
	);
}
