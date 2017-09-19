var frmContactDetailsKAConfig = {
    "formid": "frmContactDetailsKA",
    "frmContactDetailsKA": {
		
      "entity": "Contact",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution",
	  "additionalFields":["LastName","PrimaryExtension"]
    },
    "lblContactNameValueKA": {
      "fieldprops": {
        "entity": "Contact",
        "widgettype": "Label",
        "field": "FirstName"
      }
    },
    "lblAlternatePhoneKA": {
      "fieldprops": {
        "entity": "Contact",
        "widgettype": "Label",
        "field": "AlternatePhone"
      }
    },
	"lblPhoneNumberValueKA": {
      "fieldprops": {
        "entity": "Contact",
        "widgettype": "Label",
        "field": "PrimaryPhone"
      }
    },
    "lblEmailValueKA": {
      "fieldprops": {
        "entity": "Contact",
        "widgettype": "Label",
        "field": "Email"
      }
    },
    "lblMessageValueKA": {
      "fieldprops": {
        "entity": "Contact",
        "widgettype": "Label",
        "field": "AlternatePhone"
      }
    }
   
  };
  