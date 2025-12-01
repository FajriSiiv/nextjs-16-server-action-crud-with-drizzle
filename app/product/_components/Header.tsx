import AuthButton from '@/components/button/auth/AuthButton'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full flex justify-between px-10 py-5'>
      <h1>Product Manager</h1>
      <AuthButton />
    </div>
  )
}

export default Header