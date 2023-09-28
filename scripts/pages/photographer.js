

// Utils


const counter = {
  likes : 0,
  tabIndex : 10,
  getLikes: function () {
    return this.likes;
  },
  setTabindex : async function (elmt) {
    elmt.setAttribute("tabindex", this.tabIndex);
    this.tabIndex += 1;
  },
}
/**
 * Sorts an Array of Objects
 * 
 * @param { String } option 
 * @param { Array.<Object> } data  // { mediaDate , mediaTitle , mediaLikes }
 * @returns { Array.<Object> } sortedData
 */ 
function sortMedia(data, option) {  // 
  if(option === null) {
    return data
  }
  // 
  if (option === "date") {
    let sortedData = data.toSorted((a, b) => Date.parse(a.mediaDate) - Date.parse(b.mediaDate))
    return sortedData
  }
  // 
  if (option === "title") {
    let sortedData = data.toSorted((a, b) => a.mediaTitle.localeCompare(b.mediaTitle, 'fr'))
    return sortedData
  }
  // 
  if (option === "likes") {
    let sortedData = data.toSorted((a, b) => parseInt(a.mediaLikes) - parseInt(b.mediaLikes))
    return sortedData
  }
}


// Fetch Data


/**
 * Fetches one photographer Object by its id 
 * 
 * @param { String } photographerId 
 * @returns { (Object | Error) }
 */
async function getPhotographerById(photographerId) {
  try {
    let res = await fetch("data/photographers.json");
    const { photographers } = await res.json();
    // 
    for (const obj in photographers) {
      for (const prop in photographers[obj]) {
        if (prop === "id" && photographers[obj][prop] == photographerId) {
          return photographers[obj];
        }
      }
    }
  } catch (err) {
    console.log("fetch error : ", err);
  }
}
/**
 * Fetches an Array of media Objects  
 * 
 * @param { String } photographerId
 * @returns { (Array | Error) } 
 */
async function getMedia(photographerId) {
  try {
    let res = await fetch("data/photographers.json");
    const { media } = await res.json();
    let array = [];
    // 
    for (const obj in media) {
      for (const prop in media[obj]) {
        if (media[obj][prop] == photographerId) {
          array.push(media[obj]);
        }
      }
    }
    return array;
  } catch (err) {
    console.log("fetch error : ", err);
  }
}


// components


/**
 * Creates and Displays the Header of the photographer page
 * 
 * @param { Object } photographer // { name, city, country, tagline, price, portrait }
 */
async function displayHeader(photographer) {
  const header = document.querySelector(".photograph-header");
  const bio = document.createElement("div");
  const h2 = document.createElement("h2");
  const taglineText = document.createElement("h4");
  const locationText = document.createElement("h3");
  const img = document.createElement("img");
  //
  h2.textContent = photographer.name;
  locationText.textContent = `${photographer.city}, ${photographer.country}.`;
  taglineText.textContent = photographer.tagline;
  bio.classList.add("bio")
  img.setAttribute(
    "src",
    `assets/photographers/Photographers ID Photos/${photographer.portrait}`
  );
  img.setAttribute("alt", `Portrait of ${photographer.name}`);
  //
  bio.appendChild(h2);
  bio.appendChild(locationText);
  bio.appendChild(taglineText);
  header.appendChild(bio);
  header.appendChild(img);
}
/**
 * Returns an Object from media Object and photographer name
 * 
 * @param { Object } media 
 * @param { String } photographerName 
 * @returns { Object } info, img, id, title, video, data, likes
 */
 function mediaFactory(media, photographerName) {
  const { date, likes, title, video, image, id } = media;
  let obj = {}
  if (image) {
    const img = document.createElement("img");
    // 
    img.setAttribute("src", `assets/photographers/${photographerName}/${image}`);
    img.setAttribute("alt", `Photo: ${title}`);
    obj.media =  img
    obj.mediaId = id
    obj.mediaTitle = title
    obj.mediaLikes = likes
    obj.mediaDate = date
  }
  if (video) {
    const vid = document.createElement("video");
    // 
    vid.setAttribute("src", `assets/photographers/${photographerName}/${video}`);
    vid.setAttribute("alt", `video: ${title}`);
    obj.media =  vid
    obj.mediaId = id
    obj.mediaTitle = title
    obj.mediaLikes = likes
    obj.mediaDate = date
  }
  return obj
}
/**
 * Returns media informations Component
 * 
 * @param { Object } media // { title, likes, date }
 * @param { String } name 
 * @param { Object } counter 
 * @returns { HTMLDivElement }
 */
