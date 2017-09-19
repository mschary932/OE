<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp" %>

<%
            if (widget.map.get(constants.ONDONE) != null) {
                event = "yes";
            } else {
                event = "";
            }
            
            String mode = "text";
            String keyboardstyle = "default";
            String textfieldtype = "text";
            Boolean  securehidden = false;
            String viewType = (String)widget.map.get(constants.VIEW_TYPE);
            if(widget.map.get(constants.TEXTINPUTMODE) != null)
                mode = (String) widget.map.get(constants.TEXTINPUTMODE);
            
            if(widget.map.get(constants.KEY_BOARD_STYLE) != null)
                keyboardstyle = (String) widget.map.get(constants.KEY_BOARD_STYLE);

            if(JSWAPUtil.getBooleanValue(widget.map.get(constants.SECURETEXTENTRY))) 
                    mode ="P";
             
              if(widget.map.get("isNewTextbox") != null )
             {
                  textfieldtype = JSWAPUtil.getTypeForNewTextBox(keyboardstyle, mode, deviceCategory);
             }
             else
             {
                 textfieldtype = JSWAPUtil.getTypeForTextBox(keyboardstyle, mode, deviceCategory);
             }
            
                
            int maxLength=0;            
            if((widget.map.get(KonyServerWidget.LENGTH) != null))
            {                
                maxLength = JSWAPUtil.getIntValue(widget.map.get(KonyServerWidget.LENGTH));                
            }
            else if(widget.map.get(constants.MAXTEXTLENGTH) != null)
            {                 
                 maxLength = JSWAPUtil.getIntValue(widget.map.get(constants.MAXTEXTLENGTH));             
            }
            
            String name = widget.getWidgetID();
            if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
            {
                name = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + name;
            }
            if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
            {
                name = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + name;
            }
            if(request.getAttribute("tabpaneid") != null)
            {
                 name = frmId +"." +request.getAttribute("tabpaneid")+"."+name;
            }
            String nthcat = (String) session.getAttribute("devicecat");            

%>
<%
        if("searchbox".equals(textfieldtype))
        {
             String srchimg = imgpath + "konysearch.png";
             if(widget.map.get("searchimage") != null)
             {
                 srchimg = imgpath + widget.map.get("searchimage").toString();
             }%>

            <div     class = "kwt100 kheight <%=widget.map.get(KonyServerWidget.SKIN)%> kbasemargin kbasepadding "
                style="text-align:left; vertical-align: middle; -webkit-box-sizing: border-box">
            <div class ="kwt10 middleleftalign" style="margin: 6px 0px 0px 5px; background-image:url(<%=srchimg %>); width:16px; height:16px; background-repeat: no-repeat;
                display: inline-block;">
            </div>
        <%}%>
        <input <%if(!(widget.map.get(KonyServerWidget.TEXT) instanceof LuaNil)){%>
        value = "<%=(widget.map.get(KonyServerWidget.TEXT) instanceof String) ? WAPUtilities.escapeHtml((String)widget.map.get(KonyServerWidget.TEXT)) : widget.map.get(KonyServerWidget.TEXT)%>"
        <%} else {%>
        value ="" <%}%>
        konywidgettype="Ktextfield"
        <%
          if("advie".equals(nthcat)) { %>
 			onkeypress="return noenter()"
 		 <% }
        %>
        <%if((request.getAttribute("layout")!= null && request.getAttribute("layout").equals("nonpercent")))                    
        {%>
            style=" <%=JSWAPUtil.getWidgetStyleInfo(widget, false)%>"
        <%}
        else  
        {%>
            style=" <%=JSWAPUtil.getWidgetStyleInfo(widget, true)%>"
        <%}%>
        name="<%=name%>" id="<%=name%>" <%="searchpad".equals(viewType) ? "type='search'" : textfieldtype%>
        <%if(widget.map.get(constants.PRE_ONCLICK_JS) != null && widget.map.get(constants.PRE_ONCLICK_JS) != LuaNil.nil){ %>prejsevent="<%=widget.map.get(constants.PRE_ONCLICK_JS)%>"
        <%} if(widget.map.get(constants.POST_ONCLICK_JS) != null && widget.map.get(constants.POST_ONCLICK_JS) != LuaNil.nil){ %> postjsevent="<%=widget.map.get(constants.POST_ONCLICK_JS)%>" <%}%>
        <%if(widget.map.get(constants.BLOCKED_UI_SKIN)!= null){%> kblockinskin="<%=widget.map.get(constants.BLOCKED_UI_SKIN)%>" <% }%>
        class="<%=widget.map.get(KonyServerWidget.SKIN)%> kheight"  kprogressskin ="<%=widget.map.get(KonyServerWidget.SKIN)%>"        
        <%="yes".equals(event) ? "event=\"yes\"" : "" %>  
        <%=JSWAPUtil.getBooleanValue(widget.map.get(constants.AUTO_CORRECT)) ? "autocorrect=\"on\"" : "autocorrect=\"off\"" %>  
        <%=JSWAPUtil.getBooleanValue(widget.map.get(constants.AUTO_COMPLETE)) ? "autocomplete=\"on\"" : "autocomplete=\"off\"" %>  
        <%=JSWAPUtil.getBooleanValue(widget.map.get(constants.AUTO_CAPITALIZE)) ? "autocapitalize=\"on\"" : "autocapitalize=\"off\"" %>        

        <%if(widget.map.get(constants.ON_BEGIN_EDITING) != null && widget.map.get(constants.ON_BEGIN_EDITING) != LuaNil.nil){ %> onbeginediting="<%=widget.map.get(constants.ON_BEGIN_EDITING)%>" <%}%>
        <%if(widget.map.get(constants.ON_END_EDITING) != null && widget.map.get(constants.ON_END_EDITING) != LuaNil.nil){ %> onendediting="<%=widget.map.get(constants.ON_END_EDITING)%>" <%}%>        
        <%if(widget.map.get(constants.ON_TEXT_CHANGE_JS) != null && widget.map.get(constants.ON_TEXT_CHANGE_JS) != LuaNil.nil){ %> ontextchangejs="<%=widget.map.get(constants.ON_TEXT_CHANGE_JS)%>" <%}%>        
        
        <%if(widget.map.get(constants.PLACE_HOLDER) != null) {%>  
            placeholder="<%=widget.map.get(constants.PLACE_HOLDER)%>"
        <%}     	
        if(maxLength>0){%>
            maxlength="<%=maxLength%>"
        <%}%>
        <%=widget.map.get(WEBConstants.ENABLED) %>    
         <%if(widget.map.get(constants.ON_TEXT_CHANGE) != null){ %> 
            onchangeevent = "yes"
            eventname = "<%=widget.getWidgetID()%>.0.event_.Ktextfield"
            <%} %>
        />        
        <%if("searchbox".equals(textfieldtype))
        {
            String clrimg = imgpath + "konycross.png";
            if(widget.map.get("clearimage") != null)
            {
                clrimg = imgpath + widget.map.get("clearimage").toString();
            }%>
            <input id ="Ksearchbuttontextfield1299027580256693" type ="submit"  konywidgettype = "Kclearbutton" style ="display:none;
               background-image:url(<%=clrimg%>); background-color: transparent; width:24px; height:24px;
               background-repeat: no-repeat; overflow: hidden; border:none; float: right" value ="" event ="yes"
               class="kheight middleleftalign <%=widget.map.get(KonyServerWidget.SKIN)%> kbasemargin kbasepadding"
            />
            </div>
        <%}%>
