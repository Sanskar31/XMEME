import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../components/ErrorMessage';
import { editMemeSchema } from '../Validations/memeValidation';
import env from 'react-dotenv';

export default function EditMeme({ memeID, toggleShowEditMeme, refreshMemes }) {
	const [Caption, setCaption] = useState('');
	const [ImageURL, setImageURL] = useState('');
	const [loading, setLoading] = useState(false);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const backendURL = env.BACKEND_URL;
	const memeURL = `${backendURL}${memeID}`;

	const updateMeme = async (e) => {
		e.preventDefault();
		setLoading(true);
		setShowErrorMessage(false);

		const data = {
			caption: Caption,
			url: ImageURL,
		};

		const isValid = await editMemeSchema.isValid(data);

		if (isValid) {
			fetch(memeURL, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((res) => {
					if (res.status === 200) {
						toggleShowEditMeme();
						refreshMemes();
					} else if (res.status === 500) {
						setErrorMessage('Internal Server Error! Please retry!');
						setLoading(false);
					}
				})
				.catch((err) => console.log(err));
		} else {
			setErrorMessage('Please fill all the fields!');
			setShowErrorMessage(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetch(memeURL)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else if (res.status === 500) {
					setErrorMessage('Internal Server Error! Please retry!');
					return null;
				}
			})
			.then((data) => {
				if (data) {
					setCaption(data.caption);
					setImageURL(data.url);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='flex items-center justify-center bg-modal sm:w-96 min-w-auto'>
			<div className='m-4 md:m-2 w-full max-h-full divide-y-2 divide-gray-300'>
				<div className='mb-4'>
					<p className='text-3xl md:text-4xl font-bold'>
						Update Meme
					</p>
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
									Enter New Caption
								</label>
								<textarea
									className='resize-none h-28 w-auto shadow-md appearance-none rounded w-full py-2 px-3   text-gray-700   leading-tight   focus:outline-none focus:shadow-outline'
									id='caption'
									type='text'
									placeholder='Caption'
									value={Caption}
									onChange={(e) => setCaption(e.target.value)}
									required
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-600 text-lg mb-2 font-semibold'>
									Enter New Image URL
								</label>
								<input
									className='px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm     shadow-md      outline-none focus:outline-none focus:shadow-outline w-full'
									id='name'
									type='text'
									placeholder='Image URL'
									value={ImageURL}
									onChange={(e) =>
										setImageURL(e.target.value)
									}
									required
								/>
							</div>
						</div>
						<div className='flex justify-start items-center mt-6'>
							<button
								className='mr-5 bg-white hover:bg-gray-100 text-lg text-gray-800 font-semibold py-2 px-4 border     border-gray-400   rounded shadow-lg'
								onClick={(e) => updateMeme(e)}
								type='submit'
							>
								<p>Update Meme</p>
							</button>
							{loading ? (
								<Loader
									type='Puff'
									color='#34D399'
									height={40}
									width={40}
									timeout={100000}
								/>
							) : null}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