function displayInfo(media, name, counter) {
  const { title, likes, date } = media;
  counter.likes += likes;
  const info = document.createElement("div");
  const h3 = document.createElement("h3");
  const lks = document.createElement("p");
  //
  lks.classList.add("likes");
  info.classList.add("info");
  lks.setAttribute("aria-hidden", true);
  info.setAttribute(
    "aria-label",
    `${title}, by ${name}, ${likes} likes, date: ${date}`
  );
  h3.textContent = title;
  lks.textContent = `${likes}`;
  // 
  info.appendChild(h3);
  info.appendChild(lks);
  return info;
}
/**
 * Returns the Tag Component
 * 
 * @param { Object } photographer // { price }
 * @returns { HTMLElement } aside
 */
function displayTag(photographer) {
  const aside = document.createElement("aside");
  const priceText = document.createElement("p");
  const totalLikesText = document.createElement("p");
  //
  totalLikesText.textContent = counter.getLikes();
  totalLikesText.classList.add("likes");
  priceText.textContent = `${photographer.price} € / jour`;
  aside.classList.add("aside_tag");
  //
  aside.appendChild(totalLikesText);
  aside.appendChild(priceText);
  return aside;
}
/**
 * Displays the Contact modal Component
 * 
 * @param {String} photographerName 
 */
async function displayContactModal(photographerName) {
  const contact = document.querySelector(".modal>header>h2");
  contact.textContent = `Contactez-moi ${photographerName}`;
}
/**
 * Returns the Cards Section Component 
 * 
 * @param { String } option 
 * @param { String } photographerId 
 * @param { String } photographerName 
 * @param { Object } counter 
 * @param { Array.<Object> } media 
 * @returns { HTMLElement } section
 */
function displayCards(option, photographerId, photographerName, counter, media) {
  const section = document.querySelector(".photograph-section");
  let data = [];
  let sortedData = [] ;
  // 
  media.forEach(async function(elmt){
    let obj = mediaFactory(elmt, photographerName)
    let info = displayInfo(elmt, photographerName, counter)
    obj.info = info;
    data.push(obj)
  })
  // 
  // for (const prop in media) {
  //   obj = await mediaFactory(media[prop], photographerName);
  //   info =  displayInfo(media[prop], photographerName, counter);
  //   obj.info = info;
  //   data.push(obj);
  // }
  // 
  sortedData = sortMedia(data, option)
  sortedData.forEach(function(obj){
    const card = document.createElement("article");
    card.classList.add("card");
    card.setAttribute("id", obj.mediaId)
    card.appendChild(obj.media);
    card.appendChild(obj.info);
    counter.setTabindex(card)

    section.appendChild(card);
  })
  cardEventHandler(sortedData, counter)
  const lightbox = displayLightbox(sortedData, photographerId, photographerName);
  section.appendChild(lightbox);
  return section;
}
/**
 * Returns the Lightbox Component
 * 
 * @param {Array} data 
 * @returns {HTMLDialogElement} dialog
 */
function displayLightbox(data) {
  const lightbox = document.createElement("dialog");
  const container = document.createElement("div");
  const closeBtn = document.createElement("button");
  const closeIcon = document.createElement("span");
  const leftIcon = document.createElement("span");
  const rightIcon = document.createElement("span");
  const leftBtn = document.createElement("button");
  const rightBtn = document.createElement("button");
  // 
  data.forEach( function(obj){
    const content = document.createElement("div");
    const media = obj.media.cloneNode(true)
    const title = document.createElement("p")
    // 
    content.classList.add("lightbox_content")
    title.classList.add("lightbox_title")
    title.textContent = obj.mediaTitle
    content.setAttribute("mediaid", obj.mediaId)
    closeBtn.setAttribute("id", "close_lightbox_id")
    if (media.nodeName === "VIDEO") { media.setAttribute("controls", true) }
    // 
    content.appendChild(media)
    content.appendChild(title)
    container.appendChild(content)
  })
  //
  leftBtn.classList.add("leftBtn")
  rightBtn.classList.add("rightBtn")
  container.classList.add("lightbox_container");
  lightbox.classList.add("lightbox_modal");
  closeIcon.classList.add("lightbox_close_icon");
  closeBtn.classList.add("close_lightbox");
  //     
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault()
    const elements = document.querySelectorAll(`.lightbox_content`)
    elements.forEach((elm)=> elm.classList.remove("hide_media"))
    lightbox.close()
  })
  LightboxEventHandler(leftBtn, rightBtn, container)
  closeBtn.appendChild(closeIcon);
  leftBtn.appendChild(leftIcon)
  rightBtn.appendChild(rightIcon)
  lightbox.appendChild(closeBtn)
  container.appendChild(leftBtn)
  container.appendChild(rightBtn)
  lightbox.appendChild(container)
  return lightbox;
}
/**
 * Returns the Sorter Component
 * 
 * @param {Object} photographer 
 * @returns {HTMLElement} aside
 */
