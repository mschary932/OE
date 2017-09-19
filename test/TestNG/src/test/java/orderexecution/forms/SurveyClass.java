package test.java.orderexecution.forms;

import test.common.SgConfiguration;

public class SurveyClass {
	
	public static String Textview() throws Exception{
		  if(SgConfiguration.getInstance().isAndroid()){
		   return "android.widget.TextView";
		  }else{
		   return "XCUIElementTypeStaticText";
		  }
	}

	public static String EditText() throws Exception{
		  if(SgConfiguration.getInstance().isAndroid()){
		   return "android.widget.EditText";
		  }else{
		   return "XCUIElementTypeTextField";
		  }
	}

	public static String RadioGroup() throws Exception{
		  if(SgConfiguration.getInstance().isAndroid()){
		   return "android.widget.RadioGroup";
		  }else{
		   return "XCUIElementTypeSegmentedControl";
		  }
	}
	public static String RadioButton() throws Exception{
		  if(SgConfiguration.getInstance().isAndroid()){
		   return "android.widget.RadioButton";
		  }else{
		   return "XCUIElementTypeButton";
		  }
	}


	public static String CheckedTextView() throws Exception{
		  if(SgConfiguration.getInstance().isAndroid()){
		   return "android.widget.CheckedTextView";
		  }else{
		   return "XCUIElementTypeStaticText";
		  }
	}

	public static String View() throws Exception{
		  if(SgConfiguration.getInstance().isAndroid()){
		   return "android.view.ViewGroup";
		  }else{
		   return "XCUIElementTypeOther";
		  }
	}
	public static String LinearLayout() throws Exception{
		  if(SgConfiguration.getInstance().isAndroid()){
		   return "android.widget.LinearLayout";
		  }else{
		   return "XCUIElementTypeOther";
	      }
	}

	public static String Image() throws Exception {
		if(SgConfiguration.getInstance().isAndroid()){
			return "android.widget.ImageView";
		}else{
			return "XCUIElementTypeImage";
	    }
	}
}