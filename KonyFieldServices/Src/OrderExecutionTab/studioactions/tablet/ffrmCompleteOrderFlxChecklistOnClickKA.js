function ffrmCompleteOrderFlxChecklistOnClickKA(eventobject) {
    return AS_FlexContainer_5f5643ba448f4e34b7c03f7ed8e56c8f(eventobject);
}

function AS_FlexContainer_5f5643ba448f4e34b7c03f7ed8e56c8f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSurveyFlex");
}