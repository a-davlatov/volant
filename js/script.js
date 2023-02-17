'use strict';

let lastScroll = 0;
const headerEl = document.querySelector('#header');
const introEl = document.querySelector('#intro');
const burgerEl = document.querySelector('#burger');
const modalEls = document.querySelectorAll('.modal');
const modalCloseEls = document.querySelectorAll('.modal__close');
const formEls = document.querySelectorAll('.form');
const bodyEl = document.body;
let introElH = introEl.clientHeight;
const defaultOffset = introElH;

const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
const containHide = () => headerEl.classList.contains('hide');

// Fixed header
window.addEventListener('scroll', () => {

    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        headerEl.classList.add('hide');
    } else if (scrollPosition() < lastScroll && containHide()) {
        //scroll up
        headerEl.classList.remove('hide');
        headerEl.classList.add('fixed');
    } else if (scrollPosition() < defaultOffset) {
        headerEl.classList.remove('fixed');
    }

    lastScroll = scrollPosition();
});

// Nav toggle
burgerEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    burgerEl.classList.toggle('clicked');
    headerEl.classList.toggle('show');
    bodyEl.classList.toggle('no-scroll');
});

// Smooth scroll
const navLinks = document.querySelectorAll('[data-scroll]');
navLinks.forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.preventDefault();

        const elementId = el.dataset.scroll;
        const elementOffset = document.getElementById(elementId).offsetTop;

        burgerEl.classList.remove('clicked');
        headerEl.classList.remove('show');
        bodyEl.classList.remove('no-scroll');

        if (window.innerWidth <= 414) {
            window.scrollTo({
                top: elementOffset - 56,
                behavior: 'smooth'
            });
            return;
        }

        window.scrollTo({
            top: elementOffset,
            behavior: 'smooth'
        });
    });
});


// Show modal
const modalLinks = document.querySelectorAll('[data-modal]');
modalLinks.forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.preventDefault();

        const elementId = el.dataset.modal;
        const modalEl = document.getElementById(elementId);
        modalEl.classList.add('show');
        bodyEl.classList.add('no-scroll');
    })
});

modalCloseEls.forEach((el) => {
    el.addEventListener('click', (evt) => {
        el.closest('.modal').classList.remove('show');
        bodyEl.classList.remove('no-scroll');
    });
});

modalEls.forEach((el) => {
    el.addEventListener('click', (evt) => {
        el.classList.remove('show');
        bodyEl.classList.remove('no-scroll');
    });
});

document.querySelectorAll('.modal__dialog').forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.stopPropagation();
    });
});

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 1000);
})

const wow = new WOW(
    {
        boxClass: 'wow',
        animateClass: 'animate__animated',
        offset: 0,
        mobile: false,
        live: true
    }
)
wow.init();

// Form validation
const telInputEls = document.querySelectorAll('input[type=tel]');
const maskOptions = { mask: '+{7}(000)000-00-00' };
telInputEls.forEach(el => IMask(el, maskOptions));

function formValidation(form) {
    const errorEl = form.querySelector('.error');

    errorEl.style.display = 'none';
    errorEl.textContent = '';

    const nameEl = form.querySelector('.name');
    const phoneEl = form.querySelector('.phone');

    nameEl.style.borderColor = 'rgba(255, 255, 255, .40)';
    phoneEl.style.borderColor = 'rgba(255, 255, 255, .40)';
    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const checkEl = form.querySelector('.form__checkbox');

    if (name === '') {
        errorEl.textContent = 'Заполните поле имя';
        errorEl.style.display = 'block';
        nameEl.style.borderColor = 'rgb(199, 43, 43)';
        nameEl.focus();
        return false;
    }

    if (phone === '') {
        errorEl.textContent = 'Заполните поле телефон';
        errorEl.style.display = 'block';
        phoneEl.style.borderColor = 'rgb(199, 43, 43)';
        phoneEl.focus();
        return false;
    }

    if (!checkEl.checked) {
        errorEl.textContent = 'Пожалуйста, дайте согласие на обработку ваших персональных данных';
        errorEl.style.display = 'block';
        checkEl.focus();
        return false;
    }

    return true;
}

// Form submit
formEls.forEach((form) => {
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const messageEl = form.querySelector('.message');
        const btnEl = form.querySelector('.btn');
        const inputEls = form.querySelectorAll('input');
        const isValid = formValidation(form);
        if (!isValid) {
            return;
        }

        btnEl.disabled = true;
        inputEls.forEach(el => el.setAttribute('disabled', 'disabled'));

        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: new FormData(form),
        })
            .then(() => {
                form.reset();
                messageEl.style.display = 'block';
                btnEl.disabled = false;
                inputEls.forEach(el => el.removeAttribute('disabled'));
                setTimeout(() => {
                    messageEl.style.display = 'none';
                }, 3000);
            })
            .catch((err) => {
                throw err;
            });
    });
});