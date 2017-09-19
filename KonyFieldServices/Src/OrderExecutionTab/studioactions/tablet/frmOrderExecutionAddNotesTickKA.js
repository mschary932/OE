function frmOrderExecutionAddNotesTickKA(eventobject) {
    return AS_Button_46b97102a5d242389e9fc1a67c378c67(eventobject);
}

function AS_Button_46b97102a5d242389e9fc1a67c378c67(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSegment");
}