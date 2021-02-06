const navTooltips = document.getElementById('nav-trans').getAttribute("value").split(",");

const projectWindow = document.getElementById("project-window");
const closeProjectBtn = document.getElementById("close-project");
const projectWrapper = document.getElementById("project-wrapper");
const navbarCollapse = document.getElementById("navbar-links");
const langDropdownMenu = document.getElementById('langDropdownMenu');

// Manage toggling of the navbar collapse
document.getElementById("navbar-toggler").addEventListener("click", (e) => {
    if(navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        navbarCollapse.classList.remove('collapse');
        navbarCollapse.classList.add('collapsing');
        navbarCollapse.style.height = 0;

        setTimeout(() => {
            navbarCollapse.classList.remove('collapsing');
            navbarCollapse.classList.add('collapse');
        }, 360);
    } else {
        navbarCollapse.classList.remove('collapse');
        navbarCollapse.classList.add('collapsing');
        navbarCollapse.style.height = navbarCollapse.scrollHeight;

        setTimeout(() => {
            navbarCollapse.classList.remove('collapsing');
            navbarCollapse.classList.add('show');
        }, 360);
    }
});

// Open the langs' dropdown on click
document.getElementById('langDropdown').addEventListener('click', () => {
    langDropdownMenu.classList.toggle("show");
});

const sliderWrappers = document.querySelectorAll(".slider-container");
window.addEventListener('resize', (e) => {
    let windowWidth = window.innerWidth;
    if(windowWidth >= 768) {
        if(navbarCollapse.style.height) {
            navbarCollapse.style.removeProperty('height');
        }
    }


    sliderWrappers.forEach(item => {
        let slidesCount = item.querySelectorAll(".slider-slide").length;
        let currShift = parseInt(item.getAttribute("data-shifts"));
        let slideWidth = item.querySelector(".slider-slide").scrollWidth;
        let maxShift = slidesCount - Math.round(windowWidth / slideWidth);

        if(slidesCount >= Math.round(windowWidth / slideWidth)) {
            if (currShift >= maxShift) {
                item.setAttribute("data-shifts", maxShift);
                item.querySelector(".slider-button-next").classList.add("hide");
            } else if (currShift < maxShift) {
                item.querySelector(".slider-button-next").classList.remove("hide");
            }

            let shiftSize = -(currShift) * slideWidth;
            item.querySelector(".slider-wrapper").style.transform = "translateX(" + shiftSize + "px)";
        } else {
            item.querySelector(".slider-button-next").classList.add("hide");
        }
    });
});

new fullpage('#fullpage', {
    menu: "#menu",
    controlArrows: true,
    anchors: ['abouts', 'webprojects', 'applications', 'terminal'],
    navigationTooltips: navTooltips,
    navigation: true,
    dragAndMove: true,
    navigationPosition: 'left',
    normalScrollElements: '#project-window *',
});
fullpage_api.setAllowScrolling(false);
fullpage_api.setKeyboardScrolling(false);

let icons = document.getElementById('about_icons').getElementsByClassName("parallaxed");
for(let icon of icons) {
    let fontSize = Math.floor((Math.random() * 20) + 30) / 10;
    icon.style.fontSize = fontSize + "rem";
    icon.style.zIndex = (fontSize * 10).toString();

    icon.setAttribute("data-depth", (fontSize-3)/2*1.7+.4);
}

const aboutIcons = document.getElementById('about_icons');
new Parallax(aboutIcons, {
    frictionX: .25,
    frictionY: .25,
});


window.addEventListener("load", function () {
    for(let icon of icons) {
        icon.style.top = Math.floor((Math.random() * 60) + 17) + "vh";
        icon.style.left = Math.floor((Math.random() * 40) + 43) + "vw";
    }

    let elStyle = document.getElementById('loader').style;
    elStyle.opacity = '0';
    setTimeout(() => {
        elStyle.display = "none";
        fullpage_api.setAllowScrolling(true);
        fullpage_api.setKeyboardScrolling(true);
    }, 200);
});


function closeProject() {
    fullpage_api.setAllowScrolling(true);
    fullpage_api.setKeyboardScrolling(true);
    projectWindow.classList.remove("active");
    closeProjectBtn.classList.remove("active");
}

function openProject(projectToOpen) {
    let loaderStyle = document.getElementById('loader').style;
    loaderStyle.display = "flex";
    loaderStyle.opacity = '1';
    fullpage_api.setAllowScrolling(false);
    fullpage_api.setKeyboardScrolling(false);

    projectWrapper.innerHTML = "";

    let currLang = document.querySelector('html').getAttribute('lang');
    document.getElementById("project-style").setAttribute('href',((currLang == 'en')? '' : '../')+'projects/'+projectToOpen+'/proj-style.css');

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "projects/"+projectToOpen+"/index.html");
    xhr.send();
    xhr.onload = function() {
        projectWrapper.innerHTML = xhr.response;
        loaderStyle.opacity = "0";
        setTimeout(() => {
            loaderStyle.display = "none";
            projectWindow.classList.add("active");
            closeProjectBtn.classList.add("active");
        }, 200);
    };
}

document.querySelectorAll(".slider-slide").forEach(item => {
    item.addEventListener("click", (e) => {
        openProject(e.currentTarget.getAttribute('data-project'));
        console.log("CLICKED");
    });
});

document.addEventListener('click',function(e){
    if(e.target && e.target.classList.contains('load-project')){
        openProject(e.target.getAttribute('data-project'));
    }

    if(e.target && e.target.getAttribute("id") != "langDropdown") {
        langDropdownMenu.classList.remove("show");
    }
});

[document.querySelector("#close-project"), document.querySelector(".navbar-brand")].forEach(item => {
    item.addEventListener("click", closeProject);
});
document.querySelectorAll("#menu .fullpage-anchor").forEach(item => {
    item.addEventListener("click", closeProject);
});
document.addEventListener("keyup", (e) => {
    if(e.key == "Escape") {
        closeProject();
    }
});


document.querySelectorAll(".slider-button-prev").forEach(item => {
   item.addEventListener("click", function (e) {
       let parent = e.currentTarget.parentElement;
       let currShift = parseInt(parent.getAttribute("data-shifts"));
       let slideWidth = parent.querySelector(".slider-slide").scrollWidth;

       if(currShift > 0) {
           parent.setAttribute("data-shifts", currShift - 1);
           let shiftSize = -(currShift-1)*slideWidth;
           parent.querySelector(".slider-wrapper").style.transform = "translateX(" + shiftSize + "px)";

           parent.querySelector(".slider-button-next").classList.remove("hide");
       }
   });
});

document.querySelectorAll(".slider-button-next").forEach(item => {
    item.addEventListener("click", function (e) {
        let parent = e.currentTarget.parentElement;
        let slidesCount = parent.querySelectorAll(".slider-slide").length;
        let currShift = parseInt(parent.getAttribute("data-shifts"));
        let slideWidth = parent.querySelector(".slider-slide").scrollWidth;
        let maxShift = slidesCount - Math.round(window.innerWidth / slideWidth);

        if(currShift < maxShift) {
            parent.setAttribute("data-shifts", currShift + 1);
            let shiftSize = -(currShift+1)*slideWidth;
            parent.querySelector(".slider-wrapper").style.transform = "translateX(" + shiftSize + "px)";

            if(currShift + 1 >= maxShift) {
                e.currentTarget.classList.add("hide");
            }
        }
    });
});



