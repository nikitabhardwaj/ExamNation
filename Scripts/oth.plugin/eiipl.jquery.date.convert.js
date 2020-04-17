$(document).ready(function () {
    window.$date = {
        convert: {
            fromCsDate: function (date) {
                if (date == '' || date == null || date == "null" || (!date)) {
                    return null;
                } else {
                    var ToDate = new Date(parseInt((date).substr(6)));
                    return ToDate;
                }
            }
        }
    };
});