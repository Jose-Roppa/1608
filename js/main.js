// Configuração do Spotify
const spotifyEmbed = document.getElementById('spotify-embed');

// Substitua PLAYLIST_ID pela ID da sua playlist no Spotify
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

// Array com as fotos
const photos = [
    {
        url: 'assets/images/IMG_8616.JPG',
        description: 'Momentos Especiais'
    },
    {
        url: 'assets/images/IMG_8734.JPG',
        description: 'Nossos Sorrisos'
    },
    {
        url: 'assets/images/IMG_8744.JPG',
        description: 'Juntos'
    },
    {
        url: 'assets/images/IMG_8834.JPG',
        description: 'Nosso Amor'
    },
    {
        url: 'assets/images/IMG_9102.JPG',
        description: 'Momentos Felizes'
    },
    {
        url: 'assets/images/IMG_8575.JPG',
        description: 'Nossos Dias'
    },
    {
        url: 'assets/images/IMG_8607.JPG',
        description: 'Memórias Especiais'
    },
    {
        url: 'assets/images/IMG_8753.JPG',
        description: 'Nossa História'
    }
];

// Função para criar elementos da galeria
function createGalleryItems() {
    photos.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <img src="${photo.url}" alt="${photo.description}" loading="lazy">
            <div class="photo-description">${photo.description}</div>
        `;
        
        photoGallery.appendChild(galleryItem);
    });
}

// Timeline de eventos
const timelineContainer = document.querySelector('.timeline-container');

const timelineEvents = [
    {
        date: '14 de Janeiro',
        title: 'Nosso Primeiro Encontro',
        description: 'O dia em que tudo começou'
    },
    {
        date: '14 de Fevereiro',
        title: 'Primeiro Beijo',
        description: 'Um momento mágico'
    },
    {
        date: '14 de Março',
        title: 'Namoro Oficial',
        description: 'O início da nossa história'
    }
];

// Função para criar elementos da timeline
function createTimelineEvents() {
    timelineEvents.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = `timeline-event ${index % 2 === 0 ? 'left' : 'right'}`;
        
        eventElement.innerHTML = `
            <div class="event-content">
                <h3>${event.title}</h3>
                <p class="event-date">${event.date}</p>
                <p>${event.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(eventElement);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createGalleryItems();
    createTimelineEvents();
});

// Animação suave ao rolar
function revealOnScroll() {
    const elements = document.querySelectorAll('.gallery-item, .timeline-event');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll); 