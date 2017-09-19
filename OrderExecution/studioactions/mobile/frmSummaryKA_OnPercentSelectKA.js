function frmSummaryKA_OnPercentSelectKA(eventobject) {
    return AS_FlexContainer_968823b2a29a40c39c4833dcbe20eeba(eventobject);
}

function AS_FlexContainer_968823b2a29a40c39c4833dcbe20eeba(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.setViewAttributeByProperty("imgPercentSelectKA", "src", "radiobuttonfilled.png");
    formModel.setViewAttributeByProperty("imgAmountSelectKA", "src", "radiobuttonblank.png");
    formModel.setViewAttributeByProperty("lblSymbolKA", "text", "%");
    //formModel.setViewAttributeByProperty("tbxAmountKA", "text", "0");
    controller.performAction("calculateDiscount");
}