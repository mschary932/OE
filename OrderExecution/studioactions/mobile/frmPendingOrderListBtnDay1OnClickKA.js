function frmPendingOrderListBtnDay1OnClickKA(eventobject) {
    return AS_Button_a48650a1763f4961be0c2f160ecc98d3(eventobject);
}

function AS_Button_a48650a1763f4961be0c2f160ecc98d3(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    if (!hamburgerMenu.IS_MENU_SHOWN) {
        controller.performAction("setSegmentListDataKA", [this.id]);
    } else {
        new hamburgerMenu().execute();
    }
}