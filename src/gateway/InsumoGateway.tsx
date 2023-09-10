import axios, { AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:8082/api/insumo';

interface Insumo {
  insumo_id?: number;
  nombre: string;
  descripcion: string;
  unidad_medida: string;
  medida: number;
  tipo: string;
}

class InsumoGateway {
  async findById(id: number): Promise<Insumo> {
    try {
      const response: AxiosResponse<Insumo> = await axios.get(`${baseURL}/findById/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Insumo[]> {
    try {
      const response: AxiosResponse<Insumo[]> = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(nuevoInsumo: Insumo): Promise<void> {
    try {
      await axios.post(`${baseURL}/save`,nuevoInsumo);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, datosActualizados: Partial<Insumo>): Promise<void> {
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

export default InsumoGateway;