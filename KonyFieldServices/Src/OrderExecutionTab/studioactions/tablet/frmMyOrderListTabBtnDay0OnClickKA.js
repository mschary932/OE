function frmMyOrderListTabBtnDay0OnClickKA(eventobject) {
    return AS_Button_2b0eeb4ebcc74ad0a194c90234250496(eventobject);
}

function AS_Button_2b0eeb4ebcc74ad0a194c90234250496(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay0KA']);
}