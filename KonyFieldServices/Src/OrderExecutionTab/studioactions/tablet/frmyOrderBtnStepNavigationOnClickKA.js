function frmyOrderBtnStepNavigationOnClickKA(eventobject) {
    return AS_Button_9969217c56e14abcad789e52e1dd3c5b(eventobject);
}

function AS_Button_9969217c56e14abcad789e52e1dd3c5b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("startStepNavigation");
}