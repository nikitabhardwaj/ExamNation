$(document).ready(function () {
    $(document).on('focus', '.datepicker', function () {
        $(this).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy",
            yearRange: "-200:+00"
        });
    });
    
    $("body").tooltip({
        selector: "[data-toggle='tooltip']",
        container: "body"
    })
    .popover({
            selector: "[data-toggle='popover']",
            container: "body",
            html: true
        });
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
   
    $('body').on('click', function (e) {
        //did not click a popover toggle or popover
        if ($(e.target).data('toggle') !== 'popover'
            && $(e.target).parents('.popover.in').length === 0) {
            $('[data-toggle="popover"]').popover('hide');
        }
    });
    $(".btn-logout").on('click', function (e) {
        e.preventDefault();
        alertify.confirm('Confirm us!', 'Are you sure to logout?', function () {
            $.ajax({
                data: null,
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                url: "/home/Logout",
                success: function (e) {
                    if (e.Status === 200) {
                        location.href = document.location.origin;
                    } else {
                        alertify.error(e.Message);
                    }
                }
            });
        }, function () { });

    });
    String.prototype.asTitle = function () {
        if ($(".window-title").length > 0) {
            $(".window-title").text(this);
        }
    };
    $('body').on('keypress', 'input[type="text"].money', function (evt) {
        var element = this;
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
            return false;
        else {
            var len = $(element).val().length;
            var index = $(element).val().indexOf('.');
            if (index > 0 && charCode == 46) {
                return false;
            }
            if (index > 0) {
                var CharAfterdot = (len + 1) - index;
                if (CharAfterdot > 5) {
                    return false;
                }
            }

        }
        return true;
    });
    $('body').on('keypress', 'input[type="text"].int', function (evt) {
        var element = this;
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode >= 48 && charCode<=57)
            return true;
        else {
            return false;

        }
    });
    $.fn.extend({
        donetyping: function (callback, timeout) {
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function (el) {
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function (i, el) {
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress paste', function (e) {
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type == 'keyup' && e.keyCode != 8) return;

                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function () {
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur', function () {
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        },
        enabled: function (isEnabled) {
            var supprotedTags = ['input', 'button', 'select', 'textarea'];
            if (typeof isEnabled === "undefined" || isEnabled === null || isEnabled === "") {
                isEnabled = true;
            }
            $(this).each(function (i,v) {
                var item = supprotedTags.find(function (t) {
                    var tagName = $(v).prop('tagName');
                    return t === tagName.toLowerCase();
                });
                if (item) {
                    $(v).prop('disabled', !isEnabled);
                }
            });
        }
    });
});

