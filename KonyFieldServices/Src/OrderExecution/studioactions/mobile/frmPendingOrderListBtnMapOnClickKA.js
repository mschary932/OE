function frmPendingOrderListBtnMapOnClickKA(eventobject) {
    return AS_Button_e2052f1fe0224e97aecbb8ba7e455a08(eventobject);
}

function AS_Button_e2052f1fe0224e97aecbb8ba7e455a08(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("actionForMap");
}