import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { Db } from '../FirebaseConfig/Firebase'
const Edit = () => {
  const [description, setDescription] = useState( '' )
  const [stock, setStock] = useState(0)
  const navigate = useNavigate()
  const {id} = useParams()
  const update = async (e) => {
    e.preventDefault()
    const product = doc(Db, "Products", id)
    const data = { Description:description, Stock:stock}
    await updateDoc(product, data)
    navigate('/')
  }
  /*const getProductsById = async (id) => {
    const product = await getDoc(Db, "Products", id)
    if(product.exists){
      //console.log(console.data)
      setDescription(product.data().Description)
      setStock(product.data().Stock)
    }else{
      console.log("El producto no existe")
    }
  } */
    const getProductsById = async (id) => {
      const productRef = doc(Db, "Products", id); // Crear la referencia
      const productSnap = await getDoc(productRef); // Obtener el documento
      if (productSnap.exists()) {
        console.log(productSnap.data());
        setDescription(productSnap.data().Description);
        setStock(productSnap.data().Stock);
      } else {
        console.log("El producto no existe");
      }
    }
  useEffect( () => {
    getProductsById(id)
  }, [] )
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Edit Product</h1>
          <form onSubmit={update}>
            <div className='mb-3'>
              <label className='form-label'>Editar</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} type='text' className='form-control'></input>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Stock</label>
              <input value={stock} onChange={(e) => setStock(e.target.value)} type='number' className='form-control'></input>
            </div>
            <button type='submit' className='btn btn-primary'>Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Edit