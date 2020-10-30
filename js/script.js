require('es6-promise').polyfill();

// json-server db.json
import tabs from './modules/tabs';
import timer from './modules/timer';
import modal, { modalShow } from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener('DOMContentLoaded', () => {
    let modalTimerId = setTimeout(() => modalShow('.modal', modalTimerId), 30000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-11-11');
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    forms('form');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offset__slider-inner',
    });
    calc();
});