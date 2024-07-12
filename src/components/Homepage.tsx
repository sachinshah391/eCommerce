import React from 'react'
import Product from './Product'
import '../themes/Homepage.css'

const Homepage: React.FC = () => {
  return (
    <>
    <div className='homepage-title'>Clothes and Accessories</div>
    <Product/>
    </>
  )
}

export default Homepage
