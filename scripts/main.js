const allProjects = document.querySelectorAll(".gallery a");
const projectTitle = document.querySelector(".gallery h2"); 
const totalProjects = allProjects.length  
const half = Math.floor(totalProjects / 2)
let activeProject = 3; 

/* MARK: Gallery */ 
const layouts = {
    base: {                                   // < 480px
        0: { x: "0px",    z: -300, rotateY: 0  },
        1: { x: "60vw",   z: -60,  rotateY: 54 },
        2: { x: "850px",  z: 370,  rotateY: 48 },
        3: { x: "1300px", z: 400,  rotateY: 34 },
    },
    sm: {                                     // >= 480px
        0: { x: "0px",    z: -300, rotateY: 0  },
        1: { x: "50vw",   z: -60,  rotateY: 54 },
        2: { x: "850px",  z: 370,  rotateY: 48 },
        3: { x: "1300px", z: 400,  rotateY: 34 },
    },
    md: {                                     // >= 768px
        0: { x: "0px",    z: -300, rotateY: 0  },
        1: { x: "40vw",   z: -60,  rotateY: 54 },
        2: { x: "850px",  z: 370,  rotateY: 48 },
        3: { x: "1300px", z: 400,  rotateY: 34 },
    },
    lg: {                                     // >= 1200px
        0: { x: "0px",    z: -300, rotateY: 0  },
        1: { x: "25vw",   z: -60,  rotateY: 54 },
        2: { x: "40vw",   z: 370,  rotateY: 48 },
        3: { x: "1300px", z: 400,  rotateY: 34 },
    },
    xl: {                                     // >= 2200px
        0: { x: "0px",    z: -300, rotateY: 0  },
        1: { x: "25vw",   z: -60,  rotateY: 54 },
        2: { x: "45vw",   z: 370,  rotateY: 48 },
        3: { x: "1300px", z: 400,  rotateY: 34 },
    },
    xxl: {                                     // >= 2600px
        0: { x: "0px",    z: -650, rotateY: 0  },
        1: { x: "25vw",   z: -260,  rotateY: 46 },
        2: { x: "40vw",   z: 370,  rotateY: 48 },
        3: { x: "1300px", z: 400,  rotateY: 34 },
    },
};

// MARK: init 
renderProjects(); 

// MARK: Rendering gallery
function panelOffset(index) {  
    let difference = activeProject - index;     
    if(difference > half) difference -= totalProjects; 
    if(difference < -half) difference += totalProjects; 
    return difference; 
}

function renderProjects() {
    allProjects.forEach((project, index) => {
        const offset = panelOffset(index);

        if (index == activeProject) {
            projectTitle.textContent = project.dataset.name; 
        }

        // Pick layout based on screen width
        const width = window.innerWidth; 
        let projectsLayout; 
        
        if(width >= 2600) projectsLayout = layouts.xxl;
        else if(width >= 2200) projectsLayout = layouts.xl;
        else if(width >= 1200) projectsLayout = layouts.lg;
        else if(width >= 768)  projectsLayout = layouts.md;
        else if(width >= 480)  projectsLayout = layouts.sm;
        else projectsLayout = layouts.base;

        const value = projectsLayout[Math.abs(offset)]; 

        project.style.opacity = (Math.abs(offset) === half) ? "0" : "1";
        project.classList.toggle('active', offset === 0);

        const x = value.x // make it work for both px and vw, for example: "850px" or "40vw"
        if (offset < 0) {
            project.style.transform =  `translateX(${x}) translateZ(${value.z}px) rotateY(${-value.rotateY}deg)`
        } else {
            project.style.transform =  `translateX(-${x}) translateZ(${value.z}px) rotateY(${value.rotateY}deg)`  
        }
    })
}

let isLocked = false; 

window.addEventListener("wheel", (event) => {
    if(isLocked) return; 
    isLocked = true; 
    
    if (event.deltaY > 0) {
        activeProject = (activeProject - 1 + totalProjects) % totalProjects; 
    } else {
        activeProject = (activeProject + 1) % totalProjects; 
    }

    renderProjects(); 

    setTimeout(() => isLocked = false, 500);   // unlock after 500ms
})

window.addEventListener("resize", () => {
    renderProjects();
});