$(function () {
    $('.top__slider').slick({
        dots: true,
        arrows: true,
        fade: true, //Чтобы менялась плавно\
        autoplay: true, //Автоматически меняется слайд(стандарт 3 сек)
        prevArrow: '<button type="button" class="article-slider__arrow top__arrowleft top__arrows"><img src="images/arrow-slide-left.svg" alt="arrow-slide-left"></button>' ,

        nextArrow: '<button type="button" class="article-slider__arrow top__arrowright top__arrows"><img src="images/arrow-slide-right.svg" alt="arrow-slide-right"></button>'
    }) //Активация слайдера(slick-carousel)
});

// Слайдер стрелки по бокам
// $('.top__slider').slick({
//     prevArrow: '<button type="button" class="article-slider__arrow top__arrowleft top__arrows"><img src="images/arrow-slide-left.svg" alt="arrow-slide-left"></button>' ,

//     nextArrow: '<button type="button" class="article-slider__arrow top__arrowright top__arrows"><img src="images/arrow-slide-right.svg" alt="arrow-slide-right"></button>'
// });
