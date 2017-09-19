
/*
 * Widget : Segment
 */
$KW.Segment = {
    segmentCounter : 0,

    initialize: function() {
        kony.events.addEvent("click", "Segment", this.eventHandler);
        kony.events.addEvent("onorientationchange", "Segment", this.orientationHandler);
    },

    initializeView: function(formId) {
        //$KW.touch.computeSnapWidths(formId, "Segment");
		$KU.setScrollBoxesHeight(formId, "Segment");
    },

    orientationHandler: function(formId, orientation) {
		//$KW.touch.orientationHandler(formId, orientation, "Segment");
		$KU.setScrollBoxesHeight(formId, "Segment");
        //$KW.touch.computeSnapWidths(formId, "Segment");
    },

    adjustFooter: function(formId) {
        var segments = document.querySelectorAll("#" + formId + " div[kwidgettype='Segment']");
        for(var i=0; i<segments.length; i++) {
            var segmentModel = $KU.getModelByNode(segments[i]);
            var footer = document.getElementById(segmentModel.pf + "_" + segmentModel.id + "_footer");
			footer && (footer.style.width = window.innerWidth);
        }
    },

    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
        var element = $KU.getNodeByModel(widgetModel);
		
        switch (propertyName) {
            case "skin":
            case "askin":
            case "rowskin":
            case "alternaterowskin":
				if(element)
				{
					if(propertyName == "skin") 
					{
						var skin = propertyValue + "grp";
						var oldSkin = oldPropertyValue + "grp";
						$KU.removeClassName(element, oldSkin);
						$KU.addClassName(element, skin);
						break;
					}
					if(widgetModel.viewtype != constants.SEGUI_VIEW_TYPE_PAGEVIEW)
					{
						if(widgetModel.hasSections)
							this.applySectionRowSkin(widgetModel, element);
						else
						{
							element = element.childNodes[0];
							this.applyRowSkin(widgetModel, element);
						}
					}
				}
                break;
                
            case "widgetskin":
				var element = $KW.Utils.getWidgetNode(widgetModel);
                if(element) {
                    $KU.removeClassName(element, oldPropertyValue || (widgetModel.skin ? widgetModel.skin + "grp" : ""));
                    $KU.addClassName(element, propertyValue);
                }    
                break;
                
            case "sectionskin":
            case "sectionheaderskin":
                if(widgetModel.hasSections) $KW.Segment.applySectionHeaderSkin(widgetModel, propertyValue);
                break;
                
            case "focusedindex":
            case "selectedindex":
                if(propertyValue && this.isSelectionOutOfBound(widgetModel, propertyValue)) {
                    return;
                }
                if(propertyName == "focusedindex") {
                   propertyValue = IndexJL ? [null, 0, propertyValue] : [0, propertyValue];
                }
					
                if(widgetModel.selectionbehavior != constants.SEGUI_DEFAULT_BEHAVIOR
                && widgetModel.viewtype != constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                    var selectedRows = null;
                    widgetModel.selectedRows = (widgetModel.selectedRows) ? widgetModel.selectedRows : (IndexJL) ? [null] : [];
                    if(propertyValue) {
                        if(widgetModel.selectionbehavior == constants.SEGUI_SINGLE_SELECT_BEHAVIOR) {
                            selectedRows = (IndexJL) ? [null, propertyValue] : [propertyValue];
                            var arrayIndex = $KU.arrayIndex(widgetModel.selectedRows, propertyValue);
                            if(arrayIndex != -1) {
                                selectedRows.splice(arrayIndex, 1);
                            } else {
                                selectedRows = selectedRows;
                            }
                        } else if(widgetModel.selectionbehavior == constants.SEGUI_MULTI_SELECT_BEHAVIOR) {
                            var arrayIndex = $KU.arrayIndex(widgetModel.selectedRows, propertyValue);
                            if(arrayIndex != -1) {
                                widgetModel.selectedRows.splice(arrayIndex, 1);
                            } else {
                                widgetModel.selectedRows.push(propertyValue);
                            }
                            selectedRows = widgetModel.selectedRows;
                        }
                    }
                    selectedRows = (!selectedRows) ? null : (selectedRows.length > IndexJL) ? selectedRows : null;
                    this.setImages(widgetModel, selectedRows);
                } else if(widgetModel.selectionbehavior == constants.SEGUI_DEFAULT_BEHAVIOR) {
                    widgetModel.selectedRows = (!propertyValue) ? null : (IndexJL) ? [null, propertyValue] : [propertyValue];
                    this.setSelectedItemsAndIndices(widgetModel);
                }

                if(widgetModel.viewtype === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                    var swipeContext = widgetModel.swipeContext;
                    if(element) {
                        var imgsElement = element.children[0];
                        var findex = propertyValue[IndexJL+1];
                        if((findex - IndexJL) <= imgsElement.children.length ) {
                            swipeContext.currentPage = parseInt(findex) - IndexJL;
                            $KW.touch.scrollImages(imgsElement, swipeContext.imageWidth * swipeContext.currentPage, $KU.swipeDuration, false);
                            $KW.touch.updatePageIndicator(element, swipeContext, widgetModel);
                        }
                    }
                } else { //Table view
                    (propertyValue && element) && this.setFocus(widgetModel, element, propertyValue);
                }
                break;
                
            case "selectedsectionindex":
                if(widgetModel.hasSections) {
                    var index = IndexJL ? propertyValue : (propertyValue + 1);
                    if(element){
						element = document.querySelector("#" + element.id + " ul:nth-child(" + index + ")");
						element && $KW.Widget.setfocus(widgetModel, null, element);
					}
                }    
                break;
                
            case "selectedindices":
                if(propertyValue) {
                    var selectedRows = (IndexJL) ? [null] : [];
                    for(var i=IndexJL; i<propertyValue.length; i++) {
                        var secIndex = parseInt(propertyValue[i][0+IndexJL], 10);
                        var rowIndexes = propertyValue[i][1+IndexJL];
                        for(var j=IndexJL; j<rowIndexes.length; j++) {
                            var selection = (IndexJL) ? [null, secIndex, rowIndexes[j]] : [secIndex, rowIndexes[j]];
                            if(!this.isSelectionOutOfBound(widgetModel, selection)) {
                                selectedRows.push(selection);
                            }
                        }
                    }
                    if(widgetModel.selectionbehavior != constants.SEGUI_MULTI_SELECT_BEHAVIOR) {
                        selectedRows = (IndexJL) ? [null, selectedRows[selectedRows.length-1]] : [selectedRows[selectedRows.length-1]];
                    }
                    selectedRows = (selectedRows.length > IndexJL) ? selectedRows : null;
                } else {
                    var selectedRows = null;
                }
                if(widgetModel.selectionbehavior == constants.SEGUI_DEFAULT_BEHAVIOR) {
                    widgetModel.selectedRows = selectedRows;
                    this.setSelectedItemsAndIndices(widgetModel);
                } else {
                    this.setImages(widgetModel, selectedRows);
                }
                break;
                
            case "paginationconfig":
                $KW.Segment.updatePageFooter(widgetModel);
                break;
                
            case "septhickness":
            case "separatorthickness":
            case "sepcolor":
            case "separatorcolor":
            case "separatorrequired":
                if(element) {
                    var thickness = widgetModel.separatorthickness || widgetModel.septhickness;
                    var color = widgetModel.separatorcolor || widgetModel.sepcolor;
                    var querySelector = "[id='" + element.id + "'] li[index" + (widgetModel.hasSections ? "$='-1']" : "]");
                    var nodes = document.querySelectorAll(querySelector);
                    for(var i = 0;i < nodes.length ; ++i) {
                        var node = nodes[i];
                        node.style.border = "none";
                        if(!widgetModel.separatorrequired)
                            continue;
                        var r = parseInt(color.substring(0, 2), 16), g = parseInt(color.substring(2, 4), 16), b = parseInt(color.substring(4, 6), 16);
                        var o = 1 - (parseInt(color.substring(6, 8), 16)/100);
                        node.style.borderBottom = thickness + "px solid rgba("+r+","+g+","+b+","+o+")";
                    }
                }
                break;
            
            case "needpageindicator":
                if(widgetModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                    var element = document.getElementById([widgetModel.pf, widgetModel.id, 'footer'].join('_'));
                    if(element) {
                        if(propertyValue)
                            $KU.removeClassName(element, "hide");
                        else
                            $KU.addClassName(element, "hide");
                    }
                }
                break;
                
            case "pageondotimage":
            case "pageoffdotimage":
                var element = document.getElementById([widgetModel.pf, widgetModel.id, 'footer'].join('_'));
                if(element) 
                    element.innerHTML = $KW.Segment.generatePageFooter(widgetModel,(widgetModel.data || []));
                break;
                
            case "data":
                if($KU.isArray(propertyValue)) {
                    this.setData(widgetModel, propertyValue);
                } else if(propertyValue === null) {
                    widgetModel.selectedRows = widgetModel.data = null;
                    this.setSelectedItemsAndIndices(widgetModel);
                }
                break;
                
            case "viewtype":
				var element = $KW.Utils.getWidgetNode(widgetModel);
                if(propertyValue != oldPropertyValue && element) {
                    var parentNode = element.parentNode;
                    parentNode.innerHTML = this.generateSegment(widgetModel, widgetModel.context);
                    if(propertyValue == constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                        widgetModel.selectionbehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
                        element = $KU.getNodeByModel(widgetModel);
                        $KW.touch.computeWidths(element, widgetModel);
                        var pScrollerInstance = new $KW.touch.pageviewScroller(element, {widgetModel: widgetModel});
                        $KG[element.id] = pScrollerInstance;
                    }
					this.adjustFlexContainers(widgetModel, 'setdata');
                }
                break;
            
            case "selectionbehavior":
                if(propertyValue != oldPropertyValue) {
                    this.setData(widgetModel, widgetModel.data);
                }
                break;
                
            case "selectionbehaviorconfig":
                if(propertyValue instanceof Object) {
                    widgetModel.selectionindicator = propertyValue.imageIdentifier || propertyValue.imageidentifier;
                    widgetModel.selectimage = propertyValue.selectedStateImage || propertyValue.selectedstateimage;
                    widgetModel.unselectimage = propertyValue.unselectedStateImage || propertyValue.unselectedstateimage;
                }

                if(widgetModel.selectionbehavior != constants.SEGUI_DEFAULT_BEHAVIOR) {
                    this.setData(widgetModel, widgetModel.data);
                }    
                break;
			
		}
    },    
	
	setFocus: function(widgetModel, element, selectedindex){
		var indexStr = (widgetModel.hasSections) ? "secindex='" + selectedindex[0 + IndexJL] + "," + selectedindex[1 + IndexJL] + "'" : "index='" + selectedindex[1 + IndexJL] + "'";		
		element = document.querySelector("#" + element.id + " li[" + indexStr + "]");
		element && $KW.Widget.setfocus(widgetModel, null, element);		
	},	

    render: function(segmentModel, context) {
        if(!segmentModel.buiskin) segmentModel.buiskin = segmentModel.blockeduiskin;
        if(!segmentModel.retainselection) {
            segmentModel.selectedRows = segmentModel.selectedindices = segmentModel.focusedindex = segmentModel.focuseditem = segmentModel.selectedindex = segmentModel.selecteditems = segmentModel.selectedsectionindex = segmentModel.selectedrowindex = segmentModel.selectedrowindices = null;
        }
		else {
            segmentModel.focusedindex = (segmentModel.focusedindex || segmentModel.focusedindex == 0) ? segmentModel.focusedindex : null;
            segmentModel.selectedindex = segmentModel.selectedindex || null;
            segmentModel.focuseditem = segmentModel.focuseditem || null;
            segmentModel.selecteditems =  segmentModel.selecteditems || null;
            segmentModel.selectedsectionindex = (segmentModel.selectedsectionindex || segmentModel.selectedsectionindex == 0) ? segmentModel.selectedsectionindex : null;
            segmentModel.selectedindices = segmentModel.selectedindices || null;
            segmentModel.selectedRows = segmentModel.selectedRows || null;
        }
        $KU.updateScrollFlag(segmentModel);

        var sConfig = segmentModel.selectionbehaviorconfig;    
        if(sConfig && sConfig instanceof Object) {
            segmentModel.selectionindicator = sConfig.imageIdentifier || sConfig.imageidentifier;
            segmentModel.selectimage = sConfig.selectedStateImage || sConfig.selectedstateimage;
            segmentModel.unselectimage = sConfig.unselectedStateImage || sConfig.unselectedstateimage;
        }

        segmentModel.context = context;
        segmentModel.selectedState = false;

        return this.generateSegment(segmentModel, context);
    },
	
    generateSegment: function(segmentModel, context) {
        var htmlString = "", segData = segmentModel.data || [];
        var pageView = (segmentModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW) ? true : false;
        segmentModel.selectedsectionindex = IndexJL;
		var isFlexWidget = $KU.isFlexWidget(segmentModel);		
        var visibility = (!isFlexWidget && (!segmentModel.isvisible || segData.length <= IndexJL)) ? "hide" : ""; //Hide the segment if there is no data
		var widgetSkin = segmentModel.widgetskin ? segmentModel.widgetskin : segmentModel.skin ?  segmentModel.skin + "grp" : "";
		var margin = $KW.skins.getBaseStyle(segmentModel, context);
        var padding = $KW.skins.getPaddingSkin(segmentModel);
		var scrollingevents;
		var isSLW = segmentModel.screenLevelWidget && (segmentModel.parent.id == segmentModel.pf);
		if(isSLW)
			scrollingevents = segmentModel.scrollingEvents;
		var wID = segmentModel.pf+"_"+ segmentModel.id ;
        context.topLevelBox = true;
        // Creating starting tags for the skeleton
        if(pageView) 
		{
            var rowSkin = segmentModel.rowSkin || "";
			var id = segmentModel.pf + "_" + segmentModel.id;
			htmlString += "<div id='" + id + "_wrapper' style='" + margin + ";position:relative' class='" + visibility + " " + widgetSkin +  "'>";			
			htmlString += "<div  id='" + id + "_scroller' class='scrollerX' kwidgettype='KScrollBox' name='touchcontainer_KScroller' swipeDirection ='vertical'>" + "<div id='" + id + "_scrollee' class='form_scrollee' kwidgettype='KTouchscrollee'>";
            htmlString += "<div" + $KW.Utils.getBaseHtml(segmentModel, context);
            htmlString += "name='touchcontainer_Segment' class='kstripcontainer " + " " + rowSkin + "'";
            //htmlString += " style='" + padding + "'>"; //Fix for 23862: Commenting this line - padding should be applied to each row not segment level in case of page view
            htmlString += ">";
            htmlString += "<div id='imgs' class='kstrip' style='" + (!kony.appinit.useTransition ? "position:relative" : "") +"'>";
        } 
		else 
		{
			htmlString += "<div  id='" + segmentModel.pf+"_"+ segmentModel.id + "_scroller' class='scrollerX " + visibility + " " + widgetSkin + "' kwidgettype='KScrollBox' name='touchcontainer_KScroller' swipeDirection ='vertical' style='" + margin + "'>" + "<div id='" + segmentModel.pf+"_"+ segmentModel.id + "_scrollee' class='form_scrollee' kwidgettype='KTouchscrollee'>";
			htmlString += (scrollingevents && scrollingevents.onPull) ? $KU.getPullString(segmentModel) : "" ;
            htmlString += "<div" + $KW.Utils.getBaseHtml(segmentModel, context);
			htmlString += " style='" + padding + "'>";
        }
        
        if(segData.length > IndexJL) {
            if(!pageView) 
				segmentModel.hasSections = $KU.isArray(segData[IndexJL]);
            if(!pageView && segmentModel.hasSections === false) {
                htmlString += "<ul style='list-style:none' class='" + widgetSkin + "'>";
            }
            htmlString += this.generateRows(segmentModel, context, segData, false, IndexJL, IndexJL);
        }

        //Creating ending tags for the skeleton
        if(pageView) {
            var footer = $KW.Segment.renderPageFooter(segmentModel);
            if(segmentModel.paginationconfig && segmentModel.paginationconfig.position == "top") {
                htmlString  = footer + htmlString;
                htmlString += "</div></div>";
            } else {
                htmlString += "</div></div>";
                htmlString += "</div></div>";
                htmlString += footer;    
            }
			htmlString += '</div>';
        } 
		else {
            if(segmentModel.hasSections === false) { //This comparison is important
                htmlString += "</ul></div>";
            } else {
                htmlString += "</div>";
            }
			htmlString += (scrollingevents && scrollingevents.onPush) ? $KU.getPushString(segmentModel) : "" ;
			htmlString += "</div></div>";
        }
        return htmlString;         
    },

    renderPageFooter: function(segmentModel) {
        // Caution These PSP's are subject to change, take care to change them when ide implementation is completed.
        // There be dragon's ahead.
        var segData = segmentModel.data || [];
        var visibility = (!segmentModel.isvisible || segData.length <= 1 || !segmentModel.needpageindicator) ? "hide" : "";
        //var footer = segmentModel.needpageindicator ? ("<div class='ktable kwt100 " + visibility + "' style='" + $KW.Segment.getPageFooterStyle(segmentModel) +"' id='" + segmentModel.pf + "_" + segmentModel.id + "_footer'>" + this.generatePageFooter(segmentModel, segData) + "</div>") : "";
		var position = $KU.isFlexWidget(segmentModel) ? 'position:absolute;bottom:0px;' : '';
        var footer = "<div class='ktable kwt100 " + visibility + "' style='" + position + $KW.Segment.getPageFooterStyle(segmentModel) +"' id='" + segmentModel.pf + "_" + segmentModel.id + "_footer'>" + this.generatePageFooter(segmentModel, segData) + "</div>";
        return footer;
    },

    getPageFooterStyle: function(segmentModel) {
        var segpag = segmentModel.paginationconfig;
        var top = (segpag && segpag.vdistance) || 30 , left = (segpag && segpag.hdistance) || 0;
        top = (segpag && segpag.position == "top") ? top : -top;
        return segpag ? ("position: relative;z-index: 999;top: "+top+"px; left: "+left+"px;") : "" ;
    },

    updatePageFooter: function(segmentModel) {
        var footer = document.getElementById(segmentModel.pf+'_'+segmentModel.id+'_footer');
        if(footer) {
            footer.setAttribute('style',$KW.Segment.getPageFooterStyle(segmentModel));
            var newfooter = footer.cloneNode(true);
            var parentNode = footer.parentNode;
            if(segmentModel.paginationconfig && segmentModel.paginationconfig.position == "top") {
                parentNode.removeChild(footer);
                parentNode.insertBefore(newfooter,document.getElementById(segmentModel.pf+'_'+segmentModel.id));
            }
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    context <object> (Contains the information about its parent)
     * @param    data <array>
     * @param    liExists <boolean> (If a new LI nodes needs to be created or not. e.g. addDataAt it is true)
     * @param    rowIndex <number>
     * @param    secIndex <number>
     * @return   void
     * @desc     Generates section/row html depending on the data passed to it.
     */
    generateRows: function(model, context, data, liExists, rowIndex, secIndex) {
        var htmlString = "", seperator = "", sectionRows = 0, color = model.separatorcolor;
        //secRowIndex is only used for current rowSkin calculation. It is always zero based.
        var secRowIndex = 0, section = null, sectionHtml = "", rowHtml = "";
        var secSkin = model.sectionheaderskin || model.sectionskin || "", rowSkin = "";
        var rskin = model.rowskin || model.skin || "", askin = model.alternaterowskin || model.askin || "";
        var headertemplate, boxModel;
        var pageView = (model.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW) ? true : false;
        data = this.invertMapAndData(model, data);
        model.counter = rowIndex;
		
        if(color && model.separatorrequired) {
            var r = parseInt(color.substring(0, 2), 16)
              , g = parseInt(color.substring(2, 4), 16)
              , b = parseInt(color.substring(4, 6), 16)
              , o = 1 - (parseInt(color.substring(6, 8), 16)/100);
            var border = model.separatorthickness + "px solid rgba("+r+","+g+","+b+","+o+")";
            seperator = " style='border-bottom:" + border + ";" + (rowIndex > IndexJL ? "border-top:" + border : "") + "'";
        }

        for(var i = IndexJL; i < data.length; i++) {
            this.segmentCounter = i;
            secRowIndex = (!model.hasSections) ? (i - IndexJL) : (data[i].sectionLabel) ? 0 : (secRowIndex+1);
            rowSkin = (secRowIndex % 2 == 1 && askin) ? askin : rskin;
            if(data[i].metainfo && data[i].metainfo.skin) rowSkin = data[i].metainfo.skin;
            if(data[i].template || model.rowtemplate) {
                //Save tabpaneID and set back to context once the template is rendered since tabpaneID shouldn't be passed
                var tabpaneID = context.tabpaneID;
                context.tabpaneID = "";
            }
			
			var accessAttr = "";
            section = data[i].sectionLabel;
            if(section || section === "") { //Here the new section is getting started // (i == IndexJL || sectionRows == i - IndexJL)
                if(section instanceof Object) { //section is defined with a sectionTemplate
                    headertemplate = section.template || model.sectionheadertemplate;
					accessAttr = $KU.getAccessibilityValues(model, section.accessibilityConfig, null, rowIndex);
                    if(headertemplate && $KU.getkeys(section).length > 0) {
                        context.topLevelBox = true;
                        context.container = model;
                        model.widgetsData = section;
                        if(!headertemplate.pf) {
                            window[headertemplate.id] = headertemplate;
                            _konyConstNS.Form2.addHeaderorFooter.call(headertemplate, headertemplate);
                        }
                        headertemplate.isTemplate = true; //This gets used in HBox render method
                        var clonedHeaderTemplate = owl.deepCopy(headertemplate);
                        sectionHtml = (clonedHeaderTemplate.wType == "FlexContainer") ?  this.renderFlexContainer(clonedHeaderTemplate, context, section, model, rowIndex) : this.renderHBox(clonedHeaderTemplate, context, section, model, rowIndex);
                        if(sectionHtml === ""){
                            sectionHtml = " ";
			            }
                        context.topLevelBox = false;
                        delete context.container;
                        delete model.widgetsData;
                    }
					
                }else if(section === ""){
                    sectionHtml = " ";
                } else { //section is a string with section title
                    sectionHtml = "<div "+ $KW.Utils.getBaseHtml(model, context) + ">" + section + "</div>";
                }
                if(sectionHtml) { //Start a new section in case of setdata
                    if(i == IndexJL) {
                        htmlString += "<ul style='list-style:none'>";
                    } else if(sectionRows == i - IndexJL) {
                        secIndex++;
                        rowIndex = IndexJL;
                        htmlString += "</ul><ul style='list-style:none'>";
                    }
					
                    sectionRows += model.data[secIndex][1 + IndexJL].length > IndexJL ? model.data[secIndex][1 + IndexJL].length - IndexJL : 1;
                    htmlString += "<li " + seperator + " class='"+ secSkin +" middleleftalign'  index='" + secIndex + ",-1' secindex='" + secIndex + ",-1'>" + sectionHtml + "</li>";
                }
            }
            //Adding below two property because of the change in data format of selectedIndex
            //This helps me in setting the image incase of retainSelection==true
            model.seccounter = secIndex;
            model.rowcounter = rowIndex;

            context.topLevelBox = true;
            context.container = model;
            model.widgetsData = data[i];
            boxModel = data[i].template || model.rowtemplate || model;
            if(boxModel) {
                window[boxModel.id] = boxModel;
                !boxModel.pf && _konyConstNS.Form2.addHeaderorFooter.call(boxModel, boxModel); //TODO:: If this line is really required ?????
            }
            boxModel.isTemplate = true; //This gets used in HBox render method
            var clonedBoxModel = owl.deepCopy(boxModel);
			accessAttr = $KU.getAccessibilityValues(model, data[i].accessibilityConfig, null, rowIndex);
            rowHtml = (clonedBoxModel.wType == "FlexContainer") ?  this.renderFlexContainer(clonedBoxModel, context, data[i], model, rowIndex) : (clonedBoxModel.wType == "HBox" || clonedBoxModel.orientation == "horizontal") ? this.renderHBox(clonedBoxModel, context, data[i], model, rowIndex) : this.renderVBox(clonedBoxModel, context, data[i], model, rowIndex);
            if(data[i].template || model.rowtemplate) context.tabpaneID = tabpaneID; //Here again the tabpaneID is set to context
            context.topLevelBox = false;
            delete context.container;
            delete model.widgetsData;
            
            if(!liExists && rowHtml) {
                if(pageView) {
                    htmlString += "<div index=" + rowIndex + " kwidgettype='KTouchsegment' style='display:none;float: left;width:100%'>";
                } else {
					
					
                    htmlString += "<li kwidgettype='Segment' index=" + rowIndex + " class='" + rowSkin + "'" + (model.hasSections ? " secindex='" + secIndex + "," + rowIndex + "'" : "");
                    if(i < data.length - 1) {
                        if(model.hasSections && rowIndex != model.data[secIndex][1+IndexJL].length-1) htmlString += seperator;
                        else if(!model.hasSections) htmlString += seperator;
                    }
                    htmlString += ">";
                }
            }
            htmlString += rowHtml;
            if(!liExists && rowHtml) htmlString += pageView ? "</div>": "</li>";
            if(data.length - IndexJL == i && model.hasSections) htmlString += "</ul>";
            rowIndex++;
            model.counter++;
        }
		$KU.updateGestureTempList(model, data);
        return htmlString;
    },

    generatePageFooter: function(segmentModel, data) {
        var htmlString = "";
        var src = "";
        var segpag = segmentModel.paginationconfig;
        var left = (segpag && segpag.hdistance) || 0;
        if(data.length > IndexJL) {
            var alignment = !left || (left == 0);
            var htmlattrs = alignment ? "align='center'" : "style='text-align: left;'";
            htmlString += "<div class='krow kwt100' " + htmlattrs + "><div class='kcell'>";
            segmentModel.pageondotimage = segmentModel.pageondotimage || "whitedot.gif";
            segmentModel.pageoffdotimage = segmentModel.pageoffdotimage || "blackdot.gif";
            for(var i = IndexJL; i < data.length; i++)
            {
				var isAriaHidden = data[i].accessibilityConfig && data[i].accessibilityConfig.a11yHidden;
				var hiddenAttr = isAriaHidden ? " aria-hidden='true'" : " "; 
                src = (typeof segmentModel.focusedindex != "number" && i == IndexJL) ? segmentModel.pageondotimage : (segmentModel.focusedindex == i) ? segmentModel.pageondotimage : segmentModel.pageoffdotimage;
                htmlString += "<span  " + hiddenAttr + " onclick='$KW.touch.navigationDotsHandler(this)' index='" + i + "'><img style='padding-left:4px' src='" + $KU.getImageURL(src) + "' /></span>";
            }
            htmlString += "</div></div>";
        }
        return htmlString;
    },

    /**
     * @param    model <segment widget object instance>
     * @param    data <array>
     * @return   void
     * @desc     Sets new set of data to the segment.
     *           Using setdata a non-section segment can also be transformed to a sectionable segment and vice-versa
     */
    setData: function(model, data) {
        if($KU.isArray(data)) {
            if(data.length > IndexJL) {
                model.hasSections = $KU.isArray(data[IndexJL]);
                this.modifyContent(model, data, "setdata");
            } else {
                this.removeAll(model);
            }
        } else {
            throw new KonyError(102, "Error", "Invalid input.");
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    data <array>
     * @return   void
     * @desc     Appends new set of data to the segment. But it cannot change the sectional behavior of the segment.
     *           Incase of segment without sections, data is an array, in the format of row data (object)
     *           Incase of segment with sections, data is an array, in the format of section data (array, with object & array)
     *           If "model.hasSections" is ever set then... use that value
     *           Else if"model.data" is available then... calculate "model.hasSections" from "model.data" format
     *           Else use the passed "data"'s format to calculate "model.hasSections"
     */
    addAll: function(model, data) {
        if($KU.isArray(data)) {
            if(!$KU.isArray(model.data)) {
                model.data = (IndexJL) ? [null] : [];
            }
            if(typeof model.hasSections !== "boolean") model.hasSections = $KU.isArray(data[IndexJL]);
            this.modifyContent(model, data, "addall");
        } else {
            throw new KonyError(102, "Error", "Invalid input.");
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @return   void
     * @desc     Removes all the data from the segment. But it cannot change the sectional behavior of the segment.
     */
    removeAll : function(model) {
        this.modifyContent(model, IndexJL ? [null] : [], "removeall");
    },

    /**
     * @param    model <segment widget object instance>
     * @param    rowIndex <number> (if secIndex is not passed, it is considered to be in the absolute term)
     * @param    secIndex <number> (optional)
     * @return   void
     * @desc     Removes a data at particular index. Only one data can be removed
     *           But it cannot change the sectional behavior of the segment.
     *           If "model.hasSections" is ever set then... use that value
     *           Else if"model.data" is available then... calculate "model.hasSections" from "model.data" format
     */
    removeAt: function(model, rowIndex, secIndex) {
        if(!isNaN(rowIndex) || (secIndex && !isNaN(secIndex))) {
            if($KU.isArray(model.data) && model.data.length > IndexJL) {
                this.modifyContent(model, [], "removeat", rowIndex, secIndex);
            }
        } else { 
            throw new KonyError(102, "Error", "Invalid input.");
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    data <object>
     * @param    rowIndex <number> (if secIndex is not passed, it is considered to be in the absolute term)
     * @param    secIndex <number> (optional)
     * @return   void
     * @desc     Sets the data at particular index. But does not effects in the length of the data.
     *           If "model.hasSections" is ever set then... use that value
     *           Else if"model.data" is available then... calculate "model.hasSections" from "model.data" format
     */
    setDataAt: function(model, data, rowIndex, secIndex) {
        if(data instanceof Object && (!isNaN(rowIndex) || (secIndex && !isNaN(secIndex)))) {
            if($KU.isArray(model.data) && model.data.length > IndexJL) {
                this.modifyContent(model, data, "setdataat", rowIndex, secIndex);
            }
        } else { 
            throw new KonyError(102, "Error", "Invalid input.");
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    data <array | object>
     * @param    rowIndex <number> (if secIndex is not passed, it is considered to be in the absolute term)
     * @param    secIndex <number> (optional)
     * @return   void
     * @desc     Adds one/more data at particular index. One or more data can be added at a time.
     *           If "model.hasSections" is ever set then... use that value
     *           Else if"model.data" is available then... calculate "model.hasSections" from "model.data" format
     *           Else "model.hasSections" is always false
     */
    addAt: function(model, data, rowIndex, secIndex) {
        if(model.viewtype === constants.SEGUI_VIEW_TYPE_PAGEVIEW && $KU.isArray(data)) {
            throw new KonyError(103, "Error", "Invalid operation.");
        }

        if(data instanceof Object && (!isNaN(rowIndex) || (secIndex && !isNaN(secIndex)))) {
            if(!$KU.isArray(model.data)) {
                model.data = (IndexJL) ? [null] : [];
            }
            if(typeof model.hasSections !== "boolean") model.hasSections = $KU.isArray(data);
            this.modifyContent(model, data, "addat", rowIndex, secIndex);
        } else {
            throw new KonyError(102, "Error", "Invalid input.");
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    data <object>
     * @param    rowIndex <number> (if secIndex is not passed, it is considered to be in the absolute term)
     * @param    secIndex <number> (optional)
     * @return   void
     * @desc     Adds a data at particular index. Only one data can be added.
     *           If "model.hasSections" is ever set then... use that value
     *           Else if"model.data" is available then... calculate "model.hasSections" from "model.data" format
     *           Else "model.hasSections" is always false
     */
    addDataAt: function(model, data, rowIndex, secIndex) {
        if(model.viewtype === constants.SEGUI_VIEW_TYPE_PAGEVIEW && $KU.isArray(data)) {
            throw new KonyError(103, "Error", "Invalid operation.");
        }

        if(data instanceof Object && (!isNaN(rowIndex) || (secIndex && !isNaN(secIndex)))) {
            if(!$KU.isArray(model.data)) {
                model.data = (IndexJL) ? [null] : [];
            }
            if(typeof model.hasSections !== "boolean") model.hasSections = $KU.isArray(data);
            this.modifyContent(model, data, "adddataat", rowIndex, secIndex);
        } else {
            throw new KonyError(102, "Error", "Invalid input.");
        }
    },

    /**
     * [["TestSec1",[{"slbl2":"Btn2Sec1","slbl1":"Btn1Sec1"},{"slbl2":"Btn21Sec1","slbl1":"Btn11Sec1"}]],
     * ["TestSec2",[{"slbl2":"Btn2Sec2","slbl1":"Btn1Sec2"},{"slbl2":"Btn21Sec2","slbl1":"Btn11Sec2"}]]]
     */
    setDataWithSections: function(model, data) {
        if($KU.isArray(data) && $KU.isArray(data[IndexJL])) {
            this.setData(model, data);
        } else {
            throw new KonyError(102, "Error", "Invalid input.");
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    data <array>
     * @param    secIndex <number> (optional)
     * @return   void
     * @desc     Adds a sectional data at particular index. Only one sectinal data can be added.
     *           If "model.hasSections" is ever set then... use that value
     *           Else if"model.data" is available then... calculate "model.hasSections" from "model.data" format
     *           Else "model.hasSections" is always true
     */
    addSectionAt: function(model, data, secIndex) {
        if(typeof model.hasSections !== "boolean" && $KU.isArray(data[IndexJL])) model.hasSections = true;

        if(model.hasSections === false || model.viewtype === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
            throw new KonyError(103, "Error", "Invalid operation.");
        } else if(!$KU.isArray(data[IndexJL])) {
            throw new KonyError(102, "Error", "Invalid input.");
        }

        if(model.hasSections === true) {
            if(!$KU.isArray(model.data)) {
                model.data = (IndexJL) ? [null] : [];
            }
            this.modifyContent(model, data, "addsectionat", IndexJL, secIndex);
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    data <array>
     * @param    secIndex <number> (optional)
     * @return   void
     * @desc     Sets a sectional data at particular index.
     *           Only one sectinal data can be modified.
     *           But does not change the length of the sections.
     *           If "model.hasSections" is ever set then... use that value
     *           Else if"model.data" is available then... calculate "model.hasSections" from "model.data" format
     *           Else "model.hasSections" is always true
     */
    setSectionAt: function(model, data, secIndex) {
        if(model.hasSections) {
            if($KU.isArray(data) && !isNaN(secIndex)) {
                if($KU.isArray(model.data)) this.modifyContent(model, data, "setsectionat", IndexJL, secIndex);
            } else {
                throw new KonyError(102, "Error", "Invalid input.");
            }
        } else {
            throw new KonyError(103, "Error", "Invalid operation.");
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    secIndex <number> (optional)
     * @return   void
     * @desc     Removes a sectional data at particular index. Only one data can be removed.
     *           If "model.hasSections" is ever set then... use that value
     *           Else if"model.data" is available then... calculate "model.hasSections" from "model.data" format
     */
    removeSectionAt: function(model, secIndex) {
        if(model.hasSections) {
            if(!isNaN(secIndex)) {
                if($KU.isArray(model.data)) this.modifyContent(model, null, "removesectionat", IndexJL, secIndex);
            } else {
                throw new KonyError(102, "Error", "Invalid input.");
            }
        } else {
            throw new KonyError(103, "Error", "Invalid operation.");
        }
    },

    /**
     * @param    model <segment widget object instance>
     * @param    data <array | object> (Depends on it is called from the respective API)
     * @param    action <string> (This comes from the respective API's call)
     * @param    rowIndex <number> (optional) (if secIndex is not passed, it is considered to be in the absolute term)
     * @param    secIndex <number> (optional)
     * @return   void
     * @desc     Whenever there is a change in DATA property, this helps modifying, both the MODEL & VIEW layer
     */
    modifyContent: function(model, data, action, rowIndex, secIndex) {
        var secRowIndexArray = [IndexJL, IndexJL], boundaryConditionToBeConsidered = false;
        if(action == "addat" || action == "adddataat" || action == "addsectionat") {
            boundaryConditionToBeConsidered = true;
        } else if(action == "setdata" || action == "removeall") {
            boundaryConditionToBeConsidered = secRowIndexArray;
        } else if(action == "addall") {
            boundaryConditionToBeConsidered = (!model.hasSections) ? [IndexJL, model.data.length] : [model.data.length, IndexJL];
        }
        secRowIndexArray = this.calculateSectionRowIndex(model, rowIndex, secIndex, boundaryConditionToBeConsidered);

        if(!model || secRowIndexArray === false) return;

        secIndex = secRowIndexArray[0], rowIndex = secRowIndexArray[1];

        //Update the segment model irrespective of it is rendered or not
        model.canUpdateUI = false;
        $KW.Utils.updateContent(model, "data", data, action, rowIndex, secIndex);
        this.adjustAlreadySelectedProperties(model, action, secIndex, rowIndex);
        model.canUpdateUI = true;
		var segmentNode = $KU.getNodeByModel(model);
        if(model.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW && model.data && model.data.length > IndexJL && action == "setdata") {
            //Confirm from Deepak if it is required or not
            //Set the selectedIndex to the first one ?????
            model.focusedindex = IndexJL; //In case of setdata, move to first page
            model.selectedindex = (IndexJL) ? [null, IndexJL, IndexJL] : [IndexJL, IndexJL]; //In case of setdata, move to first page
            model.focuseditem = model.data[model.focusedindex];
            model.selecteditems = model.data[model.selectedindex[1+IndexJL]];

        }
        if(!segmentNode) return; //If segment is not rendered, do not work on the VIEW layer

        model.context = model.context ? model.context : {};
        model.context.tabpaneID = segmentNode.getAttribute("ktabpaneid") || "";

        //Helps when (model.data.length becomes equal to IndexJL e.g "removeAll") or from model.data.length becomes equal to IndexJL to a +ve value
		$KU.toggleVisibilty(segmentNode.parentNode.parentNode, model.data, model);

        //Do not take this line above, because for "$KU.toggleVisibilty()" I always need the DIV element.
        if(model.hasSections === false && !segmentNode.firstChild) {
            segmentNode.innerHTML = "<ul style='list-style:none'></ul>";
        }
        if(model.hasSections === false || model.viewtype === constants.SEGUI_VIEW_TYPE_PAGEVIEW) segmentNode = segmentNode.childNodes[0]; //If TRUE segmentNode is the DIV element else segmentNode is the first UL element

        var rowNode = null, secNodes = null, secNode = null, secInnerNodes = null;
		var newSections = 0
        if(model.hasSections) {
            secNodes = segmentNode.childNodes;
            secNode = secNodes[secIndex - IndexJL];
            secInnerNodes = secNode ? secNode.childNodes : null;
        }
        switch(action) {
            case "setdata":
                if(model.viewtype === constants.SEGUI_VIEW_TYPE_PAGEVIEW || model.hasSections) {
                    segmentNode.innerHTML = this.generateRows(model, model.context, model.data, false, rowIndex, secIndex);
                } else {
                    segmentNode.parentNode.innerHTML = "<ul style='list-style:none'>" + this.generateRows(model, model.context, model.data, false, rowIndex, secIndex) + "</ul>";
                }
            break;

            case "removeall":
                segmentNode.innerHTML = "";
            break;

            case "setsectionat":
                secNode.outerHTML = this.generateRows(model, model.context, (IndexJL ? [null, data] : [data]), false, rowIndex, secIndex);
            break;

            case "removesectionat":
                segmentNode.removeChild(secNode);
            break;

            case "addsectionat":
                var wrapper = document.createElement("div");
                wrapper.innerHTML = this.generateRows(model, model.context, data, false, rowIndex, secIndex);
				newSections = wrapper.children.length;
                while(wrapper.children.length > 0){
                    segmentNode.insertBefore(wrapper.childNodes[0], secNode);
                }                           
            break;

            case "addall":
                
				var wrapper = document.createElement("div");
                if(!model.hasSections) {
                    wrapper.innerHTML = this.generateRows(model, model.context, data, false, rowIndex, secIndex);
					while(wrapper.children.length > 0){
						segmentNode.appendChild(wrapper.childNodes[0]);
					}
                } else {
                    for(var i=IndexJL; i<data.length; i++) {
						wrapper.innerHTML = this.generateRows(model, model.context, (IndexJL) ? [null, data[i]] : [data[i]], false, rowIndex, secIndex);
						while(wrapper.children.length > 0){
							segmentNode.appendChild(wrapper.childNodes[0]);
						}
                    }
                    /* ===== Please do not delete this commented section of code, it may be used in future. =====
                    //For each data check if its section is available in the model.data or not
                    var oldDataLen = sections.length + IndexJL;
                    //Instead of model.data.length I'm taking sections.length as by this time model.data is already updated.
                    for(var i=IndexJL; i<data.length; i++) {
                        var secAvailable = false, secUL = null;
                        var dataSecObj = data[i][0+IndexJL];
                        for(var j=IndexJL; j<oldDataLen; j++) {
                            var segDataSecObj = model.data[j][0+IndexJL];
                            if($KU.equals(dataSecObj, segDataSecObj)) {
                                secAvailable = true;
                                secUL = sections[j-IndexJL];
                                break;
                            }
                        }
                        if(secAvailable) {
                            var html = this.generateRows(model, model.context, data[i][1+IndexJL], false, rowIndex, secIndex);
                            secUL.innerHTML += html;
                        } else {
                            //Create a new section segment altogether
                            segmentNode.innerHTML += this.generateRows(model, model.context, (IndexJL) ? [null, data[i]] : [data[i]], false, rowIndex, secIndex);
                        }
                    }
                    //*/
                }
            break;

            case "setdataat":
                
                if(!model.hasSections) {
                    var rowNode = segmentNode.childNodes[rowIndex - IndexJL];
                    //Since the data is an object in case of setdataat, passing it as an array
                    rowNode.innerHTML = this.generateRows(model, model.context, (IndexJL ? [null, data] : [data]), true, rowIndex, secIndex);
                } else {
                    rowNode = secInnerNodes[rowIndex-IndexJL+1];
                    rowNode.innerHTML = this.generateRows(model, model.context, (IndexJL ? [null, data] : [data]), true, rowIndex, secIndex);
                }
				$KU.addAriatoElement(rowNode.firstChild, data.accessibilityConfig, model);
				
            break;

            case "removeat":
                if(!model.hasSections) {
                    segmentNode.removeChild(segmentNode.childNodes[rowIndex - IndexJL]);
                } else {
                    secNode.removeChild(secInnerNodes[rowIndex-IndexJL+1]);
                }
            break;

            case "addat":
            case "adddataat":
                
                var refEl
                , _html = this.generateRows(model, model.context, (IndexJL ? [null, data] : [data]), false, rowIndex, secIndex)
                , newRowHolderNode = document.createElement("div");
                //If the data passed does not corrensponds to the model.widgetDataMap, the _html is a blank string
                if(_html) {
                    newRowHolderNode.innerHTML = _html;
                    if(!model.hasSections) {
                        if(segmentNode.style.display === "none") segmentNode.style.display = '';
                        if(segmentNode.parentNode.style.display === "none") segmentNode.parentNode.style.display = '';
                        refEl  = segmentNode.childNodes[rowIndex - IndexJL] || null;
                        //2nd Arg::null instead of undefined - works in IE for appending Elem.
                        segmentNode.insertBefore(newRowHolderNode.childNodes[0], refEl);
                    } else {
                        if(secNode) {
                            if(secNode.style.display === "none") secNode.style.display = '';
                            if(secNode.parentNode.style.display === "none") secNode.parentNode.style.display = '';
                            secNode.insertBefore(newRowHolderNode.childNodes[0], secInnerNodes[rowIndex-IndexJL+1]);
                        }
                    }
                }
            break;
        }

        if(action == "addat" || action == "adddataat" || action == "removeat" || action == "addall" || action == "addsectionat") {
            if(!model.hasSections) {
                $KU.adjustNodeIndex(segmentNode, rowIndex, "index");
                this.applyRowSkin(model, segmentNode);
            } else {
                this.adjustSectionIndex(segmentNode);
                this.applySectionRowSkin(model, segmentNode);
            }
        }

        if(model.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
            model.isvisible && (model.data.length > IndexJL) && $KW.touch.computeWidths(segmentNode.parentNode, model);
            if(model.needpageindicator) {
                var footerHolderNode = $KU.getElementById(model.pf + "_" + model.id + "_footer");
                footerHolderNode.innerHTML = this.generatePageFooter(model, model.data);
                $KU.toggleVisibilty(footerHolderNode, model.data, model, false);
            }
        }
		/*Not required. To scroll the segment onto the view port , the developer can use the selectedIndex property.
		else if(action == "setdata" && model.isvisible && (model.data.length > IndexJL)){
			setTimeout(function(){$KW.Segment.setFocus(model, $KU.getNodeByModel(model), [0, 0])}, 0);
		 }
		*/	
        model.context.tabpaneID = ""; //TODO:: Is it really required ???? If YES WHY ?????
		//Initialize line widget after data is modified in segment, to set line height.
		if($KW.Line && model.data && model.data.length > IndexJL) $KW.Line.initializeView(model.pf+"_"+model.id);
		
		var data = model.data;
		if(model.hasSections){
			for(var i = IndexJL; i < data.length; i++) {
				var section = data[i];
				$KU.updateGestureTempList(model, section[1 + IndexJL]);
			}
		}
		else{
			$KU.updateGestureTempList(model, data);
		}
		if($KG.gestureTemplates){	
			for(var i = IndexJL; i < $KG.gestureTemplates.length; i++) {
				window[$KG.gestureTemplates[i]] && $KW.Utils.initializeGestures(window[$KG.gestureTemplates[i]]);
			}
		}
		
		this.adjustFlexContainers(model, action, secIndex, rowIndex, newSections);	
    },
	
	//Adjust FlexContainers in Segment
	adjustFlexContainers: function(model, action, secIndex, rowIndex, newSections){
		var segNode = $KU.getNodeByModel(model);
		var type = 'FlexContainer';
		switch (action) {
			case "setdata":
				$KW.FlexContainer.adjustFlexContainers(segNode.id, type);
                break;
                
            case "setdataat":
			case "addat":
			case "adddataat":
				var section = segNode.childNodes[secIndex];
				var row = section.childNodes[model.hasSections ? rowIndex + 1 : rowIndex];
				var flexContainers = row.querySelectorAll("div[kwidgettype='" + type + "'");
				flexContainers.length > 0 && $KW.FlexContainer.adjustFlexContainers(model.pf, type, flexContainers);
                break;
                
            case "addall":
				var section = segNode.childNodes[secIndex];
				var rows = section.childNodes;
				if(model.hasSections)
					rowIndex = rowIndex + 1; //Remove section header
				for(var i = rowIndex; i < rows.length; i++){
					var row = rows[i];
					var flexContainers = row.querySelectorAll("div[kwidgettype='" + type + "'");
					flexContainers.length > 0 && $KW.FlexContainer.adjustFlexContainers(model.pf, type, flexContainers);
				}
                break;
                
			case "addsectionat":
			case "setsectionat":
				var sections = segNode.childNodes;
				var startIndex = secIndex;
				if(action == 'setsectionat')
					newSections = 1;
				for(var i = 0; i < newSections; i++){
					var section = sections[startIndex];
					var flexContainers = section.querySelectorAll("div[kwidgettype='" + type + "'");
					flexContainers.length > 0 && $KW.FlexContainer.adjustFlexContainers(model.pf, type, flexContainers);
					startIndex++;
				}
				
				break;
        }
	},

    adjustSectionIndex: function(node) {
        var sections = node.childNodes;
        var secindex, index;        
        for(var i = 0; i < sections.length; i++) {
            var rows = sections[i].childNodes;
            /*if(rows.length > 1) //Don't hide the section when there are no rows
                sections[i].style.display = "";
            else
                sections[i].style.display = "none";*/
            for(var j = 1; j < rows.length; j++) {
                secindex = (i + IndexJL) + "," + (j + IndexJL - 1);
                index = (j + IndexJL -1);
                rows[j].setAttribute("index", index);
                rows[j].setAttribute("secindex", secindex);
            }
            if(rows[0]) {
                rows[0].setAttribute("index", (i + IndexJL) + ",-1");
                rows[0].setAttribute("secindex", (i + IndexJL) + ",-1");
            }
        }
    },

    applySectionRowSkin: function(widgetModel, holder) {
        // Apply row skin and alternate skin        
        var sections = holder.childNodes;
        var askin = widgetModel.alternaterowskin || widgetModel.askin || "";
        var rowSkin = widgetModel.rowskin || widgetModel.skin || "";
        var rowData, skin = "";
        for(var i = 0; i < sections.length; i++) {
            var rows = sections[i].childNodes;
            for(var j = 1; j < rows.length; j++) {
                rowData = widgetModel.data[i + IndexJL][j];
                if(rowData) {
                    rowData.metainfo = rowData.metaInfo || rowData.metainfo;	
                }
                 skin = (rowData && rowData.metainfo && rowData.metainfo.skin) || ((j % 2 == 0 && askin) ? askin : rowSkin);
                rows[j].className = skin;
                rows[j].style.border = "none";
                if(widgetModel.separatorthickness && widgetModel.separatorcolor) {
                    if(!widgetModel.separatorrequired)
                        continue;
                    var r = parseInt(widgetModel.separatorcolor.substring(0, 2), 16), g = parseInt(widgetModel.separatorcolor.substring(2, 4), 16), b = parseInt(widgetModel.separatorcolor.substring(4, 6), 16);
                    var o = 1 - (parseInt(widgetModel.separatorcolor.substring(6, 8), 16)/100);
                    rows[j].style.borderBottom = widgetModel.separatorthickness + "px solid rgba("+r+","+g+","+b+","+o+")";
                }    
             }
        }  
    },

    //TODO : optimize this function
    invertMapAndData: function(widget, data) {
        var map = widget.widgetdatamap;
        if(map) {
            map = $KU.isArray(map) ? map[IndexJL] : map;
            var keys = $KU.getkeys(map);
            var newmap = {};
            var newdata = IndexJL ? [null] : [];
            
            for(var i = 0; i < keys.length; i++) {
                newmap[map[keys[i]]] = keys[i];
            }

            var newkeys = $KU.getkeys(newmap);            
            if(data[IndexJL] instanceof Array) {                
                var index = IndexJL;
                var sectionData;
                for(var i = IndexJL; i < data.length; i++) { 
				
                    var innerData = data[i][1 + IndexJL];
					newdata[index] = {};
					sectionData = data[i][IndexJL];
					
					if(sectionData && typeof sectionData == "string" && sectionData.toLowerCase().indexOf("i18n.getlocalizedstring") != -1)
						newdata[index]["sectionLabel"] = $KU.getI18NValue(sectionData);
					else if(sectionData instanceof Object) {
						newdata[index]["sectionLabel"] = {};
						for(var sKey in sectionData) {
							if(newmap[sKey]) {
								var sValue = sectionData[sKey];
								if(sValue && typeof sValue == "string" && sValue.toLowerCase().indexOf("i18n.getlocalizedstring") != -1)
									newdata[index]["sectionLabel"][newmap[sKey]] = $KU.getI18NValue(sValue);
								else
									newdata[index]["sectionLabel"][newmap[sKey]] = sValue;
							}
						}    
						sectionData["template"] && (newdata[index]["sectionLabel"]["template"] = sectionData["template"]);
						sectionData["accessibilityConfig"] && (newdata[index]["sectionLabel"]["accessibilityConfig"] = sectionData["accessibilityConfig"]);
					}
					else
						newdata[index]["sectionLabel"] = sectionData;
						
                    for(var j = IndexJL; j < innerData.length; j++, index++) {
                        newdata[index] = newdata[index] || {};                        
                        for(var k = 0; k < newkeys.length; k++) {
                            //newdata[index][newmap[newkeys[k]]] = innerData[j][newkeys[k]];
                            var value = innerData[j][newkeys[k]];
                            if(value && typeof value == "string" && value.toLowerCase().indexOf("i18n.getlocalizedstring") != -1)
                                newdata[index][newmap[newkeys[k]]] = $KU.getI18NValue(value);
                            else
                                newdata[index][newmap[newkeys[k]]] = value;
                        }
                        var metaInfo = innerData[j]["metainfo"] || innerData[j]["metaInfo"];
                        metaInfo && (newdata[index]["metainfo"] = metaInfo);
                        innerData[j]["template"] && (newdata[index]["template"] = innerData[j]["template"]);
			innerData[j]["accessibilityConfig"] && (newdata[index]["accessibilityConfig"] = innerData[j]["accessibilityConfig"]);
                    }
					
					if(innerData.length == IndexJL)
						index++;
                }
                
            }
            else {
                for(var i = IndexJL; i < data.length; i++) {
                    newdata[i] = {};
                    for(var j = 0; j < newkeys.length; j++) 
                    {
                        //newdata[i][newmap[newkeys[j]]] = data[i][newkeys[j]];
                        var value = data[i][newkeys[j]];
                        if(value && typeof value == "string" && value.toLowerCase().indexOf("i18n.getlocalizedstring") != -1)
                            newdata[i][newmap[newkeys[j]]] = $KU.getI18NValue(value);
                        else
                            newdata[i][newmap[newkeys[j]]] = value;
                    }
                    var metaInfo = data[i]["metainfo"] || data[i]["metaInfo"];
                    if(metaInfo) {
                        newdata[i]["metainfo"] = $KU.cloneObj(metaInfo);
                        for(var j = 0; j < newkeys.length; j++) {
                            if(newdata[i]["metainfo"][newkeys[j]]) {
                                newdata[i]["metainfo"][newmap[newkeys[j]]] = metaInfo[newkeys[j]];
                                if(newmap[newkeys[j]] != newkeys[j]) 
                                    delete newdata[i]["metainfo"][newkeys[j]];
                            }
                        }
                    }
                    if(data[i]["template"])
                        newdata[i]["template"] = data[i]["template"];
					if(data[i]["accessibilityConfig"])
					      newdata[i]["accessibilityConfig"] = data[i]["accessibilityConfig"];
                    
                }
            }
            return newdata;
        }
        else
            return data;
    },
	
	renderFlexContainer: function(flexModel, context, rowData, segmentModel, rowIndex){
	
		if(!flexModel.isvisible)
            return "";
			
		var htmlString = "";
        var boxHTML = "";
        var length;
        var count = 0;
        var style = "";
		var widgetData = rowData[flexModel.id];
        $KW.Utils.updateChildModel(flexModel, widgetData);
		
        var computedSkin = $KW.skins.getWidgetSkinList(flexModel, context);
		var boxstyle = " position:relative;" + (flexModel.clipbounds == true ? "overflow:hidden;" : "") + (flexModel.zindex ? "z-index:" + flexModel.zindex : "");		
		
		htmlString += "<div id='flexcontainer_wrapper' class='" + computedSkin + "' style='" + $KW.skins.getMarginSkin(flexModel, context) + "'>";
        htmlString += "<div class = 'ktable kwt100'" + $KW.Utils.getBaseHtml(flexModel, context) + " style='" + boxstyle + "'>";
        
		var wArrary = flexModel.widgets();
        length = wArrary.length;
		
		for (var i = 0; i < length; i++) {
			var childModel = wArrary[i];
			if(!childModel.isvisible){
				continue; 
			}	
			var css = "kcell " + $KW.skins.getWidgetAlignmentSkin(childModel) + (childModel.wType == "TPW"? "  konycustomcss " : "");
			var style = $KW.Utils.getFlexLayoutStyle(childModel);
			htmlString += "<div class = '" + css + "' style='" + style + ";overflow:hidden'>";
			
			if((childModel.wType == "FlexContainer" || childModel.wType == "HBox" || childModel.wType == "VBox") && childModel.isvisible) 
			{
				context.topLevelBox = true;
                if(childModel.wType == "FlexContainer") 
                    boxHTML = this.renderFlexContainer(childModel, context, rowData, segmentModel);
                else if(childModel.wType == "HBox") 
					boxHTML = this.renderHBox(childModel, context, rowData, segmentModel);
				else 
					boxHTML = this.renderVBox(childModel, context, rowData, segmentModel);

				if(boxHTML)
					htmlString += boxHTML;
				else
					count++;
			}
			else{
				var widgetData = rowData[childModel.id];
				this.applyWidgetFocusSkin(widgetData, childModel, segmentModel); 
				$KW.Utils.updateChildModel(childModel, widgetData);
	 
				if(widgetData || childModel.wType == "Line") 
				{
					htmlString += $KW[childModel.wType].render(childModel, context);
				}
				else
					count++;
			}	
			htmlString += "</div>";
		}
		
        if(length == count) 
            return ""; 

		htmlString += "</div></div>";
        return htmlString;
	},

    renderHBox : function(widgetModel, context, rowData, segmentModel, rowIndex) {
        //Do not need this as we can access childModel by widgetModel.childModel.id
        //var parentModel = kony.model.getWidgetModel(widgetModel.pf, context.tabpaneID);
        var topLevelBox = context.topLevelBox;
        var layoutDirection = $KW.skins.getWidgetAlignmentSkin(widgetModel);
        var htmlString = "";
        var boxHTML = "";
        var length;
        var count = 0;
        var style = "";
        var segmentPadding = ""; //Fix for 23862: Add padding to each row in case of Segment Page view and for top Level Hbox only
		var widgetData = rowData[widgetModel.id];
        $KW.Utils.updateChildModel(widgetModel, widgetData);
        if(!widgetModel.isvisible)
            return "";
		
        var computedSkin = "";
        if(topLevelBox) {
            computedSkin = "kwt100 kbasemargin";
            if(segmentModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW){
				segmentPadding = $KW.skins.getPaddingSkin(segmentModel);
			}
        }
        else {
            htmlString += "<div class = 'krow kwt100' ><div class = 'kcell kwt100'>";
        }        
        computedSkin += $KW.skins.getWidgetSkinList(widgetModel, context);
        computedSkin += " " + $KW.skins.getWidgetAlignmentSkin(widgetModel);
        style = $KW.skins.getMarginSkin(widgetModel, context) + ((segmentPadding == "")?$KW.skins.getPaddingSkin(widgetModel):segmentPadding);
        htmlString += "<div class = 'ktable " + computedSkin + "'" + $KW.Utils.getBaseHtml(widgetModel, context, null, rowData.accessibilityConfig, rowIndex) + "style='table-layout:fixed;" + style + "'><div class = 'krow " + layoutDirection + " kwt100'>";
        
        if(widgetModel.children) 
		{
            length = widgetModel.children.length;
            var startIndex = 0;
            var endIndex = widgetModel.children.length;
            if(kony.appinit.isIE7 && widgetModel.percent == false && context.layoutDir && context.layoutDir == "right") { // To reverse the rendering order when non % box aligment is set to right
                startIndex = widgetModel.children.length - 1;
                endIndex = 0;
            }
            for(var i = startIndex; (startIndex == 0 ? (i < endIndex) : (i >= endIndex)); (startIndex == 0 ? i++ : i--))
			{                     
                var childModel = widgetModel[widgetModel.children[i]];
				context.vLine = (childModel.wType == "Line") ? true : false;
                //if(childModel.isvisible) 
				{
                    var childWidgetID = childModel.id;
                    context.ispercent = widgetModel.percent;
                    if((childModel.wType == "HBox" || childModel.wType == "VBox") && childModel.isvisible) 
					{
                        context.topLevelBox = false;
                        if(childModel.wType == "HBox") 
                            boxHTML = this.renderHBox(childModel, context, rowData, segmentModel);
                        else 
                            boxHTML = this.renderVBox(childModel, context, rowData, segmentModel);

						if(boxHTML)
                            htmlString += boxHTML;
                        else
                            count++;
                    }
					else 
					{
                        var widgetData = rowData[childWidgetID];
                        this.applyWidgetFocusSkin(widgetData, childModel, segmentModel); 
                        $KW.Utils.updateChildModel(childModel, widgetData);
						if(!childModel.isvisible)
							continue;
                        //childModel.segmentID = segId; //This line has come from 4.1 merge, but nowhere used, so commenting that, else it's throwing an error saying segId referror, in 4.1 it was passed as argument to the function
                        context.ispercent = widgetModel.percent;
						var alignment = $KW.skins.getWidgetAlignmentSkin(childModel)
						//var containerWeight = $KW.skins.getMarAdjustedContainerWeightSkin(childModel);
                        var containerWeight;
                        if(childModel.containerweight)
                            containerWeight = "kwt" + childModel.containerweight;
                        else
                            containerWeight = "auto";                        
						if(childModel.wType == "Line")
							containerWeight = "auto";
                        var computedSkin = alignment + " " + containerWeight;
                        if((widgetModel.wType == "Segment") || (!(widgetModel.wType == "Segment") && widgetModel.percent == true)) { 
                            htmlString += "<div class = 'kcell " + computedSkin + "' style='"+ $KW.skins.getChildMarginAsPaddingSkin(childModel) + "'>";
                        }
                        if(widgetData ||  childModel.wType == "Line" || childModel.wType == "FlexContainer") 
						{
							htmlString += (childModel.wType == "FlexContainer") ? this.renderFlexContainer(childModel, context, rowData, segmentModel) : $KW[childModel.wType].render(childModel, context);
                        }
                        else
                            count++;
                        if((widgetModel.wType == "Segment") || (!(widgetModel.wType == "Segment") && widgetModel.percent == true)) { 
                            htmlString += "</div>";
                        }
                    }
                }
            }
        }

        if($KG.appbehaviors.adherePercentageStrictly == true && widgetModel.percent === true)
        {           
            widgetModel.dummyNodeWidth= $KW.HBox.getExtraNodeWidth(widgetModel);            
            htmlString+= "<div class = 'kcell kwt" + widgetModel.dummyNodeWidth + "'  ></div>";
        }        

        if(length == count) 
            return ""; 

        htmlString += "</div></div>";
        if(!topLevelBox) {
            htmlString += "</div></div>";
        }
        return htmlString;
    },
    
    renderVBox : function(widgetModel, context, rowData, segmentModel, rowIndex) {
        //Do not need this as we can access childModel by widgetModel.childModel.id
        //var parentModel = kony.model.getWidgetModel(widgetModel.pf, context.tabpaneID);
        var topLevelBox = context.topLevelBox;
        var layoutDirection = $KW.skins.getWidgetAlignmentSkin(widgetModel);        
        var htmlString = "";
        var style = "";
        var boxHTML = "";
        var length;
        var count = 0;
        var segmentPadding = ""; //Fix for 23862: Add padding to each row in case of Segment Page view and for top Level Vbox only
		
		var widgetData = rowData[widgetModel.id];
		$KW.Utils.updateChildModel(widgetModel, widgetData);
		if(!widgetModel.isvisible)
			return "";
			
        if(topLevelBox) {
    		if(segmentModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW){
    			segmentPadding = $KW.skins.getPaddingSkin(segmentModel);
    		}
            htmlString += "<div  class = 'kwt100 kbasemargin ktable'" +  $KW.Utils.getBaseHtml(widgetModel, context, null, rowData.accessibilityConfig, rowIndex) + " style='table-layout:fixed;"+segmentPadding+"'>";
        }
        else {
            var computedSkin = "kwt" + widgetModel.containerweight + " " + layoutDirection;
            //htmlString += "<div class = ' kcell " + computedSkin + "'>";
            htmlString += "<div class = ' kcell " + computedSkin +"' style='"+ $KW.skins.getChildMarginAsPaddingSkin(widgetModel) +"' >";
            computedSkin = $KW.skins.getWidgetSkinList(widgetModel, context);
            style = $KW.skins.getMarginSkin(widgetModel, context) + $KW.skins.getPaddingSkin(widgetModel, context);
            htmlString += "<div class = ' ktable " + computedSkin + "'" + $KW.Utils.getBaseHtml(widgetModel, context)  + "style= 'table-layout:fixed;" + style + "'>";
        }
        
        if(widgetModel.children) 
		{
            length = widgetModel.children.length;
            for(var i = 0; i < widgetModel.children.length; i++) 
			{
                var childModel = widgetModel[widgetModel.children[i]];
                //if(childModel.isvisible) 
		{
                    var childWidgetID = childModel.id;                    
                    if((childModel.wType == "VBox" || childModel.wType == "HBox") && childModel.isvisible) 
					{
                        context.topLevelBox = false;
                        if(childModel.wType == "HBox") 
                            boxHTML = this.renderHBox(childModel, context, rowData, segmentModel);
                        else
                            boxHTML = this.renderVBox(childModel, context, rowData, segmentModel);

						if(boxHTML)
                            htmlString += boxHTML;
                        else
                            count++;
                    }
                    else 
					{
                        var widgetData = rowData[childWidgetID];
                        this.applyWidgetFocusSkin(widgetData, childModel, segmentModel);
                        $KW.Utils.updateChildModel(childModel, widgetData);
				if(!childModel.isvisible)
							continue;
                        htmlString += "<div class = 'krow kwt100' >";
                        
                        layoutDirection = $KW.skins.getWidgetAlignmentSkin(childModel);
                        //computedSkin = $KW.skins.getMarAdjustedContainerWeightSkin(childModel);
                        computedSkin = "kwt100";
                        computedSkin += " " + layoutDirection;
                        
                        //htmlString += "<div class = 'kcell " + computedSkin + "' style='"+ $KW.skins.getChildMarginAsPaddingSkin(childModel) + "'>";
                        htmlString += "<div class = 'kcell " + computedSkin + "'>";
						if(widgetData ||  childModel.wType == "Line" || childModel.wType == "FlexContainer") 
						{
							htmlString += (childModel.wType == "FlexContainer") ? this.renderFlexContainer(childModel, context, rowData, segmentModel) : $KW[childModel.wType].render(childModel, context);
                        }
                        else
                            count++;                        
                        htmlString += "</div></div>";
                    }
                    
                }
            }
        }
        if(length == count) 
            return "";

        htmlString += "</div>";
        if(!topLevelBox)
        {
            htmlString += "</div>";
        }

        return htmlString;
    },
    
    applyWidgetFocusSkin : function(widgetData,childModel, segmentModel) {
    
        if(widgetData && widgetData.focusSkin){
            var classSelector = "";
            if(segmentModel.hasSections) {
                 classSelector = "#" +  segmentModel.pf + "_" + segmentModel.id + " li[secindex='" +segmentModel.seccounter +","+ segmentModel.rowcounter  + "'] #"  + childModel.pf + "_" + childModel.id +":active";
            }
            else
            {
             classSelector = "#" +  segmentModel.pf + "_" + segmentModel.id + " li[index='" + segmentModel.rowcounter  + "'] #"  + childModel.pf + "_" + childModel.id +":active";                          

            }
             $KW.Utils.applyStyle(widgetData.focusSkin, classSelector, segmentModel.wType);
        }
    },    
    applyRowSkin: function(segmentModel, holder) {
        // Apply row skin and alternate skin 
        var rows = holder.childNodes;
        var askin = segmentModel.alternaterowskin || segmentModel.askin || "";
        var rowSkin = segmentModel.rowskin || segmentModel.skin || "";
        var rowData, skin = "";
        for(var i = 0; i < rows.length; i++) {
            rowData = segmentModel.data[i + IndexJL];
            if(rowData) {
                rowData.metainfo = rowData.metaInfo || rowData.metainfo;	
            }
            skin = (rowData && rowData.metainfo && rowData.metainfo.skin) || ((i % 2 != 0 && askin) ? askin : rowSkin);
            rows[i].className = skin;
            rows[i].style.border = "none";
            if(i < rows.length - 1 && segmentModel.separatorthickness && segmentModel.separatorcolor) { 
                if(!segmentModel.separatorrequired)
                    continue;
                var r = parseInt(segmentModel.separatorcolor.substring(0, 2), 16), g = parseInt(segmentModel.separatorcolor.substring(2, 4), 16), b = parseInt(segmentModel.separatorcolor.substring(4, 6), 16);
                var o = 1 - (parseInt(segmentModel.separatorcolor.substring(6, 8), 16)/100);
                rows[i].style.borderBottom = segmentModel.separatorthickness + "px solid rgba("+r+","+g+","+b+","+o+")";
            }
        }
        
    },
    
    applySectionHeaderSkin: function(segmentModel, skin) {
        var element = $KU.getNodeByModel(segmentModel);
		if(element)
		{
			var id = element.id;
			var headers = document.querySelectorAll("#" + id + ">ul>li:first-child");
			for(var i=0; i<headers.length; i++) {
				var header = headers[i];
				header.style.border = "none";
				header.className = skin +' middleleftalign';
			}
		}
    },
    
    
    //Execute segment.onClick event when the user clicks on the label, image or phone.  
    updateData: function(childModel, childNode, segmentModel, row, canExecute) {
        if(segmentModel && row) {
            var index = parseInt(row.getAttribute("index"));
            var secIndex = 0 + IndexJL;
            var data = segmentModel.data;
            var item = null;
            var secIndices;
			
			if(segmentModel.hasSections){
				secIndices = row.getAttribute("secindex").split(',');
                secIndex = parseInt(secIndices[0]);
			}
            //added below snippet for segment with single select, if the developer selects the already slected row ignore the segment onclick event.
            //the behaviour of segment with single selection need to be similar to radio button
            if(segmentModel.selectionbehavior == constants.SEGUI_SINGLE_SELECT_BEHAVIOR && (segmentModel.hasSections ? (segmentModel.selectedsectionindex == secIndex) && (segmentModel.focusedindex == index) : (segmentModel.focusedindex == index))){                 
                return;
            }               

            if(segmentModel.hasSections) { //if it has sections               
                segmentModel.selectedsectionindex = secIndex;
                index = parseInt(secIndices[1]);
                if(index != -1) {                    
                    var sectionData = data[secIndex][1 + IndexJL];
                    item = sectionData[index];
                }
                else {
                    item = data[secIndex][0 + IndexJL];
                }
            } else {
                segmentModel.selectedsectionindex = secIndex;
                item = segmentModel.data[index];
            }

            if(index != -1) {
                segmentModel.focusedindex = index;
                segmentModel.selectedindex = (IndexJL) ? [null, secIndex, index] : [secIndex, index];
                segmentModel.focuseditem = item;
                if(!segmentModel.selectionindicator || segmentModel.selectionindicator != childModel.id || segmentModel.selectionbehavior == constants.SEGUI_DEFAULT_BEHAVIOR) {
                    segmentModel.selecteditems = (IndexJL) ? [null, item] : [item];
                }

            }

            if(item) {
               item.metainfo = item.metaInfo || item.metainfo;
            }
            var clickable = (item && item.metainfo) ? item.metainfo.clickable : true;            
            //if(segmentModel.selectionindicator && segmentModel.selectionindicator == childModel.id && segmentModel.selectionbehavior != constants.SEGUI_DEFAULT_BEHAVIOR) {
              if(segmentModel.selectionindicator && segmentModel.selectionbehavior != constants.SEGUI_DEFAULT_BEHAVIOR && index != -1) {
                this.toggleRowSelection(segmentModel, row.parentNode);
            }

            if(segmentModel.selectionbehavior == constants.SEGUI_DEFAULT_BEHAVIOR) {
                var selectedRows = IndexJL ? [null] : [];
                var selectedData = IndexJL ? [null, segmentModel.selectedsectionindex, index] : [segmentModel.selectedsectionindex, index];
                selectedRows.push(selectedData);
                segmentModel.selectedRows = (selectedRows && selectedRows.length > IndexJL) ? selectedRows : null;
                this.setSelectedItemsAndIndices(segmentModel);
            }
            
			
			if(!$KU.inArray(["HBox", "VBox", "Button", "Link", "RichText"], childModel.wType, true)){
				segmentModel.selectedrowindex = (IndexJL) ? [null, secIndex, index] : [secIndex, index];
				segmentModel.selectedrowindices = segmentModel.selectedindices;
			}
						
			segmentModel.currentIndex = [secIndex, index];
			
            if(clickable && canExecute) {
                this.setProgressIndicator(row, segmentModel);
                if((segmentModel.onclick || segmentModel.onrowclick) && !childNode.getAttribute("kcontainerID")) { //execute event if the click is triggered on segment itself
                    segmentModel.blockeduiskin  && $KW.Utils.applyBlockUISkin(segmentModel);
                    var itemData = $KW.Segment.getRowDataByIndex(segmentModel, (IndexJL) ? [null, secIndex, index] : [secIndex, index]);
                    var segmentref = $KU.returnEventReference(itemData.onclick || itemData.onrowclick || segmentModel.onclick || segmentModel.onrowclick);
                    segmentref && segmentref.call(segmentModel, segmentModel, secIndex, index, segmentModel.selectedState);
                }
                else {
                    var clickedIndex = (IndexJL) ? [null, secIndex, index] : [secIndex, index];
					if(index == -1) {
					    var eventExecuted = kony.events.executeBoxEvent(childModel, $KW.Segment.getRowDataByIndex(segmentModel, clickedIndex), segmentModel, true);
					} else {
                        var eventExecuted = kony.events.executeBoxEvent(childModel, $KW.Segment.getRowDataByIndex(segmentModel, clickedIndex), segmentModel);
					}
                    if(index != -1) { //index is -1 for section
                        var itemData = $KW.Segment.getRowDataByIndex(segmentModel, (IndexJL) ? [null, secIndex, index] : [secIndex, index]);
                        var segmentref = $KU.returnEventReference(itemData.onClick || itemData.onclick || itemData.onRowClick || itemData.onrowclick || segmentModel.onclick || segmentModel.onrowclick);
                        if(!eventExecuted && segmentref) {
                            segmentModel.blockeduiskin && $KW.Utils.applyBlockUISkin(segmentModel);
                            if(segmentModel.selectionbehavior == constants.SEGUI_DEFAULT_BEHAVIOR) {
                                segmentref && segmentref.call(segmentModel, segmentModel, secIndex, index);
                            } else {
                                segmentref && segmentref.call(segmentModel, segmentModel, secIndex, index, segmentModel.selectedState);
                            }
                        }
                    }
                }
                if(!kony.system.activity.hasActivity())
                    $KW.unLoadWidget();
            }
            // enable support
            var childMeta = item[childModel.id];
            if(childMeta && typeof childMeta == "object") {
                if(childMeta.enable === false)
                    return false;
            }
        }
        return true;
    },
    
    toggleRowSelection: function(segmentModel, holder) {
        if(typeof segmentModel.selectedindex == "undefined") {
            var secIndex = 0 + IndexJL;
            var rowIndex = segmentModel.focusedindex;
        } else if(segmentModel.selectedindex) {
            var secIndex = segmentModel.selectedindex[0+IndexJL];
            var rowIndex = segmentModel.selectedindex[1+IndexJL];
        } else {
            var secIndex = segmentModel.selectedindices[0+IndexJL][0+IndexJL];
            var rowIndex = segmentModel.selectedindices[0+IndexJL][1+IndexJL][0+IndexJL];
        }

        //segmentModel.selectedsectionindex = secIndex;

        if(segmentModel.selectionbehavior == constants.SEGUI_MULTI_SELECT_BEHAVIOR) {
            segmentModel.selectedRows = (segmentModel.selectedRows) ? segmentModel.selectedRows : (IndexJL) ? [null] : [];
        } else if(segmentModel.selectionbehavior == constants.SEGUI_SINGLE_SELECT_BEHAVIOR) {
            segmentModel.selectedRows = segmentModel.selectedRows ? segmentModel.selectedRows : (IndexJL) ? [null] : [];
        }
        var data = (IndexJL) ? [null, secIndex, rowIndex] : [secIndex, rowIndex];
        var arrIndex = $KU.arrayIndex(segmentModel.selectedRows, data);
        if(arrIndex != -1) { //data is in segmentModel.selectedRows, remove
            var selected = false;
            segmentModel.selectedRows.splice(arrIndex, 1);
        } else {
            var selected = true;
            if(segmentModel.selectionbehavior == constants.SEGUI_MULTI_SELECT_BEHAVIOR) {
                segmentModel.selectedRows.push(data);
            } else {
                segmentModel.selectedRows = (IndexJL) ? [null, data] : [data];
            }
        }
        segmentModel.selectedRows = (segmentModel.selectedRows && segmentModel.selectedRows.length > IndexJL) ? segmentModel.selectedRows : null;
        this.setSelectedItemsAndIndices(segmentModel);

        var element = $KU.getNodeByModel(segmentModel);
        var imgID = (segmentModel.rowtemplate ? segmentModel.rowtemplate.id : segmentModel.pf) + "_" + segmentModel.selectionindicator;
        var query = " [index='{index}'] [id='" + imgID + "']";
        query = segmentModel.hasSections ? (" ul:nth-child(" + (IndexJL ? secIndex : secIndex + 1)  + ") " + query) : query;
        query = "#" + element.id + query;

        if(segmentModel.selectionindicator) {
            var childNode = document.querySelector(query.replace(/\{index\}/g, rowIndex));
            var src = (childNode && childNode.src) || "";
            src = src.substring(src.lastIndexOf("/") + 1, src.length);
            var img;
            var indicator = selected ? segmentModel.selectimage : segmentModel.unselectimage;
            src && (childNode.src = $KU.getImageURL(indicator));    
			var rowEle = $KU.getParentByAttribute(childNode, "index");
			if(rowEle){
				rowEle.firstChild.setAttribute('aria-selected', selected);
				selected ? rowEle.firstChild.setAttribute('role', "option"): rowEle.firstChild.removeAttribute('role', "option");
			}
        }
        if(segmentModel.selectionbehavior == constants.SEGUI_SINGLE_SELECT_BEHAVIOR) {
            if(segmentModel.selectionindicator) {
                this.setImages(segmentModel, segmentModel.selectedRows);
            }
        }
        segmentModel.onselect && segmentModel.onselect(segmentModel, segmentModel.focusedindex, selected);
        segmentModel.selectedState = selected;
    },

    eventHandler: function(eventObject, target, sourceFormID) {

        var segWidgetModel = $KU.getModelByNode(target);
        if(target.getAttribute("kwidgettype") != 'Segment') {
            $KW.Utils.updateContainerData(segWidgetModel, target, true);
        }
    },
    
    setProgressIndicator: function(link, model) {
        var progressdiv = $KW.Utils.setProgressIndicator($KU.getParentByAttribute(link, kony.constants.KONY_WIDGET_TYPE), model);
        link.insertBefore( progressdiv,link.childNodes[0]);
    },

    setSelectedItemsAndIndices: function(segmentModel, ignoreIndices) {
        if(segmentModel.selectedRows) {
            segmentModel.selecteditems = (IndexJL) ? [null] : [];
            var sections = {};
            for(var i=IndexJL; i<segmentModel.selectedRows.length; i++) {
                var segIndex = segmentModel.selectedRows[i][0+IndexJL];;
                var rowIndex = segmentModel.selectedRows[i][1+IndexJL];
                if(!ignoreIndices) {
                    if(!sections[segIndex]) sections[segIndex] = (IndexJL) ? [null] : [];
                    sections[segIndex].push(rowIndex);
                }
                if(segmentModel.hasSections) {
                    var sectionData = segmentModel.data[segIndex][1 + IndexJL];
                    var item = sectionData[rowIndex];
                } else {
                    var item = segmentModel.data[rowIndex];
                }
                segmentModel.selecteditems.push(item);
            }
            if(!ignoreIndices) {
                segmentModel.selectedindices = (IndexJL) ? [null] : [];
                for(var k in sections) {
                    var section = (IndexJL) ? [null] : [];
                    section.push(parseInt(k, 10));
                    section.push(sections[k]);
                    segmentModel.selectedindices.push(section);
                }
            }
            segmentModel.selectedindex = segmentModel.selectedRows[segmentModel.selectedRows.length-1];
            segmentModel.selectedsectionindex = segmentModel.selectedindex[0+IndexJL];
            segmentModel.focusedindex = segmentModel.selectedindex[1+IndexJL];
            segmentModel.focuseditem = segmentModel.selecteditems[segmentModel.selecteditems.length-1];
        } else {
            segmentModel.focusedindex = segmentModel.focuseditem = segmentModel.selectedsectionindex = segmentModel.selectedindex = segmentModel.selecteditems = null;
            if(!ignoreIndices) {
                segmentModel.selectedindices = null;
            }
        }
    },

    setImages: function(widgetModel, selectedRows) {
        if(widgetModel.selectionbehavior != constants.SEGUI_DEFAULT_BEHAVIOR) {
            var element = $KU.getNodeByModel(widgetModel);
            if(element) 
            {
                //Remove all selections
                var src = $KU.getImageURL(widgetModel.selectimage);
                var selectedImages = document.querySelectorAll('#'+element.id+' li img[src="'+src+'"]');
                for(var i=0; i<selectedImages.length; i++) {
                    src = $KU.getImageURL(widgetModel.unselectimage);
                    selectedImages[i].setAttribute('src', src);
					var rowEle = $KU.getParentByAttribute(selectedImages[i], "index");
					if(rowEle){
						rowEle.firstChild.removeAttribute('aria-selected');
						rowEle.firstChild.removeAttribute('role', "option");
					}
                }

                if(selectedRows) {
                    if(widgetModel.selectionbehavior == constants.SEGUI_SINGLE_SELECT_BEHAVIOR) {
                        selectedRows = (IndexJL) ? [null, selectedRows[selectedRows.length-1]] : [selectedRows[selectedRows.length-1]];
                    }
                    //Apply selected image
                    for(var i=IndexJL; i<selectedRows.length; i++) {
                        if(widgetModel.hasSections) {
                            selectedImages = document.querySelectorAll('#'+element.id+' li[secindex="'+selectedRows[i][0+IndexJL]+','+selectedRows[i][1+IndexJL]+'"] img#'+widgetModel.rowtemplate.id+'_'+widgetModel.selectionindicator);
                        } else {
                            selectedImages = document.querySelectorAll('#'+element.id+' li[index="'+selectedRows[i][1+IndexJL]+'"] img#'+widgetModel.rowtemplate.id+'_'+widgetModel.selectionindicator);
                        }
                        var src = $KU.getImageURL(widgetModel.selectimage);
                        for(var j=0; j<selectedImages.length; j++) {
                            selectedImages[j].setAttribute('src', src);
							var rowEle = $KU.getParentByAttribute(selectedImages[i], "index");
							if(rowEle)
							{
								rowEle.firstChild.setAttribute('aria-selected', true);
								rowEle.firstChild.setAttribute('role', "option")
							}
                        }
                    }
                }
            }
            widgetModel.selectedRows = selectedRows;
            this.setSelectedItemsAndIndices(widgetModel);
        }
    },

    adjustAlreadySelectedProperties: function(widgetModel, action, secIndex, rowIndex) {
        if(action != "addall") {
            if(action == "setdata" || action == "removeall") {
                widgetModel.selectedRows = null;
            }
            if(widgetModel.selectedRows) {               
                widgetModel.selectedRows = this.adjustSelectedRows(widgetModel.selectedRows, action, secIndex, rowIndex);
				widgetModel.selectedRows && (widgetModel.selectedrowindex = widgetModel.selectedRows[widgetModel.selectedRows.length - 1]);
            }
			if(widgetModel.selectedrowindices) {               
                widgetModel.selectedrowindices = this.adjustSelectedRowIndices(widgetModel.selectedrowindices, action, secIndex, rowIndex);
            }
            this.setSelectedItemsAndIndices(widgetModel);
        }
    },
	
	adjustSelectedRowIndices: function(sIndices, action, secIndex, rowIndex) {    
		var sRowArray;	
		switch (action) {
            case "addat":
			case "adddataat":
                for(var i=IndexJL; i<sIndices.length; i++) {
					sRowArray = sIndices[i][1+IndexJL];
					if(sIndices[i][0+IndexJL] == secIndex)
					{
						for(var j=IndexJL; j<sRowArray.length;j++)
						{
							
							if(sRowArray[j] >= rowIndex)
								sRowArray[j] = sRowArray[j] + 1;
						}
						sIndices[i][1+IndexJL] = sRowArray;
					}
					
				}   
				
                break;
            case "setdataat":
			case "removeat":
				for(var i=IndexJL; i<sIndices.length; i++) {
					sRowArray = sIndices[i][1+IndexJL];
					if(sIndices[i][0+IndexJL] == secIndex)
					{
						var arrIndex = $KU.arrayIndex(sRowArray, IndexJL+rowIndex);
						if(arrIndex != -1) {
							sRowArray.splice(arrIndex, 1);
						}
						if(action === "removeat")
						{
							for(var j=IndexJL; j<sRowArray.length;j++)
							{
								if(sRowArray[j] > rowIndex)
									sRowArray[j] = sRowArray[j] - 1;
							}
						}
						sIndices[i][1+IndexJL] = sRowArray;
					}
				}
                break;
			case "addsectionat":
				for(var i = IndexJL; i < sIndices.length; i++) {
					if(sIndices[i][0+IndexJL] >= secIndex) {
						sIndices[i][0+IndexJL] = sIndices[i][0+IndexJL] + 1;
					}
				}
				break;
			case "removesectionat":
			case "setsectionat":	
				var removeIndexes = [];
				for(var i=IndexJL; i<sIndices.length; i++) {
					if(sIndices[i][0+IndexJL] == secIndex) {
						removeIndexes.push(i);
					}
				}
				for(var i=0; i<removeIndexes.length; i++) {
					sIndices.splice(removeIndexes[i], 1);
				}
				if(action == "removesectionat") {
					for(var i=IndexJL; i<sIndices.length; i++) {
						if(sIndices[i][0+IndexJL] > secIndex) {
							sIndices[i][0+IndexJL] = sIndices[i][0+IndexJL] - 1;
						}
					}
				}
				break;			
        }   
		return (sIndices.length > IndexJL) ? sIndices : null;
    },
	
	adjustSelectedRows: function(sRows, action, secIndex, rowIndex) {       
		switch (action) {
            case "addat":
			case "adddataat":
                for(var i=IndexJL; i<sRows.length; i++) {
					if(sRows[i][0 + IndexJL] == secIndex && sRows[i][1 + IndexJL] >= rowIndex) {
						sRows[i][1+IndexJL] = sRows[i][1+IndexJL] + 1;
					}
				}   
                break;
            case "setdataat":
				var arrIndex = $KU.arrayIndex(sRows, (IndexJL) ? [null, secIndex, rowIndex] : [secIndex, rowIndex]);
				if(arrIndex != -1) {
					sRows.splice(arrIndex, 1);
				}
                break;
            case "removeat":
                var arrIndex = $KU.arrayIndex(sRows, (IndexJL) ? [null, secIndex, rowIndex] : [secIndex, rowIndex]);
				if(arrIndex != -1) {
					sRows.splice(arrIndex, 1);
				}
				for(var i=IndexJL; i<sRows.length; i++) {
					if(sRows[i][0+IndexJL] == secIndex && sRows[i][1+IndexJL] > rowIndex) {
						sRows[i][1+IndexJL] = sRows[i][1+IndexJL] - 1;
					}
				}
                break;
			case "addsectionat":
				for(var i = IndexJL; i < sRows.length; i++) {
					if(sRows[i][0+IndexJL] >= secIndex) {
						sRows[i][0+IndexJL] = sRows[i][0+IndexJL] + 1;
					}
				}
				break;
			case "removesectionat":
			case "setsectionat":	
				var removeIndexes = [];
				for(var i=IndexJL; i<sRows.length; i++) {
					if(sRows[i][0+IndexJL] == secIndex) {
						removeIndexes.push(i);
					}
				}
				for(var i=0; i<removeIndexes.length; i++) {
					sRows.splice(removeIndexes[i], 1);
				}
				if(action == "removesectionat") {
					for(var i=IndexJL; i<sRows.length; i++) {
						if(sRows[i][0+IndexJL] > secIndex) {
							sRows[i][0+IndexJL] = sRows[i][0+IndexJL] - 1;
						}
					}
				}
				break;			
        }   
		return (sRows.length > IndexJL) ? sRows : null;
    },

    /**
     * @param    widgetModel <segment widget object instance>
     * @param    rowIndex <nnumber>
     * @param    secIndex <number> (optional)
     * @param    boundaryConditionToBeConsidered <boolean | array>
     * @return   array
     * @desc     Calculates the correct section/row index, depending on its boundary condition.
     *           If "boundaryConditionToBeConsidered" not an boolean value, then it does not do anything just returns the same "boundaryConditionToBeConsidered".
     */
    calculateSectionRowIndex: function(widgetModel, rowIndex, secIndex, boundaryConditionToBeConsidered) {
        if(typeof boundaryConditionToBeConsidered != "boolean") {
            return boundaryConditionToBeConsidered;
        }
        var result = false;
        rowIndex = (boundaryConditionToBeConsidered && rowIndex < IndexJL) ? IndexJL : rowIndex;
        if(!widgetModel.hasSections) { // Without Sections *****************************************************************
            if(rowIndex < IndexJL || rowIndex >= widgetModel.data.length) { // Outof Boundary of ROW ***********************
                if(boundaryConditionToBeConsidered) {
                    secIndex = IndexJL;
                    rowIndex = (rowIndex < IndexJL) ? IndexJL : (rowIndex >= widgetModel.data.length) ? widgetModel.data.length : rowIndex;
                    result = [secIndex, rowIndex];
                }
            } else { // Within Boundary of ROW *****************************************************************************
                secIndex = IndexJL;
                result = [secIndex, rowIndex];
            }
        } else { // With Sections ******************************************************************************************
            if(typeof secIndex != "number") { // Absolute row index ********************************************************
                var rowData = null, totalRows = 0, secIndex = IndexJL, tempRowIndex = rowIndex;
                for(var i=IndexJL; i<widgetModel.data.length; i++) {
                    rowData = widgetModel.data[i][1+IndexJL];
                    totalRows += rowData.length - IndexJL;
                    if(tempRowIndex >= totalRows+IndexJL) {
                        secIndex++;
                        rowIndex = tempRowIndex - totalRows;
                    } else {
                        break;
                    }
                }

                if(secIndex >= widgetModel.data.length) { // Outof Boundary of SECTION *************************************
                    if(boundaryConditionToBeConsidered) {
                        secIndex = widgetModel.data.length-1;
                        result = (widgetModel.data[secIndex]) ? widgetModel.data[secIndex][1+IndexJL].length : IndexJL;
                        result = [secIndex, rowIndex];
                    }
                } else { // Within Boundary of SECTION *********************************************************************
                    rowData = widgetModel.data[secIndex][1+IndexJL];
                    if(rowIndex < IndexJL) {
                        if(boundaryConditionToBeConsidered) {
                            result = [secIndex, IndexJL];
                        }
                    } else if(rowIndex >= rowData.length) { // Outof Boundary of ROW in this SECTION ***********************
                        if(boundaryConditionToBeConsidered) {
                            result = [secIndex, rowData.length];
                        }
                    } else { // Within Boundary of ROW in this SECTION *****************************************************
                        result = [secIndex, rowIndex];
                    }
                }
            } else { // Non absolute row index *****************************************************************************
                if(secIndex < IndexJL || secIndex >= widgetModel.data.length) { // Outof Boundary of SECTION ***************
                    if(boundaryConditionToBeConsidered) {
                        if(secIndex < IndexJL) {
                            secIndex = IndexJL;
                            if(!widgetModel.data[secIndex]) { // When removeAll is operated before addSectionAt
                                rowIndex = IndexJL
                            } else {
                                var rowData = widgetModel.data[secIndex][1+IndexJL];
                                if(rowIndex < IndexJL || rowIndex >= rowData.length) { // Outof Boundary of ROW in this SECTION ********
                                    if(boundaryConditionToBeConsidered) {
                                        rowIndex = (rowIndex < IndexJL) ? IndexJL : (rowIndex >= widgetModel.data.length) ? widgetModel.data.length : rowIndex;
                                    }
                                }
                            }
                        } else if(secIndex >= widgetModel.data.length) {
                            secIndex = widgetModel.data.length - IndexJL;
                            rowIndex = (widgetModel.data[secIndex]) ? widgetModel.data[secIndex][1+IndexJL].length : IndexJL; // When removeAll is operated before addSectionAt
                        }
                        result = [secIndex, rowIndex];
                    }
                } else { // Within Boundary of SECTION *********************************************************************
                    var rowData = widgetModel.data[secIndex][1+IndexJL];
                    if(rowIndex < IndexJL || rowIndex >= rowData.length) { // Outof Boundary of ROW in this SECTION ********
                        if(boundaryConditionToBeConsidered) {
                            rowIndex = (rowIndex < IndexJL) ? IndexJL : (rowIndex >= rowData.length) ? rowData.length : rowIndex;
                            result = [secIndex, rowIndex];
                        }
                    } else {
                        result = [secIndex, rowIndex];
                    }
                }
            }
        }
        return result;
    },

    updateSectionContent: function(widgetData, dataArray, action, rowIndex, secIndex) {
        switch (action) {
            case "setsectionat":
                widgetData.splice(secIndex, 1, dataArray);
                return;    
                break;
            case "addsectionat":
                for(var i = IndexJL; i < dataArray.length; i++) {
                    widgetData.splice(secIndex++, 0, dataArray[i]);
                }
                return;
                break;
            case "removesectionat":
                widgetData.splice(secIndex, 1);
                return;
                break;
        }
        if(action == "addall") {
            if(dataArray[IndexJL] instanceof Array) {
                $KU.addArray(widgetData, dataArray);
            }             
        } else {
            var section = widgetData[secIndex];
            var sectionData = section && section[1 + IndexJL];
            if(sectionData) {
                switch (action) {
                    case "setdataat":
                        sectionData.splice(rowIndex, 1, dataArray);
                        break;
                    case "addat":
                    case "adddataat":
                        if($KU.isArray(dataArray)) {
                            for(var i = IndexJL; i < dataArray.length; i++ ) {
                                sectionData.splice(rowIndex++, 0, dataArray[i]);
                            }  
                        }  
                        else
                            sectionData.splice(rowIndex, 0, dataArray);                            
                        break;
                    case "removeat":
                        sectionData.splice(rowIndex, 1);
                        break;
                }
            }
        }
    },

    isSelectionOutOfBound: function(widgetModel, selection) {
        var outOfBound = false, secIndex = selection[0+IndexJL], rowIndex = selection[1+IndexJL];
        if(widgetModel.hasSections) {
            if(secIndex >= widgetModel.data.length) {
                outOfBound = true;
            } else {
                var rowData = widgetModel.data[secIndex][1+IndexJL];
                if(rowIndex > rowData.length) {
                    outOfBound = true;
                }
            }
        } else {
            if(rowIndex >= widgetModel.data.length) {
                outOfBound = true;
            }
        }
        return outOfBound;
    },

    getRowDataByIndex: function(widgetModel, index) { //Index must be an array of length 2
        if(widgetModel.data.length > IndexJL) {
            if($KU.isArray(widgetModel.data[0])) { //Its a segment with section
			    if(index[IndexJL+1] == -1) {
                    return widgetModel.data[index[0]][IndexJL];
                } else {
                    return widgetModel.data[index[0]][IndexJL + 1][index[1]];
                }
            } else {
                return widgetModel.data[index[1]];
            }
        }
    }
};