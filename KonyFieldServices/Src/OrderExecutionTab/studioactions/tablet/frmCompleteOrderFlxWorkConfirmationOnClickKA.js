function frmCompleteOrderFlxWorkConfirmationOnClickKA(eventobject) {
    return AS_FlexContainer_eaabe66bcf1d408ea413eeb67bd3ef1f(eventobject);
}

function AS_FlexContainer_eaabe66bcf1d408ea413eeb67bd3ef1f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showWorkConfirmationFlex");
}