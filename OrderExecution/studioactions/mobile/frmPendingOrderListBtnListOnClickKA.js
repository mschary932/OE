function frmPendingOrderListBtnListOnClickKA(eventobject) {
    return AS_Button_d8d1d1adfd954356b0e3a0c5cccabf2d(eventobject);
}

function AS_Button_d8d1d1adfd954356b0e3a0c5cccabf2d(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("actionForList");
}