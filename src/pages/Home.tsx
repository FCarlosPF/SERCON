import { Button } from "@mui/material";
import ReporteStock from "../gateway/ReporteStock";
import "../css/Home.css";
import MovimientoGateway from "../gateway/MovimientoGateway";

export const Home = () => {
  const reporteStock = new ReporteStock();
  const reporteMovimiento = new MovimientoGateway();
  const handleReportStockOut = () => {
    reporteStock
      .generateReportStockOut()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleReportSobreabastecimiento = () => {
    reporteStock
      .generateReportSobreabastecimiento()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleReportMovimiento = () => {
    reporteMovimiento
      .generateReportMovimiento()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="home-buttons">
        <Button color="secondary" onClick={handleReportStockOut}>
          Reporte de StockOut
        </Button>
        <Button color="secondary" onClick={handleReportSobreabastecimiento}>
          Reporte de Sobreabastecimiento
        </Button>
        <Button color="secondary" onClick={handleReportMovimiento}>
          Reporte de Rotación de Inventario
        </Button>
      </div>
    </>
  );
};
