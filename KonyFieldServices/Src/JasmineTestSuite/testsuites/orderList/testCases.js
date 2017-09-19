var NO_ERROR_CODE = -1;
var dbPath = '../SFtest';
var sqldb;
var INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance(), duration = 5000;
var flx1;
var apptype = {"APPTYPE":"AFN"};
kony.appfoundation.v2.KonyApplicationContext.init(apptype);
describe("OrderList module: Load database, i18n", function(){
    var flag, errCode;
	beforeEach(function() {
        errCode = NO_ERROR_CODE;
		flag = false;
    });
    function loadDBFile(){
		try{
			var xhr = new XMLHttpRequest();
			xhr.open('GET', dbPath, true);
			xhr.responseType = 'arraybuffer';
			xhr.onload = function(e) {
				flag = true;
				var data = new Uint8Array(this.response);
				var arr = new Array();
				for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
				data = (arr.join(""));
				sqldb = new SQL.Database(data);
			};
			xhr.send();
		}catch(err){
			errCode = err.code;
			flag = true;
		}
    };
    it("Load DB file", function(){
        runs(function(){
            loadDBFile();
        });
        waitsFor(function(){
            return flag;
        });
        runs(function(){
            kony.appfoundation.log.info("db file loaded -> ");
            expect(flag).toBe(true);
            expect(sqldb).not.toBeUndefined();
			expect(errCode).toEqual(NO_ERROR_CODE);
        })
    });
	it("Load i18n file", function(){
        runs(function(){
			try{
			jQuery.i18n.properties({
				name:'i18n', 
				path:'../../OrderExecution/',
				mode:'both',
				callback: function() {
					flag = true;
				}
			});
			}catch(err){
				errCode = err.code;
				flag = true;
			}
        });
        waitsFor(function(){
            return flag;
        });
        runs(function(){
            kony.appfoundation.log.info("i18n file loaded -> ");
            expect(flag).toBe(true);
			expect(errCode).toEqual(NO_ERROR_CODE);
        })
    });
});
describe("OrderList module: Create dummy records", function() {
	overrideMethods();
	var errCode, formController, controllerextension;
	beforeEach(function() {
        errCode = NO_ERROR_CODE;
		kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.PROCESSING;
    });
	it("Login", function() {
        function loginSuccess(response) {
			try{
				kony.appfoundation.log.info("Login success ** " + JSON.stringify(response));
				INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance();
				INSTANCE.setOnlineStatus(false);
				kony.appfoundation.v2.initApplicationForms(INSTANCE);
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;	
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
        };
        function loginError(err) {
			kony.appfoundation.log.info("Login error ** " + JSON.stringify(err));
            errCode = err.code;
            kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
        };
        runs(function() {
			var isMocked = {
                "isMocked": true,
                "mockDbPath" : "../SFtest"
            };
            var syncOptions = {
                "syncMetadata": true,
                "syncData": false
            };
            var authParams = {
                "username": "postgres",
                "password": "",
                "tenant": "test",
                "hostName": "dummy"
            };
            var configParams = {
                "DataService" : "kony.appfoundation.MockDataService",
                "UIConfigService": "kony.appfoundation.MockUIConfigService",
                "MetadataService":"kony.appfoundation.MockMetadataService"
            };
            var params = {
                "authParams": authParams,
                "configParams" : configParams,
				"syncOptions" : syncOptions
            };
            kony.appfoundation.v2.KonyApplicationContext.appServicesLogin(params, loginSuccess, loginError);
        });
        waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
    });

	it("Create address records", function() {
		var swSuccess = function(res) {
			try{
				kony.appfoundation.log.info("** address records create success ** " + JSON.stringify(res));
				var len = kony.servicesapp.MOCKED_DATA_ADDRESS.length;
				for (var i = 0; i <len; i++) {
					kony.servicesapp.MOCKED_DATA_ADDRESS[i]["id"] = res[i].id;
				}
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		};
		var swError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var swRecordObjects = [];
				var swRecordObject;
				var len = kony.servicesapp.MOCKED_DATA_ADDRESS.length;
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				for (var i = 0; i <len; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("Address");
					swRecordObject.set("Address1", kony.servicesapp.MOCKED_DATA_ADDRESS[i]["Address1"]);
					swRecordObject.set("Address2", kony.servicesapp.MOCKED_DATA_ADDRESS[i]["Address2"]);
					swRecordObject.set("Address3", kony.servicesapp.MOCKED_DATA_ADDRESS[i]["Address3"]);
					swRecordObject.set("Address4", kony.servicesapp.MOCKED_DATA_ADDRESS[i]["Address4"]);
					swRecordObject.set("City_id", kony.servicesapp.MOCKED_DATA_ADDRESS[i]["City_id"]);
					swRecordObject.set("Latitude", kony.servicesapp.MOCKED_DATA_ADDRESS[i]["Latitude"]);
					swRecordObject.set("Logitude", kony.servicesapp.MOCKED_DATA_ADDRESS[i]["Logitude"]);
					swRecordObject.set("Region_id", kony.servicesapp.MOCKED_DATA_ADDRESS[i]["Region_id"]);
					swRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(swRecordObjects, swSuccess, swError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	it("Create Priority records", function() {
		var swSuccess = function(res) {
			try{
				kony.appfoundation.log.info("** priority records create success ** " + JSON.stringify(res));
				var len = kony.servicesapp.MOCKED_DATA_PRIORITY.length;
				for (var i = 0; i <len; i++) {
					kony.servicesapp.MOCKED_DATA_PRIORITY[i]["id"] = res[i].id;
				}
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		};
		var swError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var swRecordObjects = [];
				var swRecordObject;
				var len = kony.servicesapp.MOCKED_DATA_PRIORITY.length;
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				for (var i = 0; i <len; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("Priority");
					swRecordObject.set("Description", kony.servicesapp.MOCKED_DATA_PRIORITY[i]["Description"]);
					swRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(swRecordObjects, swSuccess, swError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	
	it("Create order list records", function() {
		var orderListSuccess = function(res) {
			try{
				kony.appfoundation.log.info("** order list records create success ** " + JSON.stringify(res));
				var len = kony.servicesapp.MOCKED_DATA_ORDER_LIST.length;
				for (var i = 0; i <len; i++) {
					kony.servicesapp.MOCKED_DATA_ORDER_LIST[i]["id"] = res[i].id;
				}
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		};
		var orderListError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var orderListRecordObjects = [];
				var swRecordObject;
				var address, priority, dateVal;
				var dateTimeFormat = kony.servicesapp.MOCKED_CONSTANTS["dateTimeFormat"];
				var len = kony.servicesapp.MOCKED_DATA_ORDER_LIST.length;
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				for (var i = 0; i < len; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("WorkOrder");
					address = new kony.appfoundation.v2.persistent.Record("Address");
					address.set("id",kony.servicesapp.MOCKED_DATA_ADDRESS[i]["id"]);
					priority = new kony.appfoundation.v2.persistent.Record("Priority");
					priority.set("id",kony.servicesapp.MOCKED_DATA_PRIORITY[i]["id"]);
					swRecordObject.set("Address_id", address);
					swRecordObject.set("Description", kony.servicesapp.MOCKED_DATA_ORDER_LIST[i]["Description"]);
					swRecordObject.set("Status_id", kony.servicesapp.MOCKED_DATA_STATUS[i]["Description"]);
					kony.servicesapp.MOCKED_DATA_ORDER_LIST["Status_id"] = kony.servicesapp.MOCKED_DATA_STATUS[i]["Description"];
					swRecordObject.set("Priority", priority);
					dateVal = moment().format(dateTimeFormat)
     				kony.servicesapp.MOCKED_DATA_ORDER_LIST[i]["PlannedStartDate"] = dateVal;
     				swRecordObject.set("PlannedStartDate", dateVal);
					swRecordObject.set("Code", kony.servicesapp.MOCKED_DATA_ORDER_LIST[i]["Code"]);
					swRecordObject.set("Instructions", kony.servicesapp.MOCKED_DATA_ORDER_LIST[i]["Instructions"]);
					orderListRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(orderListRecordObjects, orderListSuccess, orderListError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	it("Create contact records", function() {
		var contactSuccess = function(res) {
			try{
				kony.appfoundation.log.info("** contact records create success ** " + JSON.stringify(res));
				var len = kony.servicesapp.MOCKED_DATA_CONTACT.length;
				for (var i = 0; i <len; i++) {
					kony.servicesapp.MOCKED_DATA_CONTACT[i]["id"] = res[i].id;
				}
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		};
		var contactError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var swRecordObjects = [];
				var swRecordObject;
				var len = kony.servicesapp.MOCKED_DATA_CONTACT.length;
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				for (var i = 0; i < len; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("Contact");
					swRecordObject.set("AlternatePhone", kony.servicesapp.MOCKED_DATA_CONTACT[i]["AlternatePhone"]);
					swRecordObject.set("Email", kony.servicesapp.MOCKED_DATA_CONTACT[i]["Email"]);
					swRecordObject.set("FirstName", kony.servicesapp.MOCKED_DATA_CONTACT[i]["FirstName"]);
					swRecordObject.set("LastName", kony.servicesapp.MOCKED_DATA_CONTACT[i]["LastName"]);
					swRecordObject.set("PrimaryPhone", kony.servicesapp.MOCKED_DATA_CONTACT[i]["PrimaryPhone"]);
					swRecordObject.set("PrimaryExtension", kony.servicesapp.MOCKED_DATA_CONTACT[i]["PrimaryExtension"]);
					swRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(swRecordObjects, contactSuccess, contactError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	
	it("Create workordercontact records", function() {
		var workordercontactSuccess = function(res) {
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		var workordercontactError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var workorderRecordObjects = [];
				var swRecordObject,orderRecordObject,contactRecordObject;
				var len = 4;
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				var orderData = kony.servicesapp.MOCKED_DATA_ORDER_LIST;
				var contactData = kony.servicesapp.MOCKED_DATA_CONTACT;
				for (var i = 0; i < len; i++) {
					
					
					swRecordObject = new kony.appfoundation.v2.persistent.Record("WorkOrderContact");
					swRecordObject.set("Contact_id", contactData[i]["id"]);
					swRecordObject.set("WorkOrder_id", orderData[i]["id"]);
					swRecordObject.set("Sequence", kony.servicesapp.MOCKED_DATA_ORDER_LIST[i]["id"]);
					workorderRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(workorderRecordObjects, workordercontactSuccess, workordercontactError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	
	it("Create material records", function() {
		var materialSuccess = function(res) {
			try{
				kony.appfoundation.log.info("** Material records create success ** " + JSON.stringify(res));
				var len = kony.servicesapp.MOCKED_DATA_MATERIAL.length;
				for (var i = 0; i <len; i++) {
					kony.servicesapp.MOCKED_DATA_MATERIAL[i]["id"] = res[i].id;
				}
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		};
		var materialError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var materialRecordObjects = [];
				var materialData = kony.servicesapp.MOCKED_DATA_MATERIAL;
				var swRecordObject;
				for (var i = 0; i < materialData.length; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("Material");
					swRecordObject.set("Description", materialData[i]["Description"]);
					materialRecordObjects.push(swRecordObject);
				}
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				controllerextension.saveRecords(materialRecordObjects, materialSuccess, materialError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	it("Create task records", function() {
		var taskSuccess = function(res) {
			try{
				kony.appfoundation.log.info("** task records create success ** " + JSON.stringify(res));
				var len = kony.servicesapp.MOCKED_DATA_TASK.length;
				for (var i = 0; i <len; i++) {
					kony.servicesapp.MOCKED_DATA_TASK[i]["id"] = res[i].id;
				}
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		};
		var taskError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var taskRecordObjects = [];
				var swRecordObject;
				var orderRecordObject;
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				var taskData = kony.servicesapp.MOCKED_DATA_TASK;
				var orderListData = kony.servicesapp.MOCKED_DATA_ORDER_LIST;
				for (var i = 0; i < taskData.length; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("Task");
					orderRecordObject = new kony.appfoundation.v2.persistent.Record("WorkOrder");
					orderRecordObject.set("id", orderListData[i]["id"]);
					orderRecordObject.set("PlannedStartDate", orderListData[i]["PlannedStartDate"]);
					orderRecordObject.set("Instructions", orderListData[i]["Instructions"]);
					//orderRecordObject.set("id", orderListData[i]["PlannedStartDate"]);
					//orderRecordObject.set("id", orderListData[i]["id"]);
					swRecordObject.set("WorkOrder_id", orderRecordObject);
					//var assetRecordObject = new kony.appfoundation.v2.persistent.Record("Asset");
					//assetRecordObject.set("id",kony.servicesapp.MOCKED_DATA_ASSET[i]["id"]);
					//swRecordObject.set("Asset_id", assetRecordObject);
					swRecordObject.set("Code", taskData[i]["Code"]);
					swRecordObject.set("Description", taskData[i]["Description"]);
					swRecordObject.set("StartDate", taskData[i]["StartDate"]);
					swRecordObject.set("EndDate", taskData[i]["EndDate"]);
					swRecordObject.set("Task_num", taskData[i]["Task_num"]);
					swRecordObject.set("Status_id", kony.servicesapp.MOCKED_DATA_STATUS[i]["Description"]);
					taskRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(taskRecordObjects, taskSuccess, taskError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	it("Create workordermaterial records", function() {
		var workordermaterialSuccess = function(res) {
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		var workordermaterialError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var workorderRecordObjects = [];
				var taskData = kony.servicesapp.MOCKED_DATA_TASK;
				var materialData = kony.servicesapp.MOCKED_DATA_MATERIAL;
				var swRecordObject, orderRecordObject, materialRecordObject;
				for (var i = 0; i < 4; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("WorkOrderMaterial");
					orderRecordObject = new kony.appfoundation.v2.persistent.Record("Task");
					materialRecordObject = new kony.appfoundation.v2.persistent.Record("Material");
					materialRecordObject.set("id", materialData[i]["id"]);
					orderRecordObject.set("id", taskData[i]["id"]);
					swRecordObject.set("TaskComp_id", orderRecordObject);
					swRecordObject.set("Material_id", materialRecordObject);
					if (i == 0) {
						materialRecordObject.set("id", materialData[i + 1]["id"]);
						orderRecordObject.set("id", taskData[i]["id"]);
						swRecordObject.set("TaskComp_id", orderRecordObject);
						swRecordObject.set("Material_id", materialRecordObject);
					}
					kony.servicesapp.MOCKED_DATA_WORKORDER_MATERIAL.push({
						"TaskComp_id": taskData[i]["id"],
						"Material_id": materialData[i]["id"]
					});
					if (i == 0) {
						kony.servicesapp.MOCKED_DATA_WORKORDER_MATERIAL.push({
							"TaskComp_id": taskData[i]["id"],
							"Material_id": materialData[i + 1]["id"]
						});
						kony.servicesapp.MOCKED_DATA_WORKORDER_MATERIAL.push({
							"TaskComp_id": taskData[i]["id"],
							"Material_id": materialData[i]["id"]
						});
					}
					workorderRecordObjects.push(swRecordObject);
				}
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				controllerextension.saveRecords(workorderRecordObjects, workordermaterialSuccess, workordermaterialError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	it("Create asset records", function() {
		var assetSuccess = function(res) {
			try{
				kony.appfoundation.log.info("** asset records create success ** " + JSON.stringify(res));
				var len = kony.servicesapp.MOCKED_DATA_ASSET.length;
				for (var i = 0; i <len; i++) {
					kony.servicesapp.MOCKED_DATA_ASSET[i]["id"] = res[i].id;
				}
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		};
		var assetError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var swRecordObjects = [];
				var swRecordObject;
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				var assetData = kony.servicesapp.MOCKED_DATA_ASSET;
				for (var i = 0; i < assetData.length; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("Asset");
					swRecordObject.set("Description", assetData[i]["description"]);
					swRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(swRecordObjects, assetSuccess, assetError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	it("Create stop watch records", function() {
		var stopwatchSuccess = function(res) {
			try{
				var len = kony.servicesapp.MOCKED_DATA_STOPWATCH.length;
				for (var i = 0; i < len; i++) {
					kony.servicesapp.MOCKED_DATA_STOPWATCH[i]["id"] = res[i].id;
				}
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		};
		var stopwatchError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var swRecordObjects = [],status;
				var arrLength = kony.servicesapp.MOCKED_DATA_STOPWATCH.length;
				var taskData = kony.servicesapp.MOCKED_DATA_TASK;
				var orderListData = kony.servicesapp.MOCKED_DATA_ORDER_LIST;
				var swRecordObject;
				//var workorderRecordObject;
				for (var i=0; i<arrLength;i++){
					swRecordObject = new kony.appfoundation.v2.persistent.Record("StopWatch");
					//workorderRecordObject = new kony.appfoundation.v2.persistent.Record("WorkOrder");
					//workorderRecordObject.set("id", kony.servicesapp.MOCKED_DATA_ORDER_LIST[0]["id"]);
					swRecordObject.set("WorkOrder_id", kony.servicesapp.MOCKED_DATA_ORDER_LIST[0]["id"]);
					swRecordObject.set("Task_id", kony.servicesapp.MOCKED_DATA_TASK[0]["Task_num"]);
					swRecordObject.set("ChangeTime", kony.servicesapp.MOCKED_DATA_STOPWATCH[i]["ChangeTime"]);
					if (i%2 == 0){
						status = kony.servicesapp.MOCKED_DATA_STATUS[4]["Description"] ;
					}
					else{
						status = kony.servicesapp.MOCKED_DATA_STATUS[5]["Description"];
					}
					swRecordObject.set("Status_id", status);
					swRecordObjects.push(swRecordObject);
				}
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				controllerextension.saveRecords(swRecordObjects, stopwatchSuccess, stopwatchError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
	it("Create OrderAsset records", function() {
		var orderAssetSuccess = function(res) {
			//update the constant files
			kony.appfoundation.log.info("** OrderAsset records create success ** " + JSON.stringify(res));
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		var orderAssetError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var swRecordObjects = [];
				var swRecordObject;
				formController = INSTANCE.getFormController("frmOrderListKA");
				controllerextension = formController.getControllerExtensionObject();
				var assetData = kony.servicesapp.MOCKED_DATA_ASSET;
				var orderListData = kony.servicesapp.MOCKED_DATA_ORDER_LIST;
				var swRecordObject, workorderRecordObject;
				for (var i = 0; i < assetData.length; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("OrderAsset");
					swRecordObject.set("Asset_id", assetData[i]["id"]);
					workorderRecordObject = new kony.appfoundation.v2.persistent.Record("WorkOrder");
					workorderRecordObject.set("id", orderListData[i]["id"]);
					swRecordObject.set("WorkOrder_id", orderListData[i]["id"]);
					swRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(swRecordObjects, orderAssetSuccess, orderAssetError);
			}catch(err){
				errCode = err.code;
				kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
			}
		});
		waitsFor(function() {
			return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
		}, duration);
		runs(function() {
			expect(errCode).toEqual(NO_ERROR_CODE);
		});
	});
});

describe("OrderList module: Controller Extension valid cases", function() {
    overrideMethods();

    var errCode, formController, controllerextension,timeFormat,segDataForScheduled,segDataForStarted,SegDataFilterStatus,segDataFilterPri;
	var utilitiesObj = utilities.getUtilityObj();
    beforeEach(function() {
        errCode = NO_ERROR_CODE;
        kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.PROCESSING;
    });
    it("Login", function() {
        function loginSuccess(response) {
            try {
                kony.appfoundation.log.info("Login success ** " + JSON.stringify(response));
                INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance();
                INSTANCE.setOnlineStatus(false);
                kony.appfoundation.v2.initApplicationForms(INSTANCE);
                formController = INSTANCE.getFormController("frmOrderListKA");
    			controllerextension = formController.getControllerExtensionObject();
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        };

        function loginError(err) {
            kony.appfoundation.log.info("Login error ** " + JSON.stringify(err));
            errCode = err.code;
            kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
        };
        runs(function() {
			var isMocked = {
                "isMocked": true,
                "mockDbPath" : "../SFtest"
            };
            var syncOptions = {
                "syncMetadata": true,
                "syncData": false
            };
            var authParams = {
                "username": "postgres",
                "password": "",
                "tenant": "test",
                "hostName": "dummy"
            };
            var configParams = {
                "DataService" : "kony.appfoundation.MockDataService",
                "UIConfigService": "kony.appfoundation.MockUIConfigService",
                "MetadataService":"kony.appfoundation.MockMetadataService"
            };
            var params = {
                "authParams": authParams,
                "configParams" : configParams,
				"syncOptions" : syncOptions
            };
            kony.appfoundation.v2.KonyApplicationContext.appServicesLogin(params, loginSuccess, loginError);
        });

        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);

        runs(function() {
            expect(errCode).toEqual(NO_ERROR_CODE);
        });
    });
    it("Show frmOrderListKA form", function() {
        var orderviewcontrollerextension = INSTANCE.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
        //var segData = dataMap["segOrderListKA"];
        formModel = formController.getFormModel();
        runs(function() {
            try {
                var navigationObject = new kony.appfoundation.v2.NavigationObject();
                var lclCurrentDate = convertTimeZone(moment().format("YYYY-MM-DD"),null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss");
                var nextDate = moment(lclCurrentDate).add(24,"hours");
                nextDate = moment(nextDate).subtract(1,"seconds").format("YYYY-MM-DD HH:mm:ss");
                controllerextension.actionForList();
                orderviewcontrollerextension.setFormModelInfo("viewType", kony.appfoundation.v2.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
                controllerextension.setCalendarSkinKA("btnDay1KA");
                navigationObject.setQueryParams("segOrderListKA", {
                    "x": lclCurrentDate,
					"y": nextDate
                });
                formModel.setViewAttributeByProperty("mapMyOrderListKA", "zoomLevel", utilitiesObj.geti18nValueKA("i18n.order.frmOrderListKA.mapMyOrderListKAZoom.ValueKA"));
                formController.loadDataAndShowForm(navigationObject);
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
            expect(errCode).toEqual(NO_ERROR_CODE);
            kony.print(controllerextension.getFormModelInfo("segData"));
            var segData = controllerextension.getFormModelInfo("segData");
            segDataForScheduled =  controllerextension.getFormModelInfo("segData");
            segDataForStarted =  controllerextension.getFormModelInfo("segData");
            SegDataFilterStatus =  controllerextension.getFormModelInfo("segData");
            segDataFilterPri =  controllerextension.getFormModelInfo("segData");       
            var mockedData = kony.servicesapp.MOCKED_DATA_ORDER_LIST;
            var mockedDataLength = mockedData.length;
            var j = 0;
            var code = "";
            var desc = "";
            var code1 = "";
            var desc1 = "";
            var flag = false;
            for (var i in segData) {
                code = segData[i]["Code"];
                desc = segData[i]["Description"];
                while (j <= mockedDataLength) {
                    if (code === mockedData[j]["Code"]) {
                        code1 = mockedData[j]["Code"];
                        desc1 = mockedData[j]["Description"];
                        j = mockedDataLength + 1;
                        flag = true;
                    }
                }
                if (flag) {
                    break;
                }
            }
            expect(code).toEqual(code1);
            expect(desc).toEqual(desc1);
        });
    });
    it("GroupBy Status OrderList", function() {
        var frmOrdersViewKAformController = INSTANCE.getFormController("frmOrdersViewsKA");
        var frmOrdersViewKAcontrollerextension = frmOrdersViewKAformController.getControllerExtensionObject();
        formModel = formController.getFormModel();
        var listData = controllerextension.getFormModelInfo("segData");
        var formattedData = [];
        frmOrdersViewKAcontrollerextension.setFormModelInfo("viewType", kony.appfoundation.v2.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS);
        runs(function() {
            try {
                formattedData = utilitiesObj.convertDataToGroup(listData, ["orgStatus"]);
                var lclFormattedData = frmOrdersViewKAcontrollerextension.sortFormattedDataByStatus(formattedData);
                formController.getFormModel().setWidgetData("segOrderListKA", lclFormattedData);
                controllerextension.setFormModelInfo("segData",lclFormattedData);
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
            kony.print(controllerextension.getFormModelInfo("segData"));
            expect(errCode).toEqual(NO_ERROR_CODE);
        });
    });
    it("GroupBy priority OrderList", function() {      
        var frmOrdersViewKAformController = INSTANCE.getFormController("frmOrdersViewsKA");
        var frmOrdersViewKAcontrollerextension = frmOrdersViewKAformController.getControllerExtensionObject();
        formModel = formController.getFormModel();
        var listData = controllerextension.getFormModelInfo("segData");
        var formattedData = [];
        frmOrdersViewKAcontrollerextension.setFormModelInfo("viewType", kony.appfoundation.v2.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY);

        //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
		
        runs(function() {
            try {
                formattedData = utilitiesObj.convertDataToGroup(listData, ["orgPriority"]);
                var lclFormattedData = frmOrdersViewKAcontrollerextension.sortFormattedDataByStatus(formattedData);
                formController.getFormModel().setWidgetData("segOrderListKA", lclFormattedData);
                controllerextension.setFormModelInfo("segData",lclFormattedData);
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
            kony.print(controllerextension.getFormModelInfo("segData"));
            expect(errCode).toEqual(NO_ERROR_CODE);

        });
    });

	 it("Scheduled view OrderList", function() {
        var frmOrdersViewKAformController = INSTANCE.getFormController("frmOrdersViewsKA");
        var frmOrdersViewKAcontrollerextension = frmOrdersViewKAformController.getControllerExtensionObject();
        formModel = formController.getFormModel();
        var listData =  segDataForScheduled;
        var formattedData = [];
        var workOrderStatus = kony.servicesapp.servicesStatus.key;
         frmOrdersViewKAcontrollerextension.setFormModelInfo("viewType", kony.appfoundation.v2.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED);
        //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
		
        runs(function() {
            try {
                formattedData = frmOrdersViewKAcontrollerextension.filterDataForScheduledOrStarted(listData,workOrderStatus.Scheduled);
                formController.getFormModel().setWidgetData("segOrderListKA", formattedData);
                controllerextension.setMapPinImage(listData);
            	frmOrdersViewKAcontrollerextension.navigateBack();
            	kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
            kony.print(formattedData);
			var flag = true;
            for (var i in formattedData) {
                var statusVal = formattedData[i]["orgStatus"];
                if(statusVal != workOrderStatus.Scheduled){
                	flag = false;
                	break;
                }
            }
            expect(flag).toEqual(true);
            expect(errCode).toEqual(NO_ERROR_CODE);

        });
    });

	it("Started view OrderList", function() {
        var frmOrdersViewKAformController = INSTANCE.getFormController("frmOrdersViewsKA");
        var frmOrdersViewKAcontrollerextension = frmOrdersViewKAformController.getControllerExtensionObject();
        formModel = formController.getFormModel();
        var listData = segDataForStarted;
        var formattedData = [];
        var workOrderStatus = kony.servicesapp.servicesStatus.key;
        frmOrdersViewKAcontrollerextension.setFormModelInfo("viewType", kony.appfoundation.v2.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED);
        //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
		
        runs(function() {
            try {
                formattedData = frmOrdersViewKAcontrollerextension.filterDataForScheduledOrStarted(listData,workOrderStatus.Started);
                formController.getFormModel().setWidgetData("segOrderListKA", formattedData);
                controllerextension.setMapPinImage(listData);
            	frmOrdersViewKAcontrollerextension.navigateBack();
            	kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
            kony.print(formattedData);
			var flag = true;
            for (var i in formattedData) {
                var statusVal = formattedData[i]["orgStatus"];
                if(statusVal != workOrderStatus.Started){
                	flag = false;
                	break;
                }
            }
            expect(flag).toEqual(true);
            expect(errCode).toEqual(NO_ERROR_CODE);
        });
    });
	it("Filter By Status OrderList", function() {
        var frmOrdersViewKAformController = INSTANCE.getFormController("frmOrdersViewsKA");
        var frmOrdersViewKAcontrollerextension = frmOrdersViewKAformController.getControllerExtensionObject();
        var frmStatusFilterKAformController = INSTANCE.getFormController("frmStatusFilterKA");
        var frmStatusFilterKAcontrollerextension = frmStatusFilterKAformController.getControllerExtensionObject();
        
        var formModelOrderView = frmOrdersViewKAformController.getFormModel();
        formModel = formController.getFormModel();
        var listData = SegDataFilterStatus;     
        kony.print("Filter By Status OrderList");
        	kony.print(SegDataFilterStatus);
        //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
		
        runs(function() {
            try {
		        var workOrderStatus = kony.servicesapp.servicesStatus.key;
		        var orderViewFilters = {};
		        //formModelOrderView.setViewAttributeByProperty("segFilterViewKA", "selectedIndices", [[0,[0,1,2]]]); 
		        orderViewFilters[kony.appfoundation.v2.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS] = [1]
		        frmOrdersViewKAcontrollerextension.setFormModelInfo("orderViewFilters1",orderViewFilters);
		        listData =  frmOrdersViewKAcontrollerextension.filterData(listData);
            	frmOrdersViewKAcontrollerextension.navigateBack();
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
            kony.print(listData);
            var workOrderStatus = kony.servicesapp.servicesStatus.key;
            var listOfStatus = kony.appfoundation.v2.frmStatusFilterKAControllerExtension.STATUS_DISPLAY_ORDER;
            var filterByStatus = listOfStatus[1];
            var flag = true;
            for (var i in listData) {
                var statusVal = listData[i]["orgStatus"];
                if(statusVal != filterByStatus){
                	flag = false;
                	break;
                }
            }
            expect(flag).toEqual(true);
            expect(errCode).toEqual(NO_ERROR_CODE);

        });
    });
it("Filter By Priority OrderList", function() {
        var frmOrdersViewKAformController = INSTANCE.getFormController("frmOrdersViewsKA");
        var frmOrdersViewKAcontrollerextension = frmOrdersViewKAformController.getControllerExtensionObject();
        var frmStatusFilterKAformController = INSTANCE.getFormController("frmStatusFilterKA");
        var frmStatusFilterKAcontrollerextension = frmStatusFilterKAformController.getControllerExtensionObject();     
        var formModelOrderView = frmOrdersViewKAformController.getFormModel();
        var listData = segDataFilterPri;    
        //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
		
        runs(function() {
            try {
                controllerextension.setFormModelInfo("segData",formattedData); 
		        var formattedData = [];
		        var workOrderStatus = kony.servicesapp.servicesStatus.key;
		        var orderViewFilters = {};
		        //formModelOrderView.setViewAttributeByProperty("segFilterViewKA", "selectedIndices", [[0,[0,1,2]]]);             
		        orderViewFilters[kony.appfoundation.v2.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY] = [2]
		        frmOrdersViewKAcontrollerextension.setFormModelInfo("orderViewFilters1",orderViewFilters);
		        listData =  frmOrdersViewKAcontrollerextension.filterData(listData);
            	frmOrdersViewKAcontrollerextension.navigateBack();
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
            kony.print(listData);
            var listOfPriority = kony.appfoundation.v2.frmStatusFilterKAControllerExtension.PRIORITY_DISPLAY_ORDER;
            var filterByPri = listOfPriority[2];
            var flag = true;
            for (var i in listData) {
                var priVal = listData[i]["orgPriority"];
                if(priVal != filterByPri){
                	flag = false;
                	break;
                }
            }
            expect(flag).toEqual(true);
            expect(errCode).toEqual(NO_ERROR_CODE);

        });
    });
/*        var frmOrdersViewKAformController = INSTANCE.getFormController("frmOrdersViewsKA");
        var frmOrdersViewKAcontrollerextension = frmOrdersViewKAformController.getControllerExtensionObject();
        var frmDateFilterformController = INSTANCE.getFormController("frmDateFilterKA");
        var frmDateFiltercontrollerextension = frmDateFilterformController.getControllerExtensionObject();
        var lclCurrentDate = (moment().format("YYYY-MM-DD"));
        frmDateFiltercontrollerextension.setFormModelInfo("DateFilter",lclCurrentDate + "%");
        //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
		
        runs(function() {
            try {
               frmOrdersViewKAcontrollerextension.applyDateFilter();
            } catch (err) {
                errCode = err.code;
                kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
            }
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
        	var segData = controllerextension.getFormModelInfo("segData");
        	var plannedDate;
            var selectedDate = moment(lclCurrentDate).format("MM D");
            var flag = true;
            for (var i in segData) {
                plannedDate = moment(segData[i]["PlannedStartDate"]).format("MM D");
                if (selectedDate != plannedDate) {
					flag = false;
					break;
                }
            }
            expect(flag).toEqual(true);            
            expect(errCode).toEqual(NO_ERROR_CODE);

        });
    });*/
});