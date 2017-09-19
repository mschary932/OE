function frmAOLTflexScheduleOnClickKA(eventobject) {
    return AS_FlexContainer_c1e19cc5a39a48138fd2255fc29e820e(eventobject);
}

function AS_FlexContainer_c1e19cc5a39a48138fd2255fc29e820e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onImgDown2Call");
}