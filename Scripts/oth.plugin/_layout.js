$(document).ready(function () {
    var OverLay = function () {
        var OverLayContainer = $("#overlay_Common");
        window.OverLay = {
            Show: function () {
                OverLayContainer.css('display', 'block');
            },
            Hide: function () {
                OverLayContainer.css('display', 'none')
            }
        };
        this.Show = function () {
            if (window.CountCurrentAjax === 0) {
                OverLayContainer.css('display', 'block');
            }
        };
        this.Hide = function () {
            if (window.CountCurrentAjax === 1) {
                OverLayContainer.css('display', 'none')
            }
        };
    };
    var _overlay = new OverLay();
   
    window.CountCurrentAjax = 0;
    $(document).ajaxStart(function (e) {
       //
    });
    $(document).ajaxSend(function (evt, request, settings) {
        _overlay.Show();
        window.CountCurrentAjax += 1;
    });
    $(document).ajaxComplete(function (e) {
        _overlay.Hide();
        if (window.CountCurrentAjax !== 0) {
            window.CountCurrentAjax -= 1;
        }
    });

    window.HideLoginButton = function () {
        $(".login-link").hide();
    };
    
});


