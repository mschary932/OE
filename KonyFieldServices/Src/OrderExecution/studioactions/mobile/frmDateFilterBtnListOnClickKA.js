function frmDateFilterBtnListOnClickKA(eventobject) {
    return p2kwiet1234563580139_btnListKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580139_btnListKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectFilters");
}