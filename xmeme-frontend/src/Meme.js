import React from 'react';
import Truncate from 'react-truncate';
import RenderSmoothImage from 'render-smooth-image-react';
import 'render-smooth-image-react/build/style.css';

export default function Meme({name, url, caption, date}) {
    return (
        <article className="h-96 w-4/5 sm:w-4/5 md:w-2/5 lg:w-1/3 mx-10 bg-gray-50 mb-10 overflow-hidden rounded-lg shadow-lg md:shadow-xl self-center flex flex-col">
            <div className="h-2/3 bg-gray-200 overflow-hidden">
                    <RenderSmoothImage className="object-contain w-full h-full" src={url} alt="placeholder" />
            </div>
            <div className="flex items-center justify-between justify-items-end p-2 md:px-4">
                <h1 className="text-xl sm:text-2xl font-medium text-black w-4/5">
                    <Truncate lines={1} ellipsis={<span>...</span>}>
                        {caption}
                    </Truncate>
                </h1>
                <div className="text-gray-600 text-md">
                    <p>{date}</p>
                </div>
            </div>
            <div className="flex items-center justify-between leading-none p-2 md:px-4 text-base md:text-lg text-gray-600">
                <p>{name}</p>
                <button className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md">
                    Edit
                </button>
            </div>
        </article>
    )
}
