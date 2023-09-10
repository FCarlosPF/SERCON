import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import "../css/insumos.css";
import { useState, useEffect } from "react";
import { show_alerta } from "../functions/alert";
import axios from "axios";
import InsumoGateway from "../gateway/InsumoGateway";

export const Insumos = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [insumo_id, setInsumo_id] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidad_medida, setUnidad_medida] = useState("");
  const [medida, setMedida] = useState(0);
  const [tipo, setTipo] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  const insumoGateway = new InsumoGateway();

  interface Insumo {
    insumo_id?: number;
    nombre: string;
    descripcion: string;
    unidad_medida: string;
    medida: number;
    tipo: string;
  }

  insumoGateway
    .findAll()
    .then((insumos) => {
      setInsumos(insumos);
    })
    .catch((error) => {});

  /* const findById = (id: number) =>{
    insumoGateway.findById(id)
  .then((insumo) => {
    setInsumo(insumo)
  })
  .catch((error) => {
  });
  }

  const remove = (id: number) =>{
    insumoGateway.remove(id)
  .then((insumo) => {
  })
  .catch((error) => {
  });
  }

  const update = (id: number,argumentosActualizados : Insumo) =>{
    insumoGateway.update(id, argumentosActualizados )
  .then((insumo) => {
  })
  .catch((error) => {
  });
  } */

  const openModal = (
    op: number,
    nombre: string,
    descripcion: string,
    unidad: string,
    medida: number,
    tipo: string
  ) => {
    setInsumo_id(0);
    setNombre("");
    setDescripcion("");
    setUnidad_medida("");
    setMedida(0);
    setTipo("");
    if (op === 1) {
      setTitle("Registrar Insumo");
    } else if (op === 2) {
      setTitle("Editar Insumo");
      setInsumo_id(insumo_id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setUnidad_medida(unidad_medida);
      setMedida(medida);
      setTipo(tipo);
    }
  };

  const save = (e: any) => {
    e.preventDefault();
    const insumo : Insumo = { nombre, descripcion, unidad_medida, medida, tipo };
    insumoGateway.create(insumo).then((response)=>{
      console.log(response)
    }).catch(error =>{
      console.log(error)
    })
  };

  return (
    <>
      <div className="title">Insumos</div>
      <button
        onClick={() => openModal(1, "", "", "", 0, "")}
        type="button"
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#modalInsumos"
      >
        Crear
      </button>
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
            {insumos.map((row) => (
              <TableRow
                key={row.insumo_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.insumo_id}
                </TableCell>
                <TableCell align="right">{row.nombre}</TableCell>
                <TableCell align="right">{row.descripcion}</TableCell>
                <TableCell align="right">{row.unidad_medida}</TableCell>
                <TableCell align="right">{row.medida}</TableCell>
                <TableCell align="right">{row.tipo}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="error">
                    Eliminar
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <button
                    onClick={() =>
                      openModal(
                        2,
                        row.nombre,
                        row.descripcion,
                        row.unidad_medida,
                        row.medida,
                        row.tipo
                      )
                    }
                    type="button"
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#modalInsumos"
                  >
                    Editar
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="modal-body">
        <input type="hidden" id="id" />
        <div className="input-group mb-3">
          <span className="input-group-text"></span>
        </div>
      </div>

      <div id="modalInsumos" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" />
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  placeholder="Descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="unidad"
                  className="form-control"
                  placeholder="Unidad"
                  value={unidad_medida}
                  onChange={(e) => setUnidad_medida(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="number"
                  id="medida"
                  className="form-control"
                  placeholder="Medida"
                  value={(medida)}
                  onChange={(e) => (setMedida(parseFloat(e.target.value)))}
                />  
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="tipo"
                  className="form-control"
                  placeholder="Tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk" onClick={(e)=>save(e)}>
                    Guardar
                  </i>
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
