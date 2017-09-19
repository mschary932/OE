function frmTaskExecCancelRequestTransferPopUpKA(eventobject) {
    return AS_Button_1eefa33ce8dd4ad89e07b1a4fba5b69f(eventobject);
}

function AS_Button_1eefa33ce8dd4ad89e07b1a4fba5b69f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelRequestPopUp");
}