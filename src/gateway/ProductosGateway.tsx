import axios, { AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:8082/api/producto';

interface Producto {
  producto_id?: number;
  nombre: string;
  descripcion: string;
  unidad_medida: string;
  medida: number;
  tipo: string;
  precio: number
}

class ProductoGateway {
  async findById(id: number): Promise<Producto> {
    try {
      const response: AxiosResponse<Producto> = await axios.get(`${baseURL}/findById/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Producto[]> {
    try {
      const response: AxiosResponse<Producto[]> = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(nuevoInsumo: Producto): Promise<void> {
    try {
      await axios.post(`${baseURL}/save`,nuevoInsumo);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, datosActualizados: Partial<Producto>): Promise<void> {
    try {
      await axios.put(`${baseURL}/update/${id}`, datosActualizados);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await axios.delete(`${baseURL}/delete/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default ProductoGateway;