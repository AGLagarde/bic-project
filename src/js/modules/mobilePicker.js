export default class mobilePicker {

    constructor() {
        this._createBound();
        this._grabDom();
        this._addListener();
        this._onShowHide();
        if (window.innerWidth < 767) {
            this._onShowHide();
        }
    }

    _createBound() {
        ['_onShowHide']
            .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    _onShowHide() {

        let customStep = document.querySelectorAll('.custom__step');

        if (window.innerWidth <= 767) {
            for (let i = 0; i < customStep.length; i++) {
                customStep[i].style.display = 'none';
            }
            customStep[0].style.display = 'block';
            for (let i = 0; i < this._dom.btn.length; i++) {
                let next = this._dom.btn[i].children[0];
                let prev = this._dom.btn[i].children[1];

                if (next) {
                    next.addEventListener('click', (pEvt) => {
                        if (pEvt.target.classList.contains("custom__btnNext")) {
                            pEvt.preventDefault();
                            let parentCurrent = this._dom.btn[i].parentNode.parentNode;
                            let parentNext = this._dom.btn[i + 1].parentNode.parentNode;
                            parentCurrent.style.display = 'none';
                            parentNext.style.display = 'block';
                        }
                    });
                }
                if (prev) {
                    prev.addEventListener('click', (pEvt) => {
                        pEvt.preventDefault();
                        let parentCurrent = this._dom.btn[i].parentNode.parentNode;
                        let parentPrev = this._dom.btn[i - 1].parentNode.parentNode;
                        parentPrev.style.display = 'block';
                        parentCurrent.style.display = 'none';
                    });

                }

            }
        }
        if (window.innerWidth > 767) {
            for (let i = 0; i < customStep.length; i++) {
                customStep[i].style.display = 'block';
            }
        }
    }

    _addListener() {
        window.addEventListener('resize', this._onShowHide);
    }

    _grabDom() {
        this._dom = {};
        this._dom.btn = document.querySelectorAll('.custom__btnWrap');
    }
}