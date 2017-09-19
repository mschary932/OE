function frmTaskExecutionBtnClearAllViewsOnClickKA(eventobject) {
    return AS_Button_25644401f5ca487ebce6df3371b2071c(eventobject);
}

function AS_Button_25644401f5ca487ebce6df3371b2071c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCallOne");
}