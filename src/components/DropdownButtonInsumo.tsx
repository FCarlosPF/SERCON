import { useState } from 'react';
import '../css/DropdownButton.css';
import ReporteInsumoGateway from '../gateway/ReporteInsumoGateway';

const DropdownButtonInsumo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reporteInsumoGateway = new ReporteInsumoGateway();

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (reportType : any) => {
    console.log(`Botón "${reportType}" presionado`);
    if (reportType === "Reporte de Telas") {
      reporteInsumoGateway
        .generateReportInsumoTelas()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }else if(reportType === "Reporte de Hilos"){
      reporteInsumoGateway
        .generateReportInsumoHilos()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }else if(reportType === "Reporte de Moldes"){
      reporteInsumoGateway
        .generateReportInsumoMoldes()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }else if(reportType === "Reporte de Etiquetas"){
      reporteInsumoGateway
        .generateReportInsumoEtiquetas()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }else if(reportType === "Reporte de Ganchos"){
      reporteInsumoGateway
        .generateReportInsumoGanchos()
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
          {["Reporte de Telas", "Reporte de Hilos", "Reporte de Moldes", "Reporte de Etiquetas", "Reporte de Ganchos"].map((reportType) => (
            <button key={reportType} onClick={() => handleButtonClick(reportType)}>
              {reportType}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButtonInsumo;