import { Search } from 'lucide-react'
import React from 'react'
import {Button} from './ui/button' 

function HeroSection() {
  return (
    <div className=' text-center my-10'>
      <div className='flex flex-col gap-4'>
         <span className='mx-auto px-4 py-4 bg-gray-100 rounded-full  text-red-500 '>No.1 Job Hunt Website</span>
         <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, assumenda.</p>
         <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input type="text"
            placeholder='Find Your Dream Jobs'
            className='outline-none border-none w-full'
          />
          <Button className='rounded-r-full bg-[#6A38C2]'>
            <Search className='h-5 w-5' />
          </Button>
         </div>
      </div>

       

      
    </div>
  )
}

export default HeroSection

