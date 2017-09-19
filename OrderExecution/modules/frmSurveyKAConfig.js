//Type your code here// config file for frmOrderList to map the result to widget
//var frmSurveyKAConfig = kony.servicesapp.DEFAULT_SURVEY_CONFIG;
var frmSurveyKAConfig={
  "formid": "frmSurveyKA",
    "frmSurveyKA": {
        "entity":kony.servicesapp.ENTITY_SURVEYRESPONSE,
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution"
    }, 
   "lblSurveyResponseID": {
        "fieldprops": {
            "entity": kony.servicesapp.ENTITY_SURVEYRESPONSE,
            "widgettype": "Label",
            "field": "id",
            "text": "id"
        }
    },
  	"lblSurveyDefinitionID": {
        "fieldprops": {
            "entity": kony.servicesapp.ENTITY_SURVEYRESPONSE,
            "widgettype": "Label",
            "field": "SurveyDefinition_id",
            "text": "SurveyDefinition_id"
        }
    },
    "flxSurveyKA": {
        "fieldprops": {
            "entity": kony.servicesapp.ENTITY_WORKORDER,
            "widgettype": "Label",
            "query": "select res.* from (select que.*, sr.id as response_id from (select foi.FieldOptionGroup_id, foi.id, foi.code, foi.label as optionitem_name,sfd.DataType_id as datatype_id, sfd.name, sfd.surveydefinition_id,sfd.isRequired, sfd.label,sd.name as surveyname , ss.name as surveysectionname, ss.id as surveysection_id, sfv.fieldvalue, sfv.surveyresponse_id, sfv.id as surveyfieldvalue_id, sfd.id as surveyfielddefinition_id from SurveyFieldDefinition as sfd left join FieldOptionItem as foi on foi.FieldOptionGroup_id = sfd.FieldOptionGroup_id left join SurveySectionField as ssf on ssf.FieldDefinition_id=sfd.id and ssf.SurveyDefinition_id= sfd.SurveyDefinition_id  left join SurveyDefinition as sd on sd.id = sfd.SurveyDefinition_id left join  SurveySection as ss on ss.id=ssf.SurveySection_id left join SurveyFieldValue as sfv on sfv.SurveyFieldDefintion_id=sfd.id and sfv.surveyresponse_id = (select wos.surrveyresponse_id from EventSurvey wos where wos.workorder_id='{x}' and wos.eventtype_id='{y}')  where sfd.SurveyDefinition_id = (select wos.SurveyDefinition_id from EventSurveyDefinition wos where wos.eventtype_id='{y}')) as que left join SurveyResponse as sr on sr.id=que.surveyresponse_id order by length(surveyfielddefinition_id)) as res",
            "querytype": "sql",
            "field": "Description"
        }
    },
   "flxEventSurveyKA":{
  		"fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
            "parent" : "frmSurveyKA"
		}
  
	},
  	"lblEventTypeid":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
        	"parent":"flxEventSurveyKA",
        	"field":"EventType_id",
        	"text":"EventType_id"
		}
    },
  	"lblEventSurveyDefinitionid":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
        	"parent":"flxEventSurveyKA",
        	"field":"SurveyDefinition_id",
        	"text":"SurveyDefinition_id"
		}
    },
  	"lblWorkorderid":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
        	"parent":"flxEventSurveyKA",
        	"field":"Workorder_id",
        	"text":"Workorder_id"
		}
    },
  	"lblUserid":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
        	"parent":"flxEventSurveyKA",
        	"field":"User_id",
        	"text":"User_id"
		}
    },
  	"lblStatusId":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_SURVEYRESPONSE,
            "widgettype": "Label",
        	"field":"Status_id",
        	"text":"Status_id"
		}
    }
  
};
