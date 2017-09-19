function frmCompleteOrderbtnCancelCrossOnClickKA(eventobject) {
    return AS_Button_fd7549e4f37145a8a2eee78c1a51d001(eventobject);
}

function AS_Button_fd7549e4f37145a8a2eee78c1a51d001(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelConfirmationAndCancelPopUp");
}