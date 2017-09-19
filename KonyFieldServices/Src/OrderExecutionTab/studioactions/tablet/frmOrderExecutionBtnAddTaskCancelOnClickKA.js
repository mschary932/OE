function frmOrderExecutionBtnAddTaskCancelOnClickKA(eventobject) {
    return AS_Button_febbae02b31b4bc5bc5d4109be31eae8(eventobject);
}

function AS_Button_febbae02b31b4bc5bc5d4109be31eae8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTask");
}