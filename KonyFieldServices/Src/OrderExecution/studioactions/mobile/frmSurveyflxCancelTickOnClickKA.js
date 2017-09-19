function frmSurveyflxCancelTickOnClickKA(eventobject) {
    return AS_FlexContainer_04f4b46591db40a08a160cb20aebd919(eventobject);
}

function AS_FlexContainer_04f4b46591db40a08a160cb20aebd919(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveCompleteData", [true]);
}