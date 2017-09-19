function frmCardPayment_preshowKA(eventobject) {
    return AS_Form_a988e45213d24c2a84e19ede1d9d30db(eventobject);
}

function AS_Form_a988e45213d24c2a84e19ede1d9d30db(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCardPaymentKA");
    var contextData = controller.getContextData();
    var totalAmount = contextData.getCustomInfo("invInfo").TotalAmount;
    var htmlStrng = "<!DOCTYPE html><meta content='text/html; charset=utf-8'http-equiv=Content-Type><link href=style.css rel=stylesheet><title>Insert title here</title><script>function onReady(){document.forms[0].submit()}</script><body onload=onReady()><h3>Please wait till we redirect you to Paypal Screen...</h3><form action=PAYPALURL id=paypalForm method=post name=paypalForm target=_top><input name=cmd type=hidden value=_s-xclick> <input name=return type=hidden value=https://www.google.co.in/ > <input name=hosted_button_id type=hidden value=NWW87L7VVH5V4></form>";
    htmlStrng = htmlStrng.replace("PAYPALURL", "https://www.sandbox.paypal.com/in/cgi-bin/webscr?amount=" + totalAmount);
    frmCardPaymentKA.browserPayPalKA.htmlString = htmlStrng;
}