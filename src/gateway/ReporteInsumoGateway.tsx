import axios, { AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:8082/report/insumo';



class ReporteInsumoGateway {
 

  async generateReportInsumo() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/download`, {
        responseType: 'arraybuffer', 
      });;
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      return window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  }

  async generateReportInsumoTelas() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Telas`, {
        responseType: 'arraybuffer', 
      });;
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      return window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  }

  async generateReportInsumoHilos() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Hilos`, {
        responseType: 'arraybuffer', 
      });;
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      return window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  }

  async generateReportInsumoMoldes() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Moldes`, {
        responseType: 'arraybuffer', 
      });;
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      return window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  }

  async generateReportInsumoEtiquetas() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Etiquetas`, {
        responseType: 'arraybuffer', 
      });;
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      return window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  }

  async generateReportInsumoGanchos() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Ganchos`, {
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

export default ReporteInsumoGateway;