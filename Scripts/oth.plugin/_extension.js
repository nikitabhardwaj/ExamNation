$(document).ready(function () {
    //window proto
    window.__proto__.isNull = function (value, replaceWith) {
        if (value === null || value === undefined)
            return replaceWith;
        else
            return value;
    };
    window.__proto__.isNullOrEmpty = function (value, replaceWith) {
        if (value === null || value === undefined)
            return replaceWith;
        else if (typeof value === "string" && value.trim() === "")
            return replaceWith;
        else
            return value;
    };
    window.__proto__.isUndefined = function (value, replaceWith) {
        if (value === undefined)
            return replaceWith;
        else
            return value;
    };
    window.__proto__.toDate = function (value, format = 'dd/mm/yyyy') {

        if (!window.isNullOrEmpty(value, null)) {
            return null;
        }
        if (format.toLowerCase() == 'dd/mm/yyyy') {
            var arr = value.split('/');
            return new Date(arr[2], arr[1] - 1, arr[0]);
        } else {
            return null;
        }
    }
    window.__proto__.toDateStr = function (date, format = 'dd/mm/yyyy') {

        if (!window.isNull(date, null) || date == "Invalid Date") {
            return "";
        }
        return date.format(format);
    }

    //string proto
    String.prototype.padLeft = function (paddingValue) {
        return String(paddingValue + this).slice(-paddingValue.length);
    };
    String.prototype.padRight = function (paddingValue) {
        return String(this + paddingValue).slice(0, paddingValue.length);
    };
    String.prototype.toDate = function (format) {
        var strVal = this;
        var _toDate = function (dd, mm, yyyy) {
            return new Date(yyyy, mm - 1, dd);
        }
        switch (format.toLocaleLowerCase()) {
            case 'dd/mm/yy':
            case 'dd/mm/yyyy':
                {
                    var splt = strVal.split('/');
                    return _toDate(Number(splt[0]), Number(splt[1]), Number(splt[2]));
                    break;
                }
            default: {
                throw "format " + format + " not supported";
            }
        }
    };
    String.prototype.toJsFromCsDate = function () {
        var date = this;
        if (date != '' || date != null || date != "null") {
            var ToDate = new Date(parseInt((date).substr(6)));
            return ToDate;
        } else {
            throw "Invalid Date";
        }
    };
    String.prototype.isNumber = function () {
        var data = this;
        return !isNaN(data);
    }
    String.prototype.toNumber = function () {
        return Number(this);
    }
    String.prototype.isNanThenZero = function () {
        return (isNaN(this) ? "0" : Number(this)).toString();
    }

    //number proto
    Number.prototype.isPositive = function () {
        if (this >= 0)
            return true;
        else
            return false;
    }

    //date proto
    Date.prototype.toStringDate = function (format) {
        var date = this;
        switch (format.toLowerCase()) {
            case 'dd/mm/yy':
            case 'dd/mm/yyyy':
                {

                    return date.getDate().toString().padLeft("00") + "/" + (date.getMonth() + 1).toString().padLeft("00") + "/" + date.getFullYear().toString().padLeft("0000");
                    break;
                }
            case 'dd-mm-yy':
            case 'dd-mm-yyyy':
                {

                    return date.getDate().toString().padLeft("00") + "-" + (date.getMonth() + 1).toString().padLeft("00") + "-" + date.getFullYear().toString().padLeft("0000");
                    break;
                }
            default: {
                throw "format " + format + " not supported";
            }
        }
    };
    Object.defineProperty(Array.prototype, 'chunkArray', {
        value: function (chunkSize) {
            var array = this;
            return [].concat.apply([],
                array.map(function (elem, i) {
                    return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
                })
            );
        }
    });
    //element proto
    jQuery.fn.extend({
        name: function (setName) {
            if (window.isNull(setName, true) == true) {
                return $(this).attr('name');
            }
            $(this).attr('name', setName);
            return $(this);
        }, getDate: function () {
            return $(this).datepicker('getDate');
        }, connectDatePicker: function () {
            return $(this).datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "dd/mm/yy",
                yearRange: "-200:+00",
                setValue: window.toDate($(this).val())
            });
        }
    });
});