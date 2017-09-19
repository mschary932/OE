function frmSuveyBtnYesOnClickKA(eventobject) {
    return AS_Button_b2246250caca4d8a89bf9d7f87b835fe(eventobject);
}

function AS_Button_b2246250caca4d8a89bf9d7f87b835fe(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveCompleteData", [true]);
}