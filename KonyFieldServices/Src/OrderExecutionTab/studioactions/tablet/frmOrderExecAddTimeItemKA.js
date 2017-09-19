function frmOrderExecAddTimeItemKA(eventobject) {
    return AS_Button_69dacbf0188b49bdb086f157e166f0cd(eventobject);
}

function AS_Button_69dacbf0188b49bdb086f157e166f0cd(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddTimePopUp");
}