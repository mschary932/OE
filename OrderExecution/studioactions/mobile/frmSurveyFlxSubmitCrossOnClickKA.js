function frmSurveyFlxSubmitCrossOnClickKA(eventobject) {
    return AS_FlexContainer_2eec30d6ea534cbe839652467c715e41(eventobject);
}

function AS_FlexContainer_2eec30d6ea534cbe839652467c715e41(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction('navigateBack');
}