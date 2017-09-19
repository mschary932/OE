function frmMyOrderListTabBtnDay1OnClickKA(eventobject) {
    return AS_Button_5b83c2cc039148de8eda5cb699dd3014(eventobject);
}

function AS_Button_5b83c2cc039148de8eda5cb699dd3014(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay1KA']);
}