function frmMyOrderListTabBtnApply2OnClickKA(eventobject) {
    return AS_Button_2fd26498d8564a5cab9d94f4ec016b8c(eventobject);
}

function AS_Button_2fd26498d8564a5cab9d94f4ec016b8c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}