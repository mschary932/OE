var frmTaskAttachmentImageKAConfig = {
    "formid": "frmTaskAttachmentImageKA",
    "frmTaskAttachmentImageKA": {
      "widgettype": "Label",
      "entity": "EAM_WO_ATTACHMENT",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "query":"select media.name,media.description,media.extension FROM media WHERE media.name = '{x}'",
      "objectServiceName":"OrderExecution"
    },
    "lblDayandTimeKA": {
      "fieldprops": {
        "entity": "EAM_WO_ATTACHMENT",
        "widgettype": "Label",
        "field": "EXTENSION"
      }
    }
  };