function frmTaskExecutionMaterialListTmpPlusOnClickKA(eventobject, context) {
    return AS_Button_c4879a296fce42cd92272395256c468c(eventobject, context);
}

function AS_Button_c4879a296fce42cd92272395256c468c(eventobject, context) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showStockLocationsFlex");
}