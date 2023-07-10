import React from 'react'

function FormField({labelname, name, value, type, placeholder, handlechange, isSurpriseme, handlesurprise}) {
  
  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center justify-between gap-2 mb-2'>
        <label htmlFor={name} className='cursor-pointer block text-sm font-medium'>
          {labelname}
        </label>
        {
          isSurpriseme && (
            <button type='button'
                    onClick={handlesurprise}
                    className='font-semibold text-sm bg-blue-500 py-2 px-3 rounded-lg text-white hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-400 hover:drop-shadow-lg'>
                    Surprise Me
            </button>
          ) 
        }
      </div>
      <input type = {type}
        id = {name}
        name = {name}
        value = {value}
        placeholder = {placeholder} onChange={handlechange} required
        className='bg-slate-200 text-slate-600 text-sm rounded-lg focus:ring-[#4649ff] focus:ring-2 outline-none w-full p-3 '/>
    </div>
  )
}

export default FormField
