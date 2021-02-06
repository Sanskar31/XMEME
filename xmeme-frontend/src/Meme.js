import React from 'react';
// import SmoothImage from 'react-smooth-image';
// import EditIcon from '@material-ui/icons/Edit';

// const globalPlaceholder = 'https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif'

export default function Meme({name, url, caption, date}) {
    return (
        <article className="bg-gray-50 mb-10 overflow-hidden rounded-lg shadow-lg md:shadow-2xl max-w-xl self-center">
            <div className="">
                <a href="#">
                    <img className="block h-auto w-full" src={url}></img>
                </a>
            </div>
            <header className="flex items-center justify-between leadinSmoothImageight p-2 md:px-4">
                <h1 className="text-2xl md:text-3xl text-black w-2/3">
                    {caption}
                </h1>
                <p className="text-gray-600 text-base">
                    {date}
                </p>
            </header>
            <footer className="flex items-center justify-between leading-none p-2 md:px-4 text-base md:text-lg text-gray-600">
                <p>{name}</p>
                <button className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md">
                    Edit
                </button>
            </footer>
        </article>
    )
}
