import React from 'react'
import { useParams } from 'react-router-dom'
const ProductDetailPage = () => {
    const { slug } = useParams()
  return (
    <div>ProductDetail: {slug}</div>
  )
}

export default ProductDetailPage