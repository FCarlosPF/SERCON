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
import { useState, useEffect } from "react";
import { show_alerta } from "../functions/alert";
import axios from "axios";
import InsumoGateway from "../gateway/InsumoGateway";
import { error } from "console";
import ProductoGateway from "../gateway/ProductosGateway";
import Swal from "sweetalert2";

export const table = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [producto_id, setProducto_id] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidad_medida, setUnidad_medida] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorUnidad, setErrorUnidad] = useState("");
  const [errorTipo, setErrorTipo] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorCantidad, setErrorCantidad] = useState("");
  const productoGateway = new ProductoGateway();

  interface Producto {
    producto_id?: number;
    nombre: string;
    descripcion: string;
    unidad_medida: string;
    cantidad: number;
    tipo: string;
    precio: number;
  }

  useEffect(() => {
    productoGateway
      .findAll()
      .then((productos) => {
        setProductos(productos);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  const openModal = (
    op: number,
    producto_id: number,
    nombre: string,
    descripcion: string,
    unidad_medida: string,
    cantidad: number,
    tipo: string,
    precio: number
  ) => {
    setProducto_id(0);
    setNombre("");
    setDescripcion("");
    setUnidad_medida("");
    setCantidad(0);
    setTipo("");
    setPrecio(0);
    if (op === 1) {
      setTitle("Registrar Producto");
    } else if (op === 2) {
      setTitle("Editar Producto");
      setProducto_id(producto_id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setUnidad_medida(unidad_medida);
      setCantidad(cantidad);
      setTipo(tipo);
      setPrecio(precio);
    }
  };

  const save = (e: any) => {
    e.preventDefault();
    const id = producto_id;
    const producto: Producto = {
      producto_id,
      nombre,
      descripcion,
      unidad_medida,
      cantidad,
      tipo,
      precio,
    };

    if (id === 0) {
      productoGateway
        .create(producto)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else if (id !== 0) {
      productoGateway
        .update(producto)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    window.location.reload();
    console.log(id);
  };

  const eliminar = (nuevoId: number) => {
    productoGateway
      .remove(nuevoId)
      .then(() => {
        console.log(producto_id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    window.location.reload();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Descripción&nbsp;(g)</TableCell>
              <TableCell align="right">Unidad_Medida&nbsp;(g)</TableCell>
              <TableCell align="right">Cantidad&nbsp;(g)</TableCell>
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
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{row.tipo}</TableCell>
                <TableCell align="right">{row.precio}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (typeof row.producto_id === "number")
                        eliminar(row.producto_id);
                    }}
                  >
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
                        row.cantidad,
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
    </>
  );
};
