function frmCOSBtnDoneBtnOnClickKA(eventobject) {
    return AS_Button_c55e14003d0c42f88e9f3e393f557ffa(eventobject);
}

function AS_Button_c55e14003d0c42f88e9f3e393f557ffa(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderSummaryKA");
    controller.performAction("setCalendarDataKA");
    controller.performAction("calculateDuration");
}