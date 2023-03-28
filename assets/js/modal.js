const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector('#close-modal');
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");


// Alternar o estado da classe
const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide")
}

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal())
    
});