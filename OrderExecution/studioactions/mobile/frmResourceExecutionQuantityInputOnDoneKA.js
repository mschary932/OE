function frmResourceExecutionQuantityInputOnDoneKA(eventobject, changedtext) {
    return AS_TextField_e3c16c6ac12046fa8504af1572376df9(eventobject, changedtext);
}

function AS_TextField_e3c16c6ac12046fa8504af1572376df9(eventobject, changedtext) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("updateQuantity", [true]);
}