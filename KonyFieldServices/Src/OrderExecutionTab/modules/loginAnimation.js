    function scrollUpLoginPage(){

         var pageScrollUpAnim = {

		     "100": {
			      "top": "-13%",	 
                  "stepConfig": {
                      "timingFunction": kony.anim.EASE
                    }
               }
		
            };

		 
          frmLoginTabKA.flxMainContKA.animate(
           kony.ui.createAnimation(pageScrollUpAnim), {
                  "delay": 0,
                  "iterationCount": 1,
                  "fillMode": kony.anim.FILL_MODE_FORWARDS,
                  "duration": 0.5
                },  {
                     "animationEnd": function(){}
					}
        ); 

 }

    function scrollDownLoginPage(){

         var pageScrollDownAnim = {

		     "100": {
			      "top": "0%",	 
                  "stepConfig": {
                      "timingFunction": kony.anim.EASE
                    }
               }
		
            };

		 
          frmLoginTabKA.flxMainContKA.animate(
           kony.ui.createAnimation(pageScrollDownAnim), {
                  "delay": 0,
                  "iterationCount": 1,
                  "fillMode": kony.anim.FILL_MODE_FORWARDS,
                  "duration": 0.5
                },  {
                     "animationEnd": function(){}
					}
        ); 

 }