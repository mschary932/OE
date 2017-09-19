function frmOrderAssetBtnOrderObjectBackOnClickKA(eventobject) {
    return AS_Button_1a433fd57e5e472c9d8f0aedd8d571ac(eventobject);
}

function AS_Button_1a433fd57e5e472c9d8f0aedd8d571ac(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderAssetKA");
    controller.performAction("navigateBack");
}