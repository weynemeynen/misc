var $useStaticData = false;
var $_customStaticData;
var $yesNoPopupResult;
var $yesNoPopupDefaultInnerView;
var $executeOnYes;
var $roundTripCount = 0;
var $tmpClass;

function OnPopupClosing() {
    if ($yesNoPopupResult) {
        $executeOnYes();
    }
}

function getPopupData(popupHeader, popupUrl, popupClass, popupHideClose) {
    if (!$useStaticData) {
        if (popupClass) {
            $tmpClass = popupClass;
        }
        $.get(popupUrl, function (data) {
            var popup = $('#popup');
            $roundTripCount++;
            if (popupHideClose != true) {
                if (!$('.close', popup)[0])
                    $('.modal-header', popup).prepend('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            }
            if (popupHeader)
                $('#modal-title').html(popupHeader);
            $('#popup-content').html(data);
            var forms = $('#popup form');

            if (forms != undefined) {
                var currentForm = forms[0];
                $(document).off('submit', currentForm);
                $(document).on('submit', currentForm, function (event) {
                    event.preventDefault();
                    $.ajax({
                        async: true,
                        url: event.target.action,
                        type: 'post',
                        dataType: 'html',
                        data: $(event.target).serialize()
                    })
                    .done(popupFormSuccess)
                    .fail(popupFormError)
                    .error(popupFormError);
                });
            }
            $(document).on("click", ".partial", function (event) {
                $.ajax({
                    async: true,
                    url: $(event.target).attr('data-popup-url'),
                    type: 'get',
                    dataType: 'html'
                })
                    .done(popupFormSuccess)
                    .fail(popupFormError)
                    .error(popupFormError);
            });
        });
    } else if (popupUrl == null) {
        if (popupClass) {
            $tmpClass = popupClass;
        }
        var popup = $('#popup');
        popup.removeClass("preloader");
        $roundTripCount++;
        if (popupHideClose != true) {
            if (!$('.close', popup)[0])
                $('.modal-header', popup).prepend('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        }
        if (popupHeader)
            $('#modal-title').html(popupHeader);
        $('#popup-content').html($_customStaticData);
    }
    ;
    return false;
}

function showPopup(popupHeader, popupUrl, popupClass, popupHideClose) {
    getPopupData(popupHeader, popupUrl, popupClass, popupHideClose);
    if (popupClass) {
        $('#popup').addClass(popupClass);
    }

    if (popupHideClose != true) {
        $(document).on('hide.bs.modal', function (event) {
            $('#popup-content').addClass("preloader");
            OnPopupClosing();
            $(document).off('submit', '#popup form');
            $('#modal-title').empty();
            $('#popup-content').empty();
            $roundTripCount = 0;
        });
    }
}

function showStaticPopup(questionTitle, questionMessage) {
    $useStaticData = true;
    $_customStaticData = questionMessage;
    //$executeOnYes = onYesResult;
    showPopup(questionTitle, null, null, false);
    // $('#yesNoPopupWrapper').show();
}

function showYesNoPopup(questionTitle, questionMessage, onYesResult) {
    $useStaticData = true;
    $_customStaticData = questionMessage;
    $executeOnYes = onYesResult;
    showPopup(questionTitle, null, null, false);
    $('#yesNoPopupWrapper').show();
}

function popupFormError(data) {
    //post error to logger
    showStaticPopup("Ошибка соединения", "Данные не были отправлены, попробуйте позже");
}

function popupFormSuccess(data) {
    $(document).off('submit', '#popup form');
    $('#popup-content .popup-content').empty();
    $('#popup-content').html(data);
    $yesNoPopupResult = true;
    $executeOnYes = function () {
        location.reload();
    };
}

$(function () {
    $("#popup").on('shown.bs.modal', function (event) {
        $('#popup-header').empty();
        $useStaticData = false;
        var popupUrl = $(event.relatedTarget).attr('data-popup-url');
        var popupClass = $(event.relatedTarget).attr('data-popup-class');
        var popupHeader = $(event.relatedTarget).attr('data-popup-header');
        var popupHideClose = false;
        if (popupUrl)
            showPopup(popupHeader, popupUrl, popupClass, popupHideClose);
    });
});