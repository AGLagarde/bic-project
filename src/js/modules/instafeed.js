import Instafeed from 'instafeed';

export default class instafeed {
    constructor() {
        this._createBound();
        this._feed = new Instafeed({
            get: 'user',
            userId: '6923702318',
            clientId: 'f18d9e4905a34bbaa7a111d0b5c6d194',
            accessToken: '6923702318.1677ed0.15e2d6ed311a4527bba450890a447180',
            resolution: 'standard_resolution',
            limit: 9
        });
        this._grabDom();
        this._instaFeed();
    }

    _createBound() {
        ['_instaFeed']
            .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    _instaFeed() {
        this._dom.insta.setAttribute('class', 'socials__grid');
        this._feed.imageTemplate = '<div class="socials__item"><a class="instafeed__media" href="{{link}}" target="_blank" rel="noreferrer nooppener"><img src="{{image}}" width="{{width}}" height="{{height}}"></a></div>';
        this._feed.run();
    }

    _grabDom() {
        this._dom = {};
        this._dom.insta = document.querySelector('#instafeed');
    }
}
