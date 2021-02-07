import React, { useState } from 'react';
import env from 'react-dotenv';
import Loader from 'react-loader-spinner';
import ErrorMessage from './ErrorMessage';
import { memeSchema } from './Validations/memeValidation';

export default function MemeForm({ showModal, toggleModal, refreshMemes }) {
	//state
	const [Name, setName] = useState('');
	const [Caption, setCaption] = useState('');
	const [ImageURL, setImageURL] = useState('');
	const [loading, setLoading] = useState(false);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const backendURL = env.BACKEND_URL;

	const postMeme = async (e) => {
		e.preventDefault();
		setLoading(true);
		setShowErrorMessage(false);

		const data = {
			name: Name,
			caption: Caption,
			url: ImageURL,
		};

		const isValid = await memeSchema.isValid(data);

		if (isValid) {
			fetch(backendURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((res) => {
					if (res.status === 201) {
						toggleModal(false);
						refreshMemes();
					} else if (res.status === 500) {
						setErrorMessage('Internal Server Error! Please retry!');
						setShowErrorMessage(true);
					} else if (res.status === 409) {
						setErrorMessage("Please don't send duplicate posts!");
						setShowErrorMessage(true);
					}
					setLoading(false);
				})
				.catch((err) => console.log(err));
		} else {
			setErrorMessage('Please fill all the fields!');
			setShowErrorMessage(true);
			setLoading(false);
		}
	};

	return (
		<div className='flex items-center justify-center bg-modal sm:w-96 min-w-auto'>
			<div className='m-4 md:m-2 w-full max-h-full divide-y-2 divide-gray-300'>
				<div className='mb-4'>
					<p className='text-3xl md:text-4xl font-bold'>Add Meme!</p>
				</div>

				<div className='w-full max-w-xs'>
					<form className='pt-4'>
						{showErrorMessage ? (
							<ErrorMessage
								toggleErrorMessage={() =>
									setShowErrorMessage(false)
								}
								message={errorMessage}
							/>
						) : null}
						<div>
							<div className='mb-4'>
								<label className='block text-gray-600 text-lg mb-2 font-semibold'>
									Meme Owner
								</label>
								<input
									className='px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow-md outline-none focus:outline-none focus:shadow-outline w-full'
									id='name'
									type='text'
									placeholder='Name'
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-600 text-lg mb-2 font-semibold'>
									Caption
								</label>
								<textarea
									className='resize-none h-28 w-auto shadow-md appearance-none rounded w-full py-2 px-3   text-gray-700   leading-tight focus:outline-none focus:shadow-outline'
									id='caption'
									type='text'
									placeholder='Caption'
									onChange={(e) => setCaption(e.target.value)}
									required
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-600 text-lg mb-2 font-semibold'>
									Image URL
								</label>
								<input
									className='px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm     shadow-md    outline-none focus:outline-none focus:shadow-outline w-full'
									id='name'
									type='text'
									placeholder='Image URL'
									onChange={(e) =>
										setImageURL(e.target.value)
									}
									required
								/>
							</div>
						</div>
						<div className='flex justify-start items-center mt-6'>
							<button
								className='mr-5 bg-white hover:bg-gray-100 text-lg text-gray-800 font-semibold py-2 px-4 border     border-gray-400 rounded shadow-lg'
								onClick={(e) => postMeme(e)}
								type='submit'
							>
								<p>Add Meme</p>
							</button>
							{loading ? (
								<Loader
									type='Puff'
									color='#34D399'
									height={40}
									width={40}
									timeout={100000} //3 secs
								/>
							) : null}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
