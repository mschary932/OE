function frmMyOrderListTabBtnApplyOnClickKA(eventobject) {
    return AS_Button_72ad19e53b304bb285d5d3eb63109ced(eventobject);
}

function AS_Button_72ad19e53b304bb285d5d3eb63109ced(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}