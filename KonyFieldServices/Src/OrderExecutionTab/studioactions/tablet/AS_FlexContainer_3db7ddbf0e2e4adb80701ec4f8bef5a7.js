function AS_FlexContainer_3db7ddbf0e2e4adb80701ec4f8bef5a7(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderNotes");
}