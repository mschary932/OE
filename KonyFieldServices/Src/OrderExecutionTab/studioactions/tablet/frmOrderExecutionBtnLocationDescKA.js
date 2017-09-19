function frmOrderExecutionBtnLocationDescKA(eventobject) {
    return AS_Button_52995c7859d840e1acc0e277b712e585(eventobject);
}

function AS_Button_52995c7859d840e1acc0e277b712e585(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedDescription");
}