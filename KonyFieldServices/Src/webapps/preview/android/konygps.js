/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


kony.gps ={

    checkIfAppRequiresGPS: function()
    {
        var domElement = new kony.dom.Element();
        var currentForm = domElement.getCurrentForm();

        var isgpspresent= domElement.getElementByIDNS("gpseventtrue");
        if (isgpspresent)
            return true;
        else
            return false;
        
    },


    invokeGPSToGetLatLon: function()
    {
        var domElement = new kony.dom.Element();
        var currentForm = domElement.getCurrentForm();
        //Murty Aug 23 2011 : Added blackberry gps support
        var handleBBLocation = function() {
            if(blackberry.location.latitude == 0 && blackberry.location.longitude == 0) {
                domElement.addHiddenField(currentForm, "kffi_mylocation", "-1|103|Unknown location or Location not found");
            } else {
                var addressLocation="0|"+blackberry.location.latitude+"|"+blackberry.location.longitude;
                addressLocation=addressLocation+"|: : : : : :" ;
                domElement.addHiddenField(currentForm, "kffi_mylocation", addressLocation);
            }
//            if(parseFloat(navigator.appVersion)>=4.6) {
                blackberry.location.removeLocationUpdate();
//            }
        }
        
        if(typeof(window.blackberry) != "undefined" && blackberry.location.GPSSupported){ 
            // set to autonomous mode
            blackberry.location.setAidMode(2);

            //On BlackBerry devices running versions of BlackBerry® Device Software  earlier than version 4.6,
            //this method must be passed as a string that is evaluated each time the location is refreshed. 
            //On BlackBerry devices running BlackBerry Device Software version 4.6 or later, you can pass a string, 
            //or use the method to register a callback function.
//            if(parseFloat(navigator.appVersion)>=4.6) {
                blackberry.location.onLocationUpdate(handleBBLocation());
//            } else {
//                blackberry.location.onLocationUpdate("handleBBLocation()");
//           }
            blackberry.location.refreshLocation();
        }
        else if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(kony.gps.handleGPSLocation, kony.gps.handleGPSError, {
            enableHighAccuracy:true,maximumAge:600000});
        }        
        else
        {
            domElement.addHiddenField(currentForm, "kffi_mylocation", "-1|3|GPS Not Supported");
        }

    },

    handleGPSError : function()
    {
         var domElement = new kony.dom.Element();
            var currentForm = domElement.getCurrentForm();
            domElement.addHiddenField(currentForm, "kffi_mylocation", "-1|2|Permission Denied by the User");
    },

     handleGPSLocation: function(position)
     {

        var domElement = new kony.dom.Element();
        var currentForm = domElement.getCurrentForm();
        var addressLocation="0|"+position.coords.latitude+"|"+position.coords.longitude+"|"+position.coords.altitude+"|"+
        			position.coords.accuracy+"|"+position.coords.altitudeAccuracy+"|"+position.coords.heading+"|"+
        			position.coords.speed+"|"+position.timestamp;        
        domElement.addHiddenField(currentForm, "kffi_mylocation", addressLocation);
     }
}