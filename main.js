const nav = document.querySelector('#nav');
const open = document.querySelector('#open');
const close = document.querySelector('#close');
const navLinks = document.querySelectorAll('.pages li a');

open.addEventListener('click', () => {
  nav.classList.add('observable');
});

close.addEventListener('click', () => {
  nav.classList.remove('observable');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('observable');
  });
});

const speakers = [
  {
    photo: './images/speaker1.png',
    name: 'Estalin Romero',
    ocupation: 'Profesor Berkman de Estudios Legales Emprendedores en la Facultad de Derecho de Harvard',
    description: 'Benkler estudia la producción entre pares basada en bienes comunes y publicó su libro seminal, "La Riqueza de las Redes", en 2006.',
  },
  {
    photo: './images/speaker3.png',
    name: 'SohYeong Noh',
    ocupation: 'Directora del Centro de Arte Nabi y miembro de la junta de CC Corea',
    description: 'Kilnam Chon ayudó a llevar Internet a Asia y es un firme defensor de la web abierta y los bienes digitales comunes. En 2012, fue incluido en la clase inaugural del Salón de la Fama de Internet de la Sociedad de Internet (ISOC).',
  },
  {
    photo: './images/speaker2.png',
    name: 'Kilnam Chon',
    description: 'Kilnam Chon ayudó a llevar Internet a Asia y es un firme defensor de la web abierta y los bienes digitales comunes. En 2012, fue incluido en la clase inaugural del Salón de la Fama de Internet de la Sociedad de Internet (ISOC).',
  },
  {
    photo: './images/speaker4.png',
    name: 'Julia Leda',
    ocupation: 'Presidenta de Jóvenes Piratas de Europa',
    description: 'La integración europea, la democracia política y la participación juvenil en línea son sus principales preocupaciones. Su informe sobre posibles cambios en la ley de derechos de autor de la UE fue aprobado por el Parlamento en julio.',
  },
  {
    photo: './images/speaker5.png',
    name: 'Lila Tretikov',
    ocupation: 'Directora Ejecutiva de la Fundación Wikimedia',
    description: 'Lila Tretikov es la Directora Ejecutiva de la Fundación Wikimedia, la organización sin fines de lucro que opera Wikipedia. Wikipedia está disponible en 290 idiomas y es utilizada por casi medio billón de personas en todo el mundo cada mes.',
  },
  {
    photo: './images/speaker6.png',
    name: 'Ryan Merkley',
    ocupation: 'CEO de Creative Commons, ex COO de la Fundación Mozilla',
    description: 'Ryan ha liderado proyectos de código abierto en la Fundación Mozilla, como el movimiento de código abierto.',
  },
];

const speakersContainer = document.querySelector('.speakers');
const moreBtn = document.getElementById('moreBtn');
const initialVisibleSpeakers = 2;
let visibleSpeakers = initialVisibleSpeakers;

function card(speaker) {
  return `
    <div class="speaker-container">
      <img src="${speaker.photo}" alt="${speaker.name}" class="speaker-pic">
      <div class="text-speaker">
        <h4 class="speaker-name">${speaker.name}</h4>
        <p class="speaker-ocupation">${speaker.ocupation || ''}</p>
        <div class="speaker-line"></div>
        <p class="speaker-description">${speaker.description}</p>
      </div>
    </div>
  `;
}

function callingSpeakers() {
  speakersContainer.innerHTML = '';

  for (let i = 0; i < visibleSpeakers; i += 1) {
    const cardHTML = card(speakers[i]);
    speakersContainer.innerHTML += cardHTML;
  }

  if (visibleSpeakers < speakers.length) {
    moreBtn.style.display = 'block';
  } else {
    moreBtn.style.display = 'none';
  }
}

function showSpeakers() {
  visibleSpeakers = speakers.length;
  callingSpeakers();
  moreBtn.style.display = 'none';
}

function visibility() {
  if (window.innerWidth <= 768) {
    visibleSpeakers = initialVisibleSpeakers;
  } else {
    visibleSpeakers = speakers.length;
  }
  callingSpeakers();
}

moreBtn.addEventListener('click', showSpeakers);
window.addEventListener('resize', visibility);

visibility();


document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío tradicional del formulario

  // Capturar los valores del formulario
  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let message = document.getElementById('message').value.trim();

  if (name === "" || email === "" || message === "") {
    alert("❌ Por favor, completa todos los campos antes de enviar.");
    return;
  }

  // Número de WhatsApp al que se enviará el mensaje (código de país + número)
  let phoneNumber = "573216734503"; // Reemplaza con tu número

  // Crear el mensaje con formato
  let whatsappMessage = `*Nombre:* ${name} \n*Correo:* ${email} \n*Mensaje:* ${message}`;

  // Generar enlace de WhatsApp
  let whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;

  // Abrir WhatsApp en una nueva pestaña
  window.open(whatsappURL, '_blank');

  // Mostrar mensaje de éxito después de 2 segundos
  setTimeout(() => {
    alert("✅ ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
  }, 2000);

  // Limpiar el formulario
  document.getElementById('contactForm').reset();
});

