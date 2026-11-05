import React from 'react'
import {Badge} from './ui/badge'
import { Ghost } from 'lucide-react'

const LatestJobCard = () => {
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100 cursor-pointer'>
        <div>
           <h1 className='font-medium text-lg'>Company Name</h1>
      <p className='text-sm text-gray-400'>India</p> 
        </div>

        <div>
            <h1 className='font-bold text-lg my-2'>Job Title</h1>
            <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet</p>
        </div>
        <div className=' flex items-center gap-2 mt-4 '>
            <Badge className='text-blue-700 font-bold ' variant='ghost'>Positions</Badge>
            <Badge className='text-[#F83002] font-bold ' variant='ghost'>Job Type</Badge>
            <Badge className='text-[#7209B7] font-bold ' variant='ghost'>12LPA</Badge>
        </div>

      
    </div>
  )
}

export default LatestJobCard

