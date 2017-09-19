function frmDirectionsBtnDirecctionOnClickKA(eventobject) {
    return AS_Button_80d4d88433b74ae585b4e97b7a31186c(eventobject);
}

function AS_Button_80d4d88433b74ae585b4e97b7a31186c(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmDirectionsKA");
    controller.performAction("openNativeMap");
}