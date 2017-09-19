function frmExpenseDetailsTabBtnEditOnClickKA(eventobject) {
    return AS_Button_0b794d7da355450a8c1dd6ddb1706631(eventobject);
}

function AS_Button_0b794d7da355450a8c1dd6ddb1706631(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showEditExpensePopUp");
}