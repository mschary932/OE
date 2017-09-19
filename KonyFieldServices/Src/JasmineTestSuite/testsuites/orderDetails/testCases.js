var NO_ERROR_CODE = -1;
var dbPath = '../SFtest';
var sqldb;
var INSTANCE, duration = 5000;
var apptype = {"APPTYPE":"AFN"};
kony.appfoundation.v2.KonyApplicationContext.init(apptype);
INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance();
INSTANCE.setOnlineStatus(false);
describe("OrderDetails module: Load database, i18n", function(){
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

describe("OrderDetails module: Create dummy records", function() {
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
				var address, priority;
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
					//kony.servicesapp.MOCKED_DATA_ORDER_LIST["Priority"] = kony.servicesapp.MOCKED_DATA_PRIORITY[i]["Description"];
					swRecordObject.set("PlannedStartDate", kony.servicesapp.MOCKED_DATA_ORDER_LIST[i]["PlannedStartDate"]);
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

describe("OrderDetails module: Controller extension valid cases", function() {
    overrideMethods();
    var errCode, formController, controllerextension,timeFormat;
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
	it("Order Details P0 test case", function() {
		INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance();
        formController = INSTANCE.getFormController("frmOrderDetailsKA");
        controllerextension = formController.getControllerExtensionObject();
        formModel = formController.getFormModel();
        var mockOrderDetails = {};
        mockOrderDetails = kony.servicesapp.MOCKED_DATA_ORDER_LIST[0];
        runs(function() {
            try {
                var datamodel = new kony.appfoundation.v2.DataModel();
                datamodel.setPrimaryFieldValue(mockOrderDetails.id);
                datamodel.setMasterEntityName(formController.getConfig().getEntity());
                var navigationObject = new kony.appfoundation.v2.NavigationObject();
                navigationObject.setDataModel(datamodel, kony.appfoundation.v2.OperationType.FILTER_BY_PRIMARY_KEY, "form");
				navigationObject.setQueryParams("flxParentContactKA", {
                    "x": mockOrderDetails.id
                });
				navigationObject.setQueryParams("flxAssetsKA", {
                    "x": mockOrderDetails.id
                });
				navigationObject.setQueryParams("flxDurationKA", {
                    "x": mockOrderDetails.id
                });
				kony.servicesapp.NavStack.getInstance().registerForm("frmOrderDetailsKA");
				kony.servicesapp.NavStack.getInstance().registerForm("frmContactDetailsKA");
				kony.servicesapp.NavStack.getInstance().registerForm("frmDescriptionDetailsKA");
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
            expect(formModel.getWidgetData("lblOrderValueIDKA").getData()).toEqual(mockOrderDetails["Code"]);
            expect(formModel.getWidgetData("blDescriptionKA").getData()).toEqual(mockOrderDetails["Description"]);
            //expect(formModel.getWidgetData("lblDurationValueKA").getData()).toEqual("00:01");
        });
    });
    it("Task Details P0 test case", function() {
        formController = INSTANCE.getFormController("frmTaskDetailsKA");
        controllerextension = formController.getControllerExtensionObject();
        formModel = formController.getFormModel();
		var utilitiesObj = utilities.getUtilityObj();
        var mockTask = {},
            count = 0;
        mockTask = kony.servicesapp.MOCKED_DATA_TASK[0]; // TODO read from mocked data
        runs(function() {
            try {
                var datamodel = new kony.appfoundation.v2.DataModel();
                datamodel.setPrimaryFieldValue(mockTask.id);
                datamodel.setMasterEntityName(formController.getConfig().getEntity());
                var navigationObject = new kony.appfoundation.v2.NavigationObject();
                navigationObject.setDataModel(datamodel, kony.appfoundation.v2.OperationType.FILTER_BY_PRIMARY_KEY, "form");
                navigationObject.setQueryParams("form", {
                    "x": mockTask.id
                });
                controllerextension.navigateTo("frmTaskDetailsKA", navigationObject);
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
            var taskData = kony.servicesapp.MOCKED_DATA_TASK[0];
            var instructions = kony.servicesapp.MOCKED_DATA_ORDER_LIST[0]["Instructions"];           
            expect(formModel.getWidgetData("lblHHMMKA").getData()).toEqual(convertTimeZone(taskData["StartDate"],kony.servicesapp.remoteTimeZone,null,"hh:mm A"));
            expect(formModel.getWidgetData("lblFinishedTimeKA").getData()).toEqual(convertTimeZone(mockTask["EndDate"],kony.servicesapp.remoteTimeZone,null,"hh:mm A"));
            expect(formModel.getWidgetData("lblInfoKA").getData()).toEqual(utilitiesObj.dataTruncation(instructions, 72, 3, "...").value);
            expect(formModel.getWidgetData("lblTimeKA").getData()).toEqual(convertTimeZone(kony.servicesapp.MOCKED_DATA_ORDER_LIST[0]["PlannedStartDate"],kony.servicesapp.remoteTimeZone,null,"hh:mm A, ddd"));
            for (var i = 0; i < kony.servicesapp.MOCKED_DATA_WORKORDER_MATERIAL.length; i++) {
                if (kony.servicesapp.MOCKED_DATA_TASK[0].id == kony.servicesapp.MOCKED_DATA_WORKORDER_MATERIAL[i].TaskComp_id) {
                    count++;
                }
            }
            //expect(formModel.getWidgetData("lblMaterialCountKA")).toEqual(utilitiesObj.geti18nValueKA("i18n.common.materialsValueKA") + " (" + count + ")");
        });
    });
});