const modalShow = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    document.body.style = 'overflow: hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

const modalClose = (modalSelector, e = modal.querySelector('.modal__close')) => {
    const modal = document.querySelector(modalSelector);
    let t = e.target;
    if (e === 'close' || t.classList.contains('modal', 'show') || t.classList.contains('modal__close') || e.code === 'Escape') {
        modal.classList.remove('show');
        document.body.style = '';
    }
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalBtns = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalBtns.forEach(el => {
        el.addEventListener('click', function () {
            if (!modal.classList.contains('show')) {
                modalShow(modalSelector, modalSelector);
            }
        });
    });

    modal.addEventListener('click', (e) => {
        modalClose(modalSelector, e);
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose(modalSelector, e);
        }
    });

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalShow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {modalClose};
export {modalShow};