function frmCompleteOrderBtnDone2OnClickKA(eventobject) {
    return AS_Button_2d38e135f7074a778c87fd93ca4df3d9(eventobject);
}

function AS_Button_2d38e135f7074a778c87fd93ca4df3d9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}