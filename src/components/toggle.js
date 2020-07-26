function toggleModal(modal){
 
    modal.classList.toggle('popout__container_active');
   
    if (modal.classList.contains('popout__container_active')) {
   
      document.addEventListener('keydown', escapeModal);
   
    } else {
   
      document.removeEventListener('keydown', escapeModal);
   
    }
   
  }
   
  function escapeModal(e) {
   
    if (e.key === "Escape") {
   
      toggleModal(document.querySelector('.popout__container_active'));
   
    }
   
  }

export {toggleModal}