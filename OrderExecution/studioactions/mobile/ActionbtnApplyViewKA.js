function actionBtnApplyViewKA(eventobject) {
    return AS_Button_c5d3e5001bd744da90235bddf6709b92(eventobject);
}

function AS_Button_c5d3e5001bd744da90235bddf6709b92(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("applyView");
}