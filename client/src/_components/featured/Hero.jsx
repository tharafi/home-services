import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import "./Hero.css"
import { useNavigate } from 'react-router-dom'

function Hero() {
  const [input, setInput] = useState("");
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(`/services?search=${input}`)
  }

  return (
    <div className='hero w-full h-full mb-[20px]'>
      <div className='hero-text flex pl-16 flex-col justify-center'>
        <h2 className='font-bold text-[46px] text-left'>Find Home <span className='text-primary'>Service/Repair</span><br />Near You</h2>
        <h2 className='text-xl text-gray-400 text-left'>Explore Best Home Service & Repair near you</h2>
        <div className='mt-5 flex items-start'>
          <Input placeholder='Search' className='rounded-full md:w-[350px]' onChange={e => setInput(e.target.value)} />
          <Button className='rounded-full h-[40px] ml-2' onClick={handleSubmit}>
            <Search className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <div className='hero-img'>
        <img src='img/hero.png' alt="Hero" />
      </div>
    </div>
  )
}

export default Hero
