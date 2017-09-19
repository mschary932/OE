function frmOrderExecutionAddTimePopUpCancelOnClickKA(eventobject) {
    return AS_Button_9e949b40060b408793ca86556032ccb9(eventobject);
}

function AS_Button_9e949b40060b408793ca86556032ccb9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}