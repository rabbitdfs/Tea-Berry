$(document).ready(() => {
    $('.category').click((e) => {
        let currentElement = $(e.target);
        $('.products-container').hide()
        let id = currentElement.data('id');
        $('#' + id).show();

        $('.category').removeClass('active');
        currentElement.addClass('active')

        $('#' + id + ' .products').slick('refresh');
        $('#' + id + ' .products-nav').slick('refresh');
    });

    $('.products').slick({
        centerMode: true,
        variableWidth: true,
        slidesToShow: 3,
        cssEase: 'linear',
        autoplaySpeed: 0,
        responsive: [
            {
                breakpoint: 720,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 3,
                    dots: true
                }
            },
        ]
    });
    $('.stock-btn-img').click(() => {
        $('#reservation').css('display', 'flex')
    });

    $('#reservation-cancel, #reservation').click((e) => {
        if (e.target.id === 'reservation' || e.target.id === 'reservation-cancel-close')
            $('#reservation').hide()
    });
    let sl_open = 0;
    $('#buy-button').click(() => { //ГЛАВНОЕ, ЧТО НАДО СКОПИРОВАТЬ
        $('.fill-line').hide()
        let order = $('.select__header')
        let weight = $('#weight')
        let name = $('#name')
        let number = $('#number')

        let hasError = false

        if (sl_open===0) {
            $('.select .fill-line').show();
            order.css('border-color', 'red')
            hasError = true
        } else {
            order.css('border-color', '#8fbc62')
            $('.select .fill-line').hide();
        }
        if (!weight.val()) {
            weight.siblings('.fill-line').show();
            weight.css('border-color', 'red')
            hasError = true
        } else {
            weight.css('border-color', '#8fbc62')
        }
        if (!name.val()) {
            name.siblings('.fill-line').show();
            name.css('border-color', 'red')
            hasError = true
        } else {
            name.css('border-color', '#8fbc62')
        }
        if (!number.val()) {
            number.siblings('.fill-line').show();
            number.css('border-color', 'red')
            hasError = true
        } else {
            number.css('border-color', '#8fbc62')
        }
        if (!hasError) {
            $.ajax({
                type: 'post',
                url: 'admin@teaberry.com',
                data: 'order=' + order.val() + '&weight=' + weight.val() + '&name=' + name.val() + '&number=' + number.val(),
                success: () => {
                    $('#thanks-reservation').show();
                    $('#reservation').hide();
                },
                error: () => {
                    $('#reservation').hide();
                    alert('Ошибка бронирования. Свяжитесь , пожалуйста, по номеру телефона.')
                },
            });
        }
    });

    $('.btn-discount').click(() => {
        let discount = $('#discount')
        if (!discount.val()) {
            discount.siblings('.shares-fill-line').show();
            $('.shares-input').css('border-color', 'red')
        } else {
            discount.css('border-color', '#8fbc62')
            $('.shares-input').hide()
            $('.shares-button').hide()
            $('#thanks-text').show()
        }
    })
    $('.tea-menu img').click(() => {
        $('#zapas').css('display', 'flex')
        $('.header-menu').css('display', 'block')
        $('#menu-logo').toggleClass('menu-open')
        $('#header-logo').css('display', 'none')
        $('#menu-logo .tea-menu').css('display', 'none')
        $('.header-menu').css('color', 'white', 'font-size', '18px')
        $('#menu-cancel').css('display', 'block')
        $('#menu-cancel').css('position', 'absolute')
        $('#menu-cancel').css('right', '40px')
        $('#menu-cancel').css('top', '40px')

    })
    $('.header-menu, #menu-cancel').click(() => {
        var mediaQuery = window.matchMedia('(max-width: 918px)');
        if (mediaQuery.matches) {
            $('#menu-logo').removeClass('menu-open')
            $('.header-menu').css('display', 'none')
            $('#menu-cancel').css('display', 'none')
        }

    })
    $('#zapas #zapas-tea-menu img').click(() => {
        $('#zapas').css('display', 'flex')
        $('.header-menu').css('display', 'block')
        $('#menu-logo').toggleClass('menu-open')
        $('#header-logo').css('display', 'none')
        $('#menu-logo .tea-menu').css('display', 'none')
        $('.header-menu').css('color', 'white', 'font-size', '18px')
        $('#menu-cancel').css('display', 'block')
        $('#menu-cancel').css('position', 'absolute')
        $('#menu-cancel').css('right', '40px')
        $('#menu-cancel').css('top', '40px')

    })
    $('#thanks-reservation-cancel, #thanks-reservation').click((e) => {
        if (e.target.id === 'thanks-reservation' || e.target.id === 'thanks-reservation-cancel-close')
            $('#thanks-reservation').hide()
    });
    let select = function () {
        $('.select__body').hide()
        let fl = 0;
        let selectHeader = document.querySelectorAll('.select__header');
        let selectItem = document.querySelectorAll('.select__item');

        selectHeader.forEach(item => {
            item.addEventListener('click', selectToggle)

        });

        selectItem.forEach(item => {
            item.addEventListener('click', selectChoose)
        });

        function selectToggle() {
            this.parentElement.classList.toggle('is-active');
            if (fl===0){
                $('.select__body').show()
                fl=1

                $('.select__header').css('border-radius', '25px 25px 0 0')

                $('.select .fill-line').hide();
            }
            else{
                $('.select__body').hide()
                fl=0
                $('.select__header').css('border-radius', '33px 33px 33px 33px')
            }

        }

        function selectChoose() {

            let text = this.innerText,
                select = this.closest('.select'),
                currentText = select.querySelector('.select__current');
            currentText.innerText = text;
            select.classList.remove('is-active');
            $('.select__body').hide()
            $('.select__header').css('border-radius', '33px 33px 33px 33px')
            fl=0
            sl_open+=1
            $('.select__current').css('display', 'block', 'color', 'rgb(143, 188, 98)')
            $('.select__default').css('display', 'none')

        }
    };


    select();
});


