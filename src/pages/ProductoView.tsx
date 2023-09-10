import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import "../css/productos.css";
import { useState } from "react";
import ProductoGateway from "../gateway/ProductosGateway";

export const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidad, setUnidad] = useState("");
  const [medida, setMedida] = useState("");
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  interface Producto {
    producto_id: number;
    nombre: string;
    descripcion: string;
    unidad_medida: string;
    medida: number;
    tipo: string;
    precio: number;
  }

  const productoGateway = new ProductoGateway();

  productoGateway
    .findAll()
    .then((productos) => {
      setProductos(productos);
    })
    .catch((error) => {});

  const openModal = (
    op: number,
    nombre: string,
    descripcion: string,
    unidad: string,
    medida: string,
    tipo: string
  ) => {
    setId("");
    setNombre("");
    setDescripcion("");
    setUnidad("");
    setMedida("");
    setTipo("");
    if (op === 1) {
      setTitle("Registrar Insumo");
    } else if (op === 2) {
      setTitle("Editar Insumo");
      setId(id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setUnidad(unidad);
      setMedida(medida);
      setTipo(tipo);
    }
  };

  return (
    <>
      <div className="title">Productos</div>
      <button
        onClick={() => openModal(1, "", "", "", "", "")}
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
              <TableCell align="right">Precio&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((row) => (
              <TableRow
                key={row.producto_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.producto_id}
                </TableCell>
                <TableCell align="right">{row.nombre}</TableCell>
                <TableCell align="right">{row.descripcion}</TableCell>
                <TableCell align="right">{row.unidad_medida}</TableCell>
                <TableCell align="right">{row.medida}</TableCell>
                <TableCell align="right">{row.tipo}</TableCell>
                <TableCell align="right">{row.precio}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="error">
                    Eliminar
                  </Button>
                </TableCell>
                <TableCell align="right">
                <button
                    onClick={() =>
                      openModal(2, nombre, descripcion, unidad, medida, tipo)
                    }
                    type="button"
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#modalInsumos"
                  >
                    Editar
                  </button>                </TableCell>
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
                  value={unidad}
                  onChange={(e) => setUnidad(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="medida"
                  className="form-control"
                  placeholder="Medida"
                  value={medida}
                  onChange={(e) => setMedida(e.target.value)}
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
              <div className="" d-grid col-6 mx-auto>
                <button className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk">Guardar</i>
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
