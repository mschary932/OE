/*
 * Controller Extension class for frmStockLocationDetailsKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmStockLocationDetailsKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmStockLocationDetailsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmStockLocationDetailsKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.getController().processData(response);
        }

        function error(err) {
            //Error fetching data
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmStockLocationDetailsKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = this.$class.$superp.processData.call(this, data);
            this.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmStockLocationDetailsKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            // this.$class.$superp.bindData.call(this, data);
            kony.sdk.mvvm.log.info("@@@ StockDetails : bindData : data is : " + JSON.stringify(data));
            formmodel.setViewAttributeByProperty("lblStockLocationNameKA", "text", data.LocationDescription);
            var quantity=data.Quantity;
            if(quantity && quantity.split(": ").length==2){
                quantity=quantity.split(": ")[1];  
            }
            formmodel.setViewAttributeByProperty("lblQuantityKA", "text", quantity);
            formmodel.setViewAttributeByProperty("lblTechnicianKA", "text", data.UserName);
            if(data.distance){
                formmodel.setViewAttributeByProperty("lblDistanceKA", "text", data.distance);    
            }

            var scopeObj=this;
            scopeObj.setFormModelInfo("destinationLat", data.Latitude);
            scopeObj.setFormModelInfo("destinationLon", data.Longitude);
            scopeObj.setFormModelInfo("phoneNumber", data.ContactNumber);
            scopeObj.setFormModelInfo("Material_id", data.Material_id);
            scopeObj.setFormModelInfo("Unit_id", data.Unit_id);
            scopeObj.setFormModelInfo("Userid", data.Userid);
            scopeObj.setFormModelInfo("StorageLocation_id", data.StorageLocation_id);
            
            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmStockLocationDetailsKAControllerExtension#
     */
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmStockLocationDetailsKAControllerExtension#
     */
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method shows form.
     * @memberof frmStockLocationDetailsKAControllerExtension#
     */
    showForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.showView();
        } catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    requestStockTransfer: function(quantity) {
        try {
            if (kony.sdk.mvvm.isNetworkAvailabile()) {
                var scopeObj = this;
                var controller = scopeObj.getController();
                var formmodel = controller.getFormModel();

                var materialId = scopeObj.getFormModelInfo("Material_id");
                var availableQuantityUnit=formmodel.getViewAttributeByProperty("lblQuantityKA", "text");
                var availableQuantity="1";
                var baseUnit=" each";
                if(availableQuantityUnit && availableQuantityUnit.split(" ").length==2){
                    availableQuantity=availableQuantityUnit.split(" ")[0];
                    baseUnit=" "+availableQuantityUnit.split(" ")[1];
                }
                if(quantity && quantity.split(" ").length==2){
                    quantity=quantity.split(" ")[0];
                }

                var avlQnty=parseInt(availableQuantity);
                var reqQnty=parseInt(quantity);
                var utilitiesObj = utilities.getUtilityObj();
                if(avlQnty<reqQnty){
                    var displayText=utilitiesObj.geti18nValueKA("i18n.transferRequest.QuantityAlert")+"("+availableQuantity+")";
                    alert(displayText);
                }else{
                    var requestedQuantityNumber=quantity+baseUnit;
                    var rowData ={
                        "MaterialName":materialId,
                        "RequestedQuantityNumber":requestedQuantityNumber
                    };
                    
                    utilitiesObj.showStockTransferPopup(false, rowData);
                    formmodel.setViewAttributeByProperty("flxEditKA", "isVisible",true);
                    scopeObj.updateStockTransferOnline(quantity);
                }
            }else{
                var utilitiesObj = utilities.getUtilityObj();
                alert(utilitiesObj.geti18nValueKA("i18n.transferRequest.NoInternetAlert"));
            }
                
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },
    updateStockTransferOnline: function(quantity) {
        try {
            var modelObj = this.getController().getModel("ExternalInventory", "OrderExecution", {
                "access": "online"
           });
           var dataObject = new kony.sdk.dto.DataObject("ExternalInventory");
           var scopeObj=this;
           var updateField = {};
           updateField.Material_id = scopeObj.getFormModelInfo("Material_id");
           updateField.Unit_id=scopeObj.getFormModelInfo("Unit_id");
           updateField.Quantity=quantity;
           updateField.StorageLocation_id=scopeObj.getFormModelInfo("StorageLocation_id");
           updateField.Userid=scopeObj.getFormModelInfo("Userid");
           
           kony.sdk.mvvm.log.info("@@@ updateOnline : updateField is : " + JSON.stringify(updateField));

           var lisFormModel = this.getController().getFormModel();
            dataObject.setRecord(updateField);
           modelObj.create(dataObject, OnSuccess, OnError);
           function OnSuccess(res)
            {
                // alert("update success\n"+JSON.stringify(res));
                kony.sdk.mvvm.log.info("@@@ updateStockTransferOnline : res : "+JSON.stringify(res));
            }
            function OnError()
            {
                kony.sdk.mvvm.log.error("@@@ update OnlineCall ERROR");
            }
            
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },
    callContact: function() {
        try {
            var scopeObj = this;
            var phoneNumber=scopeObj.getFormModelInfo("phoneNumber");
            if(phoneNumber){
                kony.phone.dial(phoneNumber);    
            }else{
                alert("Contact Number not available for this Stock Location");
            }
            
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },
    showFrmDirectionKA: function() {
        try {
            var scopeObj = this;
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();

            var lat = scopeObj.getFormModelInfo("destinationLat");
            var lon = scopeObj.getFormModelInfo("destinationLon");
            var controllerExtension = appContext.getFormController(kony.servicesapp.FRMDIRECTIONSKA).getControllerExtensionObject();
            var formmodel = appContext.getFormController(kony.servicesapp.FRMDIRECTIONSKA).getFormModel();
            if(lat && lon){
                var controller = scopeObj.getController();
                var orderControllerExtension = controller.getApplicationContext().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
                orderControllerExtension.setFormModelInfo("destinationLat",lat);
                orderControllerExtension.setFormModelInfo("destinationLon",lon);
                formmodel.performActionOnView("mapDirectionKA", "clear", []);
                kony.servicesapp.ISFROMORDEREXECUTION=false;
                controllerExtension.bindData(false);
            }else{
                kony.sdk.mvvm.log.error("Latitude and Longitude are not available for this Stock Location");
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showFrmDirectionKA : " + err);
        }
    },
  	navigateBackToSearchScreen: function() {
        // showHideHamburgerMenuKA1()
        var scopeObj=this;
        var doReload=false;
        showHideHamburgerMenuKA1(kony.application.getCurrentForm(), frmHamburgerMenuWOKA, false, "flxDeleteKA",scb1);
        function scb1(){
            showHideHamburgerMenuKA1(kony.application.getCurrentForm(),frmHamburgerMenuWOKA,false,"flxEditKA",scb2);
            function scb2(){
                scopeObj.$class.$superp.showPreviousForm.call(this, doReload, kony.servicesapp.FRMTASKRESOURCESLISTKA);
            }
        }
    },
    navigateBack: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload, "frmStockLocationListKA");
    }
});