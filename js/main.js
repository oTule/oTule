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

/**Попап авторизации */
$(function () {
    
    $('.popup').on('click', function(e) {
        if($(this).is(e.target)) {
            $(this).removeClass('active');
        }        
    })

    $('.popup__close').on('click', function() {
        
        $(this).closest('.popup').removeClass('active');
    })

    $('.js-popupOpen').on('click', function (e) {
        e.preventDefault();

        var popupName = $(this).attr('data-popup'),
            currentPopup = $('[data-popup-content='+popupName+']');
        
        currentPopup.addClass('active');
    });
    
});

/**Слайдеры */
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
            
            $(this).parent().submit();
        }
       
        
    })
    closeOnDocumentClick($('.header-down__search-form'));
});

$('.js-select').on('change load', function(){
    $('option').removeClass('active');
    $(this).find('option:selected').addClass('active');
})

    /**JQuery Validate кастомные настройки */
    (function( factory ) {
        if ( typeof define === "function" && define.amd ) {
            define( ["jquery", "../jquery.validate"], factory );
        } else if (typeof module === "object" && module.exports) {
            module.exports = factory( require( "jquery" ) );
        } else {
            factory( jQuery );
        }
    }(function( $ ) {

    /*
    * Translated default messages for the jQuery validation plugin.
    * Locale: RU (Russian; русский язык)
    */
    $.extend( $.validator.messages, {
        required: "Это поле необходимо заполнить.",
        remote: "Пожалуйста, введите правильное значение.",
        email: "Пожалуйста, введите корректный адрес электронной почты.",
        url: "Пожалуйста, введите корректный URL.",
        date: "Пожалуйста, введите корректную дату.",
        dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
        number: "Пожалуйста, введите число.",
        digits: "Пожалуйста, вводите только цифры.",
        creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
        equalTo: "Пожалуйста, введите такое же значение ещё раз.",
        extension: "Пожалуйста, выберите файл с правильным расширением.",
        maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
        minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
        rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
        range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
        max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
        min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
    } );
    return $;
    }));


    $('.js-needValidate').validate({
        rules: {
            NAME: {
                required: true,
                minlength: 3,
            },
            LAST_NAME: {
            },
            EMAIL: {
                required: true,
                email: true,
                minlength: 6,
            },
            LOGIN: {
                required: true,
                minlength: 3,
            },
            PASSWORD: {
                required: true,
                minlength: 3,
            },
            PASSWORD_REPEAT: {
                required: true,
                minlength: 3,
            },
        }
    });


var count = 0;
var wow;


function handleFileSelectMulti(evt) {
    // console.log(evt.target.files);
    files = evt.target.files; // FileList object

    
    // document.getElementById('outputMulti').innerHTML = "";
    for (var i = 0, f; f = files[i]; i++) {
        
      // Only process image files.
      if (!f.type.match('image.*')) {
        alert("Только изображения....");
      }


      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('div');
          span.className = 'suggest__pic';
          var del = document.createElement('div');
          del.className = 'suggest__pic-delete';
          del.addEventListener('click', function () {
            span.remove();
            
            
            })
          span.innerHTML = ['<img class="img-cover" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          span.append(del);
          document.getElementById('outputMulti').insertBefore(span, null);
         
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
  
  var filesMulti = document.getElementById('fileMulti');

  if (filesMulti) {
    filesMulti.addEventListener('change', handleFileSelectMulti, false);
  }

  

