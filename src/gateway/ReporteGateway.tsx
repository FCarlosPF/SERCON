import axios, { AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:8082/report';



class ReporteGateway {
 

  async generateReportInsumo() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/insumo/download`, {
        responseType: 'arraybuffer', 
      });;
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      return window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  }

  async generateReportProducto() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/producto/download`, {
        responseType: 'arraybuffer', 
      });;
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      return window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  }

  
}

export default ReporteGateway;