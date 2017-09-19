function frmMyOrderBtnCancelPanicCallOnClickKA(eventobject) {
    return AS_Button_d8d21d15ff154a629c87bdb1dfda7721(eventobject);
}

function AS_Button_d8d21d15ff154a629c87bdb1dfda7721(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromPanicScreen");
}