$(document).ready(function(){
    console.log("jQuery loaded");
    
    $(document).on('click', '.architecture-img, .architecture-img2', function(){
        console.log("Image clicked");
        let img = new Image();
        img.src = $(this).attr("src");
        $('.modalBox').html(img);
        $(".modal").show();
    });
    
    $(document).on('click', '.modal', function(){
        $(this).hide();
    });
});