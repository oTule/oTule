/**
 * Функция снятия класса active с closeElement если произведен клик
 * вне clickElement или его дочерних элементов
 * Если передать только один аргумент, то отслеживание и закрытие
 * будет в рамках только этого элемента
 * @param {$(element)} clickElement 
 * @param {$(element)} closeElement 
 */
function closeOnDocumentClick(clickElement,closeElement) {
    if (!closeElement) {
        closeElement = clickElement;
    }
    $(document).click(function (e) {
        if (!clickElement.is(e.target)
            && clickElement.has(e.target).length === 0
        ) {
            closeElement.removeClass('active');
        }
    })
}

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

$('.events-filter__datepicker-input').on('focusin', function () {
    $(this).closest('.datepicker-btn').addClass('picker-active');
    console.log($(this).closest('.datepicker-btn'));
    
});

$('.events-filter__datepicker-input').on('focusout', function () {    
    if ($(this).val().length <= 0) {
        $(this).closest('.datepicker-btn').removeClass('picker-active');
    }
});

$('.events-filter__datepicker-reset').on('click', function () {
    $(this).closest('.datepicker-btn').removeClass('picker-active');
});

$(function(){
    $('.header-down__search-btn').on('click', function(e) {
        if (!$(this).parent().hasClass('active') 
            || $('.header-down__search-input').val().length === 0
        ) {
            e.preventDefault();
            $(this).parent().addClass('active');            
        } else {
            console.log($(this).parent());
            
            $(this).parent().submit();
        }
       
        
    })
    closeOnDocumentClick($('.header-down__search-form'));
});

