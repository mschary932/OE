function frmMyOrderListTabBtnDay4OnClickKA(eventobject) {
    return AS_Button_fce1c45f76124fe2ad88c231f35830f9(eventobject);
}

function AS_Button_fce1c45f76124fe2ad88c231f35830f9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay4KA']);
}