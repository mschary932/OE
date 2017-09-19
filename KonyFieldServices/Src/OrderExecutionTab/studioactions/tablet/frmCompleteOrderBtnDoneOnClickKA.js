function frmCompleteOrderBtnDoneOnClickKA(eventobject) {
    return AS_Button_5996466899fd49e9b65aeac4e785fa10(eventobject);
}

function AS_Button_5996466899fd49e9b65aeac4e785fa10(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}