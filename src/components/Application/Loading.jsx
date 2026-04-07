import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-start mt-12'>
        <Image src="/loader.svg" height={80} width={80} alt='loader'/>
    </div>
  )
}

export default Loading