import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const BtnLoading = ({type,text,loading,onClick,className ,...props}) => {
  return (
    <div>
     <Button 
  type={type}
  disabled={loading}
  onClick={onClick}
  className={cn("", className)}
  {...props}
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <Loader2 className="animate-spin h-4 w-4" />
      Loading...
    </span>
  ) : (
    text
  )}
</Button>


    </div>
  )
}

export default BtnLoading