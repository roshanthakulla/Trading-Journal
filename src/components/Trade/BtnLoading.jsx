import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const BtnLoading = ({type,text,loading,onClick,className ,...props}) => {
  return (
    <div>
     <Button 
  type={type}
  onClick={onClick}
  className={cn("", className)}
  disabled={loading}
  {...props}
>
 {loading ? "Loading..." : text}

</Button>


    </div>
  )
}

export default BtnLoading