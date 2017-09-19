function frmExpenseDetailsPopUpShowDateSpinnerKA(eventobject, x, y) {
    return AS_Label_62af99546d1e49adb00123a459f475f5(eventobject, x, y);
}

function AS_Label_62af99546d1e49adb00123a459f475f5(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDateSpinner");
}