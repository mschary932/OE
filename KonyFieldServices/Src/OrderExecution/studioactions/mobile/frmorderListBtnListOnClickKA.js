function frmorderListBtnListOnClickKA(eventobject) {
    return AS_Button_fa2280e36ed54831b60bc30fd05e6ce3(eventobject);
}

function AS_Button_fa2280e36ed54831b60bc30fd05e6ce3(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("actionForList");
}