function frmAvailableOrderCalenderSelectDateOnSelectionKA(eventobject, isValidDateSelected) {
    return AS_Calendar_a7a7535c956449a5b387bd8bb02c6ab6(eventobject, isValidDateSelected);
}

function AS_Calendar_a7a7535c956449a5b387bd8bb02c6ab6(eventobject, isValidDateSelected) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectAnyDateFromCalender");
    controller.performAction("indicateIfAnyDateSelected");
}