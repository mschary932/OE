kony = kony || {};
kony.vapps = kony.vapps || {};
kony.vapps.appmenu = kony.vapps.appmenu || {};
kony.vapps.appmenu.widgets = {
    getFlexContainerWidget: function(config) {
        //kony.print("abcd : " + JSON.stringify(kony.vapps.appmenu));
        var defaultConfig = kony.vapps.appmenu.widgetconfig.getWidgetConfig("flexContainer");
        var flexContainer = new kony.ui.FlexContainer({
            "id": config["id"] || defaultConfig["id"],
            "top": config["top"] || defaultConfig["top"],
            "left": config["left"] || defaultConfig["left"],
            "width": config["width"] || defaultConfig["width"],
            "height": config["height"] || defaultConfig["height"],
            "zIndex": config["zIndex"] || defaultConfig["zIndex"],
            "isVisible": config["isVisible"] || defaultConfig["isVisible"],
            "clipBounds": config["clipBounds"] || defaultConfig["clipBounds"],
            "Location": config["location"] || defaultConfig["location"],
            "layoutType": config["layoutType"] || defaultConfig["layoutType"],
            "onClick": config["onClick"] || defaultConfig["onClick"],
            "skin": config["skin"] || defaultConfig["skin"],
            "focusSkin": config["focusSkin"] || defaultConfig["focusSkin"]
        }, {
            "padding": config["padding"] || defaultConfig["padding"]
        }, {});
        return flexContainer;
    },
    getFlexScrollContainerWidget: function(config) {
        var defaultConfig = kony.vapps.appmenu.widgetconfig.getWidgetConfig("flexScrollContainer");
        var flexContainer = new kony.ui.FlexScrollContainer({
            "id": config["id"] || defaultConfig["id"],
            "top": config["top"] || defaultConfig["top"],
            "left": config["left"] || defaultConfig["left"],
            "width": config["width"] || defaultConfig["width"],
            "height": config["height"] || defaultConfig["height"],
            "layoutType": config["layoutType"] || defaultConfig["layoutType"],
            "enableScrolling": config["enableScrolling"] || defaultConfig["enableScrolling"],
            "scrollDirection": config["scrollDirection"] || defaultConfig["scrollDirection"],
            "horizontalScrollIndicator": config["horizontalScrollIndicator"] || defaultConfig["horizontalScrollIndicator"],
            "verticalScrollIndicator": config["verticalScrollIndicator"] || defaultConfig["verticalScrollIndicator"],
            "zIndex": config["zIndex"] || defaultConfig["zIndex"],
            "isVisible": config["isVisible"] || defaultConfig["isVisible"],
            "clipBounds": config["clipBounds"] || defaultConfig["clipBounds"],
            "skin": config["skin"] || defaultConfig["skin"],
            "focusSkin": config["focusSkin"] || defaultConfig["focusSkin"],
            "bounces": config["bounces"] || defaultConfig["bounces"],
            "allowHorizontalBounce": config["allowHorizontalBounce"] || defaultConfig["allowHorizontalBounce"],
            "allowVerticalBounce": config["allowVerticalBounce"] || defaultConfig["allowVerticalBounce"],
            "onSwipe": config["onSwipe"] || defaultConfig["onSwipe"]
        }, {
            "padding": config["padding"] || defaultConfig["padding"],
            "widgetAlignment": config["widgetAlignment"] || defaultConfig["widgetAlignment"],
            "containerWeight": config["containerWeight"] || defaultConfig["containerWeight"],
            "hExpand": config["hExpand"] || defaultConfig["hExpand"],
            "vExpand": config["vExpand"] || defaultConfig["vExpand"],
            "layoutType": config["layoutType"] || defaultConfig["layoutType"]
        }, {});
        return flexContainer;
    },
    getButtonWidget: function(config) {
        var defaultConfig = kony.vapps.appmenu.widgetconfig.getWidgetConfig("button");
        var button = new kony.ui.Button({
            "id": config["id"] || defaultConfig["id"],
            "top": config["top"] || defaultConfig["top"],
            "left": config["left"] || defaultConfig["left"],
            "width": config["width"] || defaultConfig["width"],
            "height": config["height"] || defaultConfig["height"],
            "zIndex": config["zIndex"] || defaultConfig["zIndex"],
            "isVisible": config["isVisible"] || defaultConfig["isVisible"],
            "centerY": config["centerY"] || defaultConfig["centerY"],
            "centerX": config["centerX"] || defaultConfig["centerX"],
            "text": config["text"] || defaultConfig["text"],
            "skin": config["skin"] || defaultConfig["skin"],
            "focusSkin": config["focusSkin"] || defaultConfig["focusSkin"],
            "onClick": config["onClick"] || defaultConfig["onClick"]
        }, {
            "padding": config["padding"] || defaultConfig["padding"],
            "contentAlignment": config["contentAlignment"] || defaultConfig["contentAlignment"],
            "displayText": config["displayText"] || defaultConfig["displayText"],
            "marginInPixel": config["marginInPixel"] || defaultConfig["marginInPixel"],
            "paddingInPixel": config["paddingInPixel"] || defaultConfig["paddingInPixel"],
            "containerWeight": config["containerWeight"] || defaultConfig["containerWeight"]
        }, {
            "glowEffect": config["glowEffect"] || defaultConfig["glowEffect"],
            "showProgressIndicator": config["showProgressIndicator"] || defaultConfig["showProgressIndicator"]
        });
        return button;
    },
    getImageWidget: function(config) {
        var defaultConfig = kony.vapps.appmenu.widgetconfig.getWidgetConfig("image");
        var image = new kony.ui.Image2({
            "id": config["id"] || defaultConfig["id"],
            "top": config["top"] || defaultConfig["top"],
            "left": config["left"] || defaultConfig["left"],
            "width": config["width"] || defaultConfig["width"],
            "height": config["height"] || defaultConfig["height"],
            "zIndex": config["zIndex"] || defaultConfig["zIndex"],
            "centerY": config["centerY"] || defaultConfig["centerY"],
            "centerX": config["centerX"] || defaultConfig["centerX"],
            "src": config["src"] || defaultConfig["src"],
            "imageWhenFailed": config["imageWhenFailed"] || defaultConfig["imageWhenFailed"],
            "imageWhileDownloading": config["imageWhileDownloading"] || defaultConfig["imageWhileDownloading"]
        }, {
            "padding": config["padding"] || defaultConfig["padding"],
            "imageScaleMode": config["imageScaleMode"] || defaultConfig["imageScaleMode"],
            "referenceWidth": config["referenceWidth"] || defaultConfig["referenceWidth"],
            "referenceHeight": config["referenceHeight"] || defaultConfig["referenceHeight"],
            "marginInPixel": config["marginInPixel"] || defaultConfig["marginInPixel"],
            "paddingInPixel": config["paddingInPixel"] || defaultConfig["paddingInPixel"],
            "containerWeight": config["containerWeight"] || defaultConfig["containerWeight"]
        }, {});
        return image;
    },
    getLabelWidget: function(config) {
        var defaultConfig = kony.vapps.appmenu.widgetconfig.getWidgetConfig("label");
        var label = new kony.ui.Label({
            "id": config["id"] || defaultConfig["id"],
            "top": config["top"] || defaultConfig["top"],
            "left": config["left"] || defaultConfig["left"],
            "width": config["width"] || defaultConfig["width"],
            "height": config["height"] || defaultConfig["height"],
            "isVisible": config["isVisible"] || defaultConfig["isVisible"],
            "text": config["text"] || defaultConfig["text"],
            "skin": config["skin"] || defaultConfig["skin"]
        }, {
            "padding": config["padding"] || defaultConfig["padding"],
            "contentAlignment": config["contentAlignment"] || defaultConfig["contentAlignment"],
            "marginInPixel": config["marginInPixel"] || defaultConfig["marginInPixel"],
            "paddingInPixel": config["paddingInPixel"] || defaultConfig["paddingInPixel"],
            "containerWeight": config["containerWeight"] || defaultConfig["containerWeight"]
        }, {
            "textCopyable": config["textCopyable"] || defaultConfig["textCopyable"]
        });
        return label;
    },
    getLineWidget: function(config) {
        var defaultConfig = kony.vapps.appmenu.widgetconfig.getWidgetConfig("line");
        var line = new kony.ui.Line({
            "id": config["id"] || defaultConfig["id"],
            "top": config["top"] || defaultConfig["top"],
            "left": config["left"] || defaultConfig["left"],
            "width": config["width"] || defaultConfig["width"],
            "height": config["height"] || defaultConfig["height"],
            "isVisible": config["isVisible"] || defaultConfig["isVisible"],
            "skin": config["skin"] || defaultConfig["skin"]
        }, {
            "thickness": config["thickness"] || defaultConfig["thickness"],
            "marginInPixel": config["marginInPixel"] || defaultConfig["marginInPixel"],
            "paddingInPixel": config["paddingInPixel"] || defaultConfig["paddingInPixel"]
        }, {});
        return line;
    }
};