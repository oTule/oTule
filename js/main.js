var owl = $('.owl-carousel');
owl.owlCarousel({
    items:1,
    onInitialized: owlInitCount,
    onChanged: owlUpdateSlide,
});
// Go to the next item
$('.owlNextBtn').click(function() {
    owl.trigger('next.owl.carousel');
})
// Go to the previous item
$('.owlPrevBtn').click(function() {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owl.trigger('prev.owl.carousel', [300]);
})

function owlInitCount(event) {
    var items     = event.item.count;
    var item      = event.item.index;
    $('.owlCustomCountNumber').text(items);
    $('.owlCustomCurrentNumber').text(item+1);
}
function owlUpdateSlide(event) {
    var item      = event.item.index;
    $('.owlCustomCurrentNumber').text(item+1);
}