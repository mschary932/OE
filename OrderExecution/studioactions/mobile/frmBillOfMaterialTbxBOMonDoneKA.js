function frmBillOfMaterialTbxBOMonDoneKA(eventobject, changedtext) {
    return AS_TextField_a2421f1776a548d1b39f412dee4f377f(eventobject, changedtext);
}

function AS_TextField_a2421f1776a548d1b39f412dee4f377f(eventobject, changedtext) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("searchObject");
}