const serverName = "http://localhost:5678/api/";
const serverNameWorks = serverName + "works/";

const reponse = await fetch(serverNameWorks);
const works = await reponse.json();

const user = window.localStorage.getItem("userId");
const userId = JSON.parse(user);
var sucessCheck = false;

const gallery = document.querySelector(".gallery");

/* GALLERY GENERATION */



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
    };
    
}

function UpdateGallery(works){
    gallery.innerHTML = "";
    GenerateGallery(works);  
};


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

const reponseCat = await fetch(serverName + "categories");
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

function addIcons(){
    const portfolio = document.querySelector("#portfolioTitle");
    const editIconBox= document.createElement("div");
    editIconBox.className = "editIconBox mainIcon";
    
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-pen-to-square "; 
    const editModeButton = document.createElement("button");
    editModeButton.innerText = "modifier";
    editModeButton.id = "modifyButton";

    editModeButton.addEventListener("click", function(){
        modale.style.display = "flex";
        loadModaleGallery(works);
    });

    editIconBox.appendChild(icon);
    editIconBox.appendChild(editModeButton);
    portfolio.appendChild(editIconBox);


};

function addIcons_underPhoto(){
    const mainSelector = document.querySelector("main");
    const portfolio = document.querySelector("#portfolio");
    const introSelector = document.querySelector("#introduction");

    const icons = document.createElement("div");
    icons.className = "iconsUnderPhoto editIconBox";
    icons.style.padding = "0px";
    icons.style.marginLeft = "57px";

    mainSelector.insertBefore(icons, portfolio);

    const editIconBox= document.createElement("div");
    editIconBox.className = "editIconBox";
    
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-pen-to-square "; 
    const editModeText = document.createElement("button");
    editModeText.innerText = "modifier";

    editIconBox.appendChild(icon);
    editIconBox.appendChild(editModeText);

    icons.appendChild(editIconBox);
    introSelector.style.marginBottom = "0px";
};



/* MODALE */

const header = document.querySelector("header");
const modale = document.querySelector("#modale");

const modaleContent = document.createElement("div");
modaleContent.className = "modaleContent";
modale.appendChild(modaleContent);
    

    /* Navigations Button */


function generateNavButtons_withoutReturn(){
    const navButtons = document.createElement("div");
    navButtons.id = "navButtonsHome";
    const closeButton = document.createElement("button");
    closeButton.className = "closeButton ";
    closeButton.id="closeButtonHome";
    closeButton.innerText = "X";

    navButtons.appendChild(closeButton)
    modaleContent.appendChild(navButtons);

    closeButton.addEventListener("click", function(){
        modale.style.display = "none";
    });
};

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

    returnButton.addEventListener("click", function(){
        loadModaleGallery(works);
    });

    closeButton.addEventListener("click", function(){
        modale.style.display = "none";
    });
}
    

    /* Modale Title */

function GenerateTitle(nomTitre){
    const modaleTitle = document.createElement("h3");
    modaleTitle.className = "modaleTitle";
    modaleTitle.innerText = nomTitre;
    
    const sucessMessage = document.createElement("p");
    sucessMessage.innerText = "La photo a bien été ajoutée";
    sucessMessage.id = "addPhotoSucess";
    

    modaleContent.appendChild(sucessMessage);
    modaleContent.appendChild(modaleTitle);

    if (sucessCheck == true){
        sucessMessage.style.display = "initial";
        sucessCheck = false;
    }
    else{
        sucessMessage.style.display = "none";
    }
}


    /* Gallery Content */

async function GenerateModaleGallery(works){
    const galleryContainer = document.createElement("div");
    galleryContainer.className = "galleryModale";

    modaleContent.appendChild(galleryContainer);

    for (let i = 0; i< works.length ; i++){
    
        const work = works[i];
        const reponseImg = await fetch(work.imageUrl);
        const images = await reponseImg.blob();
        const imageURL = URL.createObjectURL(images);
        
        const figure = document.createElement("figure");
        figure.className = "imgFigure";
        const figureImg = document.createElement("img");

        figureImg.src= imageURL;
        figureImg.alt = work.title;
        figureImg.className = "modaleImg";
        
        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.innerHTML = "<i class=\"fa-solid fa-trash fa-2xs\"></i>";

        const editButton = document.createElement("button");
        editButton.innerText = "éditer";
        editButton.className = "modaleGalleryEditButton"
        
        figure.appendChild(figureImg);
        figure.appendChild(deleteButton);
        figure.appendChild(editButton);
        galleryContainer.appendChild(figure);

        deleteButton.addEventListener("click", async function(event){
            event.preventDefault();
            deletePhoto(work.id);
            let newReponse = await fetch(serverNameWorks);
            const newWorks = await newReponse.json();
            loadModaleGallery(newWorks);
            UpdateGallery(newWorks);
        });

    }
}

async function  deletePhoto(workID){
    const fileId = new FormData();
    fileId.append("id", workID);
            
    const deletephoto = await fetch(serverName + "works/" + workID,{
        method: "DELETE",
        headers: {"Authorization": "Bearer " + userId},
        body: fileId
    });
    
}

    /* Add Photo Content */ 

