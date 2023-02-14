const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const user = window.localStorage.getItem("userId");
const userId = JSON.parse(user);



console.log(userId);

/* GALLERY GENERATION */

const gallery = document.querySelector(".gallery");

async function GenerateGallery(works){
    
    for (let i = 0; i< works.length ; i++){
    
        const work = works[i];
        const reponseImg = await fetch(work.imageUrl);
        const images = await reponseImg.blob();
        const imageURL = URL.createObjectURL(images);
        
        const figure = document.createElement("figure");
        const figureImg = document.createElement("img");
        figureImg.src= imageURL;
        figureImg.alt = work.title;
        
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = work.title;
        
        figure.appendChild(figureImg);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}

function UpdateGallery(works){
    gallery.innerHTML = "";
    GenerateGallery(works);
}


UpdateGallery(works);



/* CATEGORIES BUTTONS */

const btnCategoriesBox = document.querySelector(".btnCategoriesBox");

const btnAll = document.createElement("button");
btnAll.className = "btnAll";
btnAll.innerText = "Tous";

const btnObjects = document.createElement("button"); 
btnObjects.className = "btnObjects";
btnObjects.innerText = "Objets";

const btnApparts = document.createElement("button");
btnApparts.className = "btnApparts";
btnApparts.innerText = "Appartements"; 

const btnHR = document.createElement("button"); 
btnHR.className = "btnHR";
btnHR.innerText = "Hôtels & Restaurants";


btnCategoriesBox.appendChild(btnAll);
btnCategoriesBox.appendChild(btnObjects);
btnCategoriesBox.appendChild(btnApparts);
btnCategoriesBox.appendChild(btnHR);


    /*Buttons Functions */

const reponseCat = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCat.json();


btnAll.addEventListener("click", function(){
    UpdateGallery(works);
    return;
});

btnObjects.addEventListener("click",function(){
    const list = works.filter(function(work){
        return work.categoryId === categories[0].id;
    });
    UpdateGallery(list);
});

btnApparts.addEventListener("click",function(){
    const list = works.filter(function(work){
        return work.categoryId === categories[1].id;
    });
    UpdateGallery(list);
});

btnHR.addEventListener("click",function(){
    const list = works.filter(function(work){
        return work.categoryId === categories[2].id;
    });
    UpdateGallery(list);
});



/* LOG IN FUNCTIONS */


    /* EditMode Banner */

const connectBanner = document.querySelector("#connectBanner");

const editIconBox= document.createElement("div");
editIconBox.className = "editIconBox";
const icon = document.createElement("i");
icon.className = "fa-regular fa-pen-to-square pen"; 
const editModeText = document.createElement("p");
editModeText.innerText = "Mode édition";
const editModeButton = document.createElement("button");
editModeButton.id = "applyChange";
editModeButton.innerText = "Appliquer les changements";

connectBanner.appendChild(icon);
connectBanner.appendChild(editModeText);
connectBanner.appendChild(editModeButton);




    /* Icons */ 


function addIcons(parentNodeSelector){
    const editIconBox= document.createElement("div");
    editIconBox.className = "editIconBox mainIcon";
    
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-pen-to-square "; 
    const editModeText = document.createElement("button");
    editModeText.innerText = "modifier";

    editIconBox.appendChild(icon);
    editIconBox.appendChild(editModeText);

    const parentNode = document.querySelector(parentNodeSelector);
    parentNode.appendChild(editIconBox);
};



    /* Buttons */





/* MODALE */

    

const header = document.querySelector("header");
const modale = document.querySelector("#modale");

const modaleContent = document.createElement("div");
modaleContent.className = "modaleContent";
modale.appendChild(modaleContent);
    

    /* Close Button */

const closeButton = document.createElement("button");
closeButton.className = "closeButton";
closeButton.innerText = "X";

modaleContent.appendChild(closeButton);
closeButton.addEventListener("click", function(){
    modale.style.display = "none";
});


    /* Modale Title */

const modaleTitle = document.createElement("h3");
modaleTitle.className = "modaleTitle";
modaleTitle.innerText = "Galerie Photo";

modaleContent.appendChild(modaleTitle);


    /* Gallery Content */

const galleryContainer = document.createElement("div");
galleryContainer.className = "galleryModale";

modaleContent.append(galleryContainer);

async function GenerateModaleGallery(works){
    
    for (let i = 0; i< works.length ; i++){
    
        const work = works[i];
        const reponseImg = await fetch(work.imageUrl);
        const images = await reponseImg.blob();
        const imageURL = URL.createObjectURL(images);
        
        const figure = document.createElement("figure");
        const figureImg = document.createElement("img");
        figureImg.src= imageURL;
        figureImg.alt = work.title;
        figureImg.className = "modaleImg";
        
        const editButton = document.createElement("button");
        editButton.innerText = "éditer";
        editButton.className = "modaleGalleryEditButton"
        
        figure.appendChild(figureImg);
        figure.appendChild(editButton);
        galleryContainer.appendChild(figure);
    }
}

GenerateModaleGallery(works);




function loadGallery(){
    modaleTitle.innerText = "Galerie Photo";
    GenerateModaleGallery(works);
}

    /* modaleOptionsButtons */

const modaleOptionsButtons = document.createElement("div");
modaleOptionsButtons.id = "modaleOptionsButtons";
const addPhotoButton = document.createElement("button");
addPhotoButton.id = "addPhotoButton";
addPhotoButton.innerText = "Ajouter une photo";
const deleteGalleryButton = document.createElement("button");
deleteGalleryButton.id = "deleteGalleryButton";
deleteGalleryButton.innerText = "Supprimer la galerie";

modaleContent.appendChild(modaleOptionsButtons);
modaleOptionsButtons.appendChild(addPhotoButton);
modaleOptionsButtons.appendChild(deleteGalleryButton);


    /* Add Photo Content */


function loadAddMode(){
    modaleTitle.innerText = "Ajout Photo";
}





/* LOG IN MODE */

const login = document.querySelector(".login");

if (userId !=null){
    connectBanner.style.display = "flex";


    disconnectUser();
    addIcons("#portfolioTitle");
    openModale();
}



function disconnectUser(){
    login.innerText = "logout";
    login.addEventListener("click", function(){
        window.localStorage.removeItem("userId");
        login.href = "index.html";   
    });
}

function openModale(){
    const modifyButton = document.querySelector(".mainIcon button");
    modifyButton.addEventListener("click", function(){
    modale.style.display = "flex";
    });
}