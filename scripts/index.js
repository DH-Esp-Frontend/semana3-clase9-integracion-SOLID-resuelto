/**
 * Aquí tenemos los elementos que sirven de base para construir el personaje.
 *
 * @type { Array<{
 *  [elemento: string]: {
 *   nombre: string,
 *   logo: string,
 *   debilidad: string,
 *   fuerza: number,
 *   vida: number,
 *   defensa: number,
 *   velocidad: number,
 * }
 * }>}
 *  */
const elementos = {
  agua: {
    nombre: "Agua",
    logo: "./assets/agua.png",
    debilidad: "Tierra",
    fuerza: 30,
    vida: 100,
    defensa: 40,
    velocidad: 70,
  },
  fuego: {
    nombre: "Fuego",
    logo: "./assets/fuego.png",
    debilidad: "Agua",
    fuerza: 50,
    vida: 90,
    defensa: 50,
    velocidad: 60,
  },
  tierra: {
    nombre: "Tierra",
    logo: "./assets/tierra.png",
    debilidad: "Aire",
    fuerza: 40,
    vida: 80,
    defensa: 60,
    velocidad: 50,
  },
  aire: {
    nombre: "Aire",
    logo: "./assets/aire.png",
    debilidad: "Fuego",
    fuerza: 30,
    vida: 80,
    defensa: 40,
    velocidad: 80,
  },
};

/**
 * Estos personajes son los que se van a mostrar en la página al inicio y por defecto.
 *
 * @type { Array<{
 *   nombre: string,
 *   elemento: string,
 *   avatar: string,
 * }>
 * }
 */
const personajesPorDefecto = [
  {
    nombre: "Aquagirl",
    elemento: elementos.agua.nombre,
    avatar:
      "https://i.pinimg.com/564x/e8/a6/7b/e8a67b8241f508dcfd67623ed400f6fb.jpg",
  },
  {
    nombre: "Windstorm",
    elemento: elementos.aire.nombre,
    avatar:
      "https://i.pinimg.com/564x/9b/2f/b1/9b2fb11fb0e56b914edf1ae2c15d55fa.jpg",
  },
  {
    nombre: "Firegirl",
    elemento: elementos.fuego.nombre,
    avatar:
      "https://i.pinimg.com/564x/84/09/58/84095862a57e6bd18f2b392f52bbd0d6.jpg",
  },
  {
    nombre: "Earthquake",
    elemento: elementos.tierra.nombre,
    avatar:
      "https://i.pinimg.com/564x/2b/ac/3a/2bac3a5eb353e08e25a609993798a774.jpg",
  },
];

//
/**
 * Esta función nos devuelve el HTML de una tarjeta de personaje en forma de string.
 *
 * @param {{
 *  nombre: string,
 *  elemento: string,
 *  avatar: string,
 *  logo: string,
 *  fuerza: number,
 *  vida: number,
 *  defensa: number,
 *  velocidad: number,
 * }
 * } personaje
 *
 * @returns {string}
 */
const TarjetaPersonaje = (personaje) => `
<div class="card shadow-sm">
  <div class="card-header">
   <img src=${personaje.avatar} alt="${personaje.nombre}" class="bd-placeholder-img card-img-top"/>
   <img src="${personaje.logo}" alt="${personaje.elemento}" class="logo-elemento" />
  </div>
  <div class="card-body">
      <h5 class="card-title">${personaje.nombre}</h5>
      <small class="text-muted">${personaje.elemento}</small>
      <ul>
          <li><i>Fuerza:</i> <span>${personaje.fuerza}</span></li>
          <li><i>Vida:</i> <span>${personaje.vida}</span></li>
          <li><i>Defensa:</i> <span>${personaje.defensa}</span></li>
          <li><i>Velocidad:</i> <span>${personaje.velocidad}</span></li>
      </ul>
      </p>
      <div class="d-flex justify-content-between align-items-center">
      </div>
  </div>
</div>
`;

class Personaje {
  constructor(nombre, elemento, avatar) {
    const { fuerza, vida, defensa, velocidad, debilidad, logo } =
      elementos[elemento.toLowerCase()];

    this.nombre = nombre;
    this.elemento = elemento;
    this.avatar = avatar;
    this.debilidad = debilidad;
    this.fuerza = fuerza;
    this.vida = vida;
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.logo = logo;
  }
}

const crearPersonajesPorDefecto = (personajesPorDefecto) =>
  personajesPorDefecto.map(
    (p) => new Personaje(p.nombre, p.elemento, p.avatar)
  );

const crearTarjetaPersonaje = (personaje) => {
  const card = document.createElement("div");
  card.classList.add("col");

  card.innerHTML = TarjetaPersonaje(personaje);

  return card;
};

const renderizarPersonajes = (personajes) => {
  const $CONTAINER = document.querySelector("#card-container");

  $CONTAINER.innerHTML = "";

  personajes.forEach((personaje) => {
    const card = crearTarjetaPersonaje(personaje);

    $CONTAINER.appendChild(card);
  });
};

const crearPersonajeYActualizarListado = (nombre, elemento, avatar) => {
  const personajesIniciales = crearPersonajesPorDefecto(personajesPorDefecto);
  const nuevoPersonaje = new Personaje(nombre, elemento, avatar);

  const nuevosPersonajes = [...personajesIniciales, nuevoPersonaje];

  renderizarPersonajes(nuevosPersonajes);
};

const $BTN_AGREGAR_PERSONAJE = document.querySelector("#crear-personaje");

$BTN_AGREGAR_PERSONAJE.addEventListener("click", () => {
  const nombre = document.querySelector("#nombre-personaje").value;
  const elemento = document.querySelector("#elemento-personaje").value;
  const avatar = document.querySelector("#avatar-personaje").value;

  if (nombre && elemento && avatar) {
    crearPersonajeYActualizarListado(nombre, elemento, avatar);
  }
});

window.addEventListener("load", () => {
  const personajesIniciales = crearPersonajesPorDefecto(personajesPorDefecto);

  renderizarPersonajes(personajesIniciales);
});
