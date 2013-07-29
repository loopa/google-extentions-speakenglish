$(function(){
    var content_wrap = $("#contents .content_wrap");
    var list = $("#list li");
    list.eq(0).addClass('select');

    content_wrap.slice(1,content_wrap.length).addClass("disnon");



    // selected content
    list.click(function(){
        var num = $("#list li").index(this);
        content_wrap.addClass("disnon");
        content_wrap.eq(num).removeClass('disnon');
        list.removeClass('select');
        $(this).addClass('select');
    });

});
