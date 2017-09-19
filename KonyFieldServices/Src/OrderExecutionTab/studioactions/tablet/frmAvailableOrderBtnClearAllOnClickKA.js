function frmAvailableOrderBtnClearAllOnClickKA(eventobject) {
    return AS_Button_e158e96004f144ff90b70111d64da949(eventobject);
}

function AS_Button_e158e96004f144ff90b70111d64da949(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}