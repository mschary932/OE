function frmMyOrderbtnday2OnClickKA(eventobject) {
    return AS_Button_538757036de54ab1bf7ba3e7867262e1(eventobject);
}

function AS_Button_538757036de54ab1bf7ba3e7867262e1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay2KA']);
}