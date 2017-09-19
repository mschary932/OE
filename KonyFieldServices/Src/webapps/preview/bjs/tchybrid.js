konyhybrid = {
     /**
    * Global vars
    */

    handleKonyHybridCallAction: function(response)
    {
        var len1 = response.indexOf("konyhybridcall");
        var len2 = response.indexOf("[---]");
                 
        var txt = response.substring(len1-1, len2) + "/>";
        var xmlDoc;
        if (window.DOMParser)
        {
            var parser=new DOMParser();
            xmlDoc=parser.parseFromString(txt,"text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async="false";
            xmlDoc.loadXML(txt);
        }
        var hybridElement = xmlDoc.getElementsByTagName('konyhybridcall');
        konyhybrid.callnativeplatformjs(hybridElement)
        
    },
    
    callnativeplatformjs: function(hybridElement)
    {
        if(hybridElement){
            var functionName = hybridElement[0].getAttribute('functionName');
            var parameters = hybridElement[0].getAttribute('parameters');
            var hybridformid = hybridElement[0].getAttribute('hybridformid');
            var hybridformType = hybridElement[0].getAttribute('hybridFormType');
            var hybridPlatform = hybridElement[0].getAttribute('hybridPlatform');

           if(parameters  !=null )
            {
                parameters =   eval('(' + parameters + ')');
            }
            
            if(functionName !=null && hybridPlatform == "native")
            {
                internal.executefunctioninnativecontext(functionName,parameters);
            }else if(functionName !=null && hybridPlatform == "spa")
            {
                internal.executefunctioninspacontext(functionName,parameters);
            }   
            else if(hybridformid !=null && hybridformType == "null")
            {
                //Calling native platform js function  
                internal.shownativeform(hybridformid);
            } else if(hybridformid !=null && hybridformType == "1.0")
            {
                //Calling native platform js function
                internal.showspaform(hybridformid);
            } else if(hybridformid !=null && hybridformType == "2.0")
            {
                //Calling native platform js function
                internal.showdynamicform(hybridformid);
                kony.addGlobal(kony.constants.PREVENT_PRE_POST, true);
            }       
        }
    },
       
  showdynamicform: function(formid) {

  	var args=[];
        
        args.push("khybrid=" + "true");
        if(formid)
        {
            args.push("formid=" +  formid);
        }
        var preventprepost = kony.getGlobal(kony.constants.PREVENT_PRE_POST);
        if(preventprepost != null)
        {
            args.push("preventprepost=" +  true);
            kony.removeGlobal(kony.constants.PREVENT_PRE_POST);
        }
        var domElement = new kony.dom.Element();
        var currentForm = domElement.getCurrentForm();
        
        var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);
        var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
        kony.net.ajax.openReq(ajaxConfig, args, null, null, null, null);
 
  },
  
  executefunctionintccontext: function(hybridfunction,hybridparams) {
  	var args=[];
        args.push("khybrid=" + "true");
        if(hybridfunction)
        {
            args.push("hybridfunction=" +  hybridfunction);
        }
        if(hybridparams)
        {
            args.push("hybridparams=" +  hybridparams);
        }
        var domElement = new kony.dom.Element();
        var currentForm = domElement.getCurrentForm();
        var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION);
        var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
        kony.net.ajax.openReq(ajaxConfig, args, null, null, null, null);
 
  }

}