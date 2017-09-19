<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyTab"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@ page trimDirectiveWhitespaces="true" %>

<%@include file="common.jsp"%>

	<%
    //SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
	String formid = frmId; //(String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);;
	String widgetid = (String)request.getAttribute("wid");
	String widgetRefStr = formid + "."+ widgetid;
        
        Boolean showarrows = false;
        showarrows = (Boolean)widget.map.get(constants.SHOW_ARROWS);    
        String leftarrowimage = imgpath + "prvarw.png"; 
        String rightarrowimage = imgpath + "nxtarw.png";                 
        if(showarrows!= null && showarrows == true)
        {                          
             if (widget.map.get(constants.LEFT_ARROW_IMG) != null && !("".equals(widget.map.get(constants.LEFT_ARROW_IMG))) )
             {   
                leftarrowimage = (String) widget.map.get(constants.LEFT_ARROW_IMG);
                if(!leftarrowimage.startsWith("http")) 
                     leftarrowimage = imgpath + leftarrowimage;
             }             
             if (widget.map.get(constants.RIGHT_ARROW_IMG) != null&& !("".equals(widget.map.get(constants.RIGHT_ARROW_IMG))) )
             {      
                rightarrowimage = (String) widget.map.get(constants.RIGHT_ARROW_IMG);                              
                if (!rightarrowimage.startsWith("http")) 
                    rightarrowimage = imgpath + rightarrowimage;
             }    
        }
        else
            showarrows = false;
              
        if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
        {
            widgetRefStr = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + widgetid;
        }
        if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
        {
            widgetRefStr = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + widgetid;
        }
        if(request.getAttribute("tabpaneid") != null)
        {
             widgetRefStr = frmId +"."+request.getAttribute("tabpaneid")+"."+widgetid;            
        }
	%>
	<%if(uiState.getBoolValue(widgetRefStr + "." + constants.ISVISIBLE)){%>

<input type="hidden" autocomplete="off" id="<%=widgetid%>Skin" value="<%=widget.map.get(KonyServerWidget.SKIN)%>"/>
<input type="hidden" autocomplete="off" id="<%=widgetid%>FocusSkin"value="<%=widget.map.get(constants.FOCUSSKIN)%>"/>
<%
Object objhimgstrip = uiState.get(widgetRefStr + ".ilist");
if (objhimgstrip != null)
{
    String imgSkin = uiState.getStringValue(widgetRefStr + ".skin");    
    java.util.Vector datahimgstrip = (java.util.Vector) objhimgstrip;
    String imghimgstrip = "";
    int focusedindex =uiState.getIntValue(widgetRefStr  + "." + constants.FOCUSED_INDEX);
    int size = datahimgstrip.size();
    int startRecord = 0;
    int endRecord = size;
    int imageSpace = 0;
    if(widget.map.get(constants.SPACE_BETWEEN_IMGS) != LuaNil.nil)
        imageSpace = ((Double)widget.getTable(constants.SPACE_BETWEEN_IMGS)).intValue();
    int image_left_margin = 0;
    int totalRecords = size;
    objhimgstrip = uiState.get(widgetRefStr);
    if(objhimgstrip != null){
        com.konylabs.vm.LuaTable imgTable = (com.konylabs.vm.LuaTable) objhimgstrip;
        int dataStartRec = 1;
        objhimgstrip = imgTable.getTable("meta");
        if (objhimgstrip != null && objhimgstrip instanceof com.konylabs.vm.LuaTable)
        {
            com.konylabs.vm.LuaTable metaTable = (com.konylabs.vm.LuaTable) objhimgstrip;
			dataStartRec = ((Double) metaTable.list.elementAt(0)).intValue();
			totalRecords = ((Double) metaTable.list.elementAt(2)).intValue();
        }
        int pageNo = 0;
        int recPerPage = 3;
        pageNo = (Integer) imgTable.getTable("pagenumber");
        if(imgTable.getTable("recperpage") != LuaNil.nil){
            recPerPage = ((Double) imgTable.getTable("recperpage")).intValue();
         }
        if(size < recPerPage){
    		recPerPage = size;
		}
        startRecord = pageNo*recPerPage - dataStartRec + 1;
        endRecord = (pageNo+1)*recPerPage - dataStartRec + 1;
        if(endRecord >= totalRecords){
            startRecord = startRecord - (endRecord - totalRecords);
		}

        String scaleMode ="fittodimensions";
        if(widget.getTable(constants.IMG_SCALE_MODE)!= LuaNil.nil)
             scaleMode = (String) widget.getTable(constants.IMG_SCALE_MODE);

        int referenceWidth =0, referenceHeight = 0; 

		
        if(widget.getTable(constants.REF_WIDTH) != LuaNil.nil)
                referenceWidth = ((Double)widget.getTable(constants.REF_WIDTH)).intValue();

        if(widget.getTable(constants.REF_HEIGHT) != LuaNil.nil)
                referenceHeight = ((Double)widget.getTable(constants.REF_HEIGHT)).intValue();
        %>
<%if("palm".equalsIgnoreCase(preferredML) || "nth".equalsIgnoreCase(preferredML))
{%>
        <input type="hidden" id="<%=widgetid%>recperpage" value="<%=recPerPage%>"/>
            <div id="<%=widgetid%>" konywidgettype="KTouchhstrip" eventname="<%=widgetid%>.event_.Khstrip"
            pageOnDotImage="<%= widget.map.get(constants.PAGE_ON_DOT_IMAGE)%>" pageOffDotImage="<%=widget.map.get(constants.PAGE_OFF_DOT_IMAGE)%>"
                    prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>" postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>">
            <div class ="ktable kwt100" >
                <div class="krow kwt100">
                    
                <div class =" middlecenteralign kcell" style="width:30px"   >
                    <a href="<% if(pageNo == 0){ %>#<%}else{%><%=response.encodeURL(apppath+"?formid=" +formid+"&cat="+
                deviceCategory+ (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+
                    WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&"+widgetid+
                    ".prev.event_.Khstrip=x")%><%}%>"
                        class="previousArrowNav <% if(pageNo == 0){ %>inactive<%}%>"
                            id="<%=widgetid%>" konywidgettype = "Khstrip"      eventname="<%=widgetid%>.prev.event_.Khstrip">
                    </a>
                </div>

                <div class="  kcell" recPerPage="<%=recPerPage%>" >
                    <div id="<%=widgetid%>" style="font-size:0px;">
         <%
         for(int i=startRecord; i >= 0 && i < endRecord && i < size; i++)
         {
            objhimgstrip = datahimgstrip.elementAt(i);;
            if(objhimgstrip != null)
            {
                imghimgstrip = (String) objhimgstrip;
                if(!imghimgstrip.startsWith("http"))
                    imghimgstrip = imgpath + imghimgstrip;
                if(i % recPerPage == 0)
                    image_left_margin = imageSpace;
                 else
                    image_left_margin = 0; %>
                <%if(event.equals("yes")){%>
                         <a href="<%=response.encodeURL(apppath+"?formid=" +formid+"&cat="+deviceCategory+ 
                         (WAPUtilities.getKRFId(request) != null && WAPUtilities.getKRFId(request).length() >0 ? "&krfid="+
                         WAPUtilities.getKRFId(request) : "" ) +"&node="+request.getAttribute("node.no")+"&"+
                         widgetid+"."+i+".event_.Khstrip=x")%>">
                <%
			focusedindex =uiState.getIntValue(widgetRefStr + "." + constants.FOCUSED_INDEX);                
			if(i+1==focusedindex)
			{                             
			    imgSkin=uiState.getStringValue(widgetRefStr  + "." + constants.FOCUSSKIN);
            }
			else 
			{                              
			    imgSkin=uiState.getStringValue(widgetRefStr + ".skin");                             
			}
                %>
               <%}%>
               <%if (scaleMode.equals("fittodimensions")) {%>
               <img class="<%=imgSkin%>"     src = "<%=imghimgstrip%>" alt=""   <%if("".equals(widget.map.get(WEBConstants.ENABLED))){%>eventname="<%=widgetid%>.<%=i%>.event_.Khstrip" <%} %>
                    view ="fittodimensions"  refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"  
                    <% if(imageCat != null && imageCat.trim().length() != 0) {%>
                     style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> margin-left:<%=image_left_margin%>px; margin-right:<%=imageSpace%>px;
                     width:<%=referenceWidth%>px; height:<%=referenceHeight%>px;"
                    <%}%>
                    <%if (widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
                            prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                    <%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
                            postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>"
                    <%}%>                    
                    konywidgettype = "Khstrip" onload="kony.widgets.ImageGallery.galleryLoadHandler2(this)"  id="<%=widgetid%>"  name="<%=widgetid%>"  />
               <%} else { %>
               <img class="<%=imgSkin%>"     src = "<%=imghimgstrip%>" alt=""   <%if("".equals(widget.map.get(WEBConstants.ENABLED))){%>eventname="<%=widgetid%>.<%=i%>.event_.Khstrip" <%} %>
                    view ="maintainaspectratio"  refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"  
                    <% if(imageCat != null && imageCat.trim().length() != 0) {%>
                     style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> margin-left:<%=image_left_margin%>px; margin-right:<%=imageSpace%>px;"
                    <%}%>
                    <%if (widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
                            prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                    <%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
                            postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>"
                    <%}%>                    
                    konywidgettype = "Khstrip" onload="kony.widgets.ImageGallery.galleryLoadHandler2(this)" id="<%=widgetid%>"  name="<%=widgetid%>"  />
               <% }
                if(event.equals("yes")){%>
                          </a>
                    <%}%>
            <%
            }
        }
        %>
                </div>
            </div>
            <div class= " middlecenteralign kcell" style="width:30px">
               <a class="nextArrowNav <% if(endRecord >= totalRecords){ %>inactive<%}%>"
                    id="<%=widgetid%>" konywidgettype = "Khstrip" eventname="<%=widgetid%>.next.event_.Khstrip"></a>
            </div>
    </div>
    </div>
    </div>
<%} else {%>
    <input  type="hidden" autocomplete="off"  id="<%=widgetid%><%=recPerPage%>" value="<%=recPerPage%>"/>
        <%if(focusedindex == 0)focusedindex++; %>
        <div class ="ktable kwt100" >
            <div class="krow kwt100">          
         <%if(showarrows == true){  %>                  
                <div class =" middlecenteralign kcell" style="width:30px" >
                    <a href="#">
                     <img src="<%=leftarrowimage%>" konywidgettype = "Khstrip" eventname="<%=widgetid%>.prev.event_.Khstrip"/>
                    </a>
                </div>    
                                   
         <%}
         if(focusedindex>1)
         {
        	 pageNo=focusedindex/3;
         }
		 String widgetAlignment = (String)JSWAPUtil.getWidgetAlignmentSkinForPalm(widget);
		 %>
        <div class ="  kcell <%=widgetAlignment%>" style="" >   
        <div id="<%=widgetid%>" konywidgettype="KTouchstrip"
             name="touchcontainer_KTouchstrip" class=""   style="height:auto;width:100%;overflow:hidden;position:relative;"
             pageOnDotImage="<%= widget.map.get(constants.PAGE_ON_DOT_IMAGE)%>" pageOffDotImage="<%=widget.map.get(constants.PAGE_OFF_DOT_IMAGE)%>"
            eventname="<%=widgetid%>.div.event_.Khstrip"
            prejsevent="<%=widget.getTable(constants.PRE_ONCLICK_JS)%>"  postjsevent="<%=widget.getTable(constants.POST_ONCLICK_JS)%>"
         >
        <div id="imgs" recPerPage="<%=recPerPage%>" index="<%=pageNo+1%>"
             style="float:left;display:inline;-webkit-transition-property: -webkit-transform;-webkit-transition-duration: 0.5s;-webkit-transition-timing-function: ease-out;padding:0px;margin:0px;-webkit-transform: translate3d(0px,0px,0px);">         
        <%
        for(int i=0; i >= 0 && i < size; i++)
        {
            objhimgstrip = datahimgstrip.elementAt(i);;
            if(objhimgstrip != null)
            {
                imghimgstrip = (String) objhimgstrip;
                if(!imghimgstrip.startsWith("http"))
                    imghimgstrip = imgpath + imghimgstrip;

                if(i +1 == focusedindex && !("".equals(uiState.getStringValue(widgetRefStr + "." + constants.FOCUSSKIN)))) {
                	imgSkin=uiState.getStringValue(widgetRefStr + "." + constants.FOCUSSKIN);
                } else {
					imgSkin=uiState.getStringValue(widgetRefStr+".skin");
				}
             %>

             <% if(i % recPerPage == 0){
                image_left_margin = imageSpace; %>
                <div      <% if( Math.ceil(i/recPerPage) == pageNo ){ %> style="font-size:0px;display:block;float: left;width:100%" konywidgettype="KTouchhstrip"
                         <% }else{ %>	 style="font-size:0px;display:none;float: left;width:100%" konywidgettype="KTouchhstrip"             	 <%} %>
                 >
             <%} else
                  image_left_margin = 0; %>
                  
               <%if (scaleMode.equals("fittodimensions")) {%>
               <img class="<%=imgSkin%>"     src = "<%=imghimgstrip%>" alt=""   eventname="<%=widgetid%>.<%=i%>.event_.Khstrip"
                    view ="fittodimensions"  refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"       <%=widget.map.get(WEBConstants.ENABLED)%>               
                     style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> margin-left:<%=image_left_margin%>px; margin-right:<%=imageSpace%>px;
                     width:<%=referenceWidth%>px; height:<%=referenceHeight%>px;"     
                    <%if (widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
                            prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                    <%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
                            postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>"
                    <%}%>
                    konywidgettype = "Khstrip" onload="kony.widgets.ImageGallery.galleryLoadHandler2(this)"  id="<%=widgetid%>"  name="<%=widgetid%>"  />
               <%} else { %><img class="<%=imgSkin%>"     src = "<%=imghimgstrip%>" alt=""   eventname="<%=widgetid%>.<%=i%>.event_.Khstrip"
                    view ="maintainaspectratio"  refwidth = "<%=referenceWidth%>" refheight = "<%=referenceHeight%>"     <%=widget.map.get(WEBConstants.ENABLED)%>                
                     style="<%=JSWAPUtil.getWidgetStyleInfo(widget, true)%> margin-left:<%=image_left_margin%>px; margin-right:<%=imageSpace%>px;"
                    <%if (widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil)
                    {%>
                            prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
                    <%}
                    if (widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil)
                    {%>
                            postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>"
                    <%}%>
                    konywidgettype = "Khstrip" onload="kony.widgets.ImageGallery.galleryLoadHandler2(this)" id="<%=widgetid%>" 
                     name="<%=widgetid%>"  /><% }%>
            <% if((i+1) % recPerPage == 0 || i == (size - 1)){ %>
                </div>
            <%} %>
            <%
            }
        } %>
        </div>
        </div>  
        <% if(totalRecords > recPerPage ){%>
            <div class="ktable kwt100 ">
                <div class="krow kwt100 " align="center" >
                    <div class="kcell " >
                        <%
                        for (int i=0, noOfDots=(int)Math.ceil((double)totalRecords/recPerPage); i < noOfDots; i++ ) {
                            if( i == pageNo){
                            %> <img src="<%=imgpath%>whitedot.gif" />  <%
                            }else{
                            %> <img src="<%=imgpath%>blackdot.gif" />  <%
                            }
                        } %>
                    </div>
                </div>
            </div>
        <%}%>  
        </div>
         <%if(showarrows == true){  %>                                   
                <div class =" middlecenteralign kcell" style="width:30px" >
                    <a href="#">
                            <img src="<%=rightarrowimage%>"  konywidgettype = "Khstrip"      eventname="<%=widgetid%>.next.event_.Khstrip"/>
                    </a>
                </div>  
         <%}%>         

        
        </div>
        </div>
        <%
        }
    }
 }
%>
<%}%>