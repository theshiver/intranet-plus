function splitScreen() {
    $("div:first table:first tr td:first").width("50%").next().width("50%");
    $("#framecontent").css({
        "visibility": "visible",
        "width": "48.3%",
        "background": "transparent"
    });
    $("div:first table:first tr td:first").next().append('<div id="framecontent"></div>');
    $("#framecontent").append('<iframe allowTransparency="true" id="taskViewer" name="taskViewer" src="" width="100%" height="663" border="0" style="border:none;"></iframe>')
    $("body").append('<script type="text/javascript">clearTimeout(refresh);</script>')
    $("body").append('<script type="text/javascript">jQuery.fn.extend({ scrollTo: function (speed, easing) { return this.each(function () { var targetOffset = $(this).offset().top; $("html,body").animate({ scrollTop: targetOffset }, speed, easing); }); } });')
    $("body").append('<script type="text/javascript">function popup(arg){$("#framecontent #taskViewer").attr("src", arg);$(".copyLink").text("https://intranet.magiclick.com/" + arg);$(".copyLink").scrollTo()}</script>')
    $("#framecontent").before('<a href="javascript:;" style="padding:10px 5px; display:block; color:green;" class="copyLink"></a>');
}



$(document).ready(function () {
    splitScreen();

    $(".copyLink").click(function (event) {
            window.open($(this).text(),"","width=1000,height=700,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizeable=0")
            event.stopImmediatePropagation();
        });
});
