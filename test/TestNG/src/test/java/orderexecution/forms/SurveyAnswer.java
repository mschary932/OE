package test.java.orderexecution.forms;

import java.util.List;







import org.kony.qa.stargate.wrappers.appy.Gestures;
import org.kony.qa.stargate.wrappers.appy.Keyboard;
import org.kony.qa.stargate.wrappers.appy.SgElement;

import test.common.AppElement;
import test.common.ListBox;
import test.common.SgConfiguration;
//import test.java.orderexecution.OrderExecutionWidgetId;
//import test.java.orderexecution.SurveyQuestion;
import test.java.orderexecution.OrderExecutionWidgetId;


public class SurveyAnswer{			
 
 public static void fillAnswer(AppElement anselement, String ansType, String value) throws Exception
 {
	 if(ansType.equalsIgnoreCase("Numric"))
	 {
		 fillEditText(anselement,value);
	 }
	 else if(ansType.equalsIgnoreCase("Text"))
	 {
		 fillTextView(anselement,value);
	 }
	 else if(ansType.equalsIgnoreCase("RadioGroup"))
	 {		 
		 fillRadioButton(anselement,value);
	 }
	 else if (ansType.equalsIgnoreCase("PickList"))
		 fillPickList(anselement,value);
	 else
		 System.out.println("This question cannot be answered");
 }
 
 
 private static void fillEditText(AppElement question,String value) throws Exception
 {
	if(question.getText().equalsIgnoreCase("Answer here"))
	{	
		if(SgConfiguration.getInstance().isIOS())
		{
			question.type(value);
		}else{
			question.click();
			Keyboard.sendKeyEvent(Integer.parseInt(value));
			Keyboard.pressEscape();
		}
    }
 }
 private static void fillTextView(AppElement question,String value) throws Exception
 {
	 if(question.getText().equalsIgnoreCase("Answer here")){
		 question.click();
			if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_lblTextAreaAnswerKA"),2)){
				AppElement txtarea = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_lblTextAreaAnswerKA"));
				txtarea.type(value);
				AppElement btnTextAreaDoneKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnTextAreaDoneKA"));
				btnTextAreaDoneKA.click();
			  }
			}
	 else{
		 if(SgConfiguration.getInstance().isAndroid())
			{
			 fillPickList(question,value);
			}
			
	 }
	 
	 
 }

 private static void fillPickList(AppElement question,String value) throws Exception
 {
	 if(question.getText().equalsIgnoreCase("Select")){
		 question.click();
		 Thread.sleep(2000);		 
		 if(value.equals("1")){
			 if(SgConfiguration.getInstance().isAndroid()){
				 ListBox.selectFromListBox(AppElement.getElementlistByClassName(SurveyClass.CheckedTextView()).get(1).getText());
			 }else{
				 //no logic for selecting default value on iOS.
			 }
		 }else
			 if(SgConfiguration.getInstance().isAndroid()){
				 Gestures.clickByName(value);
			 }else{
				 ListBox.selectFromListBox(value);
				 Thread.sleep(1000);
			 }
	 	 }
}

 
  
private static void fillRadioButton(AppElement question,String value) throws Exception
 {
	List<AppElement> RadioButtons = question.getChildElementsByClassName(SurveyClass.RadioButton());
	if(value.equalsIgnoreCase("Yes"))
		RadioButtons.get(1).click();
	else
		RadioButtons.get(0).click();

	
 }
 public static String chooseDefaultAnswer(String ansType) throws Exception
 {
	 String answer = "invalid";
	 if(ansType.equalsIgnoreCase("Text"))
	    	answer = "SampleText";
	    else if(ansType.equalsIgnoreCase("Numric"))
	    	answer = "10";
	    else if(ansType.equalsIgnoreCase("PickList"))
	    	answer = "1";
	    else if(ansType.equalsIgnoreCase("RadioGroup"))
	    	answer = "Yes";
	 return answer;
 }

}