function displaySorter(id) {
  const sorter = document.createElement("aside") 
  const label = document.createElement("label") 
  const select = document.createElement("select")
  // 
  const likesBtn = document.createElement("button")
  const titleBtn = document.createElement("button")
  const dateBtn = document.createElement("button")
  // 
  const blankOption = document.createElement("option") 
  const titleOption = document.createElement("option") 
  const dateOption = document.createElement("option") 
  const likesOption = document.createElement("option") 
  // 
  blankOption.setAttribute("value", " ")
  likesOption.setAttribute("value", "likes")
  titleOption.setAttribute("value", "title")
  dateOption.setAttribute("value", "date")
  select.setAttribute("name", "sorter")
  select.setAttribute("id", "sort-media")
  sorter.classList.add("sorter")
  // 
  label.textContent = "Trier par : "
  likesBtn.textContent = "Popularité"
  titleBtn.textContent = "Titre"
  dateBtn.textContent = "Date"
  // 
  sorterEventHandler(select, id)
  // 
  likesOption.appendChild(likesBtn);
  titleOption.appendChild(titleBtn);
  dateOption.appendChild(dateBtn);
  // 
  select.appendChild(blankOption)
  select.appendChild(likesOption)
  select.appendChild(dateOption)
  select.appendChild(titleOption)
  label.appendChild(select)
  // 
  sorter.appendChild(label)
  return sorter
}


// Handle events 


/**
 * Adds Interactions to the Cards, to Open the Lightbox, or Add a Like
 * 
 * @param {String} photographerName 
 * @param {Object} counter 
 * @param {Array} data 
 */
function cardEventHandler(data, counter) {
  // Open the Lightbox
  data.forEach( function (item) {
    const media = document.querySelector(`[id="${item.mediaId}"] > *:first-child`)
    media.addEventListener("click", function (e) {
      e.preventDefault();
      const lightbox = document.querySelector(".lightbox_modal")
      const curr = document.querySelector(`.lightbox_container > [mediaid="${item.mediaId}"]`)
      const elements = document.querySelectorAll(`.lightbox_content`)
      // 
      elements.forEach((elm)=> elm.classList.toggle("hide_media"))
      curr.classList.toggle("hide_media")
      lightbox.showModal()
    });
  })
  // Add a Like
  const elements = document.querySelectorAll(".likes")
  elements.forEach(function(elmt){
    elmt.addEventListener("click", function(e){
      e.preventDefault()
      const aside = document.querySelector(".aside_tag > .likes")
      elmt.textContent = parseInt(elmt.textContent) + 1 ;
      aside.textContent = counter.likes+=1
    },{ once : true })
  }, {counter});
}
/**
 * Adds Navigation to the Lightbox 
 * 
 * @param {HTMLButtonElement} leftBtn 
 * @param {HTMLButtonElement} rightBtn 
 * @param {HTMLDivElement} container 
 */
