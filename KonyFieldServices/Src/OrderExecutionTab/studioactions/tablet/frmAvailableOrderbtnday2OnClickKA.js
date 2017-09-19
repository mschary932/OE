function frmAvailableOrderbtnday2OnClickKA(eventobject) {
    return AS_Button_fd0e13bb6e3f403083a2c5cc30e13958(eventobject);
}

function AS_Button_fd0e13bb6e3f403083a2c5cc30e13958(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay2KA']);
}