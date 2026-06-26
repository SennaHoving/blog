const previousProject = document.getElementById("previous-project"); 
const nextProject = document.getElementById("next-project"); 
const currentBody = document.querySelector("body"); 

const projects = [
    {name: "sprint-0", link: "css.html"}, 
    {name: "browser-tech", link: "css.html"}, 
    {name: "css", link: "css.html"}, 
    {name: "human-centered-design", link: "css.html"}, 
    {name: "api", link: "css.html"}, 
    {name: "hackathon", link: "css.html"}, 
    {name: "ctrl-city", link: "css.html"}, 
]

// MARK: display previous and next project
function getSurroundingProjects() {
    currentProject = currentBody.dataset.project; 
    const i = projects.findIndex(project => project.name === currentProject)

    fillButtons(i); 
}

function fillButtons(index) {
    const previousTitle = previousProject.querySelector("h3"); 
    const nextTitle = nextProject.querySelector("h3");

    const previous = projects[(index - 1 + projects.length) % projects.length]; 
    const next = projects[((index + 1) % projects.length)]; 

    previousTitle.textContent = previous.name; 
    previousProject.href = previous.link; 

    nextTitle.textContent = next.name;
    nextProject.href = next.link; 
} 

getSurroundingProjects(); 