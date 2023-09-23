import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import "../css/insumos.css";
import { useState } from "react";
import InsumoGateway from "../gateway/InsumoGateway";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const Insumos = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [insumo_id, setInsumo_id] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidad_medida, setUnidad_medida] = useState("");
  const [medida, setMedida] = useState(0);
  const [tipo, setTipo] = useState("");
  const [title, setTitle] = useState("");
  const insumoGateway = new InsumoGateway();
  const [errorName, setErrorName] = useState('');
  const [errorDescripcion, setErrorDescripcion] = useState('');
  const [errorUnidad, setErrorUnidad] = useState('');
  const [errorMedida, setErrorMedida] = useState('');
  const [errorTipo, setErrorTipo] = useState('');


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
    .catch((error) => {
      console.log(error);
    });

  const openModal = (
    op: number,
    insumo_id: number,
    nombre: string,
    descripcion: string,
    unidad_medida: string,
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
    const id = insumo_id;
    const insumo: Insumo = { nombre, descripcion, unidad_medida, medida, tipo };

    if (id === 0) {
      insumoGateway
        .create(insumo)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else if (id !== 0) {
      insumoGateway
        .update(id, insumo)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    console.log(id);
  };

  const eliminar = (insumoId: number) => {
    insumoGateway
      .remove(insumoId)
      .then(() => {
        console.log(insumo_id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };



  const showAlert= ()=>{
    Swal.fire('Alerta de Stockout o Sobreabastecimiento')
  }

  const handleNombreChange = (e : any) => {
    const nuevoNombre = e.target.value;
    const regex = /^[a-zA-Z]+$/;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoNombre.trim() === '') {
      setErrorName('El nombre no puede estar vacío');
    } else if (!regex.test(nuevoNombre)) {
      setErrorName('El nombre solo debe contener letras');
    }else {
      setErrorName(''); // Limpiar el mensaje de error si la entrada es válida.
      setNombre(nuevoNombre); // Actualizar el valor del campo.
      console.log(nombre)
    }
  };

  const handleDescripcionChange = (e : any) => {
    const nuevoDescripcion = e.target.value;
    const regex = /^[a-zA-Z]+$/;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoDescripcion.trim() === '') {
      setErrorDescripcion('La descripcion no puede estar vacío');
    }else if (!regex.test(nuevoDescripcion)) {
      setErrorDescripcion('Solo debe contener letras');
    } else {
      setErrorDescripcion(''); // Limpiar el mensaje de error si la entrada es válida.
      setDescripcion(nuevoDescripcion); // Actualizar el valor del campo.
      console.log(descripcion)
    }
  };

  const handleUnidadChange = (e : any) => {
    const nuevoUnidad = e.target.value;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoUnidad.trim() === '') {
      setErrorUnidad('La unidad no puede estar vacío');
    } else {
      setErrorUnidad(''); // Limpiar el mensaje de error si la entrada es válida.
      setUnidad_medida(nuevoUnidad); // Actualizar el valor del campo.
      console.log(unidad_medida)
    }
  };

  const handleTipoChange = (e : any) => {
    const nuevoTipo = e.target.value;
    const regex = /^[a-zA-Z]+$/;

    // Validación básica: Asegurarse de que el campo no esté vacío.
    if (nuevoTipo.trim() === '') {
      setErrorTipo('El tipo no puede estar vacío');
    }else if (!regex.test(nuevoTipo)) {
      setErrorTipo('Solo debe contener letras');
    }  else {
      setErrorTipo(''); // Limpiar el mensaje de error si la entrada es válida.
      setTipo(nuevoTipo); // Actualizar el valor del campo.
      console.log(tipo)
    }
  };

  const formSubmit = (e:any)=>{
    e.preventDefault()
  }
  return (
    <>
      <div className="insumo-title">
        <div className="title">Insumos </div>
        <button className="campana-button" onClick={showAlert}>
          <i className="fa-solid fa-bell campana"></i>
        </button>
      </div>
      <button 
        onClick={() => openModal(1, 0, "", "", "", 0, "")}
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
                <TableCell align="right">{row.tipo}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (typeof row.insumo_id === "number")
                        eliminar(row.insumo_id);
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
                        row.insumo_id || 0,
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

      <form onSubmit={formSubmit}>
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
                  value={insumo_id}
                  onChange={(e) => setInsumo_id(parseInt(e.target.value))}
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
                {errorName && (
                <>
                <p className="error-message">{errorName}</p>
                </>
                )}

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
                    onChange={handleDescripcionChange}
                  />
                  {errorDescripcion && (
                <>
                <p className="error-message">{errorDescripcion}</p>
                </>
                )}
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
                    onChange={handleUnidadChange}
                  />
                   {errorUnidad && (
                <>
                <p className="error-message">{errorUnidad}</p>
                </>
                )}
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
                    onChange={handleTipoChange}
                  />
                  {errorTipo && <p className="error-message">{errorTipo}</p>}
                </div>
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
