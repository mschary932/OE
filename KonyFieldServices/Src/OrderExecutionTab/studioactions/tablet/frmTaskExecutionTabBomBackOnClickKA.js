function frmTaskExecutionTabBomBackOnClickKA(eventobject) {
    return AS_Button_5919e02b436c4348bfa64ad18996c608(eventobject);
}

function AS_Button_5919e02b436c4348bfa64ad18996c608(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showResoucesFlex");
}