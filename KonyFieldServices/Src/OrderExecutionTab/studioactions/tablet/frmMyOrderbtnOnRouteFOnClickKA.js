function frmMyOrderbtnOnRouteFOnClickKA(eventobject) {
    return AS_Button_e32613495d7d479e817404d1d3923189(eventobject);
}

function AS_Button_e32613495d7d479e817404d1d3923189(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnOnRouteFKA']);
}