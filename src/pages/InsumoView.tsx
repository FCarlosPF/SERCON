import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import '../css/insumos.css'
import { useState } from "react";

function createData(
  id: number,  
  nombre: string,
  descripcion: string,
  unidad: number,
  medida: number,
  tipo: string
) {
  return { id, nombre, descripcion, unidad, medida, tipo};
}

const rows = [
  createData(1,"camisaco","camisa de industria",5,7.5,"camisa"),
  createData(2,"camisaco","camisa de industria",5,7.5,"camisa"),
  createData(3,"camisaco","camisa de industria",5,7.5,"camisa"),
  createData(4,"camisaco","camisa de industria",5,7.5,"camisa"),
  createData(5,"camisaco","camisa de industria",5,7.5,"camisa"),
];



export const Insumos = () => {
    
const [showModal, setShowModal] = useState(false);

const handleOpenModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};

const handleForm = (e : any) =>{
  e.preventDefault()
}

  return (
    <> 
      <div className="title">Insumos</div>
      <Button variant="contained" color="success" sx={{mb: 4, mt: 2}} onClick={handleOpenModal}>
        Crear
      </Button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Formulario de Producto</h2>
            <form onClick={handleForm}>
              <div className="form-group">
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" placeholder="ID" className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" placeholder="Nombre" className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" placeholder="Descripción" className="input-field"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="unidad_medida">Unidad de Medida:</label>
                <input type="text" id="unidad_medida" placeholder="Unidad de Medida" className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="medida">Medida:</label>
                <input type="text" id="medida" placeholder="Medida" className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo:</label>
                <input type="text" id="tipo" placeholder="Tipo" className="input-field" />
              </div>
              <button type="submit" className="submit-button" >
                Enviar
              </button>
              <button type="submit" className="cancel-button" onClick={handleCloseModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Descripción&nbsp;(g)</TableCell>
              <TableCell align="right">Unidad_Medida&nbsp;(g)</TableCell>
              <TableCell align="right">Medida&nbsp;(g)</TableCell>
              <TableCell align="right">Tipo&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.nombre}</TableCell>
                <TableCell align="right">{row.descripcion}</TableCell>
                <TableCell align="right">{row.unidad}</TableCell>
                <TableCell align="right">{row.medida}</TableCell>
                <TableCell align="right">{row.tipo}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="error">
                    Eliminar
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button color="secondary">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
