function frmMyOrderbtnRejectedFOnClickKA(eventobject) {
    return AS_Button_ee4b734011374479844d0bbd8bbb6704(eventobject);
}

function AS_Button_ee4b734011374479844d0bbd8bbb6704(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnRejectedFKA']);
}