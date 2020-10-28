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