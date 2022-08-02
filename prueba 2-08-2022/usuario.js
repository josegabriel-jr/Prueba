/**
 * Clase Usuario
 */
class Usuario {
  /**
   * @param {String} nombre El nombe del usuario
   * @param {Number} cedula CC de usuario
   * @param {Date} fechaNacimiento  fecha de nacimiento
   * @param {number} isActivo usuario activo
   */
  constructor(nombre, cedula, fechaNacimiento, isActivo) {
    this.nombre = nombre;
    this.cedula = cedula;
    this.fechaNacimiento = fechaNacimiento;
    this.isActivo = isActivo;
  }

  /**
   * funcion visualizar objeto
   * @returns {Usuario} devuelve datos del objeto
   */
  toString() {
    return this;
  }
}

/**
 *@type {array<Usuario>} listado de Usuarios
 */
let arrayUsuarios = Array();

/**
 * @type {array<Usuario>} listado de usuarios no activos
 */
let arrayUsuariosOff = Array();

/**
 * cargando datos en local
 */
cargarlocal();

/**
 * Funcion cargar vector alamacenado en localStorage
 * @returns {void}
 */
function cargarlocal() {
  var datos = JSON.parse(localStorage.getItem("arrayUsuarios"));
  if (datos != null) {
    arrayUsuarios = datos;
    calcularEdad();
    // visualizarArray();
    cargarTabla();
  }
}

/**
 * funcion sobre escribir localStorage
 * @returns {boolean} retorna true si fue añadido. false sino lo fue.
 */
function almacenarLocalStorage() {
  if (typeof localStorage != "null") {
    localStorage.setItem("arrayUsuarios", JSON.stringify(arrayUsuarios));
    return true;
  } else {
    return false;
  }
}

/**
 * funcion añadir un nuevo usuario
 * @param {Usuario} info informacion de usuario
 * @returns {boolean} retorna true si fue añadido. false sino lo fue.
 */
function crearUsuario(info) {
  if (info != undefined) {
    arrayUsuarios.push(info);
    almacenarLocalStorage();
    return true;
  } else {
    return false;
  }
}

/**
 * Evento click
 */
boton.addEventListener("click", (e) => {
  var nombre = document.getElementById("nombre").value;
  var cedula = document.getElementById("cedula").value;
  var fecha = document.getElementById("fechaNacimiento").value;
  if (nombre != "" && cedula != "" && fecha != undefined && existeUsuario(cedula) != true) {
    let resultado = crearUsuario(new Usuario(nombre, cedula, fecha, 1));
    if (resultado == true) {
      alert("Usuario añadido correctamente");
      calcularEdad();
      cargarTabla();
    } else {
      alert("Usuario no añadido");
    }
  } else {
    alert("Usuario no añadido");
  }
});

/**
 * Funcion visualizar vector
 * @returns {void}
 */
function visualizarArray() {
  console.log(arrayUsuariosOff);
}

/**
 * funcion calcular edad usuario
 * @returns {void}
 */
function calcularEdad() {
  if (arrayUsuarios != undefined) {
    arrayUsuarios.forEach((info) => {
      var hoy = new Date();
      var cumpleanos = new Date(info.fechaNacimiento);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      edad;
      info.edad = edad;
    });
  }
}

/**
 * funcion cargar tabla en index html
 * @returns {void}
 */
function cargarTabla() {
  let tmp = ` 
        <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">cedula</th>
                        <th scope="col">fecha Nacimiento</th>
                        <th scope="col">edad</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
        <tbody>
        `;

  arrayUsuarios.map((info, index) => {
    if(info.isActivo == 1){
      tmp += `
      <tr>
        <td>${info.nombre}</td>
        <td>${info.cedula}</td>
        <td>${info.fechaNacimiento}</td>
        <td>${info.edad}</td>
        <td>
        <button id="btncancelar" type="button" onclick="eliminar(${info.cedula})" class="btn btn-danger botonCancelar">Cancelar</button>
        <button id="botoninfo" type="button"  onclick="editar(${info.cedula})" class="btn btn-info">Editar</button>
        </td>
      </tr>
     `;
    }

  });

  tmp += `</tbody>`;

  const div = document.querySelector("table");
  div.innerHTML = tmp;
}

/**
 * funcion eliminar usuario y visualizar
 * @param {number} id identificador del usuario
 * @return {void} 
*/
function eliminar(id) {
  arrayUsuarios.forEach(info=>{
    if(info.cedula == id){
      info.isActivo = 0;
      arrayUsuariosOff.push(info);
      return;
    }
  })
  cargarTabla();

  let tmp = ` `;
      arrayUsuariosOff.forEach(info=>{
        tmp +=`
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Asignatura: ${info.nombre}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Definitiva: ${info.cedula}</h6>
        <p class="card-text">Edad: ${info.edad
        }</p>
        `;

      })
      
     tmp +=  `       
      </div>
      `;
    ;
  const div = document.querySelector("#card");
  //console.log(div);
  div.innerHTML = tmp;
  almacenarLocalStorage();
}

/**
   * Funcion que busca un usuario por su cedula
   * @param {Number} cedula 
   * @return {boolean} retorna true si existe. false sino.
   */
 function existeUsuario(cedula){
  let resultado = false;
  arrayUsuarios.find(info=>{
      if(info.cedula == cedula){
        resultado = true;
        return;
      }
    });
    return resultado; 
}


/**
 * funcion editar usuario selecionado
 * @param {Number} id cedula identificadora del usuario 
 */
function editar(id){
  const div = document.querySelector("#formulario");
  let resultado = arrayUsuarios.find((info)=>{
   if(info.cedula == id){
    return true;
   }
  });

  let tmp =`<div id="formulario">
  <h2 class="text-center">Editar Asignatura</h2>
  <div id="miForm">
      <div class="mb-3">
          <label for="" class="form-label">nombre</label>
          <input type="text" class="form-control" id="nombre" required placeholder="${resultado.nombre}">
      </div>
      <div class="mb-3">
          <label for="" class="form-label">cedula</label>
          <input type="number" class="form-control" id="cedula" required placeholder="${resultado.cedula}">
      </div>
      <div class="mb-3">
          <label for="" class="form-label">date</label>
          <input type="date" class="form-control" id="fechaNacimiento" required placeholder="${resultado.fechaNacimiento}">
      </div>
      <button id="boton" onclick="confirmarEdicion(${resultado.cedula})" class="btn btn-primary">guardar</button>
      <button id="boton" onclick="confirmar(${resultado.cedula})" class="btn btn-danger">cancelar</button>
  </div>
    </div>`;
  div.innerHTML = tmp;
}


/**
 * funcion confirmar guardado de informacion
 * @param {Number} id  cedula identificadora de usuario
 * @return {void}
 */
function confirmarEdicion(id){
  var nombre = document.getElementById("nombre").value;
  var cedula = document.getElementById("cedula").value;
  var fecha = document.getElementById("fechaNacimiento").value;
  if (nombre != "" && cedula != "" && fecha != undefined) {
    arrayUsuarios.forEach(info=>{
      if(info.cedula==id){
        info.nombre = nombre;
        info.cedula = cedula;
        info.fecha = fecha;
      }
    })
    alert("informacion cambiada")
    cargarTabla();
    almacenarLocalStorage();
  }
}
