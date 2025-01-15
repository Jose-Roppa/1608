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
        url: 'assets/images/IMG_9160.PNG',
        description: 'I want'
    },
    {
        url: 'assets/images/IMG_9161.PNG',
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
        url: 'assets/images/IMG_8674.JPG',
        description: ''
    },
    {
        url: 'assets/images/IMG_9067.HEIC',
        description: ''
    },
    {
        url: 'assets/images/IMG_9137.HEIC',
        description: ''
    },
    {
        url: 'assets/images/B6351CAE-D495-4DB6-910E-B7E8A3ECDDFC.JPG',
        description: ''
    },
    {
        url: 'assets/images/IMG_8733.JPG',
        description: ''
    },
    {
        url: 'assets/images/IMG_8275.JPG',
        description: ''
    }
];

let currentPhotoIndex = 0;

// Variáveis para controle de touch
let touchStartX = 0;
let touchEndX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

// Elementos da galeria
const galleryGrid = document.querySelector('.gallery-grid');
const galleryContainer = document.querySelector('.gallery-container');

// Eventos de touch
galleryGrid.addEventListener('touchstart', touchStart);
galleryGrid.addEventListener('touchmove', touchMove);
galleryGrid.addEventListener('touchend', touchEnd);

function touchStart(event) {
    touchStartX = event.touches[0].clientX;
    isDragging = true;
    
    const container = photoGallery.querySelector('.gallery-container');
    if (container) {
        container.style.transition = 'none';
        container.style.cursor = 'grabbing';
    }
}

function touchMove(event) {
    if (!isDragging) return;
    
    const container = photoGallery.querySelector('.gallery-container');
    if (!container) return;

    const currentX = event.touches[0].clientX;
    const diff = currentX - touchStartX;
    const galleryWidth = photoGallery.offsetWidth;
    const totalPhotos = photos.length;
    const itemsPerGroup = window.innerWidth <= 768 ? 4 : 8;
    const totalGroups = Math.ceil(totalPhotos / itemsPerGroup);
    
    // Calcula os limites do arrasto
    const maxTranslate = 0;
    const minTranslate = -((totalGroups - 1) * galleryWidth);
    
    // Aplica o movimento com resistência nos limites
    let newTranslate = -(currentPhotoIndex * galleryWidth) + diff;
    
    if (newTranslate > maxTranslate) {
        newTranslate = maxTranslate + (diff * 0.2); // Resistência ao passar do limite
    } else if (newTranslate < minTranslate) {
        newTranslate = minTranslate + (diff * 0.2); // Resistência ao passar do limite
    }
    
    container.style.transform = `translateX(${newTranslate}px)`;
    currentTranslate = newTranslate;
}

function touchEnd() {
    if (!isDragging) return;
    
    const container = photoGallery.querySelector('.gallery-container');
    if (!container) return;

    isDragging = false;
    container.style.cursor = 'grab';
    
    const galleryWidth = photoGallery.offsetWidth;
    const totalPhotos = photos.length;
    const itemsPerGroup = window.innerWidth <= 768 ? 4 : 8;
    const totalGroups = Math.ceil(totalPhotos / itemsPerGroup);
    
    // Calcula a direção do swipe
    const diff = currentTranslate - (-(currentPhotoIndex * galleryWidth));
    const threshold = galleryWidth * 0.3; // 30% da largura para trigger do swipe
    
    if (Math.abs(diff) > threshold) {
        // Determina a direção baseado no diff
        const direction = diff > 0 ? -1 : 1;
        navigateGallery(direction);
    } else {
        // Volta para a posição original se não atingiu o threshold
        navigateGallery(0);
    }
}

// Navegação da galeria
function navigateGallery(direction) {
    const container = photoGallery.querySelector('.gallery-container');
    if (!container) return;

    const totalPhotos = photos.length;
    const itemsPerGroup = window.innerWidth <= 768 ? 4 : 8;
    const totalGroups = Math.ceil(totalPhotos / itemsPerGroup);
    
    // Atualiza o índice atual
    currentPhotoIndex = Math.max(0, Math.min(currentPhotoIndex + direction, totalGroups - 1));
    
    // Calcula a largura total de um grupo de itens
    const galleryWidth = photoGallery.offsetWidth;
    const translateX = -(currentPhotoIndex * galleryWidth);
    
    // Aplica a transição suave
    container.style.transition = 'transform 0.5s ease';
    container.style.transform = `translateX(${translateX}px)`;

    // Atualiza a visibilidade dos botões
    updateNavigationButtons(currentPhotoIndex, totalGroups);
}

// Função para atualizar a visibilidade dos botões
function updateNavigationButtons(currentIndex, totalGroups) {
    const controls = photoGallery.querySelector('.gallery-controls');
    const prevButton = controls.querySelector('#prev-photo');
    const nextButton = controls.querySelector('#next-photo');
    
    if (!prevButton || !nextButton) return;

    // Atualiza o botão anterior
    prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    
    // Atualiza o botão próximo
    nextButton.style.opacity = currentIndex === totalGroups - 1 ? '0.5' : '1';
    nextButton.style.pointerEvents = currentIndex === totalGroups - 1 ? 'none' : 'auto';
}

