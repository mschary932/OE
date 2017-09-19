function frmAvailableOrderBtnClearAll2OnClickKA(eventobject) {
    return AS_Button_23e96f3122874b57bf1f17ecd0859526(eventobject);
}

function AS_Button_23e96f3122874b57bf1f17ecd0859526(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}