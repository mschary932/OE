function frmCompleteOrderTabSubmenuOrderHistoryOnClickKA(eventobject) {
    return AS_FlexContainer_e3eb6b937f334345ba695cc3764d3071(eventobject);
}

function AS_FlexContainer_e3eb6b937f334345ba695cc3764d3071(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderHistory");
}