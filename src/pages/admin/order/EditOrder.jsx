import React from 'react'
import { useParams } from 'react-router-dom'

const EditOrder = () => {
     const { id } = useParams();
  return (
    <div>EditOrder {id}</div>
  )
}

export default EditOrder