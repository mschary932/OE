function frmCompleteOrderBtnCancel2OnClickKA(eventobject) {
    return AS_Button_f24151d8073d4d42abf8fda4b5b3585e(eventobject);
}

function AS_Button_f24151d8073d4d42abf8fda4b5b3585e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}