function frmCompleteOrderBtnTimeItemOkOnClickKA(eventobject) {
    return AS_Button_dd396abbdfce4b09beafaf0329ba5de8(eventobject);
}

function AS_Button_dd396abbdfce4b09beafaf0329ba5de8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}