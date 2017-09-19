function addToScroll(formName, scrollId, widgets) {
    var widgetScroll = formName[scrollId];
    var widgetConfig;
    var dynamicImg;
    var basicConfBtn;
    var labelConfig;
    var lbl;
    var noOfItems = widgets.length - 1;
    for (var widget = 0; widget <= noOfItems; widget++) {
        widgetConfig = widgets[widget];
        basicConfBtn = {
            "id": "btn" + widget,
            "skin": widgetConfig.skin,
            "focusSkin": widgetConfig.focusSkin,
            "onClick": widgetConfig.onclick,
            "left": (widget == 0 ? 25 : 7.5 + "%"),
            "height": "45%",
            "width": "7%",
            "centerY": "50%"
        }
        labelConfig = {
            id: "lbl" + widget,
            skin: "sknLineA0B2C3KA",
            text: "",
            left: "7.5%",
            height: "53%",
            width: "1px",
            centerY: "50%"
        };
        if (widget == noOfItems) {
            labelConfig = {};
            basicConfBtn["right"] = "7%";
        }
        lbl = new kony.ui.Label(labelConfig, {}, {
            showProgressIndicator: false
        });
        dynamicImg = new kony.ui.Button(basicConfBtn, {}, {
            showProgressIndicator: false
        });
        widgetScroll.add(dynamicImg);
        widgetScroll.add(lbl);
    }
}