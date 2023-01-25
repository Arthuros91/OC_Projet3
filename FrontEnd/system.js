const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

for (let i = 0; i< works.length ; i++){
    const gallery = document.querySelector(".gallery");
    const work = works[i];
    
    const figure = document.createElement("figure");
    
    const figureImg = document.createElement("img");
    figureImg.src= work.imageUrl;
    figureImg.alt = work.title;
    
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;
    
    figure.appendChild(figureImg);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}

