var frmCompleteOrderKAConfig = {
    "formid": "frmCompleteOrderKA",
    "frmCompleteOrderKA": {
        "entity": "WorkOrder",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution",
	  "additionalFields":[ "Address.AddressLine1","Address.AddressLine2", "Address.AddressLine3", "Address.City_id", "Address.Region_id", "Address.Zipcode","Address.Latitude","Address.Longitude"]
    },
    "lblStartDateKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "ActualStartDate"
      }
    },
    "lblEndDateKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "ActualEndDate"
      }
    },
    "lblCodeKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Code"
      }
    },
    "lblDescriptionKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Description"
      }
    },
    "flxContactNameKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "query" :"select co.FirstName,co.LastName,co.id from Contact co, WorkOrderContact wco where wco.Contact_id=co.id and wco.Sequence= '1' and wco.WorkOrder_id = '{x}'",
        "querytype" : "sql",
        "field" : "Description"
      }
    },
    "lblNameKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "parent": "flxContactNameKA",
        "field": "ContactName"
      }
    },
  "lblOrderCompletedByKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "parent": "flxContactNameKA",
        "field": "ContactName"
      }
    },
  	"lblOrderCompletionAddressKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Address_id"
      }
    },
    "lblStartTimeKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "ActualStartDate"
      }
    },
    "lblEndTimeKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "ActualEndDate"
      }
    },
    "lblOrderNumberKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Code"
      }
    },
    "lblOrderDetailsKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Description"
      }
    },
	"flexDetailsKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "query" :"select esd.id,esd.EventType_id as EventType_id,sr.Status_id as Status,esd.SurveyDefinition_id, es.SurrveyResponse_id as SurveyResponse_id  from EventSurveyDefinition esd left join EventSurvey es on es.workorder_id='{x}' and es.eventtype_id = esd.eventtype_id left join SurveyResponse sr on es.SurrveyResponse_id = sr.id where esd.eventtype_id = 'WO_CHECKLIST' or esd.eventtype_id = 'WO_ACCEPTANCE' or esd.eventtype_id = 'WO_FINISH' order by esd.SurveyDefinition_id desc",
        "querytype" : "sql",
        "field" : "Description"
      }
    },
	
	"flxContainerPaymentKA": {
        "fieldprops": {
            "entity": "Payment",
            "widgettype": "Label",
            "query": "Select p.id, p.WorkOrder_id FROM Payment p where p.WorkOrder_id = '{x}'",
            "querytype": "sql",
            "field": "Description"
        }
    }
	
  };
  