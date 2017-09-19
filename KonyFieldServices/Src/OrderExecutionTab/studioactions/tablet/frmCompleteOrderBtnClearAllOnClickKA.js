function frmCompleteOrderBtnClearAllOnClickKA(eventobject) {
    return AS_Button_e96efcf8bd8d45219d807905e00b874c(eventobject);
}

function AS_Button_e96efcf8bd8d45219d807905e00b874c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}