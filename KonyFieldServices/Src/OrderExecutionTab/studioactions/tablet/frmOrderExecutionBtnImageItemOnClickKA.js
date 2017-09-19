function frmOrderExecutionBtnImageItemOnClickKA(eventobject) {
    return AS_Button_1b7e240346ea41a48eae4efa7727ac68(eventobject);
}

function AS_Button_1b7e240346ea41a48eae4efa7727ac68(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddNotes");
}