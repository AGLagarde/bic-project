export default class animationTitle {

    constructor() {
        this._createBound();
        this._grabDom();
        this._eventListener();
    }

    _createBound() {
        ['_animation']
            .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    _animation() {
        for (let i = 0; i < this._dom.title.length; i++) {
            let parent = this._dom.title[i].parentNode;
            if (window.scrollY >= parent.offsetTop - 400) {
                if (parent) {
                    parent.classList.add('is-active');
                }
            }
        }
    }

    _grabDom() {
        this._dom = {};
        this._dom.title = document.querySelectorAll('.general__title__animation');
    }

    _eventListener() {
        window.addEventListener('scroll', this._animation);
    }
}