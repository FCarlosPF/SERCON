import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alerta(mensaje,icono,foco){
    onFocus(foco);
    const mySwal = withReactContent(Swal);
    mySwal.fire({
        title:mensaje,
        icon:icono
    })

}

function onFocus(foco){
    if(foco != ''){
        document.getElementById(foco).focus()
    }
}