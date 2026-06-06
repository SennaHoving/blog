const allProjects = document.querySelectorAll(".gallery img");
const totalProjects = allProjects.length  
const half = Math.floor(totalProjects / 2)
let activeProject = 3; 

/* MARK: Gallery */ 
const projectsLayout = {
    0: {x: 0, z: -300, rotateY: 0}, 
    1: {x: 360, z: -60, rotateY: 48}, 
    2: {x: 700, z: 150, rotateY: 54}, 
    3: {x: 1080, z: 220, rotateY: 34}, 
}

function panelOffset(index) {  
    let difference = activeProject - index;     
    if(difference > half) difference -= totalProjects; 
    if(difference < -half) difference += totalProjects; 
    return difference; 
}

function renderProjects() {
    allProjects.forEach((project, index) => {
        const offset = panelOffset(index);
        const value = projectsLayout[Math.abs(offset)]; 

        if (offset < 0) {
            project.style.transform =  `translateX(${value.x}px) translateZ(${value.z}px) rotateY(${-value.rotateY}deg)`
        } else {
            project.style.transform =  `translateX(${-value.x}px) translateZ(${value.z}px) rotateY(${value.rotateY}deg)`  
        }
    })
}

window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        activeProject = (activeProject - 1 + totalProjects) % totalProjects; 
    } else {
        activeProject = (activeProject + 1) % totalProjects; 
    }

    renderProjects(); 
})
