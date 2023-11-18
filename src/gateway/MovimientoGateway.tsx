import axios, { AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:8082/report/movimiento/download';



class MovimientoGateway {

    async generateReportMovimiento() {
        try {
          const response: AxiosResponse = await axios.get(baseURL, {
            responseType: "arraybuffer",
          });
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          return window.open(url, "_blank");
        } catch (error) {
          throw error;
        }
      }



}

export default MovimientoGateway;