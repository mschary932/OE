function frmCompleteOrderBtnSignCrossOnClickKA(eventobject) {
    return AS_Button_7345ce800bef4390841a8d9ff7a6e7bc(eventobject);
}

function AS_Button_7345ce800bef4390841a8d9ff7a6e7bc(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelConfirmationPopUp");
}