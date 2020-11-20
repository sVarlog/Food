import {initCustomSlider} from './modules/slider.min.js';

let clientWidth = document.documentElement.offsetWidth, 
    menuStatus = 0;

// create menu
const menuInit = () => {
    const header = document.querySelector('.header'),
        menu = header.querySelector('.header .menu'),
        btn = header.querySelector('.header button.open-modal'),
        logo = header.querySelector('.header .logo'),
        btnClone = btn.cloneNode(true),
        menuClone = menu.cloneNode(true);

    let menuWrapp, menuBtn, menuSpan, menuActiveStatus = 0;

    const menuActive = () => {
        menuWrapp = document.createElement('div');
        menuBtn = document.createElement('div');
        menuSpan = document.createElement('span');
        menuBtn.classList.add('menuBtn');
        menuWrapp.classList.add('mobileMenuWrapp');
        menuBtn.append(menuSpan);
        menuWrapp.append(menuClone, btnClone);
        menu.remove();
        btn.remove();
        header.append(menuBtn);
        header.append(menuWrapp);

        const transformMenu = () => {
            if (menuActiveStatus == 0) {
                menuWrapp.classList.add('active');
                menuBtn.classList.add('active');
                logo.style.width = '0';
                logo.style.transform = 'translateX(-140px)';
                menuActiveStatus = 1;
            } else {
                menuWrapp.classList.remove('active');
                menuBtn.classList.remove('active');
                logo.style.width = '70px';
                logo.style.transform = 'translateX(0)';
                menuActiveStatus = 0;
            }
        };

        menuBtn.addEventListener('click', transformMenu);
    };

    const menuRemove = () => {
        header.querySelector('.menuBtn').remove();
        header.querySelector('.mobileMenuWrapp').remove();
        header.append(menuClone);
        header.append(btnClone);
        console.log('test');
    };

    if (clientWidth < 576){
        console.log(clientWidth);
        if (menuStatus == 0) {
            menuActive();
            menuStatus = 1;
        }
    } else {
        if (menuStatus == 1) {
            menuRemove();
            menuStatus = 0;
        }
    }
};

// create modals
const modalInit = () => {
    const modal = document.querySelector('.modal'),
          modalBtns = document.querySelectorAll('.open-modal');

    const showModal = (arg) => {
        modal.classList.add('active');
        document.body.classList.add('modalActive');
        window.addEventListener('click', hideModal);
        window.addEventListener('keydown', hideModal);
    };

    const hideModal = (e) => {
        if (e.target.classList.contains("modalClose") || e.target.classList.contains("modal") || e.code == "Escape") {
            modal.classList.remove('active');
            document.body.classList.remove('modalActive');
            window.removeEventListener('click', hideModal);
            window.removeEventListener('keydown', hideModal);
        }
    };
        
    modalBtns.forEach(el => el.addEventListener('click', showModal));

    const showModalWithScroll = () => {
        if ((document.documentElement.scrollTop + document.documentElement.clientHeight) >= document.documentElement.offsetHeight) {
            showModal();
            window.removeEventListener('scroll', showModalWithScroll);
        }
    };

    window.addEventListener('scroll', showModalWithScroll);
}

// tabs
const tabs = () => {
    const tabs = document.querySelector('.tabs'),
          tabsContent = tabs.querySelectorAll('.tabContent'),
          tabsDescr = tabs.querySelectorAll('.tabDescr .descr'),
          navItems = tabs.querySelectorAll('.tabsNavigation .navItem');
    
    const showContent = (num) => {
        tabsContent.forEach((el, i) => {
            el.classList.remove('active');
            if (i == num) {
                el.classList.add('active');
            }
        });
        tabsDescr.forEach((el, i) => {
            el.classList.remove('active');
            if (i == num) {
                el.classList.add('active');
            }
        });
        navItems.forEach((el, i) => {
            el.classList.remove('active');
            if (i == num) {
                el.classList.add('active');
            }
        });
    };
    showContent(0);

    navItems.forEach((el, i) => {
        el.setAttribute('data-num', i);
        el.addEventListener('click', () => {
            showContent(el.dataset.num);
        });
    });
};

// slider
const slider = () => {
    initCustomSlider({
        section: '.section2 .customSlider',
        arrows: true,
        dots: true
    });
};

