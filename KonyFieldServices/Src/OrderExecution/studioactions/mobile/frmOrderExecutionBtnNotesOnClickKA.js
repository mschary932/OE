function frmOrderExecutionBtnNotesOnClickKA(eventobject) {
    return AS_Button_0bd0f379acf14f23a92fdb99c5252cf6(eventobject);
}

function AS_Button_0bd0f379acf14f23a92fdb99c5252cf6(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showWorkOrderNotesForm");
    } catch (err) {}
}