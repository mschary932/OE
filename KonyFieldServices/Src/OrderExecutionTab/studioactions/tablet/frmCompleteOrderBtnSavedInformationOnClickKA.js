function frmCompleteOrderBtnSavedInformationOnClickKA(eventobject) {
    return AS_Button_676993cb77c54d98945ac6fecbfef682(eventobject);
}

function AS_Button_676993cb77c54d98945ac6fecbfef682(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCompleteOrderMainPageOne");
}