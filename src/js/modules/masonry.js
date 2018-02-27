import Masonry from 'masonry-layout'

export default new Masonry( '.socials__grid', {
    itemSelector: '.socials__item',
    horizontalOrder: true,
    gutter: 30
});
