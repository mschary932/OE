function frmPendingOrderViewFilterOnClickKA(eventobject) {
    return AS_Button_f19de15ecff04a01bf9193537ae48fe1(eventobject);
}

function AS_Button_f19de15ecff04a01bf9193537ae48fe1(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderListView");
}