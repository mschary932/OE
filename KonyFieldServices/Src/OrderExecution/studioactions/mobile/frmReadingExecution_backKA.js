function frmReadingExecution_backKA(eventobject) {
    return AS_Button_1e6361d4a2344eb3b44275d59e0fe4ec(eventobject);
}

function AS_Button_1e6361d4a2344eb3b44275d59e0fe4ec(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [false]);
}