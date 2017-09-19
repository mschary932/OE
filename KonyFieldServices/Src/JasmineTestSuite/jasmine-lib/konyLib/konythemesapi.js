/* 
 * konyThemes.js
 */
$KI.themes =
{
relativePath:true,
	
    setcurrenttheme:function(themeid,successcallback,errorcallback) {
        if(!($KU.inArray($KG["themes"], themeid, true)))
		{
			errorcallback();
			return;		 
	    }
        if(themeid== $KI.themes.getcurrenttheme())
        {
            successcallback(); 
            return;
        }
        try{
            var styleSheetObjs = window.document.styleSheets;
            var styleSheetIndex = $KW.Utils.getKonyStyleSheetIndex(styleSheetObjs);
			
			var hrefStyleCount="";
			var requiredStyleSheet="";
			if(styleSheetIndex==-1 && $KG[$KG["theme"]+'remoteurl'] && $KG["lastStyleSheet"])
			{
				hrefStyleCount=$KG["lastStyleSheet"].lastIndexOf("/");
				if($KG["theme"] && $KG["theme"] !="default"){
					var aplledThemePath = $KG["lastStyleSheet"].substring(0,hrefStyleCount);
                if(aplledThemePath.indexOf($KG["theme"]))
					hrefStyleCount = aplledThemePath.lastIndexOf("/");
				}	
				requiredStyleSheet=$KG["lastStyleSheet"];
			}
			else		
			{
				hrefStyleCount = styleSheetObjs[styleSheetIndex].href.lastIndexOf("/");
				requiredStyleSheet=styleSheetObjs[styleSheetIndex].href;
			}		
			
			var cssFileName = "";
            if(this.relativePath || this.relativePath===undefined)
            {
                this.relativePath=false;
                var relativePath=requiredStyleSheet.substring(0,hrefStyleCount+1);
                $KG["relativepath"] =relativePath;
				cssFileName = requiredStyleSheet.substring(requiredStyleSheet.lastIndexOf("/"),requiredStyleSheet.length);
				$KG["themerelcssfile"]=cssFileName;
            }
            cssFileName = $KG["themerelcssfile"];           
           // var cssFileName = styleSheetObjs[styleSheetIndex].href.substring(hrefStyleCount,styleSheetObjs[styleSheetIndex].href.length);
            var link = document.createElement('link');
            link.type = "text/css";
            link.rel = "stylesheet";        
            var headTag = document.getElementsByTagName("head");

            var req = new XMLHttpRequest();
            if($KG["relativepath"])
              relativePath=$KG["relativepath"];
            var imagecat = $KG["imagecat"];
            //if(!$KU.isiPhone && !$KU.isTablet && imagecat)
          /*  if(!$KU.isiPhone && imagecat.length>1)
            {
                //cssFileName = cssFileName.substring(0, cssFileName.toString().length-7) + imagecat.substring(0, 3) + ".css";
                cssFileName=cssFileName.replace(imagecat.substring(0, imagecat.length-1)+".css","")+imagecat.substring(0, imagecat.length-1)+".css";
            }
            */
        
            var cssFile = relativePath + (themeid == "default" ? "" : themeid ) + cssFileName;
			
            var currentTheme=$KG["theme"];
            if($KG[currentTheme+'remoteurl']) cssFileName=$KG[currentTheme+'remoteurl'];

            $KG[themeid+'remoteurl'] && (cssFile=$KG[themeid+'remoteurl']);
            req.open("GET", cssFile, true);
            req.timeout = 60000;
            
            req.onreadystatechange = function()
			{
				if(this.readyState == 4)
				{					
					if (this.status == 200) 
					{
						for(var i=0;i<headTag[0].childNodes.length;i++)
						{
							if(headTag[0].childNodes[i].nodeName=="LINK")
							{                                  
								if(headTag[0].childNodes[i].getAttribute("href").indexOf(cssFileName)!=-1)
								{
									$KG["lastStyleSheet"] = headTag[0].childNodes[i].href;
									
									var media = headTag[0].childNodes[i].getAttribute("media") || "screen";
									var newLink = document.createElement("link");
									newLink.rel = "stylesheet";
									newLink.type = "text/css";
									newLink.href = cssFile;
									newLink.media = media;
									headTag[0].replaceChild(newLink, headTag[0].childNodes[i]);
									/* To support animation currentStyleSheet should get updated with new theme file once it is loaded. */
                                    var img = document.createElement('img');
                                    img.onerror = function(){
                                        var styleSheetObjs = window.document.styleSheets;
                                        $KG["currentStyleSheet"] = styleSheetObjs[$KW.Utils.getKonyStyleSheetIndex(styleSheetObjs)];
                                            $KG["theme"] = themeid;
                                            successcallback();
                                            req=null;
                                    }
                                    img.src = cssFile;
									break;
								}
							}
						}
					}
					else
					{
						errorcallback();
					}
				}
			};
           
			req.ontimeout = function()
			{
				errorcallback();
			};
					
		   req.send(null);          
				
		}
		catch(e)
		{
			errorcallback();
		}
    }, 
	
    deletetheme:function(theme,successcallback,errorcallback) {
       
        var themeList=$KG["themes"];
        var initialThemeListLength=themeList.length;
        var finalThemeListLength=themeList.length;
        try{		   
            for(var i=0; i<themeList.length; i++)
            { 
                if(themeList[i]==theme)
                    themeList.splice(i,1); 
            } 
            $KG["themes"]=themeList;
			if($KG["theme"] == theme)
			{
				$KI.themes.setcurrenttheme("default",successcallback,errorcallback);
				return;
			}
            finalThemeListLength=themeList.length;
            if(initialThemeListLength-1==finalThemeListLength)			
                successcallback();
            else
                errorcallback();
        }
        catch(e)
        {
             errorcallback();
        }	
    },
        
    isthemepresent:function(theme) {
        return  $KU.inArray($KG["themes"], theme, true);
    },
        
    createtheme:function(url,themeIdentifer,onsuccesscallback,onerrorcallback) {        
            //return true;  
			if(($KU.inArray($KG["themes"], themeIdentifer, true))) 
			{
				onsuccesscallback();
				return;
			}
            try{        
                var req = new XMLHttpRequest();
                var cssFile = url;
                req.open("GET", cssFile, true);
                req.timeout = 60000;
                var headTag = document.getElementsByTagName("head");
                $KG[themeIdentifer+'remoteurl']=url;

                req.onreadystatechange = function()
                {
                    if(this.readyState == 4)
                    {					
                        if (this.status == 200) 
                        {
                            $KG["themes"].push(themeIdentifer);
                            onsuccesscallback();					
							req=null;							
                        }
                        else
                        {
                            onerrorcallback();
                        }
					 
                    }
                };
                req.ontimeout = function()
                {
                    onerrorcallback();
                };
                req.send(null);      
            }
            catch(e)
            {
                onerrorcallback();
            }
        },
        
    allthemes:function() {
        return $KG["themes"];
    },
        
    getcurrentthemedata:function() {
        return true;
    },
    getcurrenttheme:function() {        
        return $KG["theme"];
    },
    packagedthemes:function(list){
        var themeArray = [];
        if(IndexJL==1)themeArray.push(null);
        for(var i=IndexJL; i<(list.length); i++)
        {
            themeArray.push(list[i]);
        }        
        $KG["themes"]=themeArray;
        $KG["theme"]="default";
    }
}
