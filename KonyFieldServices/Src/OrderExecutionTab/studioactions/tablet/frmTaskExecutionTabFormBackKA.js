function frmTaskExecutionTabFormBackKA(eventobject) {
    return AS_Button_e6c875257c2f4a1293968d92158196d4(eventobject);
}

function AS_Button_e6c875257c2f4a1293968d92158196d4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderExecutionForm");
}