function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    const hideTabContent = () => {
        tabsContent.forEach((el) => {
            el.classList.add('hide');
            el.classList.remove('show', 'fade');
        });

        tabs.forEach((el) => {
            el.classList.remove(activeClass);
        });
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const t = e.target;

        if (t && t.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((el, i) => {
                if (t == el) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;