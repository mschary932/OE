var NO_ERROR_CODE = -1;
var dbPath = '../SFtest';
var sqldb;
var INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance(), duration = 5000;
var flx1;
var apptype = {"APPTYPE":"AFN"};
kony.appfoundation.v2.KonyApplicationContext.init(apptype);
describe("OrderHistory module: Load database, i18n", function(){
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
describe("OrderHistory module: Create dummy records", function() {
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
	it("Create OrderHistory records", function() {
		var orderHistorySuccess = function(res) {
			//update the constant files
			kony.appfoundation.log.info("** OrderHistory records create success ** " + JSON.stringify(res));
			var len =  kony.servicesapp.MOCKED_DATA_ORDER_HISTORY.length;
				for (var i = 0; i <len; i++) {
					kony.servicesapp.MOCKED_DATA_ORDER_HISTORY[i]["id"] = res[i].id;
				}
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		var orderHistoryError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var swRecordObjects = [];
				var swRecordObject;
				formController = INSTANCE.getFormController("frmOrderHistoryKA");
				controllerextension = formController.getControllerExtensionObject();
				var orderHistory = kony.servicesapp.MOCKED_DATA_ORDER_HISTORY;
				var swRecordObject, WOswRecordObject;
				for (var i = 0; i < orderHistory.length; i++) {
					swRecordObject = new kony.appfoundation.v2.persistent.Record("WorkOrderHistory");
					WOswRecordObject = new kony.appfoundation.v2.persistent.Record("WorkOrder");
					WOswRecordObject.set("id", orderHistory[i]["Order_Id"]);
					swRecordObject.set("Description", orderHistory[i]["Description"]);
					swRecordObject.set("Code", orderHistory[i]["Code"]);
					swRecordObject.set("StartDate", orderHistory[i]["StartDate"]);
					swRecordObject.set("Type_id", orderHistory[i]["Type_id"]);
					swRecordObject.set("Status_id", kony.servicesapp.MOCKED_DATA_STATUS[i]["Description"]);
					swRecordObject.set("Order_id", WOswRecordObject);
					swRecordObject.set("WorkCenter_id", orderHistory[i]["WorkCenter_id"]);
					swRecordObjects.push(swRecordObject);
				}
				controllerextension.saveRecords(swRecordObjects, orderHistorySuccess, orderHistoryError);
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
	xit("Create systemUser records", function() {
		var systemuserSuccess = function(res) {
			//update the constant files
			kony.appfoundation.log.info("** systemUser records create success ** " + JSON.stringify(res));
			var len =  kony.servicesapp.MOCKED_DATA_SYSTEM_USER.length;
			kony.servicesapp.MOCKED_DATA_SYSTEM_USER["id"] = res[i].id;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		var systemUserError = function(err) {
			errCode = err.code;
			kony.appfoundation.v2.applicationStatus = kony.appfoundation.constants.applicationStatus.COMPLETED;
		};
		runs(function() {
			try{
				var swRecordObjects = [];
				var swRecordObject;
				formController = INSTANCE.getFormController("frmOrderHistoryKA");
				controllerextension = formController.getControllerExtensionObject();
				var systemuser = kony.servicesapp.MOCKED_DATA_SYSTEM_USER;
				var swRecordObject,WCswRecordObject;
				swRecordObject = new kony.appfoundation.v2.persistent.Record("SystemUser");
				//WCswRecordObject = new kony.appfoundation.v2.persistent.Record("WorkCenter");
				//WCswRecordObject.set("id",systemuser["WorkCenter_id"]);
				swRecordObject.set("FirstName", systemuser["FirstName"]);
				swRecordObject.set("LastName", systemuser["LastName"]);
				swRecordObject.set("MobilePhone", systemuser["MobilePhone"]);
				swRecordObject.set("WorkCenter_id",systemuser["WorkCenter_id"]);
				swRecordObjects.push(swRecordObject);
				controllerextension.saveRecords(swRecordObjects, systemuserSuccess, systemUserError);
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

describe("OrderHistory module: Controller Extension valid cases", function() {
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
                formController = INSTANCE.getFormController("frmOrderHistoryKA");
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
    it("Show frmOrderHistoryKA form", function() {
        var orderviewcontrollerextension = INSTANCE.getFormController("frmOrderHistoryKA").getControllerExtensionObject();
		formController = INSTANCE.getFormController("frmOrderHistoryKA");
        controllerextension = formController.getControllerExtensionObject();
		formModel = formController.getFormModel();
        var datamodel = new kony.appfoundation.v2.DataModel();
		var mockedData = {};
		var utilitiesObj= utilities.getUtilityObj(); 
		var mockedData = kony.servicesapp.MOCKED_DATA_ORDER_HISTORY[0];
        runs(function() {
            try {
            datamodel.setPrimaryFieldValue(mockedData.id);
            datamodel.setMasterEntityName(formController.getConfig().getEntity());
            var navigationObject = new kony.appfoundation.v2.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.appfoundation.v2.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            datamodel.setMasterEntityName('WorkOrderHistory');
            navigationObject.setQueryParams("segOrderHistoryKA", {
                "x": mockedData.Order_Id
            });           
            orderviewcontrollerextension.navigateTo("frmOrderHistoryKA", navigationObject);
	    }catch(err){    
	    alert(err);
	    };    
        });
        waitsFor(function() {
            return kony.appfoundation.v2.applicationStatus === kony.appfoundation.constants.applicationStatus.COMPLETED;
        }, duration);
        runs(function() {
          expect(errCode).toEqual(NO_ERROR_CODE);
		   var segData = formModel.getWidgetData("segOrderHistoryKA").getData();
          //var segData = controllerextension.getFormModelInfo("segData");
		  kony.print(controllerextension.getFormModelInfo("segData"));
            var mockedData = kony.servicesapp.MOCKED_DATA_ORDER_HISTORY;
			var sysusermockedData = kony.servicesapp.MOCKED_DATA_SYSTEM_USER;
            var mockedDataLength = mockedData.length;
            var j = 0;
            var segRowData, mockedRow;
            var flag = false;
            for (var i in segData) {
					while (j <= mockedDataLength) {
                    if (segData[i]["Code"] === (mockedData[j]["Code"]+"")) {
                            segRowData = segData[i];
                            mockedRow = j;
							flag = true;
							break;
                    }
                       j++;
                }
                    if(segRowData){
							expect(segRowData["Code"]).toEqual((mockedData[mockedRow]["Code"]+""));
                            expect(segRowData["Description"]).toEqual(mockedData[mockedRow]["Description"]);
                            expect(segRowData["StartDate"]).toEqual(moment(mockedData[mockedRow]["StartDate"]).format(kony.servicesapp.MOCKED_CONSTANTS["dateFormat"]));
							expect(segRowData["EndDate"]).toEqual(moment(mockedData[mockedRow]["StartDate"]).format(kony.servicesapp.MOCKED_CONSTANTS["timeFormat"]));
                            expect(segRowData["Status_id"]).toEqual(utilitiesObj.getStatusTextKA(kony.servicesapp.MOCKED_DATA_STATUS[mockedRow]["Description"]));
                            expect(segRowData["Duration"]).toEqual(mockedData[mockedRow]["Type_id"]);
							//expect(segRowData["WorkCenter_id"]).toEqual(sysusermockedData["FirstName"]+ " "+ sysusermockedData["LastName"]);
							//expect(segRowData["PhoneNumber"]).toEqual(sysusermockedData["MobilePhone"]);
							//expect(segRowData["WorkCenter_id"]).toEqual();
                            } 
                             j = 0;
            }

        });
    })
});