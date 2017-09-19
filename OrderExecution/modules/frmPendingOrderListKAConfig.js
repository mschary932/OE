// config file for frmOrderList to map the result to widget
var frmPendingOrderListKAConfig = {
    "formid": "frmPendingOrderListKA",
    "frmPendingOrderListKA": {
      "entity": "PendingOrders",
      "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"AvailableOrders"
    },
    "segPendingOrderListKA": {
      "fieldprops": {
			"query":"SELECT PendingOrders.Code,PendingOrders.ORDER_TYPE,PendingOrders.Description,Status_id,Address_id,PlannedStartDate,PlannedEndDate,PendingOrders.id,OBJECT_TYPE, PendingOrdAddress.AddressLine2, PendingOrdAddress.AddressLine3, PendingOrdAddress.City_id, PendingOrdAddress.Region_id, PendingOrdAddress.Zipcode,PendingOrdAddress.Latitude,PendingOrdAddress.Longitude,PendingOrders.Priority Priority FROM PendingOrders left outer join PendingOrdAddress on  PendingOrders.Address_id = PendingOrdAddress.id where PendingOrders.PlannedStartDate BETWEEN '{x}' and '{y}' and Status_id in ('Pending', 'Scheduled')  and PendingOrders.Code not in (select Code from Workorder where Workorder.Code = PendingOrders.Code and Workorder.Status_id <> 'Pending') order by PendingOrders.PlannedStartDate asc",
			"additionalFields":["PlannedEndDate"],
      		"entity": "PendingOrders",
            "widgettype":"Segment",
            "header_Fields": {
	          "lblscheduledKA": {
	            "widgettype": "Label",
	            "text": "lblHeader",
	            "field": "lblHeader"
	          },
	          "imgScheduled": {
	            "widgettype": "Image",
	            "text": "imgHeader",
	            "field": "imgHeader"
	          }
	        },
            "field": {
            "lblTimeKA": {
              "widgettype": "Label",
              "field": "PlannedStartDate",
              "text": "PlannedStartDate",
              "alias": "PlannedStartDate"
            },
            "lblOrderNumKA": {
              "widgettype": "Label",
              "field": "Code",
              "text": "Code",
              "alias": "Code"
            },
            "lblInfoKA": {
              "widgettype": "Label",
              "field": "Description",
              "text": "Description",
              "alias": "Description"
            },
            "lblPriorityKA": {
              "widgettype": "Label",
              "field": "Description",
              "text" : "Priority",
              "alias" : "Priority"
            },
            "lblStatusKA": {
              "widgettype": "Label",
              "field": "Status_id",
              "text" : "Status_id",
              "alias" : "Status_id"
            },
            "imgStatusKA": {
              "widgettype": "Image",
              "field": "StatusImage",
              "text" : "StatusImage",
              "alias" : "StatusImage"
            },
            "imgPriorityKA": {
              "widgettype": "Image",
              "field": "PriorityImage",
              "text" : "PriorityImage",
              "alias" : "PriorityImage"
            },
            "lblAddressKA": {
              "widgettype": "Label",
              "field": "Address_id",
              "text" : "Address_id",
              "alias" : "Address_id" 
            },
            "lblTypeKA": {
              "widgettype": "Label",
              "field": "ORDER_TYPE",
              "text" : "ORDER_TYPE",
              "alias" : "ORDER_TYPE" 
            },
            "lblETAKA": {
              "widgettype": "Label",
              "field": "eta",
              "text" : "eta",
              "alias" : "eta" 
            }
        },
        "entity": "PendingOrders"
      }
    }
};