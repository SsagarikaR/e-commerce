import { ReactNode } from 'react'
import Navbar from '../subComponents.tsx/Navbar'

function Container({children}:{children:ReactNode}) {
  return (
    <div className='min-h-screen flex flex-col w-full bg_color from-gray-300 via-blue-100 to-gray-200'>
      <Navbar/>
      <div className='pt-15'>
      {children}
      </div>
    </div>
  )
}

export default Container
