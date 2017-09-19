function frmExpenseDetailsBackTouchTargetOnclickKAKA(eventobject) {
    return AS_Button_2bf34cb3d3364b2388add640752c4766(eventobject);
}

function AS_Button_2bf34cb3d3364b2388add640752c4766(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderExecutionForm");
}