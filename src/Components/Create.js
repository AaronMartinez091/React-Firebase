import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { Db } from '../FirebaseConfig/Firebase'
const Create = () => {
  const [description, setDescription] = useState( '' )
  const [stock, setStock] = useState(0)
  const navigate = useNavigate()
  const productsCollection = collection(Db, "Products")
  const store = async(e) => {
    e.preventDefault()
    await addDoc(productsCollection, { Description:description, Stock:stock})
    navigate('/')
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Create Product</h1>
          <form onSubmit={store}>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} type='text' className='form-control'></input>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Stock</label>
              <input value={stock} onChange={(e) => setStock(e.target.value)} type='number' className='form-control'></input>
            </div>
            <button type='submit' className='btn btn-primary'>Store</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Create