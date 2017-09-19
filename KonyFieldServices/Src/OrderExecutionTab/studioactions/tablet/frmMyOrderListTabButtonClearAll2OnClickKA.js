function frmMyOrderListTabButtonClearAll2OnClickKA(eventobject) {
    return AS_Button_98a36cefcc7c4c9691ad7e9cb0aceb15(eventobject);
}

function AS_Button_98a36cefcc7c4c9691ad7e9cb0aceb15(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}