function frmReadingExecutionCancelKA(eventobject) {
    return AS_Button_ee8b388c20ba4ee580a5b9ffe83bf4a5(eventobject);
}

function AS_Button_ee8b388c20ba4ee580a5b9ffe83bf4a5(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [false]);
}