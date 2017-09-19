function frmCOShowHistoryOnClickKA(eventobject) {
    return AS_Button_5b9cf737311841a9a108fc149ba8974d(eventobject);
}

function AS_Button_5b9cf737311841a9a108fc149ba8974d(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showWorkOrderHistoryForm");
}