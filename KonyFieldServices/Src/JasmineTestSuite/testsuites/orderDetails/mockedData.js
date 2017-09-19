kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

kony.servicesapp.MOCKED_DATA_ORDER_LIST = [{
    "Code": "111114002625",
    "Description": "Air Conditioner1 Not connecting",
    "PlannedStartDate": "2015-08-12 16:13:06",
    "Instructions": "This is the instruction text for the Order that has the description has : Modem Not Starting Up"
}, {
    "Code": "222224002625",
    "PlannedStartDate": "2015-08-12 16:13:06",
    "Description": "Air Conditioner2 Not connecting",
    "Instructions": "This is the instruction text for the Order that has the description has : Modem Not Starting Up"
}, {
    "Code": "333334002625",
    "PlannedStartDate": "2015-08-12 16:13:06",
    "Description": "Air Conditioner3 Not connecting",
    "Instructions": "This is the instruction text for the Order that has the description has : Modem Not Starting Up"
}, {
    "Code": "444444002625",
    "PlannedStartDate": "2015-08-12 16:13:06",
    "Description": "Air Conditioner4 Not connecting",
    "Instructions": "This is the instruction text for the Order that has the description has : Modem Not Starting Up"
}];

kony.servicesapp.MOCKED_DATA_ADDRESS = [{
    "Address1": "HarshacToyota",
    "Address2": "No 2-40/5",
    "Address3": "Kondapur",
    "Address4": "Hyderabad",
    "City_id": "Hyderabad",
    "Latitude": "17.460861900000",
    "Logitude": "78.367627300000",
    "Region_id": "500084"
}, {
    "Address1": "HarshacToyota1",
    "Address2": "No 2-40/6",
    "Address3": "Kondapur1",
    "Address4": "Hyderabad1",
    "City_id": "Hyderabad1",
    "Latitude": "17.460861900000",
    "Logitude": "78.367627300000",
    "Region_id": "500084"
}, {
    "Address1": "HarshacToyota2",
    "Address2": "No 2-40/7",
    "Address3": "Kondapur2",
    "Address4": "Hyderabad2",
    "City_id": "Hyderabad",
    "Latitude": "17.460861900000",
    "Logitude": "78.367627300000",
    "Region_id": "500084"
}, {
    "Address1": "HarshacToyota",
    "Address2": "No 2-40/9",
    "Address3": "Kondapur1",
    "Address4": "Hyderabad1",
    "City_id": "Hyderabad",
    "Latitude": "17.460861900000",
    "Logitude": "78.367627300000",
    "Region_id": "500084"
}];

kony.servicesapp.MOCKED_DATA_STATUS = [{
    "Description": "Scheduled"
}, {
    "Description": "On Route"
}, {
    "Description": "Rejected"
}, {
    "Description": "Completed"
}, {
    "Description": "Started"
}, {
    "Description": "Paused"
}];

kony.servicesapp.MOCKED_DATA_PRIORITY = [{
    "id": "1",
    "Description": "Critical"
}, {
    "id": "2",
    "Description": "High"
}, {
    "id": "3",
    "Description": "Medium"
}, {
    "id": "4",
    "Description": "Low"
}];
kony.servicesapp.MOCKED_DATA_CONTACT = [{
    "AlternatePhone": "96762613211",
    "Email": "Ziegler@test.com",
    "FirstName": "Ziegler",
    "LastName": "Monica",
    "PrimaryPhone": "040999999999",
    "PrimaryExtension": "5555",
	"Sequence": "P"
}, {
    "AlternatePhone": "93249221334",
    "Email": "peter@test.com",
    "FirstName": "peter",
    "LastName": "jon",
    "PrimaryPhone": "321876532",
    "PrimaryExtension": "4444",
	"Sequence": "P"
}, {
    "AlternatePhone": "26132112112",
    "Email": "watson@test.com",
    "FirstName": "watson",
    "LastName": "emma",
    "PrimaryPhone": "0404321233",
    "PrimaryExtension": "8888",
	"Sequence": "P"
}, {
    "AlternatePhone": "26132112112",
    "Email": "watson@test.com",
    "FirstName": "watson",
    "LastName": "emma",
    "PrimaryPhone": "0404321233",
    "PrimaryExtension": "8888",
	"Sequence": "P"
}];
kony.servicesapp.MOCKED_DATA_ASSET = [{
    description: "FOCKE 520 PACK TRANSPORT SYSTEM"
}, {
    description: "FOCKE 798 AUTO ROBBIN SPLICER"
}, {
    description: "DOD PACK PRINTER"
}, {
    description: "Grid 1 - Distribution Pipes - CWW"
}];

kony.servicesapp.MOCKED_DATA_MATERIAL = [{
    "Description": "300mm Concrete Pipe"
}, {
    "Description": "300mm x 2m Concrete Pipe"
}, {
    "Description": "A1 Grand Prix super sprint BMX Bike"
}, {
    "Description": "Polycom Phone"
}];

kony.servicesapp.MOCKED_DATA_TASK = [{
    "Code": "11111111",
    "Description": "Task Description 1",
    "Task_num": "0010",
    "StartDate": "2015-08-13 11:25:11",
    "EndDate": "2015-08-13 11:25:11"
}, {
    "Code": "22222222",
    "Description": "Task Description 2",
    "Task_num": "0020",
    "StartDate": "2015-08-13 11:25:11",
    "EndDate": "2015-08-13 11:25:11"
}, {
    "Code": "33333333",
    "Description": "Task Description 3",
    "Task_num": "0030",
    "StartDate": "2015-08-13 11:25:11",
    "EndDate": "2015-08-13 11:25:11"
}, {
    "Code": "444444444",
    "Description": "Task Description 4",
    "Task_num": "0040",
    "StartDate": "2015-08-13 11:25:11",
    "EndDate": "2015-08-13 11:25:11"
}];

kony.servicesapp.MOCKED_DATA_WORKORDER_MATERIAL = [

];

kony.servicesapp.MOCKED_DATA_STOPWATCH = [{
        "ChangeTime": "2015-08-06 18:51:17",
        "Task_num": "0010"
    }, {
        "ChangeTime": "2015-08-06 18:52:17",
        "Task_num": "0010"
    }
];