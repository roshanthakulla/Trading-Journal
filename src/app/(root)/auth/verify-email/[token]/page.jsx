'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CLIENT_HOME } from '@/routes/websitePanelRoute';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'

const EmailVerification = ({params}) => {
  const {token} = use(params)
  
  const [isVerified, setIsVerified] = useState(false);
  
 useEffect(() => {
    const verify = async()=>{
    const {data: verificationRespones} = await axios.post('/api/auth/verify-email',{token})

    if(verificationRespones.success){
        setIsVerified(true)
        }    
    }

  verify()

 }, [token]);

  return (
   <Card className="w-[400px]">
    <CardContent>
    { isVerified ?
    <div className="">
      <div className="flex justify-center items-center">
        <Image src="/verified.gif" alt="veri-img" height={100} width={100} className='h-[100px] w-auto'/> 
      </div>
      <div className="text-center">

      <h1 className='text-2xl font-bold my-5 text-green-500'>Email verification success !</h1>
      <Button asChild>
        <Link href={CLIENT_HOME}>Done</Link>
      </Button>
      </div>
    </div>
    :
    <div className="">
      <div className="flex justify-center items-center">
        <Image src="/verification-failed.gif" alt="veri-img" height={100} width={100} className='h-[100px] w-auto'/> 
      </div>
      <div className="text-center">

      <h1 className='text-2xl font-bold my-5 text-red-500'>Email verification failed !</h1>
      <Button asChild>
        <Link href={CLIENT_HOME}>Done</Link>
      </Button>
      </div>
    </div>


    }
    </CardContent>
   </Card>
  )
}

export default EmailVerification