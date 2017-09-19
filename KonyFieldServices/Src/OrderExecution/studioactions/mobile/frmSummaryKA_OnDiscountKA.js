function frmSummaryKA_OnDiscountKA(eventobject, changedtext) {
    return AS_TextField_3057e0892cfb44ee975770147ec1f840(eventobject, changedtext);
}

function AS_TextField_3057e0892cfb44ee975770147ec1f840(eventobject, changedtext) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("calculateDiscount");
}