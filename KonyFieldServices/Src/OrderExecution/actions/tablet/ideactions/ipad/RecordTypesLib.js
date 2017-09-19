kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.constants["RecordTypeFieldName"] = "RecordTypeId";
kony.sdk.mvvm.constants["RecordTypeInfo"] = "RecordTypeInfo";
kony.sdk.mvvm.constants["DefaultKeyName"] = "default";
kony.sdk.mvvm.constants["FormsForRecordTypesKey"] = "FormsForRecordTypes";
kony.sdk.mvvm.RecordTypeNavigationController = Class(kony.sdk.mvvm.NavigationController, {
    constructor: function(applicationContext) {
        kony.sdk.mvvm.RecordTypeNavigationController.$super.call(this, applicationContext);
        this.recordTypesPopup = undefined;
        this.allrecordTypesInfo = undefined;
    },
    init: function(formObjArr) {
        kony.sdk.mvvm.RecordTypeNavigationController.$superp.init.call(this, formObjArr);
    },
    destroy: function() {
        kony.sdk.mvvm.log.info("Destroying navgation controller for record types - start");
        if (this.recordTypesPopup !== undefined) {
            this.recordTypesPopup.destroy();
            this.recordTypesPopup = undefined;
        }
        this.allrecordTypesInfo = undefined;
        kony.sdk.mvvm.RecordTypeNavigationController.$superp.destroy.call(this);
        kony.sdk.mvvm.log.info("Destroying navgation controller for record types - end");
    },
    loadForm: function(formId) {
        kony.sdk.mvvm.RecordTypeNavigationController.$superp.loadForm.call(this, formId);
    },
    createPopup: function(entity, formType, navData, navErrCallback) {
        var scopeObj = this;
        var popupBasic = {
            "id": "recordTypesPopup",
            "title": "Select Record Type",
            "transparencyBehindThePopup": 30,
            "skin": "frm",
            "isModal": false
        };
        var popupLayout = {
            "padding": [0, 0, 0, 0],
            "containerWeight": 80,
            "containerHeight": null,
            "paddingInPixel": false,
            "layoutType": constants.CONTAINER_LAYOUT_BOX
        };
        var popupPSP = {
            "windowSoftInputMode": constants.POPUP_ADJUST_RESIZE,
            "inTransitionConfig": {
                "animation": 0
            },
            "outTransitionConfig": {
                "animation": 0
            }
        };
        var recordTypesPopup = new kony.ui.Popup(popupBasic, popupLayout, popupPSP);
        var cbxBasic = {
            "id": "recordTypesCbx",
            "isVisible": true
        };
        var cbxLayout = {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "vExpand": false,
            "hExpand": true,
            "margin": [0, 1, 1, 1],
            "padding": [1, 1, 1, 1],
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "marginInPixel": false,
            "paddingInPixel": false,
            "containerWeight": 5
        };
        var cbxPsp = {
            "popupTitle": "Record Type of new record"
        };
        var recordTypesCbx = new kony.ui.ComboBox(cbxBasic, cbxLayout, cbxPsp);
        var btnBasic = {
            id: "goBtn",
            isVisible: true,
            text: "Continue",
            onClick: onGoCallBck
        };
        var btnLayout = {
            containerWeight: 100,
            padding: [5, 5, 5, 5],
            margin: [5, 5, 5, 5],
            hExpand: true,
            vExpand: false,
            displayText: true
        };
        var btn = new kony.ui.Button(btnBasic, btnLayout, {});
        recordTypesPopup.add(recordTypesCbx);
        recordTypesPopup.add(btn);

        function onGoCallBck() {
            var selectedRecordType = scopeObj.recordTypesPopup.recordTypesCbx.selectedKey;
            var formid = scopeObj.getFormIdForRecordType(entity, formType, selectedRecordType);
            scopeObj.recordTypesPopup.dismiss();
            scopeObj.recordTypesPopup.destroy();
            if (formid === undefined) {
                formid = scopeObj.getFormIdForRecordType(entity, formType, kony.sdk.mvvm.constants["DefaultKeyName"]);
                if (formid === undefined) {
                    throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE + " - " + formType + " - and entity - " + entity);
                }
            }
            var recordTypeInfo = scopeObj.allrecordTypesInfo[entity]["recordTypes"][selectedRecordType];
            navData.addCustomInfo(kony.sdk.mvvm.constants["RecordTypeInfo"], recordTypeInfo);
            if (recordTypeInfo !== undefined && recordTypeInfo !== null) navData.addCustomInfo(kony.sdk.mvvm.constants["RecordTypeFieldName"], recordTypeInfo.recordTypeId);
            scopeObj.continueNavigation(formid, navData, navErrCallback);
        };
        this.recordTypesPopup = recordTypesPopup;
    },
    getFormIdForRecordType: function(entity, formType, recordTypeName) {
        var allRecordTypesInfo = this.allrecordTypesInfo;
        var formid = undefined;
        var channelName = kony.sdk.mvvm.Utils.getChannelName();
        var formsForRecordTypes = this.application.getApplicationProperties().getApplicationPropertiesByKey(kony.sdk.mvvm.constants["FormsForRecordTypesKey"]);
        if (formsForRecordTypes && formsForRecordTypes[entity] && formsForRecordTypes[entity][recordTypeName]) {
            var forms = formsForRecordTypes[entity][recordTypeName].forms[channelName];
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].formType === formType) {
                    formid = forms[i].formid;
                    break;
                }
            }
        }
        return formid;
    },
    continueNavigation: function(formId, navData, navErrCallback) {
        kony.sdk.mvvm.RecordTypeNavigationController.$superp.navigateTo.call(this, formId, navData, navErrCallback);
    },
    loadMasterDataToRecordTypesCbx: function(masterData, defaultRecordType) {
        var cbxMasterData = [];
        var len = masterData.length;
        for (var i = 0; i < len; i++) {
            cbxMasterData.push([masterData[i], masterData[i]]);
        }
        this.recordTypesPopup.recordTypesCbx.masterData = cbxMasterData;
        if (defaultRecordType) this.recordTypesPopup.recordTypesCbx.selectedKey = defaultRecordType;
    },
    navigateTo: function(formId, navData, navErrCallback, entity, formType) {
        kony.sdk.mvvm.log.info("In navigate to record typeNavigationController ");
        try {
            if (!(navData instanceof kony.sdk.mvvm.NavigationObject) || navData === undefined || navData === null) {
                navData = new kony.sdk.mvvm.NavigationObject();
            }
            if (entity == undefined && formType == undefined) {
                kony.sdk.mvvm.RecordTypeNavigationController.$superp.navigateTo.call(this, formId, navData, navErrCallback);
                return;
            }
            if (entity === undefined || entity === null || entity === "") {
                throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ENTITY_NOT_SPECIFIED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ENTITY_NOT_SPECIFIED);
            }
            if (formType === undefined || formType === null || formType === "") {
                throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMTYPE_NOT_SPECIFIED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMTYPE_NOT_SPECIFIED);
            }
            var allRecordTypesInfo = this.getRecordTypesInfo();
            if (allRecordTypesInfo === null || allRecordTypesInfo === undefined || allRecordTypesInfo[entity] === undefined || allRecordTypesInfo[entity] === null) {
                //throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_RECORDTYPES_NOT_AVAILABLE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_RECORDTYPES_NOT_AVAILABLE);
                kony.sdk.mvvm.log.info("No Recordtypes for the given entity, hence navigating to given formid");
                this.continueNavigation(formId, navData, navErrCallback);
                return;
            }
            var recTypesforEntity = allRecordTypesInfo[entity]["recordTypes"];
            if (formType === "add") {
                var masterData = [];
                var defaultRecordType, noOfAvailTypes = 0;
                for (var recordTypeName in recTypesforEntity) {
                    if (recTypesforEntity[recordTypeName][kony.sdk.mvvm.constants["DefaultKeyName"]] === true && recTypesforEntity[recordTypeName]["available"] === true) {
                        defaultRecordType = recordTypeName;
                    }
                    if (recTypesforEntity[recordTypeName]["available"] === true) {
                        noOfAvailTypes += 1;
                        var recName = recTypesforEntity[recordTypeName]["name"];
                        masterData.push(recName);
                    }
                }
                //If recordTypes for given entity is empty then get formid for default formtype and navigate.
                if (noOfAvailTypes === 0) {
                    formid = this.getFormIdForRecordType(entity, formType, kony.sdk.mvvm.constants["DefaultKeyName"]);
                    if (formid === undefined) {
                        throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE + " - " + formType + " - and entity - " + entity);
                    }
                    this.continueNavigation(formid, navData, navErrCallback); //Recordtype info is undefined since we've navigated to default
                } else if (noOfAvailTypes === 1) { //if only 1 record type is defined, don't show popup and directly navigate
                    formid = this.getFormIdForRecordType(entity, formType, masterData[0]);
                    recordTypeInfo = recTypesforEntity[masterData[0]];
                    if (formid === undefined) {
                        formid = this.getFormIdForRecordType(entity, formType, kony.sdk.mvvm.constants["DefaultKeyName"]);
                        if (formid === undefined) {
                            throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE + " - " + masterData[0]);
                        }
                    }
                    navData.addCustomInfo(kony.sdk.mvvm.constants["RecordTypeInfo"], recordTypeInfo);
                    if (recordTypeInfo !== undefined && recordTypeInfo !== null) navData.addCustomInfo(kony.sdk.mvvm.constants["RecordTypeFieldName"], recordTypeInfo.recordTypeId);
                    kony.print("navigation data before continue " + kony.sdk.mvvm.util.stringifyKonyObject(navData));
                    this.continueNavigation(formid, navData, navErrCallback);
                } else {
                    this.createPopup(entity, formType, navData, navErrCallback);
                    this.loadMasterDataToRecordTypesCbx(masterData, defaultRecordType);
                    this.recordTypesPopup.show();
                }
            } else if (formType === "edit") {
                var recordTypeId = navData.getCustomInfo(kony.sdk.mvvm.constants["RecordTypeFieldName"]);
                kony.sdk.mvvm.log.info(" record type id --- " + recordTypeId);
                var formid, recordTypeName, recordTypeInfo;
                if (recordTypeId === undefined || recordTypeId === null || recordTypeId === "") { // if no recordtype, navigate to default
                    formid = this.getFormIdForRecordType(entity, formType, kony.sdk.mvvm.constants["DefaultKeyName"]);
                    if (formid === undefined) {
                        throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE);
                    }
                } else {
                    var recordTypeName = getRecordTypeNameFromId(recordTypeId);
                    formid = this.getFormIdForRecordType(entity, formType, recordTypeName);
                    recordTypeInfo = recTypesforEntity[recordTypeName];
                    if (formid === undefined) {
                        formid = this.getFormIdForRecordType(entity, formType, kony.sdk.mvvm.constants["DefaultKeyName"]);
                        if (formid === undefined) {
                            throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE + " - " + masterData[0]);
                        }
                    }
                }
                navData.addCustomInfo(kony.sdk.mvvm.constants["RecordTypeInfo"], recordTypeInfo);
                if (recordTypeInfo !== undefined && recordTypeInfo !== null) navData.addCustomInfo(kony.sdk.mvvm.constants["RecordTypeFieldName"], recordTypeInfo.recordTypeId);
                this.continueNavigation(formid, navData, navErrCallback);

                function getRecordTypeNameFromId(recordTypeId) {
                    var recordTypeName;
                    if (recordTypeId !== kony.sdk.mvvm.constants["DefaultKeyName"]) {
                        for (var key in recTypesforEntity) {
                            if (recTypesforEntity[key]["recordTypeId"] === recordTypeId) {
                                recordTypeName = key;
                                break;
                            }
                        }
                    }
                    return recordTypeName;
                }
            }
        } catch (err) {
            if (err instanceof kony.sdk.mvvm.Exception) throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FAILED_TO_NAVIGATE_TO_FORM, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FAILED_TO_NAVIGATE_TO_FORM + " : " + formId, err);
            if (err instanceof Error) throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FAILED_TO_NAVIGATE_TO_FORM, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FAILED_TO_NAVIGATE_TO_FORM + "-" + formId + " -- " + err.name + ":" + err.message);
        }
    },
    goBack: function(doReload, navData, reloadFromLookUP) {
        kony.sdk.mvvm.RecordTypeNavigationController.$superp.goBack.call(this, doReload, navData, reloadFromLookUP);
    },
    saveForm: function(isInsert, successCallBack, errorCallBack, presaveCallBack) {
        if (isInsert) {
            var recordtypeid;
            var navdata = this.formNavStack[this.formNavStack.length - 1]["navData"];
            if (navdata && navdata.getCustomInfo(kony.sdk.mvvm.constants["RecordTypeFieldName"])) {
                recordtypeid = navdata.getCustomInfo(kony.sdk.mvvm.constants["RecordTypeFieldName"]);
            }
            if (recordtypeid) {
                var old = presaveCallBack;
                if (typeof presaveCallBack === "function") {
                    presaveCallBack = function(model, succ, err) {
                        model.set(kony.sdk.mvvm.constants["RecordTypeFieldName"], recordtypeid);
                        old(model, succ, err);
                    }
                } else {
                    presaveCallBack = function(model, succ, err) {
                        model.set(kony.sdk.mvvm.constants["RecordTypeFieldName"], recordtypeid);
                        succ(model);
                    }
                }
            }
        }
        kony.sdk.mvvm.RecordTypeNavigationController.$superp.saveForm.call(this, isInsert, successCallBack, errorCallBack, presaveCallBack);
    },
    deleteRecord: function(successCallBack, errorCallBack) {
        kony.sdk.mvvm.RecordTypeNavigationController.$superp.deleteRecord.call(this, successCallBack, errorCallBack);
    },
    getViewController: function(formId) {
        var viewController = kony.sdk.mvvm.RecordTypeNavigationController.$superp.getViewController.call(this, formId);
        return viewController;
    },
    setRecordTypesInfo: function(recordTypes) {
        kony.print("setting record type info  " + kony.sdk.mvvm.util.stringifyKonyObject(recordTypes));
        this.allrecordTypesInfo = recordTypes;
    },
    getRecordTypesInfo: function() {
        return this.allrecordTypesInfo;
    }
});
kony.sdk.mvvm.RecordTypeSegmentWidgetController = Class(kony.sdk.mvvm.WidgetController, {
    constructor: function(konyWidget, widgetConfig, metadata, formConfig) {
        kony.sdk.mvvm.RecordTypeSegmentWidgetController.$super.call(this, konyWidget, widgetConfig, metadata, formConfig);
        this.segmentWidgetController = new kony.sdk.mvvm.SegmentWidgetController(konyWidget, widgetConfig, metadata, formConfig);
    },
    destroy: function() {
        this.segmentWidgetController.destroy();
    },
    fetchData: function(successCallBack, errorCallBack, navData) {
        var entityMetaData = this.metadata.entityMetadata;
        for (var k = 0; k < entityMetaData["fields"].length; k++) {
            var columnName = entityMetaData["fields"][k].name;
            kony.sdk.mvvm.log.debug("field ---> " + columnName);
            if (columnName === kony.sdk.mvvm.constants["RecordTypeFieldName"]) {
                kony.sdk.mvvm.log.info(" found column name " + columnName);
                this.segmentWidgetController.formAdditionalFields.push(columnName);
                break;
            }
        }
        this.segmentWidgetController.fetchData(successCallBack, errorCallBack, navData);
    },
    getNextListData: function(succCallBack, errCallBack, dataCallback, navData) {
        this.segmentWidgetController.getNextListData(succCallBack, errCallBack, dataCallback, navData);
    },
    setDataToWidget: function(data) {
        this.segmentWidgetController.setDataToWidget(data);
    },
    addDataToSegment: function(data, index) {
        this.segmentWidgetController.addDataToSegment(data, index);
    },
    getData: function() {
        return this.segmentWidgetController.getData();
    },
    getDataFromWidget: function() {
        return this.segmentWidgetController.getDataFromWidget();
    },
    updateData: function() {
        this.segmentWidgetController.updateData();
    },
    isValueChanged: function() {
        return this.segmentWidgetController.isValueChanged();
    },
    loadMasterData: function(successCallBack, errorCallBack, navData) {
        this.segmentWidgetController.loadMasterData(successCallBack, errorCallBack, navData);
    },
    clear: function() {
        this.segmentWidgetController.clear();
    }
});
kony.sdk.mvvm.RecordTypeComboBoxWidgetController = Class(kony.sdk.mvvm.WidgetController, {
    constructor: function(konyWidget, widgetConfig, metadata, formConfig) {
        this.$class.$super.call(this, konyWidget, widgetConfig, metadata, formConfig);
        this.comboWidgetController = new kony.sdk.mvvm.ComboBoxWidgetController(konyWidget, widgetConfig, metadata, formConfig);
    },
    destroy: function() {
        this.$class.$superp.destroy.call(this);
    },
    getData: function() {},
    clear: function() {},
    fetchData: function(successCallBack, errorCallBack, navData) {
        this.comboWidgetController.fetchData(successCallBack, errorCallBack, navData);
    },
    updateData: function() {
        this.comboWidgetController.updateData();
    },
    isValueChanged: function() {
        var isValueChanged = this.comboWidgetController.isValueChanged();
        return isValueChanged;
    },
    getDataFromWidget: function() {
        var data = this.comboWidgetController.getDataFromWidget();
        return data;
    },
    setDataToWidget: function(data) {
        this.comboWidgetController.setDataToWidget(data);
    },
    loadMasterData: function(successCallBack, errorCallBack) {
        //alert("Custom combo box record type");
        var data;
        var entity;
        var primaryField;
        var fields = [];
        var criteriaObj = null;
        var scopeObj = this;
        kony.sdk.mvvm.log.info("HK 888 1 --> ", this.columnMetadata);
        if (this.columnMetadata === undefined || this.columnMetadata === null) {
            successCallBack.call(this, true);
            return;
        }
        if (this.columnMetadata.type && this.columnMetadata.type === "reference") {
            var refFld, refDisplayFld, query;
            entity = this.columnMetadata.parentTableName;
            refFld = this.columnMetadata.parentPrimaryKeyName;
            refDisplayFld = this.columnMetadata.parentFieldName;
            fields.push(refFld);
            fields.push(refDisplayFld);
            query = kony.sdk.mvvm.Util.getQueryForFields(entity, fields, criteriaObj);
            kony.sdk.mvvm.log.info("HK 888 2 --> ", query);
            if (fields.length > 0 && query !== undefined) {
                dataProvider = kony.sdk.mvvm.KonyApplicationContext.getDataProvider();
                dataProvider.fetch(query, function(response) {
                    if (response === undefined || response === null) {
                        scopeObj.konyWidget.masterData = [];
                        errorCallBack.call(this);
                        return;
                    }
                    var masterData = [];
                    var masterDataElement = [];
                    masterDataElement.push(-1);
                    masterDataElement.push("Select...");
                    masterData.push(masterDataElement);
                    for (var i = 0; i < response.length; i++) {
                        masterDataElement = [];
                        masterDataElement.push(response[i][refFld]);
                        masterDataElement.push(response[i][refDisplayFld]);
                        masterData.push(masterDataElement);
                    }
                    scopeObj.konyWidget.masterData = masterData;
                    scopeObj.konyWidget.selectedKey = -1; //setting default selection
                    successCallBack.call(this, true);
                }, function(error) {
                    scopeObj.konyWidget.masterData = [];
                    errorCallBack.call(this);
                });
            } else {
                kony.sdk.mvvm.log.error("no reference found");
                successCallBack.call(this, true);
            }
        } else if (this.columnMetadata.type && this.columnMetadata.type === "picklist") {
            var navigationController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getNavigController();
            var viewController = navigationController.getViewController(this.formConfig.formid);
            var formcontroller = viewController.getFormDataController();
            var navData = formcontroller.navigationData;
            kony.sdk.mvvm.log.info("navigation data in load master data for new combo box ---> " + kony.sdk.mvvm.util.stringifyKonyObject(navData));
            if (navData && navData.getCustomInfo(kony.sdk.mvvm.constants["RecordTypeInfo"])) {
                var recordType = navData.getCustomInfo(kony.sdk.mvvm.constants["RecordTypeInfo"]);
                var fieldname = scopeObj.widgetConfig.fieldprops.field;
                var picklistValuesForField = recordType.pickListFields[fieldname];
                kony.sdk.mvvm.log.info("picklistvalues --> " + kony.sdk.mvvm.util.stringifyKonyObject(picklistValuesForField));
                var defaultKey;
                var masterData = [];
                //var defaultSelectionKey;
                for (var i = 0; i < picklistValuesForField.length; i++) {
                    var val = picklistValuesForField[i].value;
                    var key = picklistValuesForField[i].label;
                    if (picklistValuesForField[i].defaultValue === true) {
                        defaultKey = key;
                    }
                    masterData.push([key, val]);
                }
                this.konyWidget.masterData = masterData;
                scopeObj.konyWidget.selectedKey = defaultKey; //setting default selection
                successCallBack.call(this, true);
            } else {
                var picklistVals = this.columnMetadata.pickListValues;
                var masterData = [];
                var defaultSelectionKey;
                for (var i = 0; i < picklistVals.length; i++) {
                    var pickListItem = picklistVals[i];
                    var val = pickListItem.getLabel();
                    var key = pickListItem.getValue();
                    masterData.push([key, val]);
                    if (i === 0) defaultSelectionKey = key;
                }
                this.konyWidget.masterData = masterData;
                scopeObj.konyWidget.selectedKey = defaultSelectionKey; //setting default selection
                successCallBack.call(this, true);
            }
        } else {
            //Leave it as it is
            successCallBack.call(this, true);
        }
    }
});
kony.sdk.mvvm.RecordTypeListBoxWidgetController = Class(kony.sdk.mvvm.WidgetController, {
    constructor: function(konyWidget, widgetConfig, metadata, formConfig) {
        this.$class.$super.call(this, konyWidget, widgetConfig, metadata, formConfig);
        this.listboxWidgetController = new kony.sdk.mvvm.ListBoxWidgetController(konyWidget, widgetConfig, metadata, formConfig);
    },
    destroy: function() {
        this.$class.$superp.destroy.call(this);
    },
    getData: function() {},
    clear: function() {},
    fetchData: function(successCallBack, errorCallBack, navData) {
        this.listboxWidgetController.fetchData(successCallBack, errorCallBack, navData);
    },
    updateData: function() {
        this.listboxWidgetController.updateData();
    },
    isValueChanged: function() {
        var isValueChanged = this.listboxWidgetController.isValueChanged();
        return isValueChanged;
    },
    getDataFromWidget: function() {
        var data = this.listboxWidgetController.getDataFromWidget();
        return data;
    },
    setDataToWidget: function(data) {
        this.listboxWidgetController.setDataToWidget(data);
    },
    loadMasterData: function(successCallBack, errorCallBack) {
        //alert("Custom combo box record type");
        var data;
        var entity;
        var primaryField;
        var fields = [];
        var criteriaObj = null;
        var scopeObj = this;
        kony.sdk.mvvm.log.info("HK 888 1 --> ", this.columnMetadata);
        if (this.columnMetadata === undefined || this.columnMetadata === null) {
            successCallBack.call(this, true);
            return;
        }
        if (this.columnMetadata.type && this.columnMetadata.type === "reference") {
            var refFld, refDisplayFld, query;
            entity = this.columnMetadata.parentTableName;
            refFld = this.columnMetadata.parentPrimaryKeyName;
            refDisplayFld = this.columnMetadata.parentFieldName;
            fields.push(refFld);
            fields.push(refDisplayFld);
            query = kony.sdk.mvvm.Util.getQueryForFields(entity, fields, criteriaObj);
            kony.sdk.mvvm.log.info("HK 888 2 --> ", query);
            if (fields.length > 0 && query !== undefined) {
                dataProvider = kony.sdk.mvvm.KonyApplicationContext.getDataProvider();
                dataProvider.fetch(query, function(response) {
                    if (response === undefined || response === null) {
                        scopeObj.konyWidget.masterData = [];
                        errorCallBack.call(this);
                        return;
                    }
                    var masterData = [];
                    var masterDataElement = [];
                    masterDataElement.push(-1);
                    masterDataElement.push("Select...");
                    masterData.push(masterDataElement);
                    for (var i = 0; i < response.length; i++) {
                        masterDataElement = [];
                        masterDataElement.push(response[i][refFld]);
                        masterDataElement.push(response[i][refDisplayFld]);
                        masterData.push(masterDataElement);
                    }
                    scopeObj.konyWidget.masterData = masterData;
                    scopeObj.konyWidget.selectedKey = -1; //setting default selection
                    successCallBack.call(this, true);
                }, function(error) {
                    scopeObj.konyWidget.masterData = [];
                    errorCallBack.call(this);
                });
            } else {
                kony.sdk.mvvm.log.error("no reference found");
                successCallBack.call(this, true);
            }
        } else if (this.columnMetadata.type && this.columnMetadata.type === "picklist") {
            var navigationController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getNavigController();
            var viewController = navigationController.getViewController(this.formConfig.formid);
            var formcontroller = viewController.getFormDataController();
            var navData = formcontroller.navigationData;
            kony.sdk.mvvm.log.info("navigation data in load master data for new combo box ---> " + kony.sdk.mvvm.util.stringifyKonyObject(navData));
            if (navData && navData.getCustomInfo(kony.sdk.mvvm.constants["RecordTypeInfo"])) {
                var recordType = navData.getCustomInfo(kony.sdk.mvvm.constants["RecordTypeInfo"]);
                var fieldname = scopeObj.widgetConfig.fieldprops.field;
                var picklistValuesForField = recordType.pickListFields[fieldname];
                kony.sdk.mvvm.log.info("picklistvalues --> " + kony.sdk.mvvm.util.stringifyKonyObject(picklistValuesForField));
                var defaultKey;
                var masterData = [];
                //var defaultSelectionKey;
                for (var i = 0; i < picklistValuesForField.length; i++) {
                    var val = picklistValuesForField[i].value;
                    var key = picklistValuesForField[i].label;
                    if (picklistValuesForField[i].defaultValue === true) {
                        defaultKey = key;
                    }
                    masterData.push([key, val]);
                }
                this.konyWidget.masterData = masterData;
                scopeObj.konyWidget.selectedKey = defaultKey; //setting default selection
                successCallBack.call(this, true);
            } else {
                var picklistVals = this.columnMetadata.pickListValues;
                var masterData = [];
                var defaultSelectionKey;
                for (var i = 0; i < picklistVals.length; i++) {
                    var pickListItem = picklistVals[i];
                    var val = pickListItem.getLabel();
                    var key = pickListItem.getValue();
                    masterData.push([key, val]);
                    if (i === 0) defaultSelectionKey = key;
                }
                this.konyWidget.masterData = masterData;
                scopeObj.konyWidget.selectedKey = defaultSelectionKey; //setting default selection
                successCallBack.call(this, true);
            }
        } else {
            //Leave it as it is
            successCallBack.call(this, true);
        }
    }
});
kony.sdk.mvvm.GetRecordTypes = function(sessionToken, mockedDevice, successCallback, serviceErrorCallback) {
    var headers = {
        Accept: "application/json",
        session_token: sessionToken.token
    };
    if (!kony.sdk.mvvm.constants["ISCLOUD"]) {
        headers["tenant"] = sessionToken.tenant;
    }
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var entitiesStr = "";
    if (INSTANCE) {
        var formsForRecordTypes = INSTANCE.getApplicationProperties().getApplicationPropertiesByKey(kony.sdk.mvvm.constants["FormsForRecordTypesKey"]);
        if (formsForRecordTypes) {
            var entityList = Object.keys(formsForRecordTypes);
            var entitiesLen = entityList.length;
            if (entitiesLen === 0) {
                var exception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMSFORRECORDTYPES_MAP_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMSFORRECORDTYPES_MAP_NOT_DEFINED);
                serviceErrorCallback(exception);
            }
            for (var i = 0; i < entitiesLen; i++) {
                entitiesStr += entityList[i] + ",";
            }
            entitiesStr = entitiesStr.substring(0, entitiesStr.length - 1);
            kony.print(" entitiesStr " + entitiesStr);
            kony.sdk.mvvm.theAjaxProvider.get(kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/metadata/v1/customMetadata?$entity=" + entitiesStr, kony.sdk.mvvm.constants.HTTP_METHOD_GET, headers, callbackHandler, serviceErrorCallback, null);
        } else {
            var exception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMSFORRECORDTYPES_MAP_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMSFORRECORDTYPES_MAP_NOT_DEFINED);
            serviceErrorCallback(exception);
            return;
        }
    } else {
        var exception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAAS_INSTANCE_NOTDEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAAS_INSTANCE_NOTDEFINED);
        serviceErrorCallback(exception);
    }

    function callbackHandler(response) {
        if (response !== null && response !== undefined) {
            kony.print(" IN get record types  " + kony.sdk.mvvm.util.stringifyKonyObject(response));
            successCallback(response.RecordType);
        }
    }
};