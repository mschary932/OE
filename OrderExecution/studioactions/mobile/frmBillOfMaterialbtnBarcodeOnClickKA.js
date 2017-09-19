function frmBillOfMaterialbtnBarcodeOnClickKA(eventobject) {
    return AS_Button_952aeead0cb444348d9f8bfd427fff15(eventobject);
}

function AS_Button_952aeead0cb444348d9f8bfd427fff15(eventobject) {
    var BOMBarcodeSearch = function(barcodeDataDummmy, barcodeData) {
            var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
            if (platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
                barcodeData = barcodeDataDummmy.barcodestring;
            }
            kony.sdk.mvvm.log.info("==barCodeText==>" + barcodeData);
            if (barcodeData) {
                var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
                controller.getFormModel().setViewAttributeByProperty("tbxBomSearchKA", "text", barcodeData);
                controller.performAction("searchObject");
            };
        }
    Barcode.captureBarcode(BOMBarcodeSearch);
}