function frmCOPostShowKA(eventobject) {
    return AS_Form_332efbbcd79c459ba09d3fe15454af34(eventobject);
}

function AS_Form_332efbbcd79c459ba09d3fe15454af34(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    controller.performAction("destroySurveyForm");
}