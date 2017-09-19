var frmCompleteImagesKAConfig = {
    "formid": "frmCompleteImagesKA",
      "frmCompleteImagesKA": {
        "entity": "EAM_WO_ATTACHMENT",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "segImagesListKA": {
        "fieldprops": {
            "query":"select EAM_WO_ATTACHMENT.BINARY_NAME, EAM_WO_ATTACHMENT.ATTACH_DESC as Description FROM EAM_WO_ATTACHMENT LEFT JOIN media ON EAM_WO_ATTACHMENT.BINARY_NAME = media.name  WHERE LOWER(media.type) = 'graphics' AND EAM_WO_ATTACHMENT.ORDER_NUM = '{x}' and (LOWER(EAM_WO_ATTACHMENT.EXTENSION) = 'png'  OR LOWER(EAM_WO_ATTACHMENT.EXTENSION) = 'jpeg' OR LOWER(EAM_WO_ATTACHMENT.EXTENSION) = 'jpg')",
            "querytype": "sql",
            "entity": "EAM_WO_ATTACHMENT",
            "widgettype": "Segment",
            "field": {
                "lblCompleteOrderKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Description",
                    "alias": "Description"
                },
                 "ImgCompleteOrderKA": {
                    "widgettype": "Image",
                       "field": "BINARY_NAME",
             			"text" : "BINARY_NAME",
             			"alias" : "BINARY_NAME"            
                }
            },
            "entity": "EAM_WO_ATTACHMENT"
        }
    }
  };