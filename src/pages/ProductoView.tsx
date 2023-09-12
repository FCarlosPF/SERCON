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
import { error } from "console";
import ProductoGateway from "../gateway/ProductosGateway";


export const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [producto_id,setProducto_id] = useState(0)
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidad_medida, setUnidad_medida] = useState("");
  const [medida, setMedida] = useState(0);
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  const productoGateway = new ProductoGateway();

  interface Producto {
    producto_id?: number;
    nombre: string;
    descripcion: string;
    unidad_medida: string;
    medida: number;
    tipo: string;
    precio: number
  }

  productoGateway
    .findAll()
    .then((productos) => {
      setProductos(productos);
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
    producto_id: number,
    nombre: string,
    descripcion: string,
    unidad_medida: string,
    medida: number,
    tipo: string,
    precio : number
  ) => {
    setProducto_id(0)
    setNombre("");
    setDescripcion("");
    setUnidad_medida("");
    setMedida(0);
    setTipo("");
    setPrecio(0);
    if (op === 1) {
      setTitle("Registrar Producto");
    } else if (op === 2) {
      setTitle("Editar Producto");
      setProducto_id(producto_id)
      setNombre(nombre);
      setDescripcion(descripcion);
      setUnidad_medida(unidad_medida);
      setMedida(medida);
      setTipo(tipo);
      setPrecio(precio);

    }
  };

  const save = (e: any) =>{
    e.preventDefault();
    const id = producto_id;
    const producto : Producto = { nombre, descripcion, unidad_medida, medida, tipo,precio };

    if(id===0){
      productoGateway.create(producto).then((response)=>{
        console.log(response)
      }).catch(error =>{
        console.log(error.response.data)
      })
    }else if(id!==0){
      productoGateway.update(id,producto).then((response)=>{
        console.log(response)
      }).catch(error =>{
        console.log(error.response.data)
      })
    }

    console.log(id)
  }


 
  const eliminar = (nuevoId : number) =>{
    
   
    productoGateway.remove(nuevoId).then(()=>{
      console.log(producto_id)
    }).catch(error =>{
      console.log(error.response.data)
    })
  }



  return (
    <>
      <div className="title">Productos</div>
      <button
        onClick={() => openModal(1,0, "", "", "", 0, "",0)}
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
                  <Button variant="outlined" color="error" onClick={()=>{if (typeof row.producto_id === 'number') eliminar(row.producto_id)}}>
                    Eliminar
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <button
                    onClick={() =>
                      openModal(
                        2,
                        row.producto_id || 0,                        
                        row.nombre,
                        row.descripcion,
                        row.unidad_medida,
                        row.medida,
                        row.tipo,
                        row.precio
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
              <input type="hidden" id="id" value={producto_id} onChange={(e) => setProducto_id(parseInt(e.target.value))} />
              Nombre:
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
              Descripcion:
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
              Unidad Medida:
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
              Medida:
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
              Tipo:
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
              Precio:
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="precio"
                  className="form-control"
                  placeholder="Precio"
                  value={precio}
                  onChange={(e) => setPrecio(parseFloat(e.target.value))}
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
