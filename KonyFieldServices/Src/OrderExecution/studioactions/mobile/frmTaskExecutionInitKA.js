function frmTaskExecutionInitKA(eventobject) {
    return p2kwiet1234563580554_frmTaskExecutionKA_init_seq0(eventobject);
}

function p2kwiet1234563580554_frmTaskExecutionKA_init_seq0(eventobject) {
    var taskDetailsKA = function() {
        var controller = navController().getViewController("frmTaskExecutionKA");
        controller.performAction("showTaskDetails");
    };
    var taskResourcesKA = function() {
        alert("Work in progress");
    };
    var attachmentKA = function() {
        alert("Work in progress");
    };
    var widgets = [{
        "skin": "sknBtnDtlsKA",
        "focusSkin": "sknBtnDtlsFocKA",
        "onclick": taskDetailsKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnAttachmentsKA",
        "focusSkin": "sknBtnAttachmentsFocKA",
        "onclick": attachmentKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnResourcesKA",
        "focusSkin": "sknBtnResourcesFocKA",
        "onclick": taskResourcesKA,
        "widgetType": "button"
    }];
    var utilitiesObj = new utilities(frmTaskExecutionKA);
    utilitiesObj.configureSubMenu("flxScrollTypesKA", widgets, true);
}