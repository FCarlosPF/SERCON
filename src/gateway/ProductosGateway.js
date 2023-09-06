import axios from 'axios';
import {useEffect,useState} from 'react'

const url = 'https://jsonplaceholder.typicode.com/users'

const ProductosGateway = () => {
  const[productos,setProductos] =useState([])

  const fetchProducto = async() =>{
    try {
      const response = await axios.get(url)
      const data = response.data
      setProductos(data)
      console.log(response)
    }catch (error) {
      console.log(error.response)
    }

  }
  useEffect(()=>{fetchProducto()},[]) 

  return{
    productos
  }
}

export default ProductosGateway
