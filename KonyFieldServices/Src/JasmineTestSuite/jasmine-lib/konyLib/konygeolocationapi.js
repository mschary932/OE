$KI.geolocation = {

    getcurrentposition: function(successCallback, errorCalback, positionOptions){ 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCalback, positionOptions);
        }
    },
    
    watchposition: function(successCallback, errorCalback, positionOptions){        
        if (navigator.geolocation) {
            return (navigator.geolocation.watchPosition(successCallback, errorCalback, positionOptions));
        }
    },
    
    clearwatch: function(watchid){
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(watchid);
        }
    }
};
