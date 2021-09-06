if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}

const modal = document.querySelector('.modal'),
  overlay = document.querySelector('.overlay'),
  btnCloseModal = document.querySelector('.close-modal'),
  btnsOpenModal = document.querySelectorAll('.trigger'),
  modalTitle = document.querySelector('#title'),
  modalMobile = document.getElementById('mobile'),
  modalAddress = document.getElementById('address'),
  indicator = document.querySelectorAll('.link');

btnsOpenModal.forEach((el) => {
  el.addEventListener('click', function () {
    p = el.childNodes;
    modalTitle.innerHTML = `شركة ${p[1].textContent}`;
    modalMobile.innerHTML = this.getAttribute('data-mobile');
    modalAddress.innerHTML = this.getAttribute('data-address');

    /*
    function callFunc() {
      if (isTouchDevice()) {
        let a = document.getElementById('mobile').value;
        window.location.href = 'tel:' + a;
      }
    }
    //calling functionality on cclick on mobile
    modalMobile.addEventListener('click', () => {
      modalMobile.onclick(callFunc());
    });
    */
  });
});
/*
function isTouchDevice() {
  return typeof window.ontouchstart !== 'undefined';
}
*/

const openModalO = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
/*
indicator.forEach((el) => {
  el.addEventListener('click', function () {
    if (modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
    }
  });
});
*/

document.addEventListener('click', (el) => {
  if(el.target.classList.contains('btn-link')){
    window.open(el.target.getAttribute('link'));
  }
  else if( el.target.classList.contains('trigger') || el.target.classList.contains('company-name')
        || el.target.classList.contains('ind') && el.target.parentElement.classList.contains('trigger') ){
    openModalO();
  }
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);
  if (e.keyCode === 32 && !modal.classList.contains('hidden')) {
    closeModal();
  }

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
