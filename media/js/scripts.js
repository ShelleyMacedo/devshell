$(document).ready(function() {

  // AOS
  AOS.init({
    disable: 'mobile',
    offset: 0,
    duration: 500,
    easing: 'linear',
    delay: 0
  });

  // PRELOADER
  setTimeout(function(){
    $('.spinner').addClass('loaded');
  }, 1393);

  // SLIDER
  $('.carousel').carousel();

  // MENU HAMBURGUER
  function hamburger_cross() {
    if (isClosed == false) {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = true
    } else {
      overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = false;
    }
  }

  var trigger = $('.hamburger'),
  overlay = $('.overlay'),
  isClosed = false;

  trigger.click(function () {
    hamburger_cross();
  });

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });

  $('.navbar-toggle').click(function(){
    if($('.navbar-toggle i').hasClass('fa-bars')) {
      $('.navbar-toggle i').removeClass('fa-bars').addClass('fa-close');
    } else {
      $('.navbar-toggle i').removeClass('fa-close').addClass('fa-bars');
    }
    $('.navbar-collapse').toggleClass('menu-mobile');
    $('.navbar-toggle').toggleClass('indexcity');
  });


  // OWL
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items:3,
    loop:false,
    margin:40,
    autoplay:true,
    nav:true,
    dots:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        680:{
            items:2
        },
        800:{
            items:2
        },
        991:{
            items:2
        },
        1024:{
            items:3
        },
        1920:{
            items:3
        }
    }
  });

  /* Dismiss */
  $('.alert').alert();

  // tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // MENU PRINCIPAL
  $('.nav-principal li a, .ancora').off();
  $('.nav-principal li a, .ancora').click(function() {
    $('html, body, main').animate({
      scrollTop: $( $.attr(this, 'href') ).delay(1000).offset().top
    }, 800);
    return false;
  });

  // FORMULÁRIO
  $('#frmContato').validator();
  $(".alert").fadeOut();
  $("#frmContato").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);

    //$("#btnEnviarContato").attr('disabled', true);

    $.ajax({
        url: './enviar_contato.php',
        type: 'POST',
        data: formData,
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        success: function(result){
        if(result.msg == 1){
  			  $("input, textarea").val('');
            $("#msgSucessoContato").fadeIn(100).focus().fadeOut(10000).show();
          }else{
            $("#msgErroContato").fadeIn(100).focus().fadeOut(10000).show();
          }
          //$("#btnEnviarContato").attr('disabled',false);
        }
    });
  });

  /* PARALLAX */
  $window = $(window);
  $('.parallax').each(function(){
    var $scroll = $(this);
    $(window).scroll(function() {
        var yPos = -($window.scrollTop() / $scroll.data('speed'))*2;
        var coords = '50%' + yPos + 'px';
        $scroll.css({ backgroundPosition: coords });
    });
  });


  /* CONTADOR */
  var conta = 0;
  $('.num u').show(function () {
    if(conta == 0) {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 4000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
      conta = 1;
    }
  });


  //To Top
  $(".to-top").fadeOut();
  $(window).scroll(function() {
    if($(this).scrollTop() < 250){
      $(".to-top").fadeOut();
    } else {
      $(".to-top").fadeIn();
    }
  });
  $(".to-top").click(function() {
    $("html, body, main").animate({scrollTop: 0}, 800);
  });

  //Initialize tooltips
  $('.nav-tabs > li a[title]').tooltip();

  $(".next-step").click(function (e) {
    var $active = $('.wizard .nav-tabs li.active');
    $active.removeClass('active');
    $active.next().removeClass('disabled').addClass('active');
    nextTab($active);
  });

  $(".prev-step").click(function (e) {
    var $active = $('.wizard .nav-tabs li.active');
    $active.removeClass('active');
    $active.prev().addClass('active');
    prevTab($active);
  });


  $('.btn-upload').on('click', function() {
    $('.arquivo').trigger('click');
  });

  $('.arquivo').on('change', function() {
    var fileName = $(this)[0].files[0].name;
    $('#file').val(fileName);
  });


  /* Máscara */
  $('.telefone').mask('(99) 9999-9999');
  $('.telefone').focusout(function(){
      var phone, element;
      element = $(this);
      element.unmask();
      phone = element.val().replace(/\D/g, '');
      if(phone.length > 10) {
          element.mask('(99) 99999-999?9');
      } else {
          element.mask('(99) 9999-9999?9');
      }
  }).trigger('focusout'); 


  /* FIGURA PARALLAX */
  $( '#sobre' ).on( "mousemove", ".figura-destaque", function( event ) {
 
    /* largura do elemento */
    var halfW = ( this.clientWidth * 2 );
 
    /* metade da  altura do elemento */
    var halfH = ( this.clientHeight / 1 );
 
    /* posição X (horizontal) do mouse */
    var coorX = ( halfW - ( event.pageX - this.offsetLeft ) );
 
    /* posição Y (vertical) do mouse */
    var coorY = ( halfH - ( event.pageY - this.offsetTop ) );
 
    /*rotação X do elemento (posição Y do mouse por altura * valor inteiro */
    //var degX  = ( ( coorY / halfH ) * 10 ) + 'deg'; // max. degree = 10
    var degX  = ( ( coorY / halfH ) * 3.33 ) + 'deg'; 
 
    /*rotação Y do elemento (posição X do mouse por altura * valor inteiro */
    //var degY  = ( ( coorX / halfW ) * -10 ) + 'deg'; // max. degree = 10
    var degY  = ( ( coorX / halfW ) * 6.66 ) + 'deg'; // max. degree = 10
 
    $(this).css( 'transform', function() {
        return 'perspective( 600px ) translate3d( 0, -2px, 0 ) scale(1.1) rotateX('+ degX +') rotateY('+ degY +')';
      })
      .children( '.foto-descricao' )
        .css( 'transform', function() {
          return 'perspective( 400px ) translate3d( 0, 0, 0 ) rotateX('+ degX +') rotateY('+ degY +')';
      });
  })
  .on( "mouseout", ".figura-destaque", function() {
 
      $( this ).removeAttr( 'style' )
        .children( '.foto-descricao' )
          .removeAttr( 'style' );
  } );

  
  /* Galeria */

    /* Confecção */
      var $container = $('.projetosContainer');
      $container.isotope({
          filter: '*',
          animationOptions: {
              duration: 750,
              easing: 'linear',
              queue: false
          }
      });

      $('.projetosFilter a').click(function(){
          $('.projetosFilter .current').removeClass('current');
          $(this).parent('li').addClass('current');

          var selector = $(this).attr('data-filter');
          $container.isotope({
              filter: selector,
              animationOptions: {
                  duration: 750,
                  easing: 'linear',
                  queue: false
              }
           });
           return false;

      });

    $(window).scroll(function() {
      if ($(this).scrollTop() > 490) {
        $('.barra-fundo').each(function() {
          var _largura = $(this).find('.barra').attr('data-value');
          $(this).find('.barra').css('width', _largura + '%');
        });
      }
    });

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
       event.preventDefault();
       $(this).ekkoLightbox({
          alwaysShowClose: true
       });
    });

    $(' #da-thumbs > div ').each( function() { 
      $(this).hoverdir(); 
    });

    setTimeout(function() {
      $('a[data-filter="*"]').click();
    }, 1000);

});

  /* FUNÇÕES */
/* Texto Animado */  
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.33rem solid #ff9900}";
    document.body.appendChild(css);
};

