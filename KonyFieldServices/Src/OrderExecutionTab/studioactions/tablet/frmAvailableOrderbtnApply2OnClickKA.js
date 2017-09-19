function frmAvailableOrderbtnApply2OnClickKA(eventobject) {
    return AS_Button_197b6584db494b52be052eaa72b469e5(eventobject);
}

function AS_Button_197b6584db494b52be052eaa72b469e5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}