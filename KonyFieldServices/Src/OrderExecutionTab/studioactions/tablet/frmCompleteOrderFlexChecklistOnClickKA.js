function frmCompleteOrderFlexChecklistOnClickKA(eventobject) {
    return AS_FlexContainer_3b3b437170fc4d04a889ab2a404416ab(eventobject);
}

function AS_FlexContainer_3b3b437170fc4d04a889ab2a404416ab(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSurveyFlex");
}