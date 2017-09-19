function frmDirectionStepsOnDeviceBackKA(eventobject) {
    return AS_Form_e14aeb035dbc4ccb9075134808014361(eventobject);
}

function AS_Form_e14aeb035dbc4ccb9075134808014361(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}