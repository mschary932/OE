function frmMyOrderListTabFlexCalenderFiltersOnSelectionKA(eventobject, isValidDateSelected) {
    return AS_Calendar_1b724c1e35f94254bedb432d121d3dd8(eventobject, isValidDateSelected);
}

function AS_Calendar_1b724c1e35f94254bedb432d121d3dd8(eventobject, isValidDateSelected) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectAnyDateFromCalender");
    controller.performAction("indicateIfAnyDateSelected");
}