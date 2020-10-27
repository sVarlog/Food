"use strict";

// json-server db.json

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

    const getResourses = async (url) => {
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResourses('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new FoodCard(img, altimg, title, descr, price, '.menu .container').render('.cardsWrapp');
    //     });
    // });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new FoodCard(img, altimg, title, descr, price, '.menu .container').render('.cardsWrapp');
            });
        });

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро свяжемся с вами.',
        failure: 'Что-то пошло не так!'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            }, 
            body: data
        });

        return await res.json();
    };

    const bindPostData = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    };

    forms.forEach(el => {
        bindPostData(el);
    });

    const showThanksModal = (m) => {
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

    // slider
    let slider = document.querySelector('.offer__slider'),
        sliderItems = slider.querySelectorAll('.offer__slide'),
        currentNum = slider.querySelector('#current'),
        total = slider.querySelector('#total'),
        prev = slider.querySelector('.offer__slider-prev'),
        next = slider.querySelector('.offer__slider-next');

    const position = () => {
        sliderItems.forEach((el, i) => {
            if (i == 0) {
                el.classList.add('active');
                currentNum.innerHTML = `01`;
            }
        });

        if (sliderItems.length < 10) {
            total.innerHTML = `0${sliderItems.length}`;
        } else {
            total.innerHTML = `${sliderItems.length}`;
        }
    };
    position();

    const sliderEvents = () => {
        const currentSlide = () => {
            let current = 0;
            sliderItems.forEach((el, i) => {
                if (el.classList.contains('active')) {
                    current = i;
                }
            });
            return +current;
        };

        const changeSlide = (num = 'next') => {
            if (num === 'next') {
                let curr = currentSlide() + 1;
                if (curr >= sliderItems.length) {
                    curr = 0;
                }

                sliderItems.forEach((el, i) => {
                    el.classList.remove('active');
                    if (i == curr) {
                        el.classList.add('active');
                    }
                });
                
                if (curr < 10) {
                    currentNum.innerHTML = `0${curr + 1}`;
                } else {
                    currentNum.innerHTML = `${curr + 1}`;
                }
            } else if (num === 'prev') {
                let curr = currentSlide() - 1;
                if (curr < 0) {
                    curr = sliderItems.length - 1;
                }

                sliderItems.forEach((el, i) => {
                    el.classList.remove('active');
                    if (i == curr) {
                        el.classList.add('active');
                    }
                });
                
                if (curr < 10) {
                    currentNum.innerHTML = `0${curr + 1}`;
                } else {
                    currentNum.innerHTML = `${curr + 1}`;
                }
            }
        };

        next.addEventListener('click', function(){
            changeSlide('next');
        });
        prev.addEventListener('click', function(){
            changeSlide('prev');
        });
    };
    sliderEvents();

});