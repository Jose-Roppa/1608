// Configuração do Spotify
const spotifyEmbed = document.getElementById('spotify-embed');
const playlistId = '3tydOrCoNFDbwSwMd2Tmwj';

spotifyEmbed.innerHTML = `
    <iframe
        src="https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator"
        width="100%"
        height="380"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
`;

// Gerenciamento da Galeria de Fotos
const photoGallery = document.getElementById('photo-gallery');
const prevButton = document.getElementById('prev-photo');
const nextButton = document.getElementById('next-photo');

// Array com as fotos
const photos = [
    {
        url: 'assets/images/IMG_8616.JPG',
        description: 'I want'
    },
    {
        url: 'assets/images/IMG_8734.JPG',
        description: 'to wear his initial'
    },
    {
        url: 'assets/images/IMG_8744.JPG',
        description: 'On a chain'
    },
    {
        url: 'assets/images/IMG_8834.JPG',
        description: '\'round my neck'
    },
    {
        url: 'assets/images/IMG_9102.JPG',
        description: 'Not because'
    },
    {
        url: 'assets/images/IMG_8575.JPG',
        description: 'he owns me'
    },
    {
        url: 'assets/images/IMG_8607.JPG',
        description: 'But \'cause he'
    },
    {
        url: 'assets/images/IMG_8753.JPG',
        description: 'really knows me ❤️'
    },
    {
        url: 'assets/images/IMG_9067.HEIC',
        description: ''
    },
    {
        url: 'assets/images/IMG_8835.JPG',
        description: ''
    },
    {
        url: 'assets/images/IMG_8836.JPG',
        description: ''
    },
    {
        url: 'assets/images/IMG_8837.JPG',
        description: ''
    }
];

let currentPhotoIndex = 0;

// Função para criar elementos da galeria
function createGalleryItems() {
    photoGallery.innerHTML = '';
    photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        if (index === currentPhotoIndex) {
            galleryItem.classList.add('active');
        }
        
        const descriptionHtml = photo.description ? `<div class="photo-description"><h3>${photo.description}</h3></div>` : '';
        
        galleryItem.innerHTML = `
            <img src="${photo.url}" alt="${photo.description || 'Nosso momento'}" loading="lazy">
            ${descriptionHtml}
        `;
        
        photoGallery.appendChild(galleryItem);
    });
}

// Navegação da galeria
function navigateGallery(direction) {
    const items = document.querySelectorAll('.gallery-item');
    items[currentPhotoIndex].classList.remove('active');
    
    currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
    items[currentPhotoIndex].classList.add('active');
}

// Adiciona eventos de teclado para navegação
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
        navigateGallery(1);
    }
});

prevButton.addEventListener('click', () => navigateGallery(-1));
nextButton.addEventListener('click', () => navigateGallery(1));

// Timeline de eventos
const timelineContainer = document.querySelector('.timeline-container');

const timelineEvents = [
    {
        date: '30 de Abril',
        title: 'Nosso Primeiro Encontro',
        description: 'O dia em que tudo começou',
        icon: 'fa-heart'
    },
    {
        date: '16 de Agosto',
        title: 'Namoro Oficial',
        description: 'O início da nossa história',
        icon: 'fa-ring'
    }
];

// Função para criar elementos da timeline
function createTimelineEvents() {
    timelineEvents.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = `timeline-event ${index % 2 === 0 ? 'left' : 'right'}`;
        
        eventElement.innerHTML = `
            <div class="event-content">
                <div class="event-icon">
                    <i class="fas ${event.icon}"></i>
                </div>
                <h3>${event.title}</h3>
                <p class="event-date">${event.date}</p>
                <p>${event.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(eventElement);
    });
}

// Navegação suave
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Animação de corações flutuantes
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.querySelector('.floating-hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Criar corações a cada 3 segundos
setInterval(createFloatingHeart, 3000);

// Animação ao rolar
function revealOnScroll() {
    const elements = document.querySelectorAll('.gallery-item, .timeline-event, .section-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createGalleryItems();
    createTimelineEvents();
    createFloatingHeart();
});

window.addEventListener('scroll', revealOnScroll); 