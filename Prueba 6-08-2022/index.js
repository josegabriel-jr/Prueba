/**
 * @type {Object} paquete de npm fs lectura y escritura de archivos
 */
const fs = require("fs");

/**
 * @type {Object} paquete de npm colors
 */
const colors = require("colors");

/**
 * @type {String}  directorio
 */
const directorio = "prueba.txt";


/**
 * Funcion Leer texto de  un txt 
 * @param {String} info  directorio del text
 * @returns {String} texto Leido
 */
const leerText = async (info) => {
  try {
    const data = fs.readFileSync(info, "utf8");
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Funcion Colorear texto por colores
 * @param {String} dir texto leido de un txt
 * @return {void}
 */
const dividirTEXT = async (dir) => {
  try {
    let datos = (await leerText(dir)).trim();
    let tmp = datos.split("    ");
    let rta = `    
                        ${tmp[0].yellow}
${tmp[1].green}
${tmp[2].green}
${tmp[3].green}
${tmp[4].green}
               `;
    console.log(rta);
  } catch (error) {
    throw error;
  }
};

dividirTEXT(directorio);
