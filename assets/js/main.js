function Header(){
  $(".mobile-search-btn").click(function(){
    $(".mobile-search").toggle();
    $(this).find('i').toggleClass("fa-xmark fa-magnifying-glass");
  })
  $(".navbar-toggler").click(function(){
    $(".final-nav .offcanvas").addClass("show");
    $(".offcanvas-backdrop").addClass("show");
  });
  $(".offcanvas-backdrop").click(function(){
    $(".final-nav .offcanvas").removeClass("show");
    $(this).removeClass("show");
  });
}
$(document).scroll(function(){
  var scroll_top = $(this).scrollTop();
  if(scroll_top > 20){
    $("#sticky-top").addClass("fix-middleNav");
  }else{
    $("#sticky-top").removeClass("fix-middleNav");
  }
})
function AllSliders(){
  $(".banner-slider").slick({
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  $(".quick-view-slider").slick({
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  $(".small-slider-nav").slick({
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.lg-slider-product',
    // centerMode: true,
    focusOnSelect: true
  });
  $(".lg-slider-product").slick({
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.small-slider-nav'
  });
  // Refresh Slick Slider when modal is shown
  $('#productQuickView').on('shown.bs.modal', function () {
    $('.quick-view-slider').slick('refresh');
  });
  $(".trending-slider-wrapper").slick({
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    margin: "10px",
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $(".product_slider").slick({
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });


}
function tabFilter(){
  $("#tabFilter li").find("button").click(function() {
    var tabValue = $(this).attr("data-bs-target");

    // Remove active class from all buttons
    $("#tabFilter li button").removeClass("active");
    // Add active class to the clicked button
    $(this).addClass("active");

    // Remove active class from all tab content elements
    $("#tabFilterContent .tab-pane").removeClass("active");
    // Add active class to the tab content element corresponding to the clicked button
    $("#tabFilterContent #" + tabValue).addClass("active");
    $("#" + tabValue + " .product_slider").slick("unslick").slick("refresh");
  });
  $(".filter-toggle-btn").click(function(){
    $(".shop-sidebar-parent").slideToggle();
  })
}

$(document).ready(function(){
  Header();
  AllSliders();
  tabFilter();
  $("#size-select ul li a").on('click',function(){
    $('#size-select ul li a').removeClass('active');
    if($(this).parent('li').hasClass('no-stock')){
      //must have
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        icon: 'error',
        title: 'Out Of Stock'
      });
      // toastr.success('Out Of Stock')
    }else{
      $(this).addClass('active');
    }
    
 })
  
  
});

$(document).ready(function(){
  const rangeInput = $(".range-input input"),
  priceInput = $(".price-input input"),
  pricemax = $(".price-max-value"),
  pricemin = $(".price-min-value"),
  range = $(".slider .progress");
let priceGap = 1000;

priceInput.each(function () {
  $(this).on("input", function (e) {
    let minPrice = parseInt(priceInput.eq(0).val()),
      maxPrice = parseInt(priceInput.eq(1).val());

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput.eq(1).attr("max")) {
      if ($(e.target).hasClass("input-min")) {
        rangeInput.eq(0).val(minPrice);
        range.css("left", (minPrice / rangeInput.eq(0).attr("max")) * 100 + "%");
      } else {
        rangeInput.eq(1).val(maxPrice);
        range.css("right", 100 - (maxPrice / rangeInput.eq(1).attr("max")) * 100 + "%");
      }
    }
  });
});

rangeInput.each(function () {
  $(this).on("input", function (e) {
    let minVal = parseInt(rangeInput.eq(0).val()),
      maxVal = parseInt(rangeInput.eq(1).val());

    if (maxVal - minVal < priceGap) {
      if ($(e.target).hasClass("range-min")) {
        rangeInput.eq(0).val(maxVal - priceGap);
      } else {
        rangeInput.eq(1).val(minVal + priceGap);
      }
    } else {
      priceInput.eq(0).val(minVal);
      priceInput.eq(1).val(maxVal);
      pricemax.text(maxVal);
      pricemin.text(minVal);
      range.css("left", (minVal / rangeInput.eq(0).attr("max")) * 100 + "%");
      range.css("right", 100 - (maxVal / rangeInput.eq(1).attr("max")) * 100 + "%");
    }
  });
});
})

$(document).ready(function(){
  $(function(){
    $('.easyzoom').easyZoom();
  });
  var input = $('.td-qty .stepper input');
  $(".increase").click(function() {
    var currentValue = parseInt(input.val());
    input.val(currentValue + 1);
  });
  $(".decrease").click(function() {
    var currentValue = parseInt(input.val());
    if (currentValue > 1) {
      input.val(currentValue - 1);
    }
  });
});