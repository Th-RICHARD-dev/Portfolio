window.onload = () => {
    projectStorage = JSON.parse(localStorage.getItem('project')) || [];

    getURL();
    openPDF();
}

const getURL = () => {
    const url = new URLSearchParams(window.location.search);
    const projectID = url.get('id');
    
    getProjects(projectID);
}

const getProjects = (id) => {
    id = id - 1;

    const titleContainer = document.querySelector('.row-2.col-2 .grid-1');
    const imageContainer = document.querySelector('.image-container');
    const technoContainer = document.querySelector('.row-2.col-1 .grid-3');
    const linkContainer = document.querySelector('.row-2.col-1 .grid-4');

    titleContainer.innerHTML = `<h2 class="project-title"><span class="blinking">_</span>${projectStorage[id].name}</h2>
    <p class="descr">${projectStorage[id].desc}</p>
    `
    imageContainer.innerHTML = `<img class="project-image-alt" src="${projectStorage[id].image_alt}" alt="${projectStorage[id].name}"/>`;
    technoContainer.innerHTML = `<p>Technologies utilisées :</p><p class="techologies">${projectStorage[id].techno}</p>`;
    linkContainer.innerHTML = `<p>Liens :</p><a class="link" href="${projectStorage[id].github}" target="_blank">Github</a>`;
};


const openPDF = () => {
    const button = document.querySelector('.cv-button');

    button.addEventListener('click', () => {
        window.open('CV.pdf', '_blank');
    });
};