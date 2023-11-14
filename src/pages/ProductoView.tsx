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
import toast, { Toaster } from "react-hot-toast";
import ReporteProductoGateway from "../gateway/ReporteProductoGateway";
import DropdownButtonProducto from "../components/DropdownButtonProducto";

export const Productos = () => {
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
  const reporteProductoGateway = new ReporteProductoGateway();

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

  const handleReport = () => {
    reporteProductoGateway
      .generateReportProducto()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

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

  const showAlert = () => {
    Swal.fire("Alerta de Stockout o Sobreabastecimiento");
    funcionesIf();
  };
  const handleNombreChange = (e: any) => {
    const nuevoNombre = e.target.value;
    const regex = /^[a-zA-Z\s]+$/;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoNombre.trim() === "") {
      setErrorName("El nombre no puede estar vacío");
    } else if (!regex.test(nuevoNombre)) {
      setErrorName("El nombre solo debe contener letras");
    } else {
      setErrorName(""); // Limpiar el mensaje de error si la entrada es válida.
      setNombre(nuevoNombre); // Actualizar el valor del campo.
      console.log(nombre);
    }
  };

  const handleDescripcionChange = (e: any) => {
    const nuevoDescripcion = e.target.value;
    const regex = /^[a-zA-Z\s]+$/;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoDescripcion.trim() === "") {
      setErrorDescripcion("La descripcion no puede estar vacío");
    } else if (!regex.test(nuevoDescripcion)) {
      setErrorDescripcion("Solo debe contener letras");
    } else {
      setErrorDescripcion(""); // Limpiar el mensaje de error si la entrada es válida.
      setDescripcion(nuevoDescripcion); // Actualizar el valor del campo.
      console.log(descripcion);
    }
  };

  const handleUnidadChange = (e: any) => {
    const nuevoUnidad = e.target.value;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoUnidad.trim() === "") {
      setErrorUnidad("La unidad no puede estar vacío");
    } else {
      setErrorUnidad(""); // Limpiar el mensaje de error si la entrada es válida.
      setUnidad_medida(nuevoUnidad); // Actualizar el valor del campo.
      console.log(unidad_medida);
    }
  };

  const handleCantidadChange = (e: any) => {
    const nuevoCantidad = e.target.value;
    const regexPrecio = /^\d+(\.\d{1,2})?$/;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoCantidad.trim() === "") {
      setErrorCantidad("El precio no puede estar vacío");
    } else if (!regexPrecio.test(nuevoCantidad)) {
      setErrorCantidad("Formato de precio no válido");
    } else {
      setErrorCantidad(""); // Limpiar el mensaje de error si la entrada es válida.
      setCantidad(nuevoCantidad); // Actualizar el valor del campo.
    }
  };

  const handleTipoChange = (e: any) => {
    const nuevoTipo = e.target.value;
    const regex = /^[a-zA-Z\s]+$/;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoTipo.trim() === "") {
      setErrorTipo("El tipo no puede estar vacío");
    } else if (!regex.test(nuevoTipo)) {
      setErrorTipo("Solo debe contener letras");
    } else {
      setErrorTipo(""); // Limpiar el mensaje de error si la entrada es válida.
      setTipo(nuevoTipo); // Actualizar el valor del campo.
      console.log(tipo);
    }
  };

  const handlePrecioChange = (e: any) => {
    const nuevoPrecio = e.target.value;
    const regexPrecio = /^\d+(\.\d{1,2})?$/;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoPrecio.trim() === "") {
      setErrorPrecio("El precio no puede estar vacío");
    } else if (!regexPrecio.test(nuevoPrecio)) {
      setErrorPrecio("Formato de precio no válido");
    } else {
      setErrorPrecio(""); // Limpiar el mensaje de error si la entrada es válida.
      setPrecio(nuevoPrecio); // Actualizar el valor del campo.
    }
  };

  const formSubmit = (e: any) => {
    e.preventDefault();
    if (
      nombre.trim() === "" ||
      descripcion.trim() === "" ||
      unidad_medida.trim() === "" ||
      tipo.trim() === "" ||
      precio === 0
    ) {
      // Si algún campo requerido está vacío, muestra un mensaje de error o realiza alguna acción adecuada.
      Swal.fire("Debe rellenar los campos");
      return;
    }
  };

  const funcionesIf = () =>{
    productos.map((row) => {if(row.nombre==="Ropa de vestir"){
      if (row.cantidad <= 100) {
        toast.error(`La cantidad de ${row.nombre} es menor a 100 unidades`, {duration: 10000});
      } else if (row.cantidad >= 200) {
        toast.error(`La cantidad de ${row.nombre} es mayor a 200 unidades`, {duration: 10000} );
      }
    }  

    if(row.nombre==="Ropa de cama y hogar"){
      if (row.cantidad <= 75) {
        toast.error(`La cantidad de ${row.nombre} es menor a 75 unidades`, {duration: 10000});
      } else if (row.cantidad >= 125) {
        toast.error(`La cantidad de ${row.nombre} es mayor a 125 unidades`, {duration: 10000} );
      }
    }  

    if(row.nombre==="Ropa interior y lenceria	"){
      if (row.cantidad <= 150) {
        toast.error(`La cantidad de ${row.nombre} es menor a 150 unidades`, {duration: 10000});
      } else if (row.cantidad >= 250) {
        toast.error(`La cantidad de ${row.nombre} es mayor a 250 unidades`, {duration: 10000});
      }
    }  

    if(row.nombre==="Uniformes y ropa corporativa	"){
      if (row.cantidad <= 50) {
        toast.error(`La cantidad de ${row.nombre} es menor a 50 unidades`, {duration: 10000});
      } else if (row.cantidad >= 100) {
        toast.error(`La cantidad de ${row.nombre} es mayor a 100 unidades`, {duration: 10000});
      }
    }  

    if(row.nombre==="Ropa deportiva y de moda informal	"){
      if (row.cantidad <= 125) {
        toast.error(`La cantidad de ${row.nombre} es menor a 125 unidades`, {duration: 10000});
      } else if (row.cantidad >= 250) {
        toast.error(`La cantidad de ${row.nombre} es mayor a 250 unidades` , {duration: 10000});
      }
          }})
  }

  useEffect(()=>{
    funcionesIf()
  },[productos])

  return (
    <>
      <div className="producto-title">
        <div className="title">Productos</div>
        <button className="campana-button" onClick={showAlert}>
          <i className="fa-solid fa-bell campana"></i>
        </button>
      </div>
      <button
        onClick={() => openModal(1, 0, "", "", "", 0, "", 0)}
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
              <TableCell align="right">Cantidad&nbsp;(g)</TableCell>
              <TableCell align="right">Tipo&nbsp;(g)</TableCell>
              <TableCell align="right">Precio&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((row) => {

              return (
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
              );
            })}
            <Toaster />
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={handleReport}>
        Reporte General
      </Button>
      <br />
      <DropdownButtonProducto/>
      <form onSubmit={formSubmit}>
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
                <input
                  type="hidden"
                  id="id"
                  value={producto_id}
                  onChange={(e) => setProducto_id(parseInt(e.target.value))}
                />
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
                    onChange={handleNombreChange}
                  />
                </div>
                {errorName && <p className="error-message">{errorName}</p>}
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
                    onChange={handleDescripcionChange}
                  />
                </div>
                {errorDescripcion && (
                  <p className="error-message">{errorDescripcion}</p>
                )}
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
                    onChange={handleUnidadChange}
                  />
                </div>
                {errorUnidad && <p className="error-message">{errorUnidad}</p>}
                Cantidad
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-gift"></i>
                  </span>
                  <input
                    type="number"
                    id="cantidad"
                    className="form-control"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={handleCantidadChange}
                  />
                </div>
                {errorCantidad && (
                  <p className="error-message">{errorCantidad}</p>
                )}
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
                    onChange={handleTipoChange}
                  />
                </div>
                {errorTipo && <p className="error-message">{errorTipo}</p>}
                Precio:
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-gift"></i>
                  </span>
                  <input
                    type="number"
                    id="precio"
                    className="form-control"
                    placeholder="Precio"
                    value={precio}
                    onChange={handlePrecioChange}
                  />
                </div>
                {errorPrecio && <p className="error-message">{errorPrecio}</p>}
                <div className="d-grid col-6 mx-auto">
                  <button className="btn btn-success">
                    <i
                      className="fa-solid fa-floppy-disk"
                      onClick={(e) => save(e)}
                    >
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
      </form>
    </>
  );
};