// calculator
const calculator = () => {
    const calcBlock = document.querySelector('.section3 .calc'),
          gender = calcBlock.querySelectorAll('.gender .calcItem'),
          weight = calcBlock.querySelector('.stats .weight'),
          height = calcBlock.querySelector('.stats .height'),
          age = calcBlock.querySelector('.stats .age'),
          activity = calcBlock.querySelectorAll('.activity .calcItem'),
          total = calcBlock.querySelector('.resultBlock .number');

    let data = {
        gender: 'female',
        height: '',
        weight: '',
        age: '',
        activity: '1.375'
    };

    const calculating = () => {
        let expression;
        if (data.gender == 'male') {
            expression = ((88.36 + (13.4 * data.weight) + (4.8 * data.height) - (5.7 * data.age)) * data.activity).toFixed(0);
        } else if (data.gender == 'female') {
            expression = ((447.6 + (9.2 * data.weight) + (3.1 * data.height) - (4.3 * data.age)) * data.activity).toFixed(0);
        }
        total.innerHTML = expression;
    };
    
    const check = () => {
        if (data.gender && data.height && data.weight && data.age && data.activity) {
            calculating();
        }
    };

    const changeActive = (item, items, name) => {
        items.forEach(el => {
            el.classList.remove('active');
        });
        item.classList.add('active');
        data[name] = item.dataset[name];
        check();
    };

    gender.forEach(el => {
        el.addEventListener('click', () => {
            changeActive(el, gender, 'gender');
        });
    });

    activity.forEach(el => {
        el.addEventListener('click', () => {
            changeActive(el, activity, 'activity');
        });
    });

    const inputChange = (...nums) => {
        nums.forEach(el => {
            el.addEventListener('input', () => {
                el.value = el.value.replace(/\D/g, '');
                if (el.value > 300) {
                    el.value = 299;
                }
                data[el.getAttribute('name')] = el.value;
                check();
            });
        });
    };

    inputChange(height, weight, age);

};

// cards
const cards = () => {
    const cardsWrap = document.querySelector('.section4 .cards .row');
    let cardsData = [
        {
            img: "img/tabs/vegy.jpg",
            heading: "Меню 'Фитнес'",
            content: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
            price: 256
        },
        {
            img: "img/tabs/post.jpg",
            heading: "Меню 'Постное'",
            content: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
            price: 450
        },
        {
            img: "img/tabs/elite.jpg",
            heading: "Меню 'Премиум'",
            content: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
            price: 576
        }
    ];

    const render = (item) => {
        let cardItem = document.createElement('div'),
            cardHead = document.createElement('div'),
            cardBody = document.createElement('div'),
            cardFooter = document.createElement('div'),
            img = document.createElement('img'),
            title = document.createElement('h3'),
            p = document.createElement('p'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p');
        cardItem.classList.add('cardItem');
        cardHead.classList.add('cardHead');
        cardBody.classList.add('cardBody');
        cardFooter.classList.add('cardFooter');
        img.src = item.img;
        title.innerText = item.heading;
        cardHead.append(img);
        cardBody.append(title);
        p.innerText = item.content;
        cardBody.append(p);
        p2.innerText = 'Цена:';
        cardFooter.append(p2);
        p3.innerHTML = `<span class="price">${item.price}</span> грн/день`;
        cardFooter.append(p3);
        cardItem.append(cardHead, cardBody, cardFooter);
        cardsWrap.append(cardItem);
    };
    cardsData.forEach(el => {
        render(el);
    });
};

// timer
let time = '2020-11-21';
const timer = () => {
    const timerWrapp = document.querySelector('.stock .timer'),
          days = timerWrapp.querySelector('.timeVal .days'),
          hours = timerWrapp.querySelector('.timeVal .hours'),
          minutes = timerWrapp.querySelector('.timeVal .minutes'),
          seconds = timerWrapp.querySelector('.timeVal .seconds');
    let day = new Date(time);
    if (day - new Date() < 8.64e+8) {
        while (day - new Date() < 8.64e+8) {
            day.setDate(day.getDate() + 10);
        }
    }

    const getTimeRemaning = (endtime) => {
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
    };

    const updateClock = () => {
        let time = getTimeRemaning(day);
        for (let t in time) {
            if (time[t] < 10) {
                time[t] = `0${time[t]}`;
            }
        }
        days.innerText = time.days;
        hours.innerText = time.hours;
        minutes.innerText = time.minutes;
        seconds.innerText = time.seconds;
    };
    updateClock();

    setInterval(updateClock, 1000);

};

// animation
const animation = () => {
    let elems = document.querySelectorAll('.anim');
    elems.forEach(el => el.setAttribute('data-hide', 0));

    const hide = (item) => {
        let dir;
        if (item.classList.contains('animLeft')) {
            dir = `translateX(-100vw)`;
        } else if (item.classList.contains('animRight')) {
            dir = `translateX(100vw)`;
        }
        new Promise((resolve, reject) => {
            item.style.transition = '0s';
            resolve(item);
        }).then(
            item.style.transform = dir
        ).then(
            setTimeout(() => {
                item.style.transition = '.75s';
                item.dataset.hide = 1;
            }, 750)
        );
    };

    const show = (item) => {
        item.style.transform = 'translateX(0)';
    };

    const properties = () => {
        elems.forEach(el => {
            if (el.dataset.hide == 0) {
               hide(el);
            }
            if ((window.pageYOffset + (document.documentElement.clientHeight)) > el.offsetTop && window.pageYOffset < el.offsetTop + el.offsetHeight) {
                if (el.dataset.hide == 0) {
                    setTimeout(() => {
                        show(el);
                    }, 751);
                } else {
                    show(el);
                }
            }
        });
    };
    properties();

    window.addEventListener('scroll', properties);
    window.addEventListener('resize', properties);
};

const render = ([...func]) => {
    func.forEach(f => f());
}
render([menuInit, modalInit, tabs, slider, calculator, cards, timer, animation]);

window.addEventListener('resize', () => {
    clientWidth = document.documentElement.clientWidth;
    render([menuInit]);
});