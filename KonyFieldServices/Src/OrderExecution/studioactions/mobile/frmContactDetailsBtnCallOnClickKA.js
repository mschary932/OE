function frmContactDetailsBtnCallOnClickKA(eventobject) {
    return p2kwiet1234563580124_btnCallKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580124_btnCallKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var phoneNum = this.parent.lblPhoneNumberValueKA.text;
    if (phoneNum.indexOf('(') != -1) {
        phoneNum = phoneNum.substring(0, phoneNum.indexOf('('));
    }
    controller.performAction("callContact", [phoneNum]);
}