"use strict";

$(document).ready(function () {
    $("#expMonth").chosen({ disable_search_threshold: 20 });
    $("#expYear").chosen({ disable_search_threshold: 20 });
    $('body').on('click', function (e) {
        $("input.error, select.error").removeClass('error');
        if ($(e.target).hasClass("cvv-info") || $(e.target).hasClass("cvv-popup")) {
            $(".cvv-popup").addClass('active');
        } else {
            $(".cvv-popup").removeClass('active');
        }
    });
    $.validator.setDefaults({
        ignore: []
    });
    $("#payForm").validate({
        onfocusout: false,
        showErrors: function showErrors(errorMap, errorList) {
            $("input.error, select.error").removeClass('error');
            if (errorList.length) {
                $('label[for="' + errorList[0].element.id + '"]').html(errorList[0].message);
                errorList[0].element.focus();
                $(errorList[0]['element']).addClass("error");
            }
        },
        rules: {
            firstName: { required: true, minlength: 2 },
            lastName: { required: true, minlength: 2 },
            cardNumber: { required: true, minlength: 19 },
            expMonth: { required: true },
            expYear: { required: true },
            cvvCode: { required: true, minlength: 3, digits: true },
            zipCode: { required: true }
        },
        messages: {
            firstName: { required: "Field Required", minlength: "First Name minimal 2 letters" },
            lastName: { required: "Field Required", minlength: "Last Name minimal 2 letters" },
            cardNumber: { required: "Field Required", minlength: "Card Number length 16 digits" },
            expMonth: { required: "Field Required" },
            expYear: { required: "Field Required" },
            cvvCode: { required: "Field Required", minlength: "CVV code minimal 3 digits", digits: "Digits only" },
            zipCode: { required: "Field Required" }
        },
        errorPlacement: function errorPlacement(error, element) {
            // Override error placement to not show error messages beside elements //
        }
    });

    $("#payForm > div > input").keydown(function (e) {
        if (e.keyCode === 13 || e.keyCode === 9) {
            $("#payForm").validate().element('#' + e.target.id);
        }
    });
    $("#expMonth_chosen, #expYear_chosen").on('focusout', function () {
        $("#payForm").validate().element('#' + this.id.replace('_chosen', ''));
    });
    $("#cardNumber").keydown(function () {
        var v = this.value;
        v = v.replace(/\D/g, "");
        v = v.replace(/^(\d{4})(\d)/g, "$1 $2");
        v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3");
        v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3 $4");
        this.value = v;
    });
    $("body").keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });
});