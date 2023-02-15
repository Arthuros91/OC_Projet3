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


/* MODALE */

const header = document.querySelector("header");
const modale = document.querySelector("#modale");

const modaleContent = document.createElement("div");
modaleContent.className = "modaleContent";
modale.appendChild(modaleContent);
    

    /* Navigations Button */

function generateNavButtons(){
    const navButtons = document.createElement("div");
    navButtons.id = "navButtons";
    const returnButton = document.createElement("button");
    returnButton.id = "returnButton";
    returnButton.innerHTML = "<i class=\"fa-solid fa-arrow-left fa-lg\"></i>";
    const closeButton = document.createElement("button");
    closeButton.className = "closeButton";
    closeButton.innerText = "X";

    navButtons.appendChild(returnButton);
    navButtons.appendChild(closeButton)
    modaleContent.appendChild(navButtons);

    closeButton.addEventListener("click", function(){
        modale.style.display = "none";
    });
}
    

    /* Modale Title */

function GenerateTitle(nomTitre){
    const modaleTitle = document.createElement("h3");
    modaleTitle.className = "modaleTitle";
    modaleTitle.innerText = nomTitre;
    
    modaleContent.appendChild(modaleTitle);
}


    /* Gallery Content */


async function GenerateModaleGallery(works){
    const galleryContainer = document.createElement("div");
    galleryContainer.className = "galleryModale";

    modaleContent.append(galleryContainer);

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


    /* modaleOptionsButtons */

function GenerateOptionsButtons(){
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

    addPhotoButton.addEventListener("click", function(){
        modaleContent.innerHTML = "";
        generateNavButtons();
        GenerateTitle("Galerie Photo");
        GenerateAddPhotoModule();
            
    });
}

function GenerateAddPhotoModule(){
    const addPhotoContainer = document.createElement("div");
    addPhotoContainer.id = "addPhotoContainer";
    const imgLogo = document.createElement("i");
    imgLogo.className = "fa-regular fa-image fa-5x";
    const addImgButton = document.createElement("button");
    addImgButton.id = "addImgButton";
    addImgButton.innerText = "+ Ajouter photo";
    const addPhotoText = document.createElement("p");
    addPhotoText.id = "addPhotoText";
    addPhotoText.innerText = "jpg, png : 4mo max";
    
    const addPhotoForm = document.createElement("form");
    addPhotoForm.id = "addPhotoForm";
    
    const titleLabelInputText = document.createElement("label");
    titleLabelInputText.id = "titleLabelInputText";
    titleLabelInputText.innerText = "Titre";
    titleLabelInputText.for = "titleInputText";
    const titleInputText = document.createElement("input");
    titleInputText.type = "text";
    titleInputText.name = "titleInputText";
    titleInputText.id = "titleInputText";

    const catLabelInputText = document.createElement("label");
    catLabelInputText.id = "catLabelInputText";
    catLabelInputText.innerText = "Catégorie";
    catLabelInputText.for = "catInputText";
    const catInputText = document.createElement("input");
    catInputText.type = "text";
    catInputText.name = "catInputText";
    catInputText.id = "catInputText";

    const validateButton = document.createElement("button");
    validateButton.id = "validateButton";
    validateButton.innerText = "Valider";

    addPhotoContainer.appendChild(imgLogo);
    addPhotoContainer.appendChild(addImgButton);
    addPhotoContainer.appendChild(addPhotoText);

    addPhotoForm.appendChild(titleLabelInputText);
    addPhotoForm.appendChild(titleInputText);
    addPhotoForm.appendChild(catLabelInputText);
    addPhotoForm.appendChild(catInputText);

    modaleContent.appendChild(addPhotoContainer);
    modaleContent.appendChild(addPhotoForm);
    modaleContent.appendChild(validateButton);
}

function loadGallery(){
    modaleContent.innerHTML = "";
    generateNavButtons();
    GenerateTitle("Galerie Photo");
    GenerateModaleGallery(works);
    GenerateOptionsButtons();
}


/* Close modale */ 

modale.addEventListener("click",function(event){
    if (event.target == modale){
        modale.style.display = "none";
    }
    
});



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
        loadGallery();
    });
}