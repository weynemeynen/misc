var closeButton = document.querySelector('.modal-block__close');

closeButton.onclick = function(event) {
    event.target.closest('.modal').classList.remove('modal_visible');
}