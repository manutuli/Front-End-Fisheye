
//Mettre le code JavaScript lié à la page photographer.html
// 
let url = new URL(window.location.href)
let urlParam = new URLSearchParams(url.search)
let id = urlParam.get("id")
// 
async function getPhotographer() {
    try {
        let res = await fetch("data/photographers.json")
        const {photographers} = await res.json()
        // loop through properties
        for(const obj in photographers) {
           for (const prop in photographers[obj]) {
                if (prop === "id" && photographers[obj][prop] == id) {
                    return photographers[obj];
                }
            }
        }
    } catch (err) {console.log("fetch error : ", err)}
}
// 
async function getMedia(photographer) {
    try {
        let res = await fetch("data/photographers.json")
        const {media} = await res.json()
        // loop through properties
        let array = []
        for(const obj in media) {
            for (const prop in media[obj]) {
                 if (media[obj][prop] == photographer.id) {
                     array.push(media[obj])
                 }
             }
        }
        return array
    } catch (err) {console.log("fetch error : ", err)}
}
// 
async function displayHeader(photographer) {
    const header = document.querySelector(".photograph-header");
    // 
    const h2 = document.createElement( 'h2' );
    const priceText = document.createElement( 'h5' );
    const taglineText = document.createElement( 'h4' );
    const locationText = document.createElement( 'h3' );
    const gallery = document.createElement( 'section' )
    const articles = document.createElement( 'article' )
    const img = document.createElement( "img" )
    // 
    h2.textContent = photographer.name;
    locationText.textContent = `${photographer.city}, ${photographer.country}.`;
    taglineText.textContent = photographer.tagline;
    priceText.textContent = `${photographer.price} € / jour`;
    img.setAttribute("src", `assets/photographers/Photographers ID Photos/${photographer.portrait}`)
    img.setAttribute("alt", `Portrait of ${photographer.name}`)
    // 
    header.appendChild(h2)
    header.appendChild(locationText)
    header.appendChild(taglineText)
    header.appendChild(priceText)
    header.appendChild(img)
}
// 
async function displayMedia(obj, name) {
    const { title, video, image, likes, date } = obj
    const anchor = document.createElement( 'a' )
    const card = document.createElement( "article" )
    const heart = document.createElement( "div" )
    const h3 = document.createElement( "h3" )
    const h4 = document.createElement( "h4" )
    const lks = document.createElement( "p" )
    // const icon = document.createElement( "i" )
    // 
    heart.classList.add("heart_icon")
    card.classList.add("card")
    anchor.setAttribute("aria-label", `Photo: ${title}, it has ${likes} likes, date : ${date}`)
    h3.textContent = title;
    lks.textContent = `Likes : ${likes}`;
    h4.textContent = `date : ${date}`;
    // 
    // heart.appendChild(icon)
    if (image) {
        const img = document.createElement( "img" )
        img.setAttribute("lazy", true)
        img.setAttribute("alt", `Photo: ${title}`)
        img.setAttribute("src", `assets/photographers/${name}/${image}`)
        card.appendChild(img)
    }
    if (video) {
        const vid = document.createElement( "video" )
        // poster url
        // controls
        vid.setAttribute("controls", true)
        vid.setAttribute("src", `assets/photographers/${name}/${video}`)
        card.appendChild(vid)
    }
    // 
    card.appendChild(h4)
    card.appendChild(h3)
    card.appendChild(lks)
    card.appendChild(heart)
    return card
}
// 
async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    const media = await getMedia(photographer);
    const main = document.querySelector("#main");
    const section = document.querySelector(".photograph-section");
    // 
    displayHeader(photographer);
    let photographerName = photographer.name.split(' ');
    // console.log("test : ", photographer.name)
    for (const obj in media) {
        let value = await displayMedia(media[obj], photographerName[0])
        section.appendChild( value )
    }
    main.appendChild( section )
}
// 
init();