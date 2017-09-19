function frmOrderExecutionKAinit(eventobject) {
    return p2kwiet1234563580351_frmOrderExecutionKA_init_seq0(eventobject);
}

function p2kwiet1234563580351_frmOrderExecutionKA_init_seq0(eventobject) {
    var orderDetailsKA = function() {
        var controller = navController().getViewController("frmOrderExecutionKA");
        controller.performAction("showEmpDetailsForm");
    };
    var orderAttachmentsKA = function() {
        alert("Work in progress");
    }
    var orderResourcesKA = function() {
        alert("Work in progress");
    }
    var orderHistoryKA = function() {
        alert("Work in progress");
    }
    var orderNotificationKA = function() {
        alert("Work in progress");
    }
    var widgets = [{
        "skin": "sknBtnDtlsKA",
        "focusSkin": "sknBtnDtlsFocKA",
        "onclick": orderDetailsKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnAttachmentsKA",
        "focusSkin": "sknBtnAttachmentsFocKA",
        "onclick": orderAttachmentsKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnHistoryKA",
        "focusSkin": "sknBtnHistoryFocKA",
        "onclick": orderHistoryKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnResourcesKA",
        "focusSkin": "sknBtnResourcesFocKA",
        "onclick": orderResourcesKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnPhotosKA",
        "focusSkin": "sknBtnPhotosFocKA",
        "onclick": orderNotificationKA,
        "widgetType": "button"
    }];
    var utilitiesObj = new utilities(frmOrderExecutionKA);
    utilitiesObj.configureSubMenu("flxScrollTypesKA", widgets, true);
}