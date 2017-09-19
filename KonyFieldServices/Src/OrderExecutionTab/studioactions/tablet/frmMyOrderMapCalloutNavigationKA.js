function frmMyOrderMapCalloutNavigationKA(eventobject, x, y) {
    return AS_FlexContainer_9b4f765d47114610b8eba3840dd6c36d(eventobject, x, y);
}

function AS_FlexContainer_9b4f765d47114610b8eba3840dd6c36d(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderExecutionForm");
}