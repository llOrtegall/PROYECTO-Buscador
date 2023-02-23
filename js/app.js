//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contener para los resultados
const resultado = document.querySelector('#resultado');

const maxYear = new Date().getFullYear();// año actualizado
const minYear = maxYear - 10; //min year

//generar un objeto con las busqueda
const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos); //muestra los atomoviles al cargar

  //llena las opiciones de años
  llenarSelect();
})

//Event Listeners Paara los selec de busqueda
marca.addEventListener('change', e => {
  datosBusqueda.marca = e.target.value;

  filtrarAutos();
})

year.addEventListener('change', e => {
  datosBusqueda.year = parseInt(e.target.value);

  filtrarAutos();
})

minimo.addEventListener('change', e => {
  datosBusqueda.minimo = e.target.value;

  filtrarAutos();
})

maximo.addEventListener('change', e => {
  datosBusqueda.maximo = e.target.value;

  filtrarAutos();
})

puertas.addEventListener('change', e => {
  datosBusqueda.puertas = parseInt(e.target.value);

  filtrarAutos();
})

transmision.addEventListener('change', e => {
  datosBusqueda.transmision = e.target.value;

  filtrarAutos();
});

color.addEventListener('change', e => {
  datosBusqueda.color = e.target.value;

  filtrarAutos();
});





//Funciones del app
function mostrarAutos(autos) {


  limpiarHtml(); // elimina el html previo

  autos.forEach(auto => {

    const autoHtml = document.createElement('p');
    const { marca, modelo, year, puertas, transmision, precio, color } = auto; //distroCshering

    autoHtml.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas}  puertas - precio: $ ${precio} - transmisión: ${transmision} - Color: ${color}
    `;
    //insertar en el html el resultado
    resultado.appendChild(autoHtml);
  })
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Generar los años del select
function llenarSelect() {

  for (let i = maxYear; i >= minYear; i--) {
    const opc = document.createElement('option');
    opc.value = i;
    opc.textContent = i;
    year.appendChild(opc); // agrega las opciones de año al select
  }
}

//funcion que filtra en base a la busqueda

function filtrarAutos() { //cuando s

  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo)
    .filter(filtrarPuertas).filter(filtrarTrasmision).filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }

}

function noResultado(){

  limpiarHtml();

  const noResultado = document.createElement('P');
  noResultado.classList.add('alert', 'error');
  noResultado.textContent = 'No Hay resultados Intenta con otros Términos de Busqueda';
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;

  if (marca) {
    return auto.marca === marca;
  }
  return auto; //matener la referencia de valores ya filtrados
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;

  if (year) {
    return auto.year === year;
  }
  return auto; //matener la referencia de valores ya filtrados
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;

  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto; //matener la referencia de valores ya filtrados
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;

  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto; //matener la referencia de valores ya filtrados
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;

  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto; //matener la referencia de valores ya filtrados
}

function filtrarTrasmision(auto) {
  const { transmision } = datosBusqueda;

  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;

  if (color) {
    return auto.color === color;
  }
  return auto;
}