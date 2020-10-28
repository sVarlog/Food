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