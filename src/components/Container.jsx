import React from 'react'

const Container = ({children}) => {
  return (
    <div className='max-w-[1920] mx-auto px-4 md:px-8 lg:px-16'>
      {children}
    </div>
  )
}

export default Container
