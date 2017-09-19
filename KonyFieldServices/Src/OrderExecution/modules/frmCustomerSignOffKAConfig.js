var frmCustomerSignOffKAConfig = {
    "formid": "frmCustomerSignOffKA",
    "frmCustomerSignOffKA": {
        "entity": "WorkOrder",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution",
	  "additionalFields":["Address.AddressLine1","Address.AddressLine2", "Address.AddressLine3", "Address.City_id", "Address.Region_id", "Address.Zipcode","Address.Latitude","Address.Longitude"]
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
  "flxSignatureKA": {
      "fieldprops": {
        "entity": "EAM_WO_ATTACHMENT",
        "widgettype": "Label",
        "query" :"select EAM_WO_ATTACHMENT.BINARY_NAME FROM EAM_WO_ATTACHMENT WHERE  EAM_WO_ATTACHMENT.ORDER_NUM = '{x}' and LOWER(EAM_WO_ATTACHMENT.DOC_TYPE) = 'signature'",
        "querytype" : "sql",
        "field" : "Description"
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
        "field": "PlannedStartDate"
      }
    },
    "lblEndTimeKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "PlannedEndDate"
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
    "flxProblemKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "query" :"select res.* from (select que.*, sr.id as response_id from (select foi.FieldOptionGroup_id, foi.id, foi.code, foi.label as optionitem_name,sfd.DataType_id as datatype_id, sfd.name, sfd.surveydefinition_id, sfd.isRequired, sfd.label, sfv.fieldvalue, sfv.surveyresponse_id, sfv.id as surveyfieldvalue_id, sfd.id as surveyfielddefinition_id from SurveyFieldDefinition as sfd left join FieldOptionItem as foi on foi.FieldOptionGroup_id = sfd.FieldOptionGroup_id left join SurveyFieldValue as sfv on sfv.SurveyFieldDefintion_id=sfd.id and sfv.surveyresponse_id = (select wos.surrveyresponse_id from EventSurvey wos where wos.workorder_id='{x}' and wos.eventtype_id='WO_ACCEPTANCE')  where sfd.SurveyDefinition_id = (select wos.SurveyDefinition_id from EventSurveyDefinition wos where wos.eventtype_id='WO_ACCEPTANCE')) as que left join SurveyResponse as sr on sr.id=que.surveyresponse_id order by length(surveyfielddefinition_id)) as res",
        "querytype" : "sql",
        "field" : "Description"
      }
    }
};