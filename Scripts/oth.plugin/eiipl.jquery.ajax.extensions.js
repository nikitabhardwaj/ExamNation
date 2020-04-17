$(document).ready(function(){
    $.postJson = function (url, data, _success, _error) {
        $.ajax({
            type: 'post',
            contentType: 'application/json;charset=utf-8;',
            data: JSON.stringify(data),
            dataType: 'json',
            async: true,
            url: url,
            success: function (responce) {
                if (_success && typeof (_success) === "function") {
                    _success(responce);
                }
            },
            error: function (responce) {
                if (_error && typeof (_error) === "function") {
                    var ret = {
                        Status: responce.status,
                        Message: responce.statusText,
                        Data: responce.responseText
                    };

                    _error(ret);
                }
            }
        });
    };
    $.getJson = function (url, _success, _error) {
        $.ajax({
            type: 'get',
            contentType: 'application/json;charset=utf-8;',
            dataType: 'json',
            async: true,
            url: url,
            success: function (responce) {
                if (_success && typeof (_success) === "function") {
                    _success(responce);
                }
            },
            error: function (responce) {
                if (_error && typeof (_error) === "function") {
                    var ret = {
                        Status: responce.status,
                        Message: responce.statusText,
                        Data: responce.responseText
                    };
                    _error(ret);
                }
            }
        });
    };
    $.postHtml = function (url, data, _success, _error) {
        $.ajax({
            type: 'post',
            contentType: 'text/html',
            data: JSON.stringify(data),
            dataType: 'json',
            async: true,
            url: url,
            success: function (responce) {
                if (_success && typeof (_success) === "function") {
                    _success(responce);
                }
            },
            error: function (responce) {
                if (_error && typeof (_error) === "function") {
                    var ret = {
                        Status: responce.status,
                        Message: responce.statusText,
                        Data: responce.responseText
                    };
                    _error(ret);
                }
            }
        });
    };
    $.getHtml = function (url,  _success, _error) {
        $.ajax({
            type: 'get',
            contentType: 'text/html',
            dataType: 'json',
            async: true,
            url: url,
            success: function (responce) {
                if (_success && typeof (_success) === "function") {
                    _success(responce);
                }
            },
            error: function (responce) {
                if (_error && typeof (_error) === "function") {
                    var ret = {
                        Status: responce.status,
                        Message: responce.statusText,
                        Data: responce.responseText
                    };
                    _error(ret);
                }
            }
        });
    };
});