function GenerateImgInputBox(){
    const addPhotoForm = document.createElement("form");
    addPhotoForm.id = "addPhotoForm";

    const addPhotoContainer = document.createElement("div");
    addPhotoContainer.id = "addPhotoContainer";

    const imgInputLabel = document.createElement("label");
    imgInputLabel.id = "imgInputLabel";
    imgInputLabel.innerText = "+ Ajouter Photo";

    const imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.id = "imgInput";
    imgInput.style.display = "none";
    imgInput.accept = "image/png , image/jpeg";
    imgInput.name = "imgInput";

    const imgPreview = document.createElement("img");
    imgPreview.id = "imgPreview";

    imgInput.addEventListener("change", function(){
        const imgurl = window.URL.createObjectURL(imgInput.files[0]);
        imgPreview.src = imgurl;
        addPhotoContainer.insertBefore(imgPreview, imgInputLabel);
        addPhotoContainer.removeChild(imgLogo);
        imgInputLabel.style.display = "none";
        addPhotoText.style.display = "none";
    });

    const imgLogo = document.createElement("i");
    imgLogo.className = "fa-regular fa-image fa-5x";
    const addPhotoText = document.createElement("p");
    addPhotoText.id = "addPhotoText";
    addPhotoText.innerText = "jpg, png : 4mo max";

    imgInputLabel.appendChild(imgInput);
    addPhotoContainer.appendChild(imgLogo);
    addPhotoContainer.appendChild(imgInputLabel);
    addPhotoContainer.appendChild(addPhotoText);
    addPhotoForm.appendChild(addPhotoContainer);

    modaleContent.appendChild(addPhotoForm);  
}

function GenerateAddPhotoModule(){
    const addPhotoForm = document.querySelector("#addPhotoForm");
        
    const titleLabelInputText = document.createElement("label");
    titleLabelInputText.id = "titleLabelInputText";
    titleLabelInputText.innerText = "Titre";
    titleLabelInputText.for = "titleInputText";
    const titleInputText = document.createElement("input");
    titleInputText.type = "text";
    titleInputText.name = "titleInputText";
    titleInputText.id = "titleInputText";
    titleInputText.className = "inputText";
    
    const catLabelInputText = document.createElement("label");
    catLabelInputText.id = "catLabelInputText";
    catLabelInputText.innerText = "Catégorie";

        const catInputText = document.createElement("select");
        catInputText.id = "catInputText";

        const catValue = document.createElement("option");
        catValue.value = "";
        catValue.innerText = "";

        const catValue1 = document.createElement("option");
        catValue1.value = "Objets";
        catValue1.innerText = "Objet";

        const catValue2 = document.createElement("option");
        catValue2.value = "Appartements";
        catValue2.innerText = "Appartements";

        const catValue3 = document.createElement("option");
        catValue3.value = "Hotels & restaurants";
        catValue3.innerText = "Hotels & restaurants";

    const validateButton = document.createElement("input");
    validateButton.id = "validateButton";
    validateButton.type = "submit"
    validateButton.innerText = "Valider";
    
    catInputText.appendChild(catValue);
    catInputText.appendChild(catValue1);
    catInputText.appendChild(catValue2);
    catInputText.appendChild(catValue3);
    catLabelInputText.appendChild(catInputText);

    addPhotoForm.appendChild(titleLabelInputText);
    addPhotoForm.appendChild(titleInputText);
    addPhotoForm.appendChild(catLabelInputText);
    addPhotoForm.appendChild(validateButton); 
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
        loadAddPhotoContent();
    });
}


    /* Close modale by click */ 

modale.addEventListener("click",function(event){
    if (event.target == modale){
        modale.style.display = "none";
    }
    
});


    /* CONTENT GENERATION FUNCTIONS */


function loadModaleGallery(works){
    modaleContent.innerHTML = "";
    generateNavButtons_withoutReturn();
    GenerateTitle("Galerie Photo");
    GenerateModaleGallery(works);
    GenerateOptionsButtons();
}

function loadAddPhotoContent(){
    modaleContent.innerHTML = "";
    generateNavButtons();
    GenerateTitle("Galerie Photo");
    GenerateImgInputBox();
    GenerateAddPhotoModule();
    SendInputResponse();
}


/* LOG IN MODE */

const login = document.querySelector("#loginIndex");


if (userId !=null){
    connectBanner.style.display = "flex";
    disconnectUser();
    addIcons();
    addIcons_underPhoto();

}

function disconnectUser(){
    login.innerText = "logout";
    login.addEventListener("click", function(){
        window.localStorage.removeItem("userId");
        login.href = "index.html";   
    });
}



/* ADD PHOTO FUNCTIONS */

function SendInputResponse(){

    
    const addPhotoForm = document.querySelector("#addPhotoForm");
    const imgInput = document.querySelector("#imgInput");
    const titleInputText = document.querySelector("#titleInputText");
    const catInputText = document.querySelector("#catInputText");
        
    const validateButton = document.querySelector("#validateButton");
    var catNumber = 0;
    
    addPhotoForm.addEventListener("submit", async function(event){
        event.preventDefault();
        if (catInputText.value == categories[0].name ){
            catNumber = 1;
        }
        else if (catInputText.value == categories[1].name){
            catNumber = 2;
        }
        else if (catInputText.value == categories[2].name){
            catNumber = 3;
        }
        else{
            console.log("error: there is no category");
            return
        }

        const bodyData = new FormData();

        bodyData.append("image",imgInput.files[0]);
        bodyData.append("title", titleInputText.value);
        bodyData.append("category", catNumber);


        const sendPhoto = await fetch(serverNameWorks,{
            method: "POST",
            headers : {"Authorization": "Bearer " + userId},
            body: bodyData
        })
        .then(response =>{
            if(response.ok){
                sucessCheck = true;
            }
        });
        let newReponse = await fetch(serverNameWorks);
        const newWorks = await newReponse.json();
        loadModaleGallery(newWorks);
        UpdateGallery(newWorks);
        
    });

}


