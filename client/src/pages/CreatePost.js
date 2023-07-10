import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {preview} from '../assets';
import {getRandomPrompt} from '../utils';
import { FormField, Loader } from '../components';

function CreatePost() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name : "",
    prompt: "",
    photo: ""
  })
  const [formimg, setformimg] = useState("");
  const [ispromptchange, setispromptchange] = useState(true);
  const [imageslist, setimageslist] = useState([]);
  const [genimage, setgenimage] = useState(false);
  const [loading, setloading] = useState(false);
  const handlesubmit = async (e) =>{
    e.preventDefault();
    if(form.prompt && form.photo){
      setloading(true);
      try
      {
        const res = await fetch('http://localhost:5000/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(form)
        })
        await res.json();
        navigate('/');
      }
      catch(err){
        alert(err)
      }
      finally{
        setloading(false);
      }
    }else{
      alert('All inputs are mandatory!')
    }
  }
  const handlechange = (e) => {
    if(e.target.name === 'prompt') setispromptchange(true);
    else setispromptchange(false);
    setform(form => {
      return {...form, [e.target.name] : e.target.value}
    });
  }
  const handlesurprise = () => {
    setispromptchange(true);
    const randomprompt = getRandomPrompt(form.prompt);
    setform(form => {
      return {...form, prompt : randomprompt}
    });
  }
  const handlegenimage = async () =>{
    if(form.prompt)
    {
      try {  
        setgenimage(true);
        console.log(ispromptchange);
        if(ispromptchange)
        {
          const res = await fetch('http://localhost:5000/api/v1/dalle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: form.prompt})
          })
          const data = await res.json();
          const images = await data.results.images;
          const randimg = images[Math.floor(Math.random() * images.length)];
          setformimg(randimg);
          setimageslist(images);
        }
        else{
          const randimg = imageslist[Math.floor(Math.random() * imageslist.length)];
          setformimg(randimg);
        }
      }catch(err){
        alert(err);
      }finally{
        setispromptchange(false);
        setgenimage(false);
      }
    }else{
      alert('Please enter a prompt!')
    }
  }
  useEffect(()=>{
    setform(from => {
      return {...form, photo : formimg}
    })
  }, [formimg])
  return (
    <section className='mx-auto'>
      <div>
        <h1 className='text-[32px] font-extrabold text-[#222328]'>Create Images</h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          Create an imaginative and visually stunning images through DALL-E API and show them to community
        </p>
      </div>
      <form className='mx-auto mt-16 w-full sm:w-[75%] lg:w-[40%]' onSubmit={handlesubmit}>
        <div className='flex flex-col gap-6 items-center'>
          <FormField 
                 labelname = 'Name'
                 type = 'text'
                 placeholder = 'Ryan Singh'
                 name = 'name'
                 value = {form.name}
                 handlechange = {handlechange}/>
          <FormField 
                 labelname = 'Prompt'
                 type = 'text'
                 placeholder = 'a stained glass window depicting a hamburger and french fries'
                 name = 'prompt'
                 value = {form.prompt}
                 handlechange = {handlechange}
                 isSurpriseme = {true}
                 handlesurprise = {handlesurprise}/>
          <div className='relative bg-gray-50 border-2 border-slate-300 text-sm rounded-lg object-scale-down hover:ring-sky-500 hover:ring-2 hover:border-none hover:drop-shadow-lg w-64 p-2 h-64 flex justify-center items-center'>
            {
              form?.photo ? (
                <img src={form.photo} alt= {form.prompt} className='w-full h-full'/>
              ) : (
                <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain'/>
              )
            }
            {
              genimage && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                  <Loader/>
                </div>
              )
            }
          </div>
        </div>
        <div className='mt-5 text-center flex gap-6 flex-col'>
          <button type='button' onClick={handlegenimage} className='mx-auto w-full sm:w-[75%] font-semibold text-sm bg-emerald-500 py-2 px-3 rounded-lg text-white hover:bg-gradient-to-b hover:from-emerald-600 hover:to-emerald-300 hover:drop-shadow-lg'>
              {genimage ? 'Generating...' : ispromptchange ? 'Generate' : 'Generate Another'}
          </button>
          <p className='mx-auto text-slate-400 text-sm'>After creating image according to you, you can show this to the community.</p>
          <button type='submit' className='mx-auto w-full sm:w-[75%] font-semibold text-sm bg-blue-500 py-2 px-3 rounded-lg text-white hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-400 hover:drop-shadow-lg'>
            {
              loading ? 'Loading...' : 'Share with Community'
            }
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
