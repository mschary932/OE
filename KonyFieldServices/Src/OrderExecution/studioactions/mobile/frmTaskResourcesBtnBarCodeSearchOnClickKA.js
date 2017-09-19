function frmTaskResourcesBtnBarCodeSearchOnClickKA(eventobject) {
    return AS_Button_08f252b34a55482ebe58325b85938aa0(eventobject);
}

function AS_Button_08f252b34a55482ebe58325b85938aa0(eventobject) {
    var taskResourceBarcodeSearch = function(barcodeDataDummmy, barcodeData) {
        var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
        if (platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
            barcodeData = barcodeDataDummmy.barcodestring;
        }
        if (barcodeData) {
            kony.sdk.mvvm.log.info("==barCodeText==>" + barcodeData);
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
            controller.getControllerExtensionObject().setFormModelInfo("fromBarCode", true);
            controller.getFormModel().setViewAttributeByProperty("tbxSearchKA", "text", barcodeData);
            controller.performAction("doSearch");
        };
    }
    Barcode.captureBarcode(taskResourceBarcodeSearch);
}