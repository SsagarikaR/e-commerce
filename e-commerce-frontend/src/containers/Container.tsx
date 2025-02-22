import { ReactNode } from 'react'
import Navbar from '../subComponents.tsx/Navbar'

function Container({children}:{children:ReactNode}) {
  return (
    <div className='min-h-screen  w-screen flex overflow-x-hidden flex-col bg_color from-gray-300 via-blue-100 to-gray-200'>
      <Navbar/>
      <div className='pt-20 overflow-x-hidden'>
      {children}
      </div>
    </div>
  )
}

export default Container
