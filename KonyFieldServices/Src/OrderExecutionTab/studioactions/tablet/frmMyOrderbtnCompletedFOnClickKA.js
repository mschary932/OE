function frmMyOrderbtnCompletedFOnClickKA(eventobject) {
    return AS_Button_73673c34a540405b9bf3e8c95e9d7a98(eventobject);
}

function AS_Button_73673c34a540405b9bf3e8c95e9d7a98(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnCompletedFKA']);
}