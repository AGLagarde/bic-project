export default class slider {
    constructor() {
        this._createBound();
        this._addListener();
        this._grabDom();

        this._count = 1;
        this._h = 100;
    }

    _createBound() {
        ['_onSlider', '_onLoad']
            .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    _onSlider() {
        if (this._count < this._dom.items.length) {
            this._dom.list.style.transform = 'translate3d(0%, -' + this._h + '%, 0px)';
            this._count++;
            this._h += 100;
        } else {
            clearInterval(this._onSlider);
        }
    }

    _onLoad() {
        setInterval(this._onSlider, 800);
    }

    _addListener() {
        window.addEventListener('load', this._onLoad);
    }

    _grabDom() {

        this._dom = {};
        this._dom.list = document.querySelector('.slider__list');
        this._dom.items = document.querySelectorAll('.slider__item');
    }

}
