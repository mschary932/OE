function frmCompleteOrderBtnBackFromBomOnClickKA(eventobject) {
    return AS_Button_fc5ad5b338b046a4bb6ee451e0c9efbf(eventobject);
}

function AS_Button_fc5ad5b338b046a4bb6ee451e0c9efbf(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromBom");
}