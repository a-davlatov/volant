'use strict';

let lastScroll = 0;
const defaultOffset = 0;
const headerEl = document.querySelector('#header');

const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
const containHide = () => headerEl.classList.contains('hide');

window.addEventListener('scroll', () => {

    if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        headerEl.classList.add('hide');
    } else if (scrollPosition() < lastScroll && containHide()) {
        //scroll up
        headerEl.classList.remove('hide');
    }

    lastScroll = scrollPosition();
});