function frmOrderExecutionFlexAddTimePopupOnClickKA(eventobject) {
    return AS_FlexContainer_37e8cde493d44dabb44a57f72d76e6de(eventobject);
}

function AS_FlexContainer_37e8cde493d44dabb44a57f72d76e6de(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}