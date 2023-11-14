import { useState } from 'react';
import '../css/DropdownButton.css';
import ReporteInsumoGateway from '../gateway/ReporteInsumoGateway';
import ReporteProductoGateway from '../gateway/ReporteProductoGateway';

const DropdownButtonProducto = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reporteProductoGateway = new ReporteProductoGateway();

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (reportType : any) => {
    console.log(`Botón "${reportType}" presionado`);
    if (reportType === "Reporte de Ropa de Vestir") {
        reporteProductoGateway
        .generateReportProductoRopaVestir()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }else if(reportType === "Reporte de Ropa de Cama y Hogar"){
      reporteProductoGateway
        .generateReportProductoRopaCama()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }else if(reportType === "Reporte de Ropa Interior y Lenceria"){
      reporteProductoGateway
        .generateReportProductoRopaInterior()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }else if(reportType === "Reporte de Uniformes y Ropa"){
      reporteProductoGateway
        .generateReportProductoRopaCoorporativas()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }else if(reportType === "Reporte de Ropa Deportiva"){
      reporteProductoGateway
        .generateReportProductoRopaDeportiva()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  return (
    <div className="dropdown">
      <button onClick={handleDropdownToggle}>Reporte </button>
      {isOpen && (
        <div className="dropdown-content">
          {["Reporte de Ropa de Vestir", "Reporte de Ropa de Cama y Hogar", "Reporte de Ropa Interior y Lenceria", "Reporte de Uniformes y Ropa", "Reporte de Ropa Deportiva"].map((reportType) => (
            <button key={reportType} onClick={() => handleButtonClick(reportType)}>
              {reportType}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButtonProducto;