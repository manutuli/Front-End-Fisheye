//Mettre le code JavaScript lié à la page photographer.html
// 
function displayModal(){
    // classlist.toggle
}
function closeModal(){
    // classlist.toggle
}
async function getPhotographer() {
    // fetch
}
async function displayPage() {
    const photographersheader = document.querySelector(".photographer-header");
    // photographerTemplate
}
async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographer();
    displayPage(photographers);
}
// 
init();