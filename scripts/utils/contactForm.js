
//
// create dialog
// create closeBtn
// create container
// create header
// create h2
// create button
// create img
// create form
// create field
// create label
// create input
// create textarea
// 
const openModalBtn = document.getElementById("open_modal");
const closeModalBtn = document.getElementById("close_modal");
const modal = document.getElementById("contact_modal");
// 
const form = document.querySelector(".modal > form")
const body = document.querySelectorAll("body > *:not(.mod)")
// 
openModalBtn.addEventListener("click", function (e){
    e.preventDefault();
    body.forEach(elt => elt.setAttribute("disabled", true))
    modal.showModal();
})
// 
closeModalBtn.addEventListener("click", function (e){
    e.preventDefault();
    body.forEach(elt => elt.setAttribute("disabled", false))
    modal.close (console.log("modal is closed"))
})
// 
form.addEventListener("submit", function (e){
    e.preventDefault();
    const fData = new FormData(form)
    console.log(fData.get("firstname"))
    console.log(fData.get("lastname"))
    console.log(fData.get("email"))
    console.log(fData.get("message"))
})
// 