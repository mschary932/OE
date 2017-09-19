function frmCompleteOrderbtnAccept3OnClickKA(eventobject) {
    return AS_Button_a2b459b0c11547588b44703d1f5672b5(eventobject);
}

function AS_Button_a2b459b0c11547588b44703d1f5672b5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showConfirmationPopUpFlex");
}