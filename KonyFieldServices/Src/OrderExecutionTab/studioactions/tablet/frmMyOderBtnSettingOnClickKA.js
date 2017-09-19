function frmMyOderBtnSettingOnClickKA(eventobject) {
    return AS_Button_f0fd80011c5b43d99d72c44114ab4141(eventobject);
}

function AS_Button_f0fd80011c5b43d99d72c44114ab4141(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSettingScreen");
}