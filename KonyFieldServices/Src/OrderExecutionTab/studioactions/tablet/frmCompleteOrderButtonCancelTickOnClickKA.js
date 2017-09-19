function frmCompleteOrderButtonCancelTickOnClickKA(eventobject) {
    return AS_Button_cb09a844ecfc4d479b83d03a927b40d3(eventobject);
}

function AS_Button_cb09a844ecfc4d479b83d03a927b40d3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCompleteOrderMainPageOne");
}