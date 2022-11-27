'use strict';

let lastScroll = 0;
const headerEl = document.querySelector('#header');
const introEl = document.querySelector('#intro');
const burgerEl = document.querySelector('#burger');
const diffuserEl = document.querySelector('#diffuser_video');
const videoModalEl = document.querySelector('#modal_video');
const videoModalCloseEl = document.querySelector('#modal-close');
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
diffuserEl.addEventListener('click', () => {
    videoModalEl.classList.add('show');
    bodyEl.classList.add('no-scroll');
});

videoModalCloseEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    videoModalEl.classList.remove('show');
    bodyEl.classList.remove('no-scroll');
});
videoModalEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    videoModalEl.classList.remove('show');
    bodyEl.classList.remove('no-scroll');
});

document.querySelector('.modal__dialog').addEventListener('click', (evt) => {
    evt.stopPropagation();
});

// Animate intro title
document.querySelector('.intro__title').classList.add('_active');
