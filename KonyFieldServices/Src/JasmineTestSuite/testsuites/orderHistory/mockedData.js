kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

kony = kony || {};
kony.servicesapp = kony.servicesapp || {};


kony.servicesapp.MOCKED_DATA_STATUS = [{
    "Description": "Scheduled"
}, {
    "Description": "Started"
}, {
    "Description": "Rejected"
}, {
    "Description": "Completed"
}, {
    "Description": "Started"
}, {
    "Description": "Paused"
}];

kony.servicesapp.MOCKED_CONSTANTS = {
 "timeFormat": "hh:mm A",
 "dateFormat": "MM/DD/YYYY",
 "dateTimeFormat" : "YYYY-MM-DD HH:mm:ss"
};
kony.servicesapp.MOCKED_DATA_ORDER_HISTORY = [{
    "Code": "111114002625",
    "Description": "General Maintance",
    "StartDate": "2015-10-10 16:13:06",
	"Type_id" : "d27",
	"WorkCenter_id" : "MAINT01",
	"Order_Id" : "123456789"
}, {
    "Code": "111114002895",
    "Description": "Air Conditioner1 Not connecting",
    "StartDate": "2015-08-12 16:13:06",
	"Type_id" : "d27",
	"WorkCenter_id" : "MAINT01",
	"Order_Id" : "123456789"	
}, {
   "Code": "111114002215",
    "Description": "AC repair",
    "StartDate": "2015-08-12 16:13:06",
	"Type_id" : "d27",
	"WorkCenter_id" : "MAINT01",
	"Order_Id" : "123456789"
}, {
  "Code": "111114000905",
    "Description": "network problem",
    "StartDate": "2015-08-12 16:13:06",
	"Type_id" : "d27",
	"WorkCenter_id" : "MAINT01",
	"Order_Id" : "123456789"
}];

kony.servicesapp.MOCKED_DATA_SYSTEM_USER = {
    "FirstName": "sridhar",
    "LastName": "katla",
    "MobilePhone": "9440071692",
	"WorkCenter_id" : "MAINT01"
};
