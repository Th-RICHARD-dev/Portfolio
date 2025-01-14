const initSwiper = () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 3,
        spaceBetween: 25,
        preventInteractionOnTransition: true,
        direction: 'horizontal',
        loop: true,

        grid: {
            columns: 3,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

const getJSON = async () => {
    try {
        const projectResponse = await axios.get('project.json');
        projectStorage = projectResponse.data;

        localStorage.setItem('project', JSON.stringify(projectStorage));
        console.log(projectStorage);
    } catch (error) {
        console.error("Error loading local JSON data:", error);
    }
};

getJSON();

window.onload = () => {
    projectStorage = JSON.parse(localStorage.getItem('project')) || [];

    createProjects();
    getProjects();

    menu();
    openPDF();

    initSwiper();
}

const createProjects = () => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    swiperWrapper.innerHTML = '';

    for (let i = 0; i < projectStorage.length; i++) {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.innerHTML = `<p class="project-title">${projectStorage[i].name}</p>
        <img class="project-image" src="${projectStorage[i].image}" alt="${projectStorage[i].name}"/>`;
        swiperSlide.setAttribute('data-id', projectStorage[i].id);
        swiperWrapper.appendChild(swiperSlide);


        const projectNumber = document.querySelector('.other h2');
        projectNumber.innerHTML = `${i + 1}`;
    }
}

const getProjects = () => {
    const swiperSlides = document.querySelectorAll('.swiper-slide');

    swiperSlides.forEach(projectSlide => {
        projectSlide.addEventListener('click', () => {
            const projectId = projectSlide.getAttribute('data-id');
            window.location.href = `project.html?id=${projectId}`;
        });
    });
}

const menu = () => {
    try {
        const body = document.querySelector('body');
        const openMenu = document.querySelector('.menu');
        const closeMenu = document.querySelector('.close');
        const menuContainer = document.querySelector('.menu-container');

        openMenu.addEventListener('click', () => {
            menuContainer.style.display = 'block';
            body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        });
        closeMenu.addEventListener('click', () => {
            menuContainer.style.display = 'none';
            body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        });
        menuContainer.addEventListener('click', () => {
            menuContainer.style.display = 'none';
            body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        });
    } catch (error) {
        console.error("Erreur lors de l'ouverture/fermeture du menu d'ajout :", error);
    }
};

const openPDF = () => {
    const button = document.querySelector('.cv-button');

    button.addEventListener('click', () => {
        window.open('CV.pdf', '_blank');
    });
};