function frmTimeAndExpenseKAEditOnClick(eventobject, context) {
    return AS_Button_ffa414900ea14c369a7bbc28e95997ae(eventobject, context);
}

function AS_Button_ffa414900ea14c369a7bbc28e95997ae(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToEditScreenKA");
}