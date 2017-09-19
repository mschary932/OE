function frmSummaryKA_OnAmountSelectKA(eventobject) {
    return AS_FlexContainer_2886d84e900644cfa393e4414452a1e2(eventobject);
}

function AS_FlexContainer_2886d84e900644cfa393e4414452a1e2(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.setViewAttributeByProperty("imgPercentSelectKA", "src", "radiobuttonblank.png");
    formModel.setViewAttributeByProperty("imgAmountSelectKA", "src", "radiobuttonfilled.png");
    formModel.setViewAttributeByProperty("lblSymbolKA", "text", "$");
    //formModel.setViewAttributeByProperty("tbxAmountKA", "text", "0");
    controller.performAction("calculateDiscount");
}