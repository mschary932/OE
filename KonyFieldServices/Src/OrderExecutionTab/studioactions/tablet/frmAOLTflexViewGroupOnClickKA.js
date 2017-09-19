function frmAOLTflexViewGroupOnClickKA(eventobject) {
    return AS_FlexContainer_321c5358253b4a909d008bdfb7d6e9d9(eventobject);
}

function AS_FlexContainer_321c5358253b4a909d008bdfb7d6e9d9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onImgDownCall");
}