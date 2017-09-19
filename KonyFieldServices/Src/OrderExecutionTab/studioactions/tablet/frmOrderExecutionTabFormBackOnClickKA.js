function frmOrderExecutionTabFormBackOnClickKA(eventobject) {
    return AS_Button_1dd9a456b92b4a6cabffff0800f42ea7(eventobject);
}

function AS_Button_1dd9a456b92b4a6cabffff0800f42ea7(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMyOrdersForm");
}