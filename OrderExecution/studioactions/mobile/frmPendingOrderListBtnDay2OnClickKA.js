function frmPendingOrderListBtnDay2OnClickKA(eventobject) {
    return AS_Button_1fd9fe1df5db408ba4aedd4f4ef02bff(eventobject);
}

function AS_Button_1fd9fe1df5db408ba4aedd4f4ef02bff(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    if (!hamburgerMenu.IS_MENU_SHOWN) {
        controller.performAction("setSegmentListDataKA", [this.id]);
    } else {
        new hamburgerMenu().execute();
    }
}