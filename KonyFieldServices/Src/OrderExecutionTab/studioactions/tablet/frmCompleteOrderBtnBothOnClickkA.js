function frmCompleteOrderBtnBothOnClickkA(eventobject) {
    return AS_Button_0bb2757c5f5c42778218458f55788f9c(eventobject);
}

function AS_Button_0bb2757c5f5c42778218458f55788f9c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showBothSegment");
}