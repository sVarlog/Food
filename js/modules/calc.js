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

export default calc;