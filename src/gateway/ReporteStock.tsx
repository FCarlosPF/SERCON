import axios, { AxiosResponse } from "axios";

const baseURL: string = "http://localhost:8082/report/stock";

class ReporteStock {
  async generateReportSobreabastecimiento() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/download?tipo=sobreabastecimiento`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      return window.open(url, "_blank");
    } catch (error) {
      throw error;
    }
  }

  async generateReportStockOut() {
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/download?tipo=stockout`, {
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

export default ReporteStock;