// Função para criar elementos da galeria
function createGalleryItems() {
    photoGallery.innerHTML = '';
    
    // Cria o container principal
    const container = document.createElement('div');
    container.className = 'gallery-container';
    
    // Calcula quantos grupos de fotos teremos
    const itemsPerGroup = window.innerWidth <= 768 ? 4 : 8;
    const totalGroups = Math.ceil(photos.length / itemsPerGroup);
    
    // Cria os grupos de fotos
    for (let groupIndex = 0; groupIndex < totalGroups; groupIndex++) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'gallery-group';
        
        // Adiciona as fotos do grupo atual
        const startIndex = groupIndex * itemsPerGroup;
        const endIndex = Math.min(startIndex + itemsPerGroup, photos.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const photo = photos[i];
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const descriptionHtml = photo.description ? 
                `<div class="photo-description"><h3>${photo.description}</h3></div>` : '';
            
            galleryItem.innerHTML = `
                <img src="${photo.url}" alt="${photo.description || 'Nosso momento'}" loading="lazy">
                ${descriptionHtml}
            `;
            
            groupDiv.appendChild(galleryItem);
        }
        
        // Preenche espaços vazios no último grupo se necessário
        if (endIndex - startIndex < itemsPerGroup) {
            const emptySpaces = itemsPerGroup - (endIndex - startIndex);
            for (let i = 0; i < emptySpaces; i++) {
                const emptyItem = document.createElement('div');
                emptyItem.className = 'gallery-item empty';
                groupDiv.appendChild(emptyItem);
            }
        }
        
        container.appendChild(groupDiv);
    }
    
    photoGallery.appendChild(container);

    // Adiciona os controles de navegação
    const controls = document.createElement('div');
    controls.className = 'gallery-controls';
    controls.innerHTML = `
        <button id="prev-photo" class="gallery-btn" aria-label="Foto anterior">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button id="next-photo" class="gallery-btn" aria-label="Próxima foto">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    photoGallery.appendChild(controls);

    // Adiciona os event listeners
    const prevButton = controls.querySelector('#prev-photo');
    const nextButton = controls.querySelector('#next-photo');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => navigateGallery(-1));
        nextButton.addEventListener('click', () => navigateGallery(1));
    }

    // Mostra os controles
    setTimeout(() => {
        controls.classList.add('loaded');
        updateNavigationButtons(currentPhotoIndex, totalGroups);
    }, 500);
}

// Adiciona eventos de teclado para navegação
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
        navigateGallery(1);
    }
});

// Timeline de eventos
const timelineContainer = document.querySelector('.timeline-container');
const startDate = new Date('2024-08-16T00:00:00');

function calcularTempoJuntos() {
    const hoje = new Date();
    const diff = hoje - startDate;
    
    if (diff < 0) {
        return {
            anos: 0,
            meses: 0,
            dias: 0,
            futuro: true
        };
    }

    let anos = hoje.getFullYear() - startDate.getFullYear();
    let meses = hoje.getMonth() - startDate.getMonth();
    let dias = hoje.getDate() - startDate.getDate();

    // Ajuste para meses negativos
    if (meses < 0) {
        anos--;
        meses += 12;
    }
    
    // Ajuste para dias negativos
    if (dias < 0) {
        meses--;
        // Pega o último dia do mês anterior
        const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }

    // Ajuste para meses negativos após ajuste de dias
    if (meses < 0) {
        anos--;
        meses += 12;
    }
    
    return {
        anos,
        meses,
        dias,
        futuro: false
    };
}

function atualizarContador() {
    const tempo = calcularTempoJuntos();
    const counterElement = document.getElementById('time-counter');
    
    if (tempo.futuro) {
        counterElement.innerHTML = 'Contagem regressiva para o namoro...';
        return;
    }
    
    const anosText = tempo.anos > 0 ? `<span>${tempo.anos}</span> ${tempo.anos === 1 ? 'ano' : 'anos'}` : '';
    const mesesText = tempo.meses > 0 ? `<span>${tempo.meses}</span> ${tempo.meses === 1 ? 'mês' : 'meses'}` : '';
    const diasText = `<span>${tempo.dias}</span> ${tempo.dias === 1 ? 'dia' : 'dias'}`;
    
    const textoCompleto = [anosText, mesesText, diasText]
        .filter(text => text !== '')
        .join(', ');
    
    counterElement.innerHTML = textoCompleto;
}

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);

const timelineEvents = [
    {
        date: '6 de Abril de 2024',
        title: 'Nossa primeira mensagem',
        description: 'O nascimento do cabrito pelado',
        icon: 'fa-heart'
    },
    {
        date: '30 de Abril de 2024',
        title: 'Nosso primeiro encontro',
        description: 'Quando os dois ficaram ansiosos demais para esparar sexta feira',
        icon: 'fa-heart'
    },
    {
        date: '16 de Agosto de 2024',
        title: 'Namoro Oficial',
        description: 'O dia mais especial de nossa vida ❤️',
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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createGalleryItems();
    createTimelineEvents();
    atualizarContador(); // Inicializa o contador imediatamente
});

// Adiciona evento de redimensionamento
window.addEventListener('resize', () => {
    createGalleryItems();
    navigateGallery(0);
}); 