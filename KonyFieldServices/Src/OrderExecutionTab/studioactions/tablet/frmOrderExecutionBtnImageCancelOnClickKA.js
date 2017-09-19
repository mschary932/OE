function frmOrderExecutionBtnImageCancelOnClickKA(eventobject) {
    return AS_Button_9c2504e65c844916a00ebcf5aaa43355(eventobject);
}

function AS_Button_9c2504e65c844916a00ebcf5aaa43355(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddNotes");
}