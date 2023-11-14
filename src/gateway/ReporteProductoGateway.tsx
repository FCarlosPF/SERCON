import axios, { AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:8082/report/producto';



class ReporteProductoGateway {
 

    async generateReportProducto() {
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
    
      async generateReportProductoRopaVestir() {
        try {
          const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Ropa de vestir`, {
            responseType: 'arraybuffer', 
          });;
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          return window.open(url, '_blank');
        } catch (error) {
          throw error;
        }
      }

      async generateReportProductoRopaCama() {
        try {
          const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Ropa de cama y hogar`, {
            responseType: 'arraybuffer', 
          });;
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          return window.open(url, '_blank');
        } catch (error) {
          throw error;
        }
      }

      async generateReportProductoRopaInterior() {
        try {
          const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Ropa interior y lenceria`, {
            responseType: 'arraybuffer', 
          });;
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          return window.open(url, '_blank');
        } catch (error) {
          throw error;
        }
      }

      async generateReportProductoRopaCoorporativas() {
        try {
          const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Uniformes y ropa corporativa`, {
            responseType: 'arraybuffer', 
          });;
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          return window.open(url, '_blank');
        } catch (error) {
          throw error;
        }
      }

      async generateReportProductoRopaDeportiva() {
        try {
          const response: AxiosResponse = await axios.get(`${baseURL}/downloadTipo?Tipo=Ropa deportiva y de moda informal`, {
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

export default ReporteProductoGateway;