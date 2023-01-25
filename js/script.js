'use strict';

let lastScroll = 0;
const headerEl = document.querySelector('#header');
const introEl = document.querySelector('#intro');
const burgerEl = document.querySelector('#burger');
const modalEls = document.querySelectorAll('.modal');
const modalCloseEls = document.querySelectorAll('.modal__close');
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

// Text typing effect
var typeText = document.querySelector('.typing');
var textToBeTypedArr = ['Эта страница на данный момент не доступна, попробуйте позже пожалуйста.', 'Страницы покупки товаров и описания товаров сейчас в стадии разработки', 'В ближайшее время данные страницы будут доступны'];
var index = 0, isAdding = true, textToBeTypedIndex = 0;

function playAnim() {
    setTimeout(function () {
        // set the text of typeText to a substring of the text to be typed using index.
        typeText.innerText = textToBeTypedArr[textToBeTypedIndex].slice(0, index);
        if (isAdding) {
            // adding text
            if (index > textToBeTypedArr[textToBeTypedIndex].length) {
                // no more text to add
                isAdding = false;
                //break: wait 2s before playing again
                // play cursor blink animation
                typeText.classList.add('showAnim');
                setTimeout(function () {
                    // remove cursor blink animation
                    typeText.classList.remove('showAnim');
                    playAnim();
                }, 2000);
                return;
            } else {
                // increment index by 1
                index++;
            }
        } else {
            // removing text
            if (index === 0) {
                // no more text to remove
                isAdding = true;
                //switch to next text in text array
                textToBeTypedIndex = (textToBeTypedIndex + 1) % textToBeTypedArr.length;
            } else {
                // decrement index by 1
                index--;
            }
        }
        // call itself
        playAnim();
    }, isAdding ? 120 : 60);
}
// start animation
playAnim();

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none'
    }, 1000)
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