/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 148:0-14 */
/***/ ((module) => {

function calc() {
    let calcBlock = document.querySelector('.calculating'),
        result = calcBlock.querySelector('.calculating__total'),
        gender = calcBlock.querySelectorAll('#gender .calculating__choose-item'),
        height = calcBlock.querySelector('#height'),
        weight = calcBlock.querySelector('#weight'),
        age = calcBlock.querySelector('#age'),
        ration = calcBlock.querySelectorAll('.calculating__choose_big .calculating__choose-item'),
        errorText = document.createElement('h2');

    const generateErrText = () => {
        errorText.classList.add('error', 'text-center', 'w100');
        errorText.textContent = 'Заполните все поля';
        result.innerHTML = '';
        result.append(errorText);
    };
    generateErrText();

    let state = {
        gender: 'female',
        height: '',
        weight: '',
        age: '',
        ration: '1.375'
    };
    if (!localStorage.getItem('gender')) {
        localStorage.setItem('gender', state.gender);
    }
    if (!localStorage.getItem('ration')) {
        localStorage.setItem('ration', state.ration);
    }

    const calculate = () => {
        errorText.remove();
        let expression;
        if (state.gender == 'male') {
            expression = ((88.36 + (13.4 * state.weight) + (4.8 * state.height) - (5.7 * state.age)) * state.ration).toFixed(0);
        } else if (state.gender == 'female') {
            expression = ((447.6 + (9.2 * state.weight) + (3.1 * state.height) - (4.3 * state.age)) * state.ration).toFixed(0);
        }
        result.innerHTML = `
            <div class="calculating__subtitle">
                Ваша суточная норма калорий:
            </div>
            <div class="calculating__result">
                <span>${expression}</span> ккал
            </div>
        `;
    };

    const checkLocalStorage = () => {
        if (localStorage.getItem('gender')) {
            state.gender = localStorage.getItem('gender');
            gender.forEach(el => {
                el.classList.remove('calculating__choose-item_active');
                if (el.id == localStorage.getItem('gender')) {
                    el.classList.add('calculating__choose-item_active');
                }
            });
        }
        if (localStorage.getItem('height')) {
            state.height = localStorage.getItem('height');
            height.value = localStorage.getItem('height');
        }
        if (localStorage.getItem('weight')) {
            state.weight = localStorage.getItem('weight');
            weight.value = localStorage.getItem('weight');
        }
        if (localStorage.getItem('age')) {
            state.age = localStorage.getItem('age');
            age.value = localStorage.getItem('age');
        }
        if (localStorage.getItem('ration')) {
            state.ration = localStorage.getItem('ration');
            ration.forEach(el => {
                el.classList.remove('calculating__choose-item_active');
                if (el.dataset.ration == localStorage.getItem('ration')) {
                    el.classList.add('calculating__choose-item_active');
                }
            });
        }
    };
    checkLocalStorage();

    const checkState = () => {
        if ((state.gender != '' && state.height != '' && state.weight != '' && state.age != '' && state.ration != '')) {
            calculate();
        } else {
            generateErrText();
        }
    };
    checkState();

    const activateClass = (elements, item, localName, localVal) => {
        elements.forEach(el => {
            el.classList.remove('calculating__choose-item_active');
        });
        item.classList.add('calculating__choose-item_active');
        localStorage.setItem(localName, localVal);
        checkState();
    };

    gender.forEach(el => {
        el.addEventListener('click', (e) => {
            state.gender = e.target.id;
            activateClass(gender, e.target, 'gender', e.target.id);
        });
    });

    height.addEventListener('input', () => {
        height.value = height.value.replace(/\D/g, '');
        if (height.value > 250) {
            height.value = 249;
        }
        state.height = height.value;
        localStorage.setItem('height', height.value);
        checkState();
    });

    weight.addEventListener('input', () => {
        weight.value = weight.value.replace(/\D/g, '');
        if (weight.value > 300) {
            weight.value = 299;
        }
        state.weight = weight.value;
        localStorage.setItem('weight', weight.value);
        checkState();
    });

    age.addEventListener('input', () => {
        age.value = age.value.replace(/\D/g, '');
        if (age.value > 100) {
            age.value = 99;
        }
        state.age = age.value;
        localStorage.setItem('age', age.value);
        checkState();
    });

    ration.forEach(el => {
        el.addEventListener('click', (e) => {
            state.ration = e.target.dataset.ration;
            activateClass(ration, e.target, 'ration', e.target.dataset.ration);
        });
    });
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function cards() {
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
            if (this.classes.length === 0 || this.classes[0] === undefined) {
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

    getResourses('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new FoodCard(img, altimg, title, descr, price, '.menu .container').render('.cardsWrapp');
            });
        });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function forms() {
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
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function modal() {
    const modalBtns = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    const modalShow = () => {
        modal.classList.add('show');
        document.body.style = 'overflow: hidden';
        clearInterval(modalTimerID);
    };

    const modalClose = (e = modal.querySelector('.modal__close')) => {
        let t = e.target;
        if (e === 'close' || t.classList.contains('modal', 'show') || t.classList.contains('modal__close') || e.code === 'Escape') {
            modal.classList.remove('show');
            document.body.style = '';
        }
    };

    let modalTimerID = setTimeout(() => {
        modalShow();
    }, 30000);

    modalBtns.forEach(el => {
        el.addEventListener('click', function () {
            if (!modal.classList.contains('show')) {
                modalShow();
            }
        });
    });

    modal.addEventListener('click', (e) => {
        modalClose(e);
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose(e);
        }
    });

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalShow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function slider() {
    let slider = document.querySelector('.offer__slider'),
        sliderItems = slider.querySelectorAll('.offer__slide'),
        currentNum = slider.querySelector('#current'),
        total = slider.querySelector('#total'),
        prev = slider.querySelector('.offer__slider-prev'),
        next = slider.querySelector('.offer__slider-next'),
        sliderInner = slider.querySelector('.offset__slider-inner'),
        sliderWidth = slider.querySelector('.offer__slider-wrapper').clientWidth,
        step = 0;

    sliderInner.style.width = `${sliderItems.length * 100}%`;
    if (sliderItems.length < 10) {
        total.textContent = `0${sliderItems.length}`;
    } else {
        total.textContent = sliderItems.length;
    }
    currentNum.textContent = `01`;
    let dots = document.createElement('div');
    dots.classList.add('offer__slider-dots');
    for (let i = 0; i < sliderItems.length; i++) {
        let dot = document.createElement('div');
        dot.setAttribute('data-dot', i);
        dot.classList.add('dot');
        if (i == 0) {
            dot.classList.add('active');
        }
        dots.append(dot);
    }
    slider.append(dots);
    dots = slider.querySelectorAll('.dot');

    const changeSlide = (dir = 'next') => {
        const changeCurrentDot = (n) => {
            dots.forEach((el, i) => {
                el.classList.remove('active');
                if (i == n) {
                    el.classList.add('active');
                }
            });
        };

        const changeCurrentNum = (n) => {
            changeCurrentDot(n - 1);
            if (n < 10) {
                n = `0${n}`;
            }
            return new Promise((resolve, reject) => {
                currentNum.style.opacity = 0;
                setTimeout(() => {
                }, 250);
            }).then(
                setTimeout(() => {
                    currentNum.textContent = n;
                }, 250)
            ).then(
                setTimeout(() => {
                    currentNum.style.opacity = `1`;
                }, 250)
            );
        };

        if (dir === 'next') {
            step += 1;
            if (step >= sliderItems.length) {
                step = 0;
            }
            sliderInner.style.transform = `translateX(-${step * sliderWidth}px)`;
            changeCurrentNum(step + 1);
        } else if (dir === 'prev') {
            step -= 1;
            if (step < 0) {
                step = sliderItems.length - 1;
            }
            sliderInner.style.transform = `translateX(-${step * sliderWidth}px)`;
            changeCurrentNum(step + 1);
        } else if (typeof (dir) === 'number') {
            step = dir;
            sliderInner.style.transform = `translateX(-${dir * sliderWidth}px)`;
            changeCurrentDot(step + 1);
            changeCurrentNum(step + 1);
        }
    };

    next.addEventListener('click', () => {
        changeSlide('next');
    });

    prev.addEventListener('click', () => {
        changeSlide('prev');
    });

    dots.forEach(el => {
        el.addEventListener('click', () => {
            console.log(+el.dataset.dot);
            changeSlide(+el.dataset.dot);
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function tabs() {
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

        if (t && t.classList.contains('tabheader__item')) {
            tabs.forEach((el, i) => {
                if (t == el) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function timer() {
    const deadline = '2020-11-11';

    function getTimeRemaning(endtime) {
        let time = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
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
        if (num <= 10) {
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

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
// json-server db.json
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    timer();
    modal();
    cards();
    forms();
    slider();
    calc();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map