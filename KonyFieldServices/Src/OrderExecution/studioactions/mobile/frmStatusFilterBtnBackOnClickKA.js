function frmStatusFilterBtnBackOnClickKA(eventobject) {
    return p2kwiet1234563580502_btnBackKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580502_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm");
}