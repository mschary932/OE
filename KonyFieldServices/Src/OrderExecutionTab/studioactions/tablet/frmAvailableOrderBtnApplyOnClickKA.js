function frmAvailableOrderBtnApplyOnClickKA(eventobject) {
    return AS_Button_11b74ba66daf4343a33ee8916cc0eba1(eventobject);
}

function AS_Button_11b74ba66daf4343a33ee8916cc0eba1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}