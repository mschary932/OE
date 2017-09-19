function frmCompleteOrderButnSignTickOnClickKA(eventobject) {
    return AS_Button_df76dd03cf5a48c094fb1dca7432ee73(eventobject);
}

function AS_Button_df76dd03cf5a48c094fb1dca7432ee73(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCompleteOrderMainPageOne");
}