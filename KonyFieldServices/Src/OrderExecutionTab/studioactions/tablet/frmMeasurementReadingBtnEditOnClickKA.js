function frmMeasurementReadingBtnEditOnClickKA(eventobject) {
    return AS_Button_b8c36baef48941f18837526fa82b7fba(eventobject);
}

function AS_Button_b8c36baef48941f18837526fa82b7fba(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showEditPopUp");
}