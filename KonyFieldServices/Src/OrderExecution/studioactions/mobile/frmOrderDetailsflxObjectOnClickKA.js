function frmOrderDetailsflxObjectOnClickKA(eventobject) {
    return AS_FlexContainer_f691c5b354f341068f997eca410d6f12(eventobject);
}

function AS_FlexContainer_f691c5b354f341068f997eca410d6f12(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderDetailsKA");
    controller.performAction("showOrderObjectForm");
}