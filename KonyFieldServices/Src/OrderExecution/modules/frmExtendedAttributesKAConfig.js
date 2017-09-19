var frmExtendedAttributesKAConfig = {
    "formid": "frmExtendedAttributesKA",
    "frmExtendedAttributesKA": {
        "widgettype": "Label",
        "entity": "ExtendedAttributeValue",
        "objectServiceName": "OrderExecution",
        "objectServiceOptions": {
            "access": "offline"
        }
    },
    "segExtendedAttributesKA": {
        "fieldprops": {
			"query":"Select * from ExtendedAttributeValue exvalue where exvalue.PARENT_KEY = '{x}' and exvalue.OBJECT_TYPE = '{y}'",
      		"querytype":"sql",
            "entity": "ExtendedAttributeValue",
            "widgettype": "Segment",
			"additionalFields":[],
            "field": {
                "lblAttributeNameKA": {
                    "widgettype": "Label",
                    "field": "LDB_LABEL",
                    "text": "LDB_LABEL"
                },
                "lblAttributeValueKA": {
                    "widgettype": "Label",
                    "field": "VALUE",
                    "text": "VALUE"
                }
            }
        }
    }
};