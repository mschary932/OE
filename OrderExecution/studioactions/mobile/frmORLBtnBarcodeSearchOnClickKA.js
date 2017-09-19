function frmORLBtnBarcodeSearchOnClickKA(eventobject) {
    return AS_Button_5659a4fea07349ff9f564406953e4adf(eventobject);
}

function AS_Button_5659a4fea07349ff9f564406953e4adf(eventobject) {
    var taskResourceBarcodeSearch = function(barcodeDataDummmy, barcodeData) {
        var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
        if (platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
            barcodeData = barcodeDataDummmy.barcodestring;
        }
        kony.sdk.mvvm.log.info("==barCodeText==>" + barcodeData);
        if (barcodeData) {
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
            controller.getControllerExtensionObject().setFormModelInfo("fromBarCode", true);
            controller.getFormModel().setViewAttributeByProperty("tbxSearchKA", "text", barcodeData);
            controller.performAction("doSearch");
        };
    }
    Barcode.captureBarcode(taskResourceBarcodeSearch);
}