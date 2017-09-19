function frmAddEditTimeItemKA_OnButtonClick(eventobject) {
    return AS_Button_3a2b8cf525ea41dea9b659b4f7078e80(eventobject);
}

function AS_Button_3a2b8cf525ea41dea9b659b4f7078e80(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAddEditTimeItemKA");
    controller.performAction("saveData");
}