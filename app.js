//window.addEventListener("load", (e) => {
  /**
   * Clase asigantura
   */
  class Asignatura {
    /**
     * @param {String} nombre El nombe de la asigantura
     * @param {Number} primerPrevio  nota primer examen
     * @param {Number} segundoPrevio  nota segundo examen
     * @param {Number} tercerPrevio  nota tercer examen
     * @param {Number} examenFinal  nota examen final
     */
    constructor(
      nombre,
      primerPrevio,
      segundoPrevio,
      tercerPrevio,
      examenFinal
    ) {
      this.nombre = nombre;
      this.primerPrevio = primerPrevio;
      this.segundoPrevio = segundoPrevio;
      this.tercerPrevio = tercerPrevio;
      this.examenFinal = examenFinal;
    }

    /**
     * funcion visualizar objeto
     * @returns {Asignatura} devuelve datos del objeto
     */
    toString() {
      return this;
    }
  }

  /**
   *@type {array<Asignatura>} listado de asignaturas
   */
  let arrayAsignatura = Array();

  /**
   * cargando datos en local
   */
  cargarlocal();

  /**
   * Funcion cargar vector alamacenado en localStorage
   * @returns {void}
   */
  function cargarlocal() {
    var datos = JSON.parse(localStorage.getItem("arrayAsignatura"));
    if (datos != null) {
      arrayAsignatura = datos;
      calcularNota();
      visualizarArray();
      cargarTabla();
    }
    // arrayAsignatura = JSON.parse(localStorage.getItem('arrayAsignatura'));
  }

  /**
   * funcion sobre escribir localStorage
   * @param {Asignatura} info asignatura a almacenar
   * @returns {boolean} retorna true si fue añadido. false sino lo fue.
   */
  function almacenarLocalStorage() {
    if (typeof localStorage != "null") {
      localStorage.setItem("arrayAsignatura", JSON.stringify(arrayAsignatura));
      return true;
    } else {
      return false;
    }
  }

  /**
   * funcion añadir una nueva asigantura
   * @param {Asignatura} info cantidad de asignaturas nuevas
   * @returns {boolean} retorna true si fue añadido. false sino lo fue.
   */
  function crearAsignatura(info) {
    if (info != undefined) {
      arrayAsignatura.push(info);
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
    var primerPrevio = document.getElementById("primerPrevio").value;
    var segundoPrevio = document.getElementById("segundoPrevio").value;
    var tercerPrevio = document.getElementById("tercerPrevio").value;
    var examenFinal = document.getElementById("examenFinal").value;
    if (
      nombre != "" &&
      primerPrevio != "" &&
      segundoPrevio != "" &&
      tercerPrevio != "" &&
      examenFinal != ""
    ) {
      let resultado = crearAsignatura(
        new Asignatura(
          nombre,
          primerPrevio,
          segundoPrevio,
          tercerPrevio,
          examenFinal
        )
      );
      if (resultado == true) {
        alert("Asignatura añadida correctamente");
        calcularNota();
        visualizarArray();
        cargarTabla();
      } else {
        alert("Asignatura no añadida");
      }
    } else {
      alert("Asignatura no añadida");
    }
  });

  /**
   * Funcion visualizar vector
   * @returns {void}
   */
  function visualizarArray() {
    console.log(arrayAsignatura);
  }

  /**
   * funcion calcular nota
   * @returns {void}
   */
  function calcularNota() {
    if (arrayAsignatura != undefined) {
      arrayAsignatura.forEach((info) => {
        let calculo =
          ((Number(info.primerPrevio) +
            Number(info.segundoPrevio) +
            Number(info.tercerPrevio)) /
            3) *
            0.7 +
          Number(info.examenFinal) * 0.3;
        info.definitiva = Math.ceil(calculo);
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
                        <th scope="col">Primer Previo</th>
                        <th scope="col">Segundo Previo</th>
                        <th scope="col">Tercer previo</th>
                        <th scope="col">Examen Final</th>
                        <th scope="col">Definitiva</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
        <tbody>
        `;

    arrayAsignatura.map((info,index) => {
      tmp += `
        <tr>
          <td>${info.nombre}</td>
          <td>${info.primerPrevio}</td>
          <td>${info.segundoPrevio}</td>
          <td>${info.tercerPrevio}</td>
          <td>${info.examenFinal}</td>
          <td class="${cambiarColor(info.definitiva)}">${info.definitiva}</td>
          <td> 
          <button id="btncancelar" type="button" onclick="eliminar(${index})" class="btn btn-danger botonCancelar">Cancelar</button>

          <button id="botoninfo" type="button"  class="btn btn-info">Editar</button>
          </td>
        </tr>
       `;
    });

    tmp += `</tbody>`;

    const div = document.querySelector("table");
    div.innerHTML = tmp;
  }



  /**
   * Funcion cambio de color dependiendo la nota
   * @param {Number} nota valor de la definitiva
   * @returns {String} color que representa la nota
   */
  function cambiarColor(nota) {
    let tmp = "";
    if (nota != null) {
      if (nota >= 0.0 && nota < 2.9) {
        tmp = "bg-danger";
      } else if (nota >= 3.0 && nota <= 3.9) {
        tmp = "bg-warning";
      } else if (nota >= 4.0) {
        tmp = "bg-success";
      }
    }
    return tmp;
  }

/**
 * funcion eliminar materia y visualizar
 * @param {number} id identificador de la materia
 * @param {Asignatura} info objeto el cual contiene la informacion
 */
  function eliminar(id){
    let datos= arrayAsignatura.find((info,index )=>{
     if(index==id){
      return info;
     }
    });


    let tmp= `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
      <h5 class="card-title">Asignatura: ${datos.nombre}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Definitiva: ${datos.definitiva}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    `
    const div = document.querySelector("#card");
    //console.log(div);
    div.innerHTML= tmp;
    cancelarAsignatura(id);
  }

  /**
   * funcion cancelar asignatura
   */
  function cancelarAsignatura(id){
  arrayAsignatura.splice(id);
  console.log(arrayAsignatura);


  }

//});
