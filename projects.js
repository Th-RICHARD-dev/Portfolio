let projectStorage = [];

const getJSON = async () => {
    try {
        const projectResponse = await axios.get('project.json');
        projectStorage = projectResponse.data;

        localStorage.setItem('project', JSON.stringify(projectStorage));
        console.log(projectStorage);

        createProjects();
        getProjects();
    } catch (error) {
        console.error("Error loading local JSON data:", error);
    }
};

const createProjects = () => {
    const gridWrapper = document.querySelector('.project-container');

    gridWrapper.innerHTML = ''; 

    for (let i = 0; i < projectStorage.length; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.innerHTML = `<p class="project-title">${projectStorage[i].name}</p>
        <img class="project-image" src="${projectStorage[i].image}" alt="${projectStorage[i].name}"/>
        <p class="technologies">${projectStorage[i].techno}</p>`;
        gridItem.setAttribute('data-id', projectStorage[i].id);
        gridWrapper.appendChild(gridItem);
    }
};

const getProjects = () => {
    const gridItem = document.querySelectorAll('.grid-item');

    gridItem.forEach(projectSlide => {
        projectSlide.addEventListener('click', () => {
            const projectId = projectSlide.getAttribute('data-id');
            window.location.href = `project.html?id=${projectId}`;
        });
    });
}

getJSON();
