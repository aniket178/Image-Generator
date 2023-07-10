import React from 'react'
import {download} from '../assets';
import {downloadImage} from '../utils';
function Card({_id, name, prompt, photo}) {
  return (
    <div className='flex rounded-xl h-auto relative group shadow-card hover:shadow-cardhover card'>
      <img className='w-full h-auto rounded-xl object-cover'
       src={photo} alt={prompt} />
      <div className='opacity-80 backdrop-blur-md group-hover:flex flex-col max-h-[90%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] p-4 rounded-xl'>
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover flex justify-center items-center bg-green-700 text-white text-xs font-bold hover:ring-green-500 hover:ring-2'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <button type='button' onClick={() => downloadImage(_id, photo)}
           className='bg-transparent outline-none border-none w-6 h-6 object-contain rounded-full'>
            <img src={download} alt="download" className='invert'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card