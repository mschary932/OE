function frmExtendedAttributesBtnBackOnClickKA(eventobject) {
    return AS_Button_2b3631386ab746a5b67dfd4850bba699(eventobject);
}

function AS_Button_2b3631386ab746a5b67dfd4850bba699(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [false]);
}