import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Button } from './ui/button'

const category=[
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"


]

const CategoryCarousel = () => {
  return (
    <div>
        <Carousel className='w-full max-w-xl mx-auto my-20'>
            <CarouselContent>
                {
                    category.map((cat)=>(
                        <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                            <Button className='bg-blue-400 rounded-full outline-none'>{cat}</Button>
                        </CarouselItem>
                    ))
                }
                
               
            </CarouselContent>
            <CarouselPrevious className='bg-black text-white ' />
            <CarouselNext className='bg-black text-white ' />

        </Carousel>

      
    </div>
  )
}

export default CategoryCarousel
