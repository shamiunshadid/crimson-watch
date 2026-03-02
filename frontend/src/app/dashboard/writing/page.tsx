import React from 'react'
import { Sidebar } from '../_components/Sidebar'
import { cn } from '@/lib/utils'

const WritingPage = () => {
  return (
    <div>
      <Sidebar />
      
            <div
              className={cn(
                "transition-all duration-300 min-h-screen",
                "ml-64", // Sidebar width
              )}
            >
      
      
            </div>
    </div>
  )
}

export default WritingPage