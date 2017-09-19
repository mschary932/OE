
    /** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmDirectionsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmDirectionsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {  
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.controllerExtensionGen = undefined;
    },
    fetchData: function() {
        try {
            this.$class.$superp.fetchData.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
        }
    },
    performFetchAndBindFormData: function(successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },
    prepareFetchAndBindDataStrategy: function() {
        try {
            this.$class.$superp.prepareFetchAndBindDataStrategy.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare fetch and bind data : " + error);
        }
    },
    updateBLogicContextData: function(widgetMapping) {
        try {
            this.$class.$superp.updateBLogicContextData.call(this, widgetMapping);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic update context data : " + error);
        }
    },
    fetchAndBindDataByWidgetGroup: function(widgetGroupId) {
        try {
            this.$class.$superp.fetchAndBindDataByWidgetGroup.call(this, widgetGroupId);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data for widget : " + error);
        }
    },
    bindData: function(isFromOrderExecutionScreen) {
        try {
		  	var scopeObj = this;
            var prevForm=kony.application.getCurrentForm().id;
            if(prevForm == "frmDirectionStepsKA"){
                isFromOrderExecutionScreen=true;
            }

            if(isFromOrderExecutionScreen && kony.servicesapp.ISFROMORDEREXECUTION){
                scopeObj.setFormModelInfo("isFromOrderExecutionScreen", true);
            }else{
                scopeObj.setFormModelInfo("isFromOrderExecutionScreen", false);
            }
            
            var formmodel = scopeObj.getController().getFormModel();
			formmodel.clear();
			var data = {
                    imgDirectionKA: "key1",
                    lblTimeKA: "key2",
                    imgStatusMachineStartedKA: "key3",
                    lblStatusKA: "key4",
                    imgPriorityKA: "key5",
                    lblPriorityKA: "key6",
                    lblInfoKA: "key7",
                    img1KA: "key8"
            };
			var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
			if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
				frmDirectionsKA.mapDirectionKA.calloutTemplate["imgDirectionKA"]["onTouchStart"] = scopeObj.openNativeMap;
			}else{
				frmDirectionsKA.mapDirectionKA.onSelection = scopeObj.openNativeMap;
			}
            formmodel.setViewAttributeByProperty("mapDirectionKA", "widgetDataMapForCallout", data);
            if((prevForm != "frmStockLocationDetailsKA") && kony.servicesapp.ISFROMORDEREXECUTION){
                formmodel.setViewAttributeByProperty("btnDirectionSteps1KA", "isVisible", true);
            }else{
                formmodel.setViewAttributeByProperty("btnDirectionSteps1KA", "isVisible", false);
            }
			scopeObj.getCurrentLocation();  
			formmodel.showView();          
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
    fetchMasterData: function(successcallback, errorcallback) {
      	try {
			this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
        } catch(error) {
			kony.sdk.mvvm.log.error("Error in Blogic fetch masterdata : " + error);
        }
    },
    fetchMasterDataForWidget: function(widgetId, successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterDataForWidget.call(this, widgetId, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch metadata : " + error);
        }
    },
    saveRecord: function(recordObject, entityName, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, entityName, onSuccess, onError);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },
    saveRecords: function(recordsArray, successcallback, errorcallback) {
        try {
            this.$class.$superp.saveRecords.call(this, recordsArray, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
        }
    },
    getEntitiesDataMap: function() {
        try {
            return this.$class.$superp.getEntitiesDataMap.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare entity data map : " + error);
        }
    },
    saveData: function(successCallback, errorCallback) {
        try {
            this.$class.$superp.saveData.call(this, successCallback, errorCallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save data : " + error);
        }
    },
    deleteData: function() {
        try {
            this.$class.$superp.deleteData.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic delete data : " + error);
        }
    },
    performAction: function(actionName, argsArray) {
        try {
            return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },
    showPreviousForm: function(doReload) {
        try {
            var scopeObj = this;
            var isFromOrderExecutionScreen=scopeObj.getFormModelInfo("isFromOrderExecutionScreen");
            if (isFromOrderExecutionScreen){
                kony.location.clearWatch(scopeObj.getFormModelInfo("watchID"));
                this.$class.$superp.showPreviousForm.call(this, doReload,kony.servicesapp.FRMORDEREXECUTIONKA);
            }else{
                this.$class.$superp.showPreviousForm.call(this, false, "frmStockLocationDetailsKA");
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action showPreviousForm : " + err);
        }        
    },
	onHideOfForm : function(){
		try{
			var scopeObj = this;
			kony.location.clearWatch(scopeObj.getFormModelInfo("watchID"));
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic onHideOfForm : " + err);
        }	
	},
    navigateTo: function(formId, navObject) {
        try{
        	this.$class.$superp.navigateTo.call(this, formId, navObject);
     	} catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic navigateTo : " + err);
     	}
    },
	refreshCurrentLocation: function() {
        try {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			var utilitiesObj = utilities.getUtilityObj();
            showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            var gpsSuccess = function(location) {
                var mapLocationOrderDirection = [];	
				var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
				var index = 0;
				if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
					index = 2;
				}
				mapLocationOrderDirection.push(scopeObj.addMapLocation(index,location.coords.latitude,location.coords.longitude,kony.servicesapp.MAP_DIRECTION_IMAGE));
				if(mapLocationOrderDirection instanceof Array && mapLocationOrderDirection.length > 0){
					formModel.setViewAttributeByProperty("mapDirectionKA", "locationData", mapLocationOrderDirection);
				}
				formModel.performActionOnView("mapDirectionKA", "navigateTo", [index, false]);
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
            var gpsFailure = function(err) {
                if (!scopeObj.getFormModelInfo("EnableGPS")) {
                    alert(utilitiesObj.geti18nValueKA("i18n.common.map.enableGPS.ValueKA"));
                    scopeObj.setFormModelInfo("EnableGPS", true);
                }
                kony.sdk.mvvm.log.info("gpsFailure() ---------> START");
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
			var positionoptions = {timeout:kony.servicesapp.MAP_GPS_TIMEOUT, enableHighAccuracy : true};
            kony.location.getCurrentPosition(gpsSuccess, gpsFailure,positionoptions);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic refreshCurrentLocation : " + err);
        }
    },
   	getCurrentLocation: function() {
        try {
			var scopeObj = this;
			var controller = scopeObj.getController();
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            var formModel = controller.getFormModel();
		    var orderControllerExtension = controller.getApplicationContext().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
            var destLat = orderControllerExtension.getFormModelInfo("destinationLat");
		    var destLon = orderControllerExtension.getFormModelInfo("destinationLon");
			var destinationImage = orderControllerExtension.getFormModelInfo("WorkOrderPriority") ? utilitiesObj.getpriorityMapPinImageKA(orderControllerExtension.getFormModelInfo("WorkOrderPriority"), "Priority") : kony.servicesapp.MAP_DESTINATION_LOCATION_IMAGE;
            var gpsSuccess = function(location) {
                scopeObj.setFormModelInfo("currentlocationFlag", true);
                var currentLocations = [];
                currentLocations.lat = location.coords.latitude;
                currentLocations.lon = location.coords.longitude;
                scopeObj.setFormModelInfo("currentLocations", currentLocations);	 
                if(scopeObj.checkReachedDestinationLocation(currentLocations.lat,currentLocations.lon,destLat,destLon)){
                	var mapLocationOrderDirection = [];
			        mapLocationOrderDirection.push(scopeObj.addMapLocation(0,currentLocations.lat,currentLocations.lon,kony.servicesapp.MAP_DIRECTION_IMAGE));
			        mapLocationOrderDirection.push(scopeObj.addDestinationMapLocation(1,destLat,destLon,destinationImage));
					if(mapLocationOrderDirection instanceof Array && mapLocationOrderDirection.length > 0){
						formModel.setViewAttributeByProperty("mapDirectionKA", "locationData", mapLocationOrderDirection);
					}
                }else{   
					var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
					if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
						var searchCriteria = {
							origin : {lat:currentLocations.lat, lon: currentLocations.lon},
							destination : {lat : destLat,lon : destLon},
							alternatives : kony.servicesapp.MAP_ALTERNATIVE_ROUTE
						};
					} else{
						var searchCriteria = {
							origin : {lat:currentLocations.lat, lon: currentLocations.lon},
							destination : {lat : destLat,lon : destLon},
							directionServiceUrl : kony.servicesapp.DIRECTIONSERVICEURL,
							alternatives : kony.servicesapp.MAP_ALTERNATIVE_ROUTE
						};
						searchCriteria.apiKey = kony.servicesapp.MAPAPIKEY;
					}
					kony.map.searchRoutes(searchCriteria,scopeObj.mapRouteSearchSuccessCallback,scopeObj.mapRouteSearchErrorCallback);
			    }
            }
            var gpsFailure = function(err) {
                if (!scopeObj.getFormModelInfo("EnableGPS")) {
                    alert(utilitiesObj.geti18nValueKA("i18n.common.map.enableGPS.ValueKA"));
                    scopeObj.setFormModelInfo("EnableGPS", true);
                }
                kony.sdk.mvvm.log.info("gpsFailure() ---------> START");
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
			var positionoptions = {timeout:kony.servicesapp.MAP_GPS_TIMEOUT, enableHighAccuracy : true};
            kony.location.getCurrentPosition(gpsSuccess, gpsFailure,positionoptions);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic getCurrentLocation : " + err);
        }
    },
    watchPosition : function(lat1,lon1){
      	try{
      	    var scopeObj = this;
      	    var formModel = scopeObj.getController().getFormModel();
		    function successcallback1(position){
				var locationDataVal = formModel.getViewAttributeByProperty("mapDirectionKA", "locationData");
				var  flag = false;
				if(locationDataVal && locationDataVal[0]){
					flag = locationDataVal[0] ? true : false;
				}
				var currentLat = "";
				var currentLon = "";
				if(flag){
					currentLat = locationDataVal[0].lat;
					currentLon = locationDataVal[0].lon;
				}
				var geoPositionLat = position.coords.latitude;
				var geoPositionLon = position.coords.longitude;
				if(currentLat != geoPositionLat || currentLon != geoPositionLon ){
					var currentLocations = [];
					currentLocations.lat = geoPositionLat;
					currentLocations.lon = geoPositionLon;
					scopeObj.setFormModelInfo("currentLocations", currentLocations);	
					var mapLocationOrderDirection = [];
					mapLocationOrderDirection.push(scopeObj.addMapLocation(0,geoPositionLat,geoPositionLon,kony.servicesapp.MAP_DIRECTION_IMAGE));
					if(mapLocationOrderDirection instanceof Array && mapLocationOrderDirection.length > 0){
						formModel.setViewAttributeByProperty("mapDirectionKA", "locationData", mapLocationOrderDirection);
					}	
					if(scopeObj.checkReachedDestinationLocation(geoPositionLat,geoPositionLon,lat1,lon1)){
						utilities.getUtilityObj().geti18nValueKA("i18n.common.Map.reachedDestination.ValueVA");
						scopeObj.showPreviousForm(true);
					}
				}
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			}
			function errorcallback1(positionerror){
				alert(positionerror.message);
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			}
			var positionoptions = {maximumAge: kony.servicesapp.MAP_MAXIMUM_AGE_GPS_LOCATION,
			enableHighAccuracy : true};
			watchID = kony.location.watchPosition (successcallback1, errorcallback1,positionoptions);
			kony.servicesapp.WATCHID = watchID;
			scopeObj.setFormModelInfo("watchID", watchID);
      	} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic watchPosition : " + err);
        }      
    },
	addMapLocation: function(index,lat,lon,img){
		return {
			id: index,
			lat: lat,
			lon: lon,
			name: kony.servicesapp.MAP_CURRENT_LOCATION_DESC,
			desc: kony.servicesapp.MAP_CURRENT_LOCATION_DESC,
			image: {
				source : img,
				sourceType  : kony.map.PIN_IMG_SRC_TYPE_RESOURCES,
				anchor : kony.map.PIN_IMG_ANCHOR_CENTER
			},
			showcallout: false
		};
	},
	addDestinationMapLocation: function(index,lat,lon,img){
		var scopeObj = this;
		var utilitiesObj = utilities.getUtilityObj();
		var workOrderObj = scopeObj.getController().getApplicationContext().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject().getFormModelInfo("workOrderObj");
		var priVal = workOrderObj.woPriority;
		var statusVal = workOrderObj.woStatus;
		var timeVal = workOrderObj.woTime;
		var descVal = workOrderObj.woDesc;
		return {
			id: index,
			lat: lat,
			lon: lon,
			name: timeVal,
			desc: descVal,
			image: img,
			showcallout: true,
			calloutData: {
				"key1": kony.servicesapp.MAP_NAVIGATION_IMAGE,
				"key2": timeVal,
				"key3": utilitiesObj.getStatusImageKA(statusVal),
				"key4": statusVal,
				"key5": utilitiesObj.getPriorityImageKA(priVal),
				"key6": priVal,
				"key7": descVal,
				"key8": kony.servicesapp.MAP_CALLOUT_DOWN_ARROW_IMAGE,
				template: flx1
			}
		};
	},
    mapRouteSearchSuccessCallback : function(routes){	
      	try{
      		var scopeObj = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMDIRECTIONSKA).getControllerExtensionObject();
			var directionStepsControllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMDIRECTIONSTEPSKA).getControllerExtensionObject();
			if(routes == null || routes.length == 0){
				alert(utilities.getUtilityObj().geti18nValueKA("i18n.common.Map.noResultFound.ValueVA"));
				directionStepsControllerExtension.setFormModelInfo("directionStepsSegData",[]);
				directionStepsControllerExtension.setFormModelInfo("directionStepsHeader","");
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				return;
			}	
			scopeObj.setDirectionStepsData(routes);
			var routeColors = kony.servicesapp.MAP_ROUTE_COLOR;	
			var routesLength = routes.length;
			for(var i = 0; i < routesLength; ++i){
				scopeObj.drawRoute("route" + i, routes[i], routeColors[i]); 
			}
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic mapRouteSearchSuccessCallback : " + err);
        }
	},
	mapRouteSearchErrorCallback :function(code,emsg){
      	try{
			var utilityObj = utilities.getUtilityObj();
			if(code == kony.map.ROUTE_SEARCH_NETWORK_FAILURE){
				alert(utilityObj.geti18nValueKA("i18n.common.Map.noNetwork.ValueVA"));
			}else{
				alert(utilityObj.geti18nValueKA("i18n.common.Map.errorMapDirection.ValueVA"));
			}
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic mapRouteSearchErrorCallback : " + err);
        }
	},
	drawRoute :function(routeid,route,color){
	  	try{
			var scopeObj = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMDIRECTIONSKA).getControllerExtensionObject();
			var steps = scopeObj.getPathPointsFromRoute(route);
			var orderControllerExtension = scopeObj.getController().getApplicationContext().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
			var ei = steps.length-1;
			var polylineData = {
				id : routeid,
				locations : steps,
				startLocation : {id: 1,lat:steps[0].lat,lon:steps[0].lon,image:{source:kony.servicesapp.MAP_CURRENT_LOCATION_IMAGE,anchor:kony.map.PIN_IMG_ANCHOR_TOP_LEFT}},
				endLocation : scopeObj.addDestinationMapLocation(2,steps[ei].lat,steps[ei].lon,(orderControllerExtension.getFormModelInfo("WorkOrderPriority") ? utilities.getUtilityObj().getpriorityMapPinImageKA(orderControllerExtension.getFormModelInfo("WorkOrderPriority"), "Priority") : kony.servicesapp.MAP_DESTINATION_LOCATION_IMAGE)),
				polylineConfig : {
					lineWidth : kony.servicesapp.MAP_ROUTE_LINE_WIDTH,
					lineColor : color
				}
			}			
			frmDirectionsKA.mapDirectionKA.addPolyline(polylineData);
			scopeObj.watchPosition(steps[ei].lat,steps[ei].lon); 
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic drawRoute : " + err);
        }
	},
	getPathPointsFromRoute :function(route){
     	try{
			return route.polylinePoints;
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic getPathPointsFromRoute : " + err);
        }
	},
	checkReachedDestinationLocation : function(geoPositionLat,geoPositionLon,lat1,lon1){
		 try{
		 	var decimalPlaces = kony.servicesapp.MAP_NO_OF_DECIMAL_PLACES + 1;
		 	var currLat = geoPositionLat.toString();
			var currLon = geoPositionLon.toString();
			var destLat = lat1.toString();
			var destLon = lon1.toString();
			currLat = currLat.slice(0, (currLat.indexOf(".")) + decimalPlaces);	
			currLon = currLon.slice(0, (currLon.indexOf(".")) + decimalPlaces);	
			destLat = destLat.slice(0, (destLat.indexOf(".")) + decimalPlaces);	
			destLon = destLon.slice(0, (destLon.indexOf(".")) + decimalPlaces);
			var flag = false;			
		 	if(currLat == destLat && currLon == destLon){
		 		flag = true;
				alert(utilities.getUtilityObj().geti18nValueKA("i18n.common.Map.reachedDestination.ValueVA"));
		 	}
		 	return flag;
		}catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic checkReachedDestinationLocation : " + err);
		}      
	},
	navigateToDirectionSteps : function(){
		try{
			kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMDIRECTIONSTEPSKA).getControllerExtensionObject().bindData();			
		}catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic navigateToDirectionSteps : " + err);
		}
	},
	setDirectionStepsData : function(resultTable){
    	try{
    		var scopeObj = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMDIRECTIONSKA).getControllerExtensionObject();
        	var directionStepsControllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMDIRECTIONSTEPSKA).getControllerExtensionObject();
    		if(resultTable && resultTable[0]){
	    		var stepsTable = resultTable[0]["legs"][0]["steps"]; 
	    		var newDirectionsList = [];
			    var distanceValue = "";
			    var durationValue = "";
			    var longInstructionVA = "";
			    var utilitiesObj = utilities.getUtilityObj();
				var totalDuration = resultTable[0]["legs"][0]["duration"];
				var totalDistance = 0;
				var eachStep, entry;
				var defaultRoutesArray = utilitiesObj.geti18nValueKA("i18n.common.Map.defaultDirectionListVA.ValueVA").split(",");
				var defaultTable = [];
				var len = 0, defaultRoutesArrayLength = defaultRoutesArray.length;
				for(var j = 0; j < defaultRoutesArrayLength; j++){ // gets the respective maneuver image
					entry = defaultRoutesArray[j];
					defaultTable.push({"key" :entry.split(":")[0],value : entry.split(":")[1]});
					len = defaultTable.length;
				}
				var imgDirectionVA, lowerLongInstructionVA, directionImage, value;
				var record, stepsTableLength;
				if(stepsTable)
					stepsTableLength = stepsTable.length;
				for (var i=0; ((stepsTable) != null) && i< stepsTableLength; i++ ){
					eachStep = stepsTable[i];
					imgDirectionVA = "";
					longInstructionVA = eachStep["instruction"];	
					longInstructionVA = longInstructionVA ? longInstructionVA.replace(/(<([^>]+)>)/ig, ""): "";		
					longInstructionVA = longInstructionVA ? longInstructionVA.replace(/&nbsp;/gi,' '): "";
					lowerLongInstructionVA = longInstructionVA ? longInstructionVA.toLowerCase() : "" ;
					directionImage = "";
					for(var k = 0; k < len; k++){
						record = defaultTable[k];
						value = scopeObj.getDirectionImage(record["key"],lowerLongInstructionVA);
						if(value != -1){
							directionImage = defaultTable[k]["value"];
							k = len +1;
						}
					}
					if(directionImage != ""){
						imgDirectionVA = directionImage;
					} else{
						imgDirectionVA = "blank.png";
					}
					totalDistance = totalDistance + eachStep["distance"];
					kony.table.insert(newDirectionsList, {
						lblDirKA : scopeObj.toConvertFromMeter(eachStep["distance"]),
						lblDirectionKA : longInstructionVA,
						imgDirKA : imgDirectionVA
					});
				}
				var totalDurationFinal = utilitiesObj.toConvertMins(totalDuration);
				var totalDistanceFinal = scopeObj.toConvertFromMeter(totalDistance);
              	frmDirectionsKA.lblHeaderKA.text = totalDistanceFinal +" | "+ totalDurationFinal;
				//scopeObj.getFormModel().setViewAttributeByProperty("lblHeaderKA", "text", totalDistanceFinal +" | "+ totalDurationFinal);
				directionStepsControllerExtension.setFormModelInfo("directionStepsSegData",newDirectionsList);
				directionStepsControllerExtension.setFormModelInfo("directionStepsHeader",totalDistanceFinal +" | "+ totalDurationFinal);
    		}
    	} catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic setDirectionStepsData : " + error);
        }
    },    
	toConvertFromMeter : function(meterValue){
	    try{
			var value = "";
			var utilitiesObj = utilities.getUtilityObj();
			var uom = kony.servicesapp.constants.getServiceConstantsObj().getUOM("UOM");
          if(uom){
				uom = uom.toUpperCase();
			} 
			switch(uom){
				case "MILES" :
					value = meterValue * 0.000621371;
					uom = utilitiesObj.geti18nValueKA("i18n.common.Map.miles.ValueVA");
					break;
				case "KMS" :
					value = meterValue * 0.001;
					uom = utilitiesObj.geti18nValueKA("i18n.common.Map.lblKilometerKA.valueKA");
					break;
				case "M" :
					value = meterValue;
					uom = utilitiesObj.geti18nValueKA("i18n.common.Map.lblMetersKA.valueKA");
					break;
				case "FEET" :
					value = meterValue * 3.28084;
					uom = utilitiesObj.geti18nValueKA("i18n.common.Map.lblFeetsKA.valueKA");
					break;
				case "INCHES" :
					value = meterValue * 39.3701;
					uom = utilitiesObj.geti18nValueKA("i18n.common.Map.lblInchesKA.valueKA");						
					break;
				case "MM" :				
					value = meterValue * 1000;
					uom = utilitiesObj.geti18nValueKA("i18n.common.Map.Millimeters.valueKA");						
					break;
				default : 
					value = meterValue * 0.000621371;
					uom = utilitiesObj.geti18nValueKA("i18n.common.Map.miles.ValueVA");
					break;				
			}
			value = value.toFixed(1);		
			value = value+" "+uom;
			return value;
		} catch (error) {
		   kony.sdk.mvvm.log.error("Error in Blogic toConvertFromMeter : " + error);
		}	
	},	  
	getDirectionImage :function( key,value ){
		try{
			var keyOccurredAt = -1;
			value = value ? value.replace(/(<([^>]+)>)/ig, "") : "";
			if(value != ""){
				var keyi18nValue = utilities.getUtilityObj().geti18nValueKA("i18n.common.Map."+key+".ValueVA");
				var splitFlag = false;
				if(keyi18nValue && keyi18nValue.indexOf(',') != -1){
					var keyArray = keyi18nValue.split(",");
					splitFlag = true;
				}
				if(splitFlag){
					var keyArrayLength;
					if(keyArray)
						keyArrayLength = keyArray.length;
					for (var k = 0; ((keyArray) != null) && k < keyArrayLength; k++ ){
						var keyValue = keyArray[k];
						keyValue = keyValue.toLowerCase();
						if((value.indexOf(keyValue))!= -1){
							keyOccurredAt = value.indexOf(keyValue);
							return keyOccurredAt;
						}
					}
				}else{
					if(keyi18nValue && (value.indexOf(keyi18nValue))!= -1){
						keyi18nValue = keyi18nValue.toLowerCase();
						keyOccurredAt = value.indexOf(keyi18nValue);
					}
				}
			}
			return keyOccurredAt;
		}catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic getDirectionImage : " + error);
		}
	},
	openNativeMap : function(){
	    try{
			var scopeObj = this;
          	var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMDIRECTIONSKA);
			var orderControllerExtension = formController.getApplicationContext().getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
          	var directionControllerExtension = formController.getApplicationContext().getFormController(kony.servicesapp.FRMDIRECTIONSKA);
			var locationDataVal =  formController.getFormModel().getViewAttributeByProperty("mapDirectionKA", "locationData");
			var currentLat = "";
			var currentLon = "";
			if(locationDataVal && locationDataVal[0]){
				currentLat = locationDataVal[0].lat;
				currentLon = locationDataVal[0].lon;
			}else{
				var currentLocations = directionControllerExtension.getFormModelInfo("currentLocations");
				if(currentLocations && currentLocations.lat && currentLocations.lon){
					currentLat = currentLocations.lat;
					currentLon = currentLocations.lon;
				}
			}			
			var currentLocation = currentLat +','+ currentLon;
			var destinationLocation = orderControllerExtension.getFormModelInfo("destinationLat") +','+orderControllerExtension.getFormModelInfo("destinationLon");			
			var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
			if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
				kony.application.openURL("http://maps.apple.com/?saddr="+currentLocation+"&daddr="+destinationLocation);
			}else{
				kony.application.openURL("http://maps.google.com/maps?saddr="+currentLocation+"&daddr="+destinationLocation);
			}
		} catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic openNativeMap : " + error);
		}
    }
});