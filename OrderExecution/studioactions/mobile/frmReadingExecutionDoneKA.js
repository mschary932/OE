function frmReadingExecutionDoneKA(eventobject) {
    return AS_Button_4444c1d47ac641df944ac6d5af526b63(eventobject);
}

function AS_Button_4444c1d47ac641df944ac6d5af526b63(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("saveMeasureValueRecord");
}