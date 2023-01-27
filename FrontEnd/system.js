const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const user = window.localStorage.getItem("userId");
const userId = JSON.parse(user);
const connectBanner = document.querySelector("#connectBanner");

if (userId.token != ""){
    connectBanner.style.display = "initial";
}
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

