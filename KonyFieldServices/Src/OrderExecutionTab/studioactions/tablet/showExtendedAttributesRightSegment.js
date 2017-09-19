function showExtendedAttributesRightSegment(eventobject) {
    return AS_FlexContainer_99859f96a2dc4cfcb17342b1c676d707(eventobject);
}

function AS_FlexContainer_99859f96a2dc4cfcb17342b1c676d707(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExtendedAttributes");
}