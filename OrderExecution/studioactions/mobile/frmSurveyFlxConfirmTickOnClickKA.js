function frmSurveyFlxConfirmTickOnClickKA(eventobject) {
    return AS_FlexContainer_71043292d63f4518bb3d3a5c1e2bc5f5(eventobject);
}

function AS_FlexContainer_71043292d63f4518bb3d3a5c1e2bc5f5(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveCompleteData", [false]);
}