function frmMyOrderbtnHighOnClickKA(eventobject) {
    return AS_Button_b0e1e498ceb04ad1943eeb6436019b3c(eventobject);
}

function AS_Button_b0e1e498ceb04ad1943eeb6436019b3c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onPriorityFilterClick", ['btnHighKA']);
}