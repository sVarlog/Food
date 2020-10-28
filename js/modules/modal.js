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