function LightboxEventHandler(leftBtn, rightBtn, container) {
  let curr, prev, next;
  // 
  leftBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    curr = document.querySelector(".lightbox_content:not(.hide_media)")
    const currId = curr.getAttribute("mediaid")
    const elements = document.querySelectorAll(`.lightbox_content`)
    elements.forEach(function (elm, index, listObj) {
      const mediaId = elm.getAttribute("mediaid");
      if (index > 0 && mediaId === currId) {
        prev = listObj.item(index-1);
        prev.classList.toggle("hide_media")
      }
      if ( index === 0 && mediaId === currId) {
        prev = listObj.item(listObj.length-1);
        prev.classList.toggle("hide_media")
      }
    })
    curr.classList.toggle("hide_media")
  })
  // 
  rightBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    curr = document.querySelector(".lightbox_content:not(.hide_media)")
    const currId = curr.getAttribute("mediaid")
    const elements = document.querySelectorAll(`.lightbox_content`)
    elements.forEach(function (elm, index, listObj) {
      const mediaId = elm.getAttribute("mediaid");
      if (index <= listObj.length-2 && mediaId === currId) {
        next = listObj.item(1 + index);
        next.classList.toggle("hide_media")
      }
      if (index === listObj.length-1 && mediaId === currId) {
        next = listObj.item(0);
        next.classList.toggle("hide_media")
      }
    })
    curr.classList.toggle("hide_media")
  })
  // 
  container.addEventListener("keydown", function(e){
    if (e.defaultPrevented) {
      return ;
    }
    if (e.key === "ArrowLeft") {
      curr = document.querySelector(".lightbox_content:not(.hide_media)")
      const currId = curr.getAttribute("mediaid")
      const elements = document.querySelectorAll(`.lightbox_content`)
      elements.forEach(function (elm, index, listObj) {
        const mediaId = elm.getAttribute("mediaid");
        if (index > 0 && mediaId === currId) {
          prev = listObj.item(index-1);
          prev.classList.toggle("hide_media")
        }
        if ( index === 0 && mediaId === currId) {
          prev = listObj.item(listObj.length-1);
          prev.classList.toggle("hide_media")
        }
      })
      curr.classList.toggle("hide_media")
    }
    if (e.key === "ArrowRight") {
      curr = document.querySelector(".lightbox_content:not(.hide_media)")
      const currId = curr.getAttribute("mediaid")
      const elements = document.querySelectorAll(`.lightbox_content`)
      elements.forEach(function (elm, index, listObj) {
        const mediaId = elm.getAttribute("mediaid");
        if (index <= listObj.length-2 && mediaId === currId) {
          next = listObj.item(1 + index);
          next.classList.toggle("hide_media")
        }
        if (index === listObj.length-1 && mediaId === currId) {
          next = listObj.item(0);
          next.classList.toggle("hide_media")
        }
      })
      curr.classList.toggle("hide_media")
    }
    e.preventDefault()
  })
}
/**
 * Adds Functionnality to the Sorter Component
 * 
 * @param {HTMLSelectElement} select  
 * @param {String} id
 */
function sorterEventHandler(select, id) {
  // 
  select.addEventListener("click", function(e){
    e.preventDefault()
    let option;
    const origin = document.location.origin
    const path = document.location.pathname
    // 
    switch (e.target.value) {
      case "likes" : {
        option = "likes"
        const param = new URLSearchParams(`option=${option}`)
        document.location.href = new URL(`${origin}${path}?id=${id}&option=${param.get("option")}`);
      }
      break
      case "title" : {
        option = "title"
        const param = new URLSearchParams(`option=${option}`)
        document.location.href = new URL(`${origin}${path}?id=${id}&option=${param.get("option")}`);
      }
      break
      case "date" : {
        option = "date"
        const param = new URLSearchParams(`option=${option}`)
        document.location.href = new URL(`${origin}${path}?id=${id}&option=${param.get("option")}`);
      }
      break
      default : {return "sorter event handler error"}
    }
  })
}


// app 

/**
 *  Mettre le code JavaScript lié à la page photographer.html
 * 
 */
async function init() {
  const url = new URL(window.location.href);
  const urlParam = new URLSearchParams(url.search);
  const id = urlParam.get("id");
  const option = urlParam.get("option")
  // Récupère les datas des photographes
  const photographer = await getPhotographerById(id);
  const photographerName = photographer.name.split(" ");
  const photographerId = photographer.id;
  const media = await getMedia(photographerId);
  const main = document.querySelector("#main");
  // 
  displayContactModal(photographerName);
  displayHeader(photographer);
  const sorter =  displaySorter(photographerId);
  const section = displayCards(option, photographerId, photographerName[0], counter, media);
  const aside = displayTag(photographer);
  // 
  main.appendChild(sorter);
  main.appendChild(section);
  main.appendChild(aside);
}
//
init();
