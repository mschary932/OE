function frmCompleteOrderTabBomBackKA(eventobject) {
    return AS_Button_f8de4f788ea24e0e8df0ca078e8efa0c(eventobject);
}

function AS_Button_f8de4f788ea24e0e8df0ca078e8efa0c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromBom");
}