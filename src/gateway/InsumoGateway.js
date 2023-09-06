import axios from 'axios';
import {useEffect, useState} from 'react'

const url = 'https://jsonplaceholder.typicode.com/users'

const InsumoGateway = () => {

  const[insumos,setInsumos] =useState([])

  const fetchInsumo = async() =>{
    try {
      const response = await axios.get(url)
      const data = response.data
      console.log(data)
      setInsumos(data)
    } catch (error) {
      console.log(error.response)
    }

  }
  useEffect(()=>{fetchInsumo()},[]) 

  return {
    insumos
  }
  
}

export default InsumoGateway
