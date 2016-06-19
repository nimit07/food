"use strict";
const API_BASE = "HTTP://localhost:3030";
function apiAjax(options) {
    var processData = true;
    var contentType = 'application/json; charset=UTF-8';

    if (!options.method) {
        options.method = 'GET';
    }

    var endpoint = options.endpoint;
    if (!endpoint) {
        return false;
    }

    var data = options.data || {};
    var success = options.success || function (a) {
            console.log(a);
        };
    var error = options.error || function (a) {
            console.log(a);
        };
    var url = API_BASE + endpoint;
    var async = options.async;
    if (!async) {
        async = true;
    }

    if (options.processData !== undefined) {
        processData = options.processData;
    }

    if (options.contentType !== undefined) {
        contentType = options.contentType;
    }


    $.ajax({
        url: url,
        type: options.method,
        async: async,
        data: data,
        processData: processData,
        contentType: contentType,
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                success(response.data);
            } else if (error) {
                error(response.error);
            }
        },
        error: function (xhr) {
            if (xhr.responseText) {
                var response = JSON.parse(xhr.responseText);
                if (error) {
                    error(response.error);
                }
            }
        }
    });
}

if (typeof module != 'undefined') {
    module.exports = apiAjax;
}