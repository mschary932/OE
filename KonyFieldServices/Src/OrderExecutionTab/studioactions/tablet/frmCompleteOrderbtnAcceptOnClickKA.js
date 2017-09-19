function frmCompleteOrderbtnAcceptOnClickKA(eventobject) {
    return AS_Button_be1cf7dc649c4c6f8f2c500824ae9b48(eventobject);
}

function AS_Button_be1cf7dc649c4c6f8f2c500824ae9b48(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showConfirmationPopUpFlex");
}