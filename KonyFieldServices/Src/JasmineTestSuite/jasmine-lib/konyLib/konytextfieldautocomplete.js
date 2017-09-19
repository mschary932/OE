

/************************ TEXT FIELD AUTO COMPLETE *******************/


$KW.TextField.AutoComplete = {
    /**
    * Global vars
    */
	__AutoCompleteClass : 'autocomplete_base',
    __AutoComplete : new Array(),
    __AutoCompleteElementId : null,

    // Basic UA detection
    isIE : document.all ? true : false,
    isGecko : navigator.userAgent.toLowerCase().indexOf('gecko') != -1,
    isOpera : navigator.userAgent.toLowerCase().indexOf('opera') != -1,

    AutoSuggestOrientation: function(){
        if(this.__AutoCompleteElementId != null) {

                this.AutoComplete_HideAll();
               // AutoComplete_CreateDropdown(__AutoCompleteElementId)
                this.AutoComplete_CreateDropdownZeroSize(this.__AutoCompleteElementId);
                this.AutoComplete_ShowDropdown(this.__AutoCompleteElementId);
                this.AutoComplete_HideAll();
                this.AutoComplete_CreateDropdown(this.__AutoCompleteElementId);
                this.AutoComplete_ShowDropdown(this.__AutoCompleteElementId);
                //AutoComplete_HideAll()
            }
    },
    /**
    * Attachs the autocomplete object to a form element. Sets
    * onkeypress event on the form element.
    *
    * @param string formElement Name of form element to attach to
    * @param array  data        Array of strings of which to use as the autocomplete data
    */
    AutoComplete_Create:function(id, data){
        this.__AutoComplete[id] = {'data':data,
                              'isVisible':false,
                              'element':document.getElementById(id),
                              'dropdown':null,
                              'highlighted':null,
							  'styleclass':this.__AutoCompleteClass};

        this.__AutoComplete[id]['element'].setAttribute(this.__AutoCompleteClass, 'off');
        this.__AutoComplete[id]['element'].onkeydown  = function(e) {return $KW.TextField.AutoComplete.AutoComplete_KeyDown(this.getAttribute('id'), e);}
        this.__AutoComplete[id]['element'].onkeyup    = function(e) {return $KW.TextField.AutoComplete.AutoComplete_KeyUp(this.getAttribute('id'), e);}
        this.__AutoComplete[id]['element'].onkeypress = function(e) {if (!e) e = window.event; if (e.keyCode == 13 || this.isOpera) return false;}
        this.__AutoComplete[id]['element'].ondblclick = function() {$KW.TextField.AutoComplete.AutoComplete_ShowDropdown(this.getAttribute('id'));}
        this.__AutoComplete[id]['element'].onclick    = function(e) {if (!e) e = window.event; e.cancelBubble = true; e.returnValue = false;}

        // Hides the dropdowns when document clicked
        var docClick = function()
        {
           for (id in this.__AutoComplete) {
               $KW.TextField.AutoComplete.AutoComplete_HideDropdown(id);
           }
        }

        if (document.addEventListener) {
            document.addEventListener('click', docClick, false);
        } else if (document.attachEvent) {
            document.attachEvent('onclick', docClick, false);
        }


        // Max number of items shown at once
        if (arguments[2] != null) {
            this.__AutoComplete[id]['maxitems'] = arguments[2];
            this.__AutoComplete[id]['firstItemShowing'] = 0;
            this.__AutoComplete[id]['lastItemShowing']  = arguments[2] - 1;
        }

        this.AutoComplete_CreateDropdown(id);

        // Prevent select dropdowns showing thru
        if (this.isIE) {
            this.__AutoComplete[id]['iframe'] = document.createElement('iframe');
            this.__AutoComplete[id]['iframe'].id = id +'_iframe';
            this.__AutoComplete[id]['iframe'].style.position = 'absolute';
            this.__AutoComplete[id]['iframe'].style.top = '0';
            this.__AutoComplete[id]['iframe'].style.left = '0';
            this.__AutoComplete[id]['iframe'].style.width = '0px';
            this.__AutoComplete[id]['iframe'].style.height = '0px';
            this.__AutoComplete[id]['iframe'].style.zIndex = '98';
            this.__AutoComplete[id]['iframe'].style.visibility = 'hidden';

            this.__AutoComplete[id]['element'].parentNode.insertBefore(this.__AutoComplete[id]['iframe'], this.__AutoComplete[id]['element']);
        }
    },
    /**
    * Creates the dropdown layer
    *
    * @param string id The form elements id. Used to identify the correct dropdown.
    */
    AutoComplete_CreateDropdown:function(id){
        var left  = this.AutoComplete_GetLeft(this.__AutoComplete[id]['element']);
        var top   = this.AutoComplete_GetTop(this.__AutoComplete[id]['element']) + this.__AutoComplete[id]['element'].offsetHeight;
        var width = this.__AutoComplete[id]['element'].offsetWidth;
   //alert(left)
        this.__AutoComplete[id]['dropdown'] = document.createElement('div');
        this.__AutoComplete[id]['dropdown'].className = this.__AutoCompleteClass; // Don't use setAttribute()
		
		this.AutoComplete_RemoveDivs(id);

        this.__AutoComplete[id]['element'].parentNode.insertBefore(this.__AutoComplete[id]['dropdown'], this.__AutoComplete[id]['element']);
		// Position it
        this.__AutoComplete[id]['dropdown'].style.left       = left + 'px';
        this.__AutoComplete[id]['dropdown'].style.top        = top + 'px';
        this.__AutoComplete[id]['dropdown'].style.width      = width + 'px';
        this.__AutoComplete[id]['dropdown'].style.zIndex     = '99';
        this.__AutoComplete[id]['dropdown'].style.visibility = 'hidden';
		
		//override autocomplete styles
		var el = document.getElementById(id);
		if(el.getAttribute('autosuggestskin') != null) {
			this.__AutoComplete[id]['styleclass'] = el.getAttribute('autosuggestskin');
			this.__AutoComplete[id]['dropdown'].className = this.__AutoComplete[id]['styleclass'];
			this.__AutoComplete[id]['dropdown'].style.position='absolute';
			this.__AutoComplete[id]['dropdown'].style.borderStyle='solid';
			this.__AutoComplete[id]['dropdown'].style.borderWidth='1px';
			this.__AutoComplete[id]['dropdown'].style.borderColor='black';
			this.__AutoComplete[id]['dropdown'].style.backgroundColor='white';
			this.__AutoComplete[id]['dropdown'].style.overflow='auto';
			this.__AutoComplete[id]['dropdown'].style.overflowX='hidden';
    
		}
		else
		{
			this.__AutoComplete[id]['dropdown'].style.fontFamily= this.getElementStyle(el,'font-family');
			this.__AutoComplete[id]['dropdown'].style.fontSize= this.getElementStyle(el,'font-size');
			this.__AutoComplete[id]['dropdown'].style.fontStyle= this.getElementStyle(el,'font-style');
			this.__AutoComplete[id]['dropdown'].style.fontWeight= this.getElementStyle(el,'font-weight');
			this.__AutoComplete[id]['dropdown'].style.color= this.getElementStyle(el,'color');
		}
        this.AutoComplete_RemoveDivs(id);

        this.__AutoComplete[id]['element'].parentNode.insertBefore(this.__AutoComplete[id]['dropdown'], this.__AutoComplete[id]['element']);
    },
	
	getElementStyle:function(el,styleProp){				
		var elementstyle = null;
		if (el.currentStyle)
			elementstyle = el.currentStyle[styleProp];
		else if (window.getComputedStyle)
			elementstyle = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
		return elementstyle;
	},
    
    AutoComplete_RemoveDivs : function(id) {
        var autoCompleteParent = document.getElementById(id).parentNode;
        if(this.__AutoComplete[id]) {
            var autoCompleteDivs = document.getElementsByClassName(this.__AutoComplete[id]['styleclass']);
            if(autoCompleteDivs.length>0){
                    for( var i = 0; i< autoCompleteDivs.length;i++){
                            if(autoCompleteDivs[i].nextSibling.id === id)
                                    autoCompleteParent.removeChild(autoCompleteDivs[i]);
                    }
            }
        }
    },
    /* TODO: Need to verify below values are correct or not.*/
    AutoComplete_CreateDropdownZeroSize:function(id){
        // Position it
        this.__AutoComplete[id]['dropdown'].style.left       = '1px';
        this.__AutoComplete[id]['dropdown'].style.top        = '1px';
        this.__AutoComplete[id]['dropdown'].style.width      = '10px';
        this.__AutoComplete[id]['dropdown'].style.zIndex     = '99';
        this.__AutoComplete[id]['dropdown'].style.visibility = 'hidden';
    },
     /**
    * Gets left coord of given element
    *
    * @param object element The element to get the left coord for
    */
    AutoComplete_GetLeft:function(element)
    {
        var curNode = element;
        var left    = 0;

        do {
            left += curNode.offsetLeft;
            curNode = curNode.offsetParent;

        } while(curNode.tagName.toLowerCase() != 'body');

        return left;
    },
    /**
    * Gets top coord of given element
    *
    * @param object element The element to get the top coord for
    */
    AutoComplete_GetTop:function(element)
    {
        var curNode = element;
        var top    = 0;

        do {
            top += curNode.offsetTop;
            curNode = curNode.offsetParent;

        } while(curNode.tagName.toLowerCase() != 'body');

        return top;
    },
    /**
    * Shows the dropdown layer
    *
    * @param string id The form elements id. Used to identify the correct dropdown.
    */
    AutoComplete_ShowDropdown:function(id)
    {
        this.AutoComplete_HideAll();
        this.__AutoCompleteElementId = id;
        var value = this.__AutoComplete[id]['element'].value;
        var toDisplay = new Array();
        var newDiv    = null;
        var text      = null;
        var numItems  = this.__AutoComplete[id]['dropdown'].childNodes.length;

        // Remove all child nodes from dropdown
        while (this.__AutoComplete[id]['dropdown'].childNodes.length > 0) {
            this.__AutoComplete[id]['dropdown'].removeChild(this.__AutoComplete[id]['dropdown'].childNodes[0]);
        }

        // Go thru data searching for matches
        value = value.ltrim().toUpperCase();
        for (i=0; i<this.__AutoComplete[id]['data'].length; ++i) {
            if (this.__AutoComplete[id]['data'][i].toUpperCase().indexOf(value) != -1) {
                toDisplay[toDisplay.length] = this.__AutoComplete[id]['data'][i];
            }
        }

        // No matches?
        if (toDisplay.length == 0) {
            this.AutoComplete_HideDropdown(id);
            return;
        }

        var target =  document.getElementById(id);
        var space = target.getAttribute('suggestionspace');
        if(space)
            space = parseInt(space)/2;

        // Add data to the dropdown layer
        for (i=0; i<toDisplay.length; ++i) {
            newDiv = document.createElement('div');
            newDiv.className = 'autocomplete_item'; // Don't use setAttribute()
            newDiv.setAttribute('id', 'autocomplete_item_' + i);
            newDiv.setAttribute('index', i);
            newDiv.style.zIndex = '99';

             // Scrollbars are on display ?
            if (toDisplay.length > this.__AutoComplete[id]['maxitems'] && navigator.userAgent.indexOf('MSIE') == -1) {
                newDiv.style.width = this.__AutoComplete[id]['element'].offsetWidth - 22 + 'px';
            }

            newDiv.onmouseover = function() {$KW.TextField.AutoComplete.AutoComplete_HighlightItem($KW.TextField.AutoComplete.__AutoComplete[id]['element'].getAttribute('id'), this.getAttribute('index'));};
            newDiv.onclick     = function() {$KW.TextField.AutoComplete.AutoComplete_SetValue($KW.TextField.AutoComplete.__AutoComplete[id]['element'].getAttribute('id')); $KW.TextField.AutoComplete.AutoComplete_RemoveDivs(id);}

            text   = document.createTextNode(toDisplay[i]);
            newDiv.appendChild(text);

            this.AutoComplete_HideAllDropdowns()
            
            if(space){
                    newDiv.style.paddingBottom=space+"px";
                    newDiv.style.paddingTop=space+"px";
            }
            this.__AutoComplete[id]['dropdown'].appendChild(newDiv);
        }


        // Too many items?
        if (toDisplay.length > this.__AutoComplete[id]['maxitems']) {
            this.__AutoComplete[id]['dropdown'].style.height = (this.__AutoComplete[id]['maxitems'] * 15) + 2 + 'px';

        } else {
            this.__AutoComplete[id]['dropdown'].style.height = '';
        }


        /**
        * Set left/top in case of document movement/scroll/window resize etc
        */
        this.__AutoComplete[id]['dropdown'].style.left = this.AutoComplete_GetLeft(this.__AutoComplete[id]['element']) + 'px';
        this.__AutoComplete[id]['dropdown'].style.top  = this.AutoComplete_GetTop(this.__AutoComplete[id]['element']) + this.__AutoComplete[id]['element'].offsetHeight + 'px';


        // Show the iframe for IE
        if (this.isIE) {
            this.__AutoComplete[id]['iframe'].style.top    = this.__AutoComplete[id]['dropdown'].style.top;
            this.__AutoComplete[id]['iframe'].style.left   = this.__AutoComplete[id]['dropdown'].style.left;
            this.__AutoComplete[id]['iframe'].style.width  = this.__AutoComplete[id]['dropdown'].offsetWidth;
            this.__AutoComplete[id]['iframe'].style.height = this.__AutoComplete[id]['dropdown'].offsetHeight;

            this.__AutoComplete[id]['iframe'].style.visibility = 'visible';
        }


        // Show dropdown
        if (!this.__AutoComplete[id]['isVisible']) {
            this.__AutoComplete[id]['dropdown'].style.visibility = 'visible';
            this.__AutoComplete[id]['isVisible'] = true;
        }


        // If now showing less items than before, reset the highlighted value
        if (this.__AutoComplete[id]['dropdown'].childNodes.length != numItems) {
            this.__AutoComplete[id]['highlighted'] = null;
        }
    },
    /**
    * Hides the dropdown layer
    *
    * @param string id The form elements id. Used to identify the correct dropdown.
    */
    AutoComplete_HideDropdown:function(id)
    {
        if (this.__AutoComplete[id]['iframe']) {
            this.__AutoComplete[id]['iframe'].style.visibility = 'hidden';
        }

        if(this.__AutoComplete[id]['dropdown']) {
                this.__AutoComplete[id]['dropdown'].style.visibility = 'hidden';
        }
        this.__AutoComplete[id]['highlighted'] = null;
        this.__AutoComplete[id]['isVisible']   = false;
    },
    /**
    * Hides all dropdowns
    */
    AutoComplete_HideAll:function()
    {
        for (id in this.__AutoComplete) {
            this.AutoComplete_HideDropdown(id);
        }
    },

    AutoComplete_HideAllDropdowns:function(){
        var autocompdivs = document.getElementsByClassName(this.__AutoComplete[id]['styleclass']);
        if(autocompdivs != null) {
            for(var i=0;i<autocompdivs.length;i++) {
                autocompdivs[i].style.visibility = 'hidden';
            }
        }
    },
    /**
    * Highlights a specific item
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    * @param int    index The index of the element in the dropdown to highlight
    */
    AutoComplete_HighlightItem:function(id, index)
    {
        if (this.__AutoComplete[id]['dropdown'].childNodes[index]) {
            for (var i=0; i<this.__AutoComplete[id]['dropdown'].childNodes.length; ++i) {
                if (this.__AutoComplete[id]['dropdown'].childNodes[i].className == 'autocomplete_item_highlighted') {
                    this.__AutoComplete[id]['dropdown'].childNodes[i].className = 'autocomplete_item';
                }
            }

            this.__AutoComplete[id]['dropdown'].childNodes[index].className = 'autocomplete_item_highlighted';
            this.__AutoComplete[id]['highlighted'] = index;
        }
    },
    /**
    * Highlights the menu item with the given index
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    * @param int    index The index of the element in the dropdown to highlight
    */
    AutoComplete_Highlight:function(id, index)
    {
        // Out of bounds checking
        if (index == 1 && this.__AutoComplete[id]['highlighted'] == this.__AutoComplete[id]['dropdown'].childNodes.length - 1) {
            this.__AutoComplete[id]['dropdown'].childNodes[this.__AutoComplete[id]['highlighted']].className = 'autocomplete_item';
            this.__AutoComplete[id]['highlighted'] = null;

        } else if (index == -1 && this.__AutoComplete[id]['highlighted'] == 0) {
            this.__AutoComplete[id]['dropdown'].childNodes[0].className = 'autocomplete_item';
            this.__AutoComplete[id]['highlighted'] = this.__AutoComplete[id]['dropdown'].childNodes.length;
        }

        // Nothing highlighted at the moment
        if (this.__AutoComplete[id]['highlighted'] == null) {
            this.__AutoComplete[id]['dropdown'].childNodes[0].className = 'autocomplete_item_highlighted';
            this.__AutoComplete[id]['highlighted'] = 0;

        } else {
            if (this.__AutoComplete[id]['dropdown'].childNodes[this.__AutoComplete[id]['highlighted']]) {
                this.__AutoComplete[id]['dropdown'].childNodes[this.__AutoComplete[id]['highlighted']].className = 'autocomplete_item';
            }

            var newIndex = this.__AutoComplete[id]['highlighted'] + index;

            if (this.__AutoComplete[id]['dropdown'].childNodes[newIndex]) {
                this.__AutoComplete[id]['dropdown'].childNodes[newIndex].className = 'autocomplete_item_highlighted';

                this.__AutoComplete[id]['highlighted'] = newIndex;
            }
        }
    },


    /**
    * Sets the input to a given value
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    AutoComplete_SetValue:function(id)
    {
        this.__AutoComplete[id]['element'].value = this.__AutoComplete[id]['dropdown'].childNodes[this.__AutoComplete[id]['highlighted']].innerHTML;
    },
    /**
    * Checks if the dropdown needs scrolling
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    AutoComplete_ScrollCheck:function(id)
    {
        // Scroll down, or wrapping around from scroll up
        if (this.__AutoComplete[id]['highlighted'] > this.__AutoComplete[id]['lastItemShowing']) {
            this.__AutoComplete[id]['firstItemShowing'] = this.__AutoComplete[id]['highlighted'] - (this.__AutoComplete[id]['maxitems'] - 1);
            this.__AutoComplete[id]['lastItemShowing']  = this.__AutoComplete[id]['highlighted'];
        }

        // Scroll up, or wrapping around from scroll down
        if (this.__AutoComplete[id]['highlighted'] < this.__AutoComplete[id]['firstItemShowing']) {
            this.__AutoComplete[id]['firstItemShowing'] = this.__AutoComplete[id]['highlighted'];
            this.__AutoComplete[id]['lastItemShowing']  = this.__AutoComplete[id]['highlighted'] + (this.__AutoComplete[id]['maxitems'] - 1);
        }

        this.__AutoComplete[id]['dropdown'].scrollTop = this.__AutoComplete[id]['firstItemShowing'] * 15;
    },


    /**
    * Function which handles the keypress event
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    AutoComplete_KeyDown:function(id)
    {
        // Mozilla
        if (arguments[1] != null) {
            event = arguments[1];
        }

        var keyCode = event.keyCode;

        switch (keyCode) {

            // Return/Enter
            case 13:
                if (this.__AutoComplete[id]['highlighted'] != null) {
                    this.AutoComplete_SetValue(id);
                    this.AutoComplete_HideAllDropdowns();
                }

                /* commented to fix the support ticket #3331. Due to the below code kony ondone event handler associated with KEYDOWN event is not fired.
                 event.returnValue = false;
                 event.cancelBubble = true;
                */
                break;

            // Escape
            case 27:
                this.AutoComplete_HideAllDropdowns();
                event.returnValue = false;
                event.cancelBubble = true;
                break;

            // Up arrow
            case 38:
                if (!this.__AutoComplete[id]['isVisible']) {
                    this.AutoComplete_ShowDropdown(id);
                }

                this.AutoComplete_Highlight(id, -1);
                this.AutoComplete_ScrollCheck(id, -1);
                return false;
                break;

            // Tab
            case 9:
                if (this.__AutoComplete[id]['isVisible']) {
                    this.AutoComplete_HideAllDropdowns();
                }
                return;

            // Down arrow
            case 40:
                if (!this.__AutoComplete[id]['isVisible']) {
                    this.AutoComplete_ShowDropdown(id);
                }

                this.AutoComplete_Highlight(id, 1);
                this.AutoComplete_ScrollCheck(id, 1);
                return false;
                break;
        }
    },
    /**
    * Function which handles the keyup event
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    AutoComplete_KeyUp:function(id)
    {
        // Mozilla
        if (arguments[1] != null) {
            event = arguments[1];
        }

        var keyCode = event.keyCode;

        switch (keyCode) {
            case 13:
                event.returnValue = false;
                event.cancelBubble = true;
                break;

            case 27:
                this.AutoComplete_HideAllDropdowns();
                event.returnValue = false;
                event.cancelBubble = true;
                break;

            case 38:
            case 40:
                return false;
                break;

            default:
                this.AutoComplete_ShowDropdown(id);
                break;
        }
    },

    /**
	
    * Returns whether the dropdown is visible
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    AutoComplete_isVisible:function(id)
    {
        return this__AutoComplete[id]['dropdown'].style.visibility == 'visible';
    }
}