'use strict';

let lastScroll = 0;
const headerEl = document.querySelector('#header');
const introEl = document.querySelector('#intro');
const burgerEl = document.querySelector('#burger');
const bodyEl = document.body;
let introElH = introEl.clientHeight;
const defaultOffset = introElH;

const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
const containHide = () => headerEl.classList.contains('hide');

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
    bodyEl.classList.toggle('show-nav');
});

window.addEventListener('load', () => {
    document.querySelector('.intro__title').classList.add('_active');
});