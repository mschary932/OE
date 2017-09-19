function frmCOPreshowKA(eventobject) {
    return AS_Form_0a842fee8886406d8020b82974a74085(eventobject);
}

function AS_Form_0a842fee8886406d8020b82974a74085(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    var formModel = controller.getFormModel();
    formModel.setViewAttributeByProperty("flexPopupKA", "isVisible", false);
    frmCompleteOrderKA.flxScrollTypesKA.contentOffset = {
        x: 0,
        y: 0
    };
    //frmCompleteOrderKA.flexPopupKA.setVisibilty(false);
}