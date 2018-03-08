export default class Picker {

    constructor() {
        this._grabDom();
        this._createBound();
        this._addListener();
        this._arr = [];
        this._arrColors = [];
        this._ink = true;
        this._grip = true;
        this._pentip = true;
    }

    _createBound() {
        let arr = [
            '_onInk',
            '_onGrip',
            '_onReset',
            '_onPentip',
            '_showGripColor',
            '_showInkColor',
            '_resetInk',
            '_resetClass',
            '_threeColors',
            '_pencilLead',
            '_resetGrip',
            '_resetMobile',
            '_resetPentip'
        ];
        arr.forEach((fn) => this[fn] = this[fn].bind(this));
    }

    /*
     *
     * RESET PART
     *
     * */

    _resetInk() {
        for (let i = 0; i < this._dom.customLeft.length; i++) {
            this._dom.customLeft[i].style.fill = "#FFF";
        }
        for (let i = 0; i < this._dom.customRight.length; i++) {
            this._dom.customRight[i].style.fill = "#FFF";
        }
    }

    _resetGrip() {
        for (let i = 0; i < this._dom.customGrip.length; i++) {
            this._dom.customGrip[i].style.fill = "#FFF";
        }
    }

    _resetClass() {
        for (let i = 0; i < this._dom.gripItems.length; i++) {
            if (this._dom.gripItems[i].classList.contains('is-active')) {
                this._dom.gripItems[i].classList.remove('is-active');
            }
        }
        for (let i = 0; i < this._dom.inkItems.length; i++) {
            if (this._dom.inkItems[i].classList.contains('is-active')) {
                this._dom.inkItems[i].classList.remove('is-active');
            }
        }
    }

    _resetMobile() {
        let customStep = document.querySelectorAll('.custom__step');
        if (window.innerWidth < 767) {
            for (let i = 0; i < customStep.length; i++) {
                customStep[i].style.display = 'none';
            }
            customStep[0].style.display = 'block';
        }
    }

    _resetPentip() {
        for (let i = 0; i < this._dom.pentip.length; i++) {
            this._dom.pentip[i].classList.remove('is-selected');
        }
        this._dom.mine.classList.remove('is-active');
    }

    _onReset(pEvt) {
        this._arr = [];
        pEvt.preventDefault();
        this._resetClass();
        this._resetInk();
        this._resetGrip();
        this._resetMobile();
        this._resetPentip();
        window.addEventListener('resize', this._resetMobile);

    }

    /*
     *
     *
     * END RESET PART
     *
     * */

    /*
     *
     *
     * PENCIL CHOICE PART
     *
     *
     * */

    _threeColors() {

        if (this._arrColors.length <= 4) {
            for (let i = 0; i < this._dom.inkItems.length; i++) {
                if (this._dom.inkItems[i].classList.contains('is-active')) {
                    let contain = this._dom.inkItems[i];
                    this._arrColors.push(contain);
                }
            }
        }
        if (this._arrColors.length === 4) {
            this._arrColors.shift();
            this._arrColors[0].classList.remove('is-active');
        }
    }

    _pencilLead(parent) {
        parent.classList.add('is-selected');
        for (let i = 0; i < this._dom.pentip.length; i++) {
            if (this._dom.pentip[1].classList.contains('is-selected')) {
                this._dom.mine.classList.add('is-active');
            } else {
                this._dom.mine.classList.remove('is-active');
            }
        }
    }

    _onPentip(pEvt) {
        let parent = pEvt.target.parentNode;

        for (let i = 0; i < this._dom.pentip.length; i++) {
            this._dom.pentip[i].classList.remove('is-selected')
        }

        this._pencilLead(parent);

        if (this._dom.pentip[1] && this._dom.pentip[1].classList.contains('is-selected')) {
            this._threeColors();
        }

        this._arrColors = [];

    }

    /*
     *
     *
     * END PENCIL CHOICE PART
     *
     * */

    /*
     *
     *
     * INK COLORS CHOICE
     *
     * */

    _showInkColor(pEvt) {
        if (this._ink) {
            for (let i = 0; i < this._dom.customLeft.length; i++) {
                this._dom.customLeft[i].style.fill = pEvt.target.dataset.color;
            }
            this._ink = false;
        } else {
            for (let i = 0; i < this._dom.customRight.length; i++) {
                this._dom.customRight[i].style.fill = pEvt.target.dataset.color;
            }
            this._ink = true;
        }
    }

    _onInk(pEvt) {
        let index = pEvt.currentTarget;

        if (this._arr.length <= 5) {
            index.classList.toggle('is-active');
            if (index.classList.contains('is-active')) {
                this._arr.push(index);
            } else {
                this._arr.splice(index, 1);
            }
        }

        if (this._arr.length === 5) {
            let shift = this._arr.shift();
            shift.classList.remove('is-active');
        }

        this._showInkColor(pEvt);
    }

    /*
     *
     *
     * END INK COLORS CHOICE
     *
     * */

    /*
     *
     *
     * GRIP COLORS CHOICE
     *
     *
     * */

    _showGripColor(pEvt) {
        for (let i = 0; i < this._dom.customGrip.length; i++) {
            if (this._grip) {
                this._dom.customGrip[i].style.fill = pEvt.target.dataset.color;
                this._grip = false;
            } else {
                this._dom.customGrip[i].style.fill = pEvt.target.dataset.color;
                this._grip = true;
            }
        }
    }

    _onGrip(pEvt) {
        let index = pEvt.currentTarget;

        for (let i = 0; i < this._dom.gripItems.length; i++) {
            this._dom.gripItems[i].classList.remove('is-active');
        }

        if (this._arr.length < 6) {
            index.classList.add('is-active');
            if (index.classList.contains('is-active')) {
                this._arr.push(index);
            }
        }
        if (!index.classList.contains('is-active') && this._arr.length === 6) {
            this._arr.splice(this._arr.length - 1, 1);
            index.classList.remove('is-active');
        }

        this._showGripColor(pEvt);
    }

    /*
     *
     *
     * END GRIP COLOR CHOICE
     *
     *
     * */

    _addListener() {
        for (let i = 0; i < this._dom.inkItems.length; i++) {
            this._dom.inkItems[i].addEventListener('click', this._onInk);
        }
        for (let i = 0; i < this._dom.gripItems.length; i++) {
            this._dom.gripItems[i].addEventListener('click', this._onGrip)
        }
        for (let i = 0; i < this._dom.pentip.length; i++) {
            this._dom.pentip[i].addEventListener('click', this._onPentip);
        }

        this._dom.reset.addEventListener('click', this._onReset);
    }

    _grabDom() {
        this._dom = {};
        this._dom.inkItems = document.querySelectorAll('.js-ink');
        this._dom.gripItems = document.querySelectorAll('.js-grip');
        this._dom.customLeft = document.querySelectorAll('.js-element-customLeft');
        this._dom.customRight = document.querySelectorAll('.js-element-customRight');
        this._dom.customGrip = document.querySelectorAll('.js-element-grip');
        this._dom.reset = document.querySelector('.js-element-reset');
        this._dom.pentip = document.querySelectorAll('.js-element-pentip');
        this._dom.pen = document.querySelector('.js-element-pen');
        this._dom.mine = document.querySelector('.js-element-mine');
    }
}
