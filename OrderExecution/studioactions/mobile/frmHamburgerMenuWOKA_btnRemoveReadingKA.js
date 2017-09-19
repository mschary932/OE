function frmHamburgerMenuWOKA_btnRemoveReadingKA(eventobject) {
    return AS_Button_da589fcf76694c18b59112bb04f362dd(eventobject);
}

function AS_Button_da589fcf76694c18b59112bb04f362dd(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("deleteMeasurementReading");
}