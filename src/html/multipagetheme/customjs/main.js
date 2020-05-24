$(document).ready(function () {
    /*Show video on click icon. and Video autoplay*/
    // Gets the video src from the data-src on each button
    var $videoSrc;
    $('.video-anchor').click(function () {
        $videoSrc = $(this).data("src");
    });
    // when the modal is opened autoplay it
    $('#videoModal').on('shown.bs.modal', function (e) {

    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    // stop playing the youtube video when I close the modal
    $('#videoModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#video").attr('src', $videoSrc);
    })
    /*End Show video on click icon. and Video autoplay*/

    /*Gallery Show on popup*/
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();

    })

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll:1
    })

// document ready
});


