import {obtenerCliente, editarCliente} from './API.js';
import {mostrarAlerta , validar} from './funciones.js';


// para proteger variables y funciones
(function(){

    //campos de formulario
    const nombreInput=document.querySelector('#nombre');
    const empresaInput=document.querySelector('#empresa');
    const emailInput=document.querySelector('#email');
    const telefonoInput=document.querySelector('#telefono');
    const puestoInput=document.querySelector('#puesto');
    const direccionInput=document.querySelector('#direccion');
    const idInput=document.querySelector('#id');

    document.addEventListener('DOMContentLoaded', async ()=>{
        const parametrosURL=new URLSearchParams(window.location.search);
        const idCliente= parseInt(parametrosURL.get('id'));
       const cliente= await obtenerCliente(idCliente);
       
       mostrarCliente(cliente);
        //submit al formulario
       const formulario=document.querySelector('#formulario');
       formulario.addEventListener('submit', validarCliente);
    });

function mostrarCliente(cliente){
    const{ nombre, empresa, email, telefono,puesto, direccion, id }=cliente;

    nombreInput.value=nombre;
    empresaInput.value=empresa;
    emailInput.value=email;
    telefonoInput.value=telefono;
    puestoInput.value=puesto;
    direccionInput.value=direccion;
    idInput.value=id;
    
}

function validarCliente(e){
    e.preventDefault();
    const cliente={
        nombre:nombreInput.value ,
        email:emailInput.value ,
        telefono:telefonoInput.value ,
        empresa: empresaInput.value ,
        puesto: puestoInput.value ,
        direccion: direccionInput.value ,
        id: parseInt(idInput.value)
    }

    console.log(cliente);

    if(validar(cliente)){
        //mostrar mensaje
        mostrarAlerta('Todos los campos son obligatorios');
        return;
    }

    //reescribir el objeto
    editarCliente(cliente);
}

})();