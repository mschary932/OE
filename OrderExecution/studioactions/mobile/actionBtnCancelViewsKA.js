function actionBtnCancelViewsKA(eventobject) {
    return AS_Button_662c8283c8c046619a02c53af526078c(eventobject);
}

function AS_Button_662c8283c8c046619a02c53af526078c(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFilters", [false]);
}