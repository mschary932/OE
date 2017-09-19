function getCurrentLocation(key) {
		 /* var gpsSuccess = function(location){
							gCurrentLatitude=location.coords.latitude;
							gCurrentLongitude = location.coords.longitude;
							showMapData(key);
						}
		  var gpsFailure = function(err){							
						    alert('Enable GPS');
							kony.print("gpsFailure() ---------> START");							
						}  			
			kony.location.getCurrentPosition(gpsSuccess, gpsFailure);  */ 
            gCurrentLatitude="37.6";
			gCurrentLongitude ="-95.665";	
			showMapData(key);
    }
	
function showMapData(key){
    var data={imgDirectionKA:"key1",lblTimeKA:"key2",imgStatusMachineStartedKA:"key3",lblStatusKA:"key4",imgPriorityKA:"key5",lblPriorityKA:"key6",lblInfoKA:"key7"};
  if(key == "1"){
	frmMyNotificationListKA.mapMyNotificationsListKA.widgetDataMapForCallout = data;
  }else{
    
   frmOrderListKA.mapMyOrderListKA.widgetDataMapForCallout = data;
  }
	var LocationData1 = {};
	var LocationData2 = {};
	var currentLocation = {};
	 gMobileLocationTbale = [];
	 gMobileLocationOrderList=[];

	currentLocation = {id:1,lat:gCurrentLatitude, lon:gCurrentLongitude, name: "current location", desc: "current location",image: "pinb.png",meta:{color:"blue", label: "A"},
	showcallout: false};

if(key == "1"){
	LocationData1 = {id:0,lat:37.7919831, lon:-122.4037806,name: "LocationData1",image: "pin_priority_high.png",meta:{color:"blue", label: "A"},
	showcallout: true,
	calloutData: {
            key1: "notification_map_navigation.png",
            key2: "7:00 AM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_high.png",
			key6: "HIGH",
			key7: "Heard excessive gear..."
            //template: hboxMap
        }};
        
	LocationData2 = {id:2,lat: 37.7893252,lon:-122.3975863, name: "LocationData2", image:"pin_priority_high.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "12:00 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_high.png",
			key6: "HIGH",
			key7: "Chain and sprocket with.."
            //template: hboxMap
        }};	
		
	LocationData3 = {id:3,lat: 37.7945719,lon:-122.4026423, name: "LocationData2", image:"pin_priority_high.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "4:00 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_high.png",
			key6: "HIGH",
			key7: "Smelled something unusual.."
            //template: hboxMap
        }};	
	LocationData4 = {id:4,lat: 37.7756916,lon:-122.446236, name: "LocationData2", image:"pin_priority_medium.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "9:00 AM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_medium.png",
			key6: "MEDIUM",
			key7: "Motor Breakdown"
            //template: hboxMap
        }};	
	LocationData5 = {id:5,lat: 37.7821513,lon:-122.4460842, name: "LocationData2", image:"pin_priority_medium.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "1:30 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_medium.png",
			key6: "MEDIUM",
			key7: "Transformer operating.."
            //template: hboxMap
        }};	
	
	LocationData6 = {id:6,lat: 37.7930508,lon:-122.3997047, name: "LocationData2", image:"pin_priority_medium.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "5:00 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_medium.png",
			key6: "MEDIUM",
			key7: "Internal low voltage.."
            //template: hboxMap
        }};	
	LocationData7 = {id:7,lat: 37.7669155,lon:-122.3937134, name: "LocationData2", image:"pin_priority_low.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "12:00 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_low.png",
			key6: "LOW",
			key7: "Red light on and .."
            //template: hboxMap
        }};	
		
	LocationData8 = {id:8,lat: 37.7920459,lon:-122.3983211, name: "LocationData2", image:"pin_priority_low.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "12:00 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_low.png",
			key6: "LOW",
			key7: "Air Conditioner Service.."
            //template: hboxMap
        }};	
		
	LocationData9 = {id:9,lat: 37.7975082,lon:-122.4303508, name: "LocationData2", image:"pin_priority_low.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "12:00 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_low.png",
			key6: "LOW",
			key7: "Engine will not start"
            //template: hboxMap
        }};	
		
     
	gMobileLocationTbale.push(LocationData1);
	gMobileLocationTbale.push(LocationData2);
    gMobileLocationTbale.push(currentLocation); 
	gMobileLocationTbale.push(LocationData3);
	gMobileLocationTbale.push(LocationData4);
	gMobileLocationTbale.push(LocationData5);
	gMobileLocationTbale.push(LocationData6);
	gMobileLocationTbale.push(LocationData7);
	gMobileLocationTbale.push(LocationData8);
	gMobileLocationTbale.push(LocationData9);
	frmMyNotificationListKA.mapMyNotificationsListKA.locationData= gMobileLocationTbale;
}
else{
LocationData1 = {id:0,lat:37.7893252, lon:-122.392986,name: "LocationData1",image: "pin_priority_low.png",meta:{color:"blue", label: "A"},
	showcallout: true,
	calloutData: {
            key1: "notification_map_navigation.png",
            key2: "8:00 AM",
          	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_low.png",
			key6: "LOW",
			key7: "Heard excessive gear..."
            //template: hboxMap
        }};
        
	LocationData2 = {id:2,lat: 37.787382,lon:-122.394557, name: "LocationData2", image:"pin_priority_high.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
            key1: "notification_map_navigation.png",
            key2: "9:00 AM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_high.png",
			key6: "HIGH",
			key7: "Motor Breakdown"
            //template: hboxMap
        }};	
		
	LocationData3 = {id:3,lat: 37.797508,lon:-122.430351, name: "LocationData3", image:"pin_priority_medium.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
            key1: "notification_map_navigation.png",
            key2: "10:00 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_medium.png",
			key6: "MEDIUM",
			key7: "Red light on and ..."
            //template: hboxMap
        }};	
	LocationData4 = {id:4,lat: 37.786821,lon:-122.393901, name: "LocationData4", image:"pin_priority_low.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "11:00 AM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_low.png",
			key6: "LOW",
			key7: "Transformer operating.."
            //template: hboxMap
        }};	
	LocationData5 = {id:5,lat: 37.751278,lon:-122.431660, name: "LocationData5", image:"pin_priority_high.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "12:00 AM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_high.png",
			key6: "HIGH",
			key7: "Air Conditioner Service"
            //template: hboxMap
        }};	
	
	LocationData6 = {id:6,lat: 37.807306,lon:-122.472904, name: "LocationData6", image:"pin_priority_medium.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "1:00 PM",
           	key3: "status_machine_started_gray.png",
           	key4: "SCHEDULED",
			key5: "priority_medium.png",
			key6: "MEDIUM",
			key7: "Internal low voltage.."
            //template: hboxMap
        }};	
	LocationData7 = {id:7,lat: 37.786071,lon:-122.392986, name: "LocationData7", image:"pin_priority_medium.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "2:00 PM",
           	key3: "status_machine_completed_gray.png",
           	key4: "COMPLETE",
			key5: "priority_medium.png",
			key6: "MEDIUM",
			key7: "Blown radiator fan.."
            //template: hboxMap
        }};	
		
	LocationData8 = {id:8,lat: 37.775692,lon:-122.446236, name: "LocationData8", image:"pin_priority_low.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "07:00 AM",
           	key3: "status_machine_completed_gray.png",
           	key4: "COMPLETE",
			key5: "priority_low.png",
			key6: "LOW",
			key7: "Cracked bushing flange"
            //template: hboxMap
        }};	
		
	LocationData9 = {id:9,lat: 37.799931,lon:-122.457744, name: "LocationData9", image:"pin_priority_high.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "07:00 PM",
           	key3: "status_machine_completed_gray.png",
           	key4: "COMPLETE",
			key5: "priority_high.png",
			key6: "HIGH",
			key7: "Hazardous gas Detection"
            //template: hboxMap
        }};	
    LocationData10 = {id:9,lat: 37.789325,lon:-122.397586, name: "LocationData10", image:"pin_priority_medium.png",meta:{color:"red",label:"B"},
	showcallout: true,
	calloutData: {
           key1: "notification_map_navigation.png",
            key2: "07:00 PM",
           	key3: "status_machine_completed_gray.png",
           	key4: "COMPLETE",
			key5: "priority_medium.png",
			key6: "MEDIUM",
			key7: "Engine will not start"
            //template: hboxMap
        }};	
		
     
    gMobileLocationOrderList.push(currentLocation); 


	frmOrderListKA.mapMyOrderListKA.locationData= gMobileLocationOrderList;

}	
  
  
}
	
	
	