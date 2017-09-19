function frmAvailableOrderbtnDay1OnClickKA(eventobject) {
    return AS_Button_e259562c3345474aa6b7a7cdcc193957(eventobject);
}

function AS_Button_e259562c3345474aa6b7a7cdcc193957(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay1KA']);
}