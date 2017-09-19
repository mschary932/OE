function frmTAE_OnClick_Listbutton(eventobject) {
    return AS_Button_c263559cfd534320a541f20f85635c25(eventobject);
}

function AS_Button_c263559cfd534320a541f20f85635c25(eventobject) {
    frmTimeAndExpenseKA.BtnTimeKA.skin = sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA;
    frmTimeAndExpenseKA.BtnBothKA.skin = sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA;
    frmTimeAndExpenseKA.BtnExpenseKA.skin = sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToTime");
}