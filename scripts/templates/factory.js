// 
// class PhotographerFactory {
//     constructor (data) {
//         this.name = data.name
//         this.portrait = data.portrait
//     }
//     // 
//     getUserCardDOM() {
//         const picture = `assets/photographers/Photographers ID Photos/${this.portrait}`;
//         const article = document.createElement( 'article' );
//         // const anchor = document.createElement( 'a' );
//         // const label = document.createElement( 'label' );
//         // const location = document.createElement( 'p' );
//         // const tagline = document.createElement( 'p' );
//         // const price = document.createElement( 'p' );
//         const img = document.createElement( 'img' );
//         const h2 = document.createElement( 'h2' );
//         // 
//         img.setAttribute("src", picture)
//         img.setAttribute("alt", this.name)
//         h2.textContent = this.name;
//         article.addEventListener('click', function (e) {
//             e.preventDefault()
//             const url = new URL(window.location.href)
//             window.location.href = `${url.origin}/Front-End-Fisheye/photographer.html`
//         })
//         // 
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
// }
// 
// class Photographer extends PhotographerFactory {
//     super(name)
// }
// const photographer = new Photographer("mimi")
// return photographer.get()
// 
export default function photographerTemplate(data) {
    const { name, portrait, tagline, price, country, city, id } = data;
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    // 
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const anchor = document.createElement( 'a' );
        const img = document.createElement( 'img' );
        const priceText = document.createElement( 'h5' );
        const taglineText = document.createElement( 'h4' );
        const locationText = document.createElement( 'h3' );
        const h2 = document.createElement( 'h2' );
        // 
        img.setAttribute("src", picture);
        img.setAttribute("alt", `portrait of ${name}`);
        anchor.setAttribute("aria-label", `${name}`)
        anchor.setAttribute("href", "#")
        locationText.textContent = `${city}, ${country}.`;
        taglineText.textContent = tagline;
        priceText.textContent = `${price} € / jour`;
        h2.textContent = name;
        // 
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const url = new URL(window.location.href)
            window.location.href = `${url.origin}/Front-End-Fisheye/photographer.html?id=${id}`;
        })
        // 
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(locationText);
        article.appendChild(taglineText);
        article.appendChild(priceText);
        anchor.appendChild(article)
        return (anchor);
    } 
    return { name, picture, getUserCardDOM }
}
