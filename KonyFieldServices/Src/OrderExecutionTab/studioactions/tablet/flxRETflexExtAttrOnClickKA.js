function flxRETflexExtAttrOnClickKA(eventobject) {
    return AS_FlexContainer_e595413b3a484c95a570347fb7d22ac6(eventobject);
}

function AS_FlexContainer_e595413b3a484c95a570347fb7d22ac6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectExtendedAttributesTab");
}