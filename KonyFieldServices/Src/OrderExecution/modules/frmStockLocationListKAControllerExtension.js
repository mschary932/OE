/*
 * Controller Extension class for frmStockLocationListKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Controller Extension.
 * @class frmStockLocationListKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmStockLocationListKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmStockLocationListKAControllerExtension#
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
     * @memberof frmStockLocationListKAControllerExtension#
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
     * @memberof frmStockLocationListKAControllerExtension#
     */
    bindData: function(data) {
        try {
            kony.sdk.mvvm.log.info("@@@ Stock : bindData : data is : " + JSON.stringify(data));
            // var segData = dataMap["segSwipeKA"];
            // kony.sdk.mvvm.log.info("@@@ bindData : segData is : "+JSON.stringify(segData));
            // var isListEmpty=(!(segData.length));
            var formmodel = this.getController().getFormModel();
            // formmodel.clear();
            // var StockLocationWDM = {
            //     "lblMaterailsKA": "StorageLocation_id",
            //     "lblIDKA": "distance",
            //     "lblMaterialValueKA": "Quantity",
            //     "lblMaterialQuantityKA": "LocationDescription"
            // };
            var StockLocationWDM = {
                "lblStockIDKA": "StorageLocation_id",
                "lblDistanceKA": "distance",
                "lblAvailableQuantityKA": "Quantity",
                "lblStockLocationKA": "LocationDescription"
            };

            formmodel.setViewAttributeByProperty("segSwipeKA", "widgetDataMap", StockLocationWDM);
            kony.sdk.mvvm.log.info("@@@ Stock : bindData : StockLocationListData is : " + JSON.stringify(StockLocationListData));
            var SegmentData = StockLocationListData;
            kony.sdk.mvvm.log.info("@@@ Stock : bindData : SegmentData is : " + JSON.stringify(SegmentData));
            formmodel.setViewAttributeByProperty("segSwipeKA", "data", SegmentData);
            this.$class.$superp.bindData.call(this, data);
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
     * @memberof frmStockLocationListKAControllerExtension#
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
     * @memberof frmStockLocationListKAControllerExtension#
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
     * @memberof frmStockLocationListKAControllerExtension#
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
    navigateToResourceExecution: function() {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var material_id = controller.getFormModel().getViewAttributeByProperty("lblResourceIDKA", "text");
            var contextData = controller.getContextData();
            var datamodel = new kony.sdk.mvvm.DataModel();
            datamodel.setPrimaryKeyValueMap({
                "id": material_id
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.addCustomInfo("MaterialId", material_id);
            navigationObject.addCustomInfo("isGlobalSearch", true);
            navigationObject.setQuery("form", kony.servicesapp.ResourcesQuery[kony.servicesapp.RESOURCEEXECINVENTORY], "sql");
            navigationObject.setQueryParams("form", {
                "x": material_id
            });
            navigationObject.setQueryParams("FlexFetchDataUoMKA", {
                "x": material_id
            });
            scopeObj.navigateTo("frmResourceExecutionKA", navigationObject);
        } catch (err) {
            kony.appfoundation.log.error("error in Blogic navigateToResourceExecution from Order Resources List: " + err);
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
    requestStockTransfer: function(quantity) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var selRecord = {};
            selRecord = controller.getFormModel().getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
                kony.sdk.mvvm.log.info("@@@ requestStockTransfer : selRecord is : "+selRecord);

            var formmodel = controller.getFormModel();
            var materialDescription=formmodel.getViewAttributeByProperty("lblDescKA", "text");
            var requestedQuantityNumber=quantity;
            var reqUnitDescription="each";
            var rowData ={
                "MaterialDescription":materialDescription,
                "RequestedQuantityNumber":requestedQuantityNumber,
                "ReqUnitDescription":reqUnitDescription,
            };
            
            var utilitiesObj = utilities.getUtilityObj();
            utilitiesObj.editQuantity(rowData);
            formmodel.setViewAttributeByProperty("flxEditKA", "isVisible",true);
            
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },
    requestPurchase: function(quantity) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var formmodel = controller.getFormModel();

            var materialDescription=formmodel.getViewAttributeByProperty("lblDescKA", "text");
            var requestedQuantityNumber=quantity;
            var rowData ={
                "MaterialName":materialDescription,
                "RequestedQuantityNumber":requestedQuantityNumber
            };
            
            var utilitiesObj = utilities.getUtilityObj();
            utilitiesObj.showStockTransferPopup(true, rowData);
            formmodel.setViewAttributeByProperty("flxEditKA", "isVisible",true);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in call action : " + err);
        }
    },
    editQuantity: function(){
        try{
            var scopeObj = this;
            var controller = scopeObj.getController();
            var formModel = controller && controller.getFormModel();
            var FirstRecord=formModel.getViewAttributeByProperty("segSwipeKA", "data")[0];
                kony.sdk.mvvm.log.info("@@@ editQuantity : FirstRecord is : "+JSON.stringify(FirstRecord));
            var QuantityUnit=FirstRecord.Quantity;
                kony.sdk.mvvm.log.info("@@@ editQuantity : QuantityUnit is : "+JSON.stringify(QuantityUnit));
            var baseUnit="";
            if(QuantityUnit && QuantityUnit.split(": ").length==2){
                var quantity=QuantityUnit.split(": ")[1];
                if(quantity && quantity.split(" ").length==2){
                    baseUnit=quantity.split(" ")[1];
                }
            }
            var materialDescription="Purchase Request";
            var requestedQuantityNumber="1";
            var reqUnitDescription=baseUnit;
            var selRecord ={
                "MaterialDescription":materialDescription,
                "RequestedQuantityNumber":requestedQuantityNumber,
                "ReqUnitDescription":reqUnitDescription
            };
            var utilitiesObj = utilities.getUtilityObj();
            utilitiesObj.editQuantity(selRecord);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic editQuantity: " + err);
        }
    },
    navigateToStockLocationDetails: function() {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var data = controller.getFormModel().getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controllerExtension = appContext.getFormController("frmStockLocationDetailsKA").getControllerExtensionObject();
            controllerExtension.bindData(data);
            // var navigationObject = new kony.sdk.mvvm.NavigationObject();           
            // scopeObj.navigateTo("frmStockLocationDetailsKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToStockLocationDetails from Order Resources List: " + err);
        }
    },
    navigateBack: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload, kony.servicesapp.FRMTASKRESOURCESLISTKA);
    }
});