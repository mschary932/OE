function frmTaskExecHideDateSpinnerKA(eventobject) {
    return AS_Button_762c0752d9094b71a994e598a31f87c0(eventobject);
}

function AS_Button_762c0752d9094b71a994e598a31f87c0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDateSpinner");
}