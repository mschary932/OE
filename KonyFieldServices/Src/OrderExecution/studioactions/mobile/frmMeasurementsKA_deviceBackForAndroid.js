function frmMeasurementsKA_deviceBackForAndroid(eventobject) {
    return AS_Form_c6be9133771c402eafbee88bdb172d59(eventobject);
}

function AS_Form_c6be9133771c402eafbee88bdb172d59(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("deviceBackForAndroid", [true]);
}