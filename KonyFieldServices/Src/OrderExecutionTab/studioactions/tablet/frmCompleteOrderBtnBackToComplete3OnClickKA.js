function frmCompleteOrderBtnBackToComplete3OnClickKA(eventobject) {
    return AS_Button_7ea6ae60d48e4f48ae9831f60754e9a9(eventobject);
}

function AS_Button_7ea6ae60d48e4f48ae9831f60754e9a9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCancelProgressPopUpFlex");
}