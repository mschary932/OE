function frmOrderExecutionQuePopUpBtnTimeItemKA(eventobject) {
    return AS_Button_612386844ccf4dcaa5a8b37386d7ba9b(eventobject);
}

function AS_Button_612386844ccf4dcaa5a8b37386d7ba9b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSegment");
}