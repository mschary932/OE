function frmCompleteOrderBtnCancelOnClickKA(eventobject) {
    return AS_Button_8c945939aa57480491a92f7510de055b(eventobject);
}

function AS_Button_8c945939aa57480491a92f7510de055b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}