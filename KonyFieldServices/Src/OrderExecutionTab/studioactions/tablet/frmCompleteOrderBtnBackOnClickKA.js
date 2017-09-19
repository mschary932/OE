function frmCompleteOrderBtnBackOnClickKA(eventobject) {
    return AS_Button_2164227371254d29bfbb919403b61956(eventobject);
}

function AS_Button_2164227371254d29bfbb919403b61956(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTaskExecutionForm");
}