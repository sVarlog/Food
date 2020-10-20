"use strict";

window.addEventListener('DOMContentLoaded', () => {
    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    const hideTabContent = () => {
        tabsContent.forEach((el) => {
            el.classList.add('hide');
            el.classList.remove('show', 'fade');
        });

        tabs.forEach((el) => {
            el.classList.remove('tabheader__item_active');
        });
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const t = e.target;

        if(t && t.classList.contains('tabheader__item')){
            tabs.forEach((el, i) => {
                if(t == el){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    const deadline = '2020-11-11';

    function getTimeRemaning(endtime) {
        let time = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(time / (1000 * 60 *60 * 24)),
              hours = Math.floor((time / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((time / 1000 / 60) % 60),
              seconds = Math.floor((time / 1000) % 60);

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if(num <= 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTimeRemaning(endtime);

            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if(time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // modal
    const modalBtns = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    const modalShow = () => {
        modal.classList.add('show');
        document.body.style = 'overflow: hidden';
        clearInterval(modalTimerID);
    };

    const modalClose = (e = modal.querySelector('.modal__close')) => {
        let t = e.target;
        if(e === 'close' || t.classList.contains('modal', 'show') || t.classList.contains('modal__close') || e.code === 'Escape'){
            modal.classList.remove('show');
            document.body.style = '';
        }
    };

    let modalTimerID = setTimeout(() => {
        modalShow();
    }, 10000);

    modalBtns.forEach(el => {
        el.addEventListener('click', function(){
            if(!modal.classList.contains('show')){
                modalShow();
            }
        });
    });

    modal.addEventListener('click', (e) => {
        modalClose(e);
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            modalClose(e);
        }
    });

    const showModalByScroll = () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            modalShow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);

    // cards
    class FoodCard {
        constructor(imgUrl, alt, title, text, price, parentSelector, ...classes) {
            this.img = imgUrl;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const item = document.createElement('div');
            if(this.classes.length === 0 || this.classes[0] === undefined){
                this.item = 'menu__item';
                item.classList.add(this.item);
                console.log(this.item);
            } else {
                this.classes.forEach(el => item.classList.add(el));
            }
            item.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(item);
        }
    }

    let cardsDB = [
        {
            img: 'img/tabs/vegy.jpg',
            alt: 'img1',
            title: 'Меню "Фитнес"',
            text: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            price: 9,
            parent: '.menu__field .container',
            classes: 'menu__item'
        },
        {
            img: 'img/tabs/elite.jpg',
            alt: 'img2',
            title: 'Меню “Премиум”',
            text: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            price: 21,
            parent: '.menu__field .container',
            classes: 'menu__item'
        },
        {
            img: 'img/tabs/post.jpg',
            alt: 'img3',
            title: 'Меню "Постное"',
            text: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            price: 14,
            parent: '.menu__field .container',
            classes: 'menu__item'
        }
    ];

    let cards = [];    
    
    for (let i = 0; i < cardsDB.length; i++) {
        let card = new FoodCard(cardsDB[i].img, cardsDB[i].alt, cardsDB[i].title, cardsDB[i].text, cardsDB[i].price, cardsDB[i].parent, cardsDB[i].classes);
        cards.push(card);
    }
    
    cards.forEach(el => {
        el.render('.cardsWrapp');
    });

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро свяжемся с вами.',
        failure: 'Что-то пошло не так!'
    };

    const postData = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    };

    forms.forEach(el => {
        postData(el);
    });

    const showThanksModal = (m) => {
        console.log(m);
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        modalShow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${m}</div>
            </div>
        `;

        modal.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose('close');
        }, 4000);
    };

});