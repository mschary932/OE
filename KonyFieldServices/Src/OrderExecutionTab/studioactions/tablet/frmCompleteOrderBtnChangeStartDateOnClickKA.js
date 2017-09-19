function frmCompleteOrderBtnChangeStartDateOnClickKA(eventobject) {
    return AS_Button_672a8a9840564dfbb2c60b83d505503b(eventobject);
}

function AS_Button_672a8a9840564dfbb2c60b83d505503b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDatePopUpFlex");
}