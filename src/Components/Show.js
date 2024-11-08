import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Db } from '../FirebaseConfig/Firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const Show = () => {
  const [products, setProducts] = useState( [] )
  const productsCollection = collection(Db, "Products")  
  const getProducts = async() => {
    const data = await getDocs(productsCollection)
    setProducts(
      data.docs.map( (doc) => ( {...doc.data(), id:doc.id} ) )
    )
    console.log(data)
    console.log(products)
  }
  const deleteProduct = async (id) => {
    const productDoc = doc(Db, "Products", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Eliminar Producto",
      text: "¿Quieres eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        deleteProduct(id)
        Swal.fire('Delete', 'Eliminado', 'Eliminado')
      }
    })
  }
  useEffect( () => {
    getProducts()
  }, [] )
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='d-grid gap-2'>
              <Link to='/create' className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>
            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { products.map( (product) => (
                  <tr key={product.id}>
                    <th>{product.Description}</th>
                    <th>{product.Stock}</th>
                    <th>
                      <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pen-to-square"></i></Link>
                      <button onClick={ () => { confirmDelete(product.id) } } className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                    </th>
                  </tr>
                ) ) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default Show