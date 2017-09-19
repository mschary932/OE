package test.java.orderexecution.forms;


import java.util.List;

import test.common.AppElement;
import test.common.SgConfiguration;
public class SurveyQuestion {
	
	String queDesc;
	AppElement ansElement;
	String ansType;
	AppElement questionelement;
	
	
	public SurveyQuestion(AppElement questionelement) throws Exception{
		this.questionelement = questionelement;
		if(SgConfiguration.getInstance().isIOS())
		{
			queDesc = questionelement.getChildElementsByClassName(SurveyClass.Textview()).get(0).getText();
			System.out.println("####queDesc : " + queDesc);
			setAnsTypeAndElementForIOS();
		}else{
			queDesc = questionelement.getChildElementsByClassName(SurveyClass.Textview()).get(0).getText();
			System.out.println("####queDesc : " + queDesc);
			setAnsTypeAndElementForAndroid();
		}
		
		
	}
	
	private void setAnsTypeAndElementForIOS() throws Exception {
		String str = "";
		try{
			AppElement ele = questionelement.getChildElementsByClassName(SurveyClass.View()).get(1);
			str += ele.getText().trim();
		}catch(Exception e){
			System.out.println("Not a Select answer type str:"+str);
		}
		
		if(str.equalsIgnoreCase("Select")){
			ansElement = questionelement.getChildElementsByClassName(SurveyClass.LinearLayout()).get(1);
			ansType = "PickList";
			System.out.println("####ansElement : " + ansElement);
			System.out.println("####ansType: " + ansType);
		}
		else if(questionelement.hasChildElementsByClassName(SurveyClass.EditText())){
			ansElement = questionelement.getChildElementsByClassName(SurveyClass.EditText()).get(0);
			ansType = "Numric";
			System.out.println("####ansElement : " + ansElement);
			System.out.println("####ansType : " + ansType);
		}
		else if(questionelement.hasChildElementsByClassName(SurveyClass.RadioGroup())){
			ansElement = questionelement.getChildElementsByClassName(SurveyClass.RadioGroup()).get(0);
			ansType = "RadioGroup";
			System.out.println("####ansElement : " + ansElement);
			System.out.println("####ansType: " + ansType);
		}
		else if(questionelement.hasChildElementsByClassName(SurveyClass.Textview())){
			ansElement = questionelement.getChildElementsByClassName(SurveyClass.Textview()).get(1);
			ansType = "Text";
			System.out.println("####ansElement : " + ansElement);
			System.out.println("####ansType: " + ansType);
		}
		
	}
	private void setAnsTypeAndElementForAndroid() throws Exception {
		List<AppElement> textLst =  questionelement.getChildElementsByClassName(SurveyClass.Textview());
		String text="";
		if(textLst.size()>1)
			text =textLst.get(1).getText();
		List<AppElement> editLst = questionelement.getChildElementsByClassName(SurveyClass.EditText());
		String editTxt="";
		if(editLst.size()>0){
			editTxt = editLst.get(0).getText();
		}
		
		if(questionelement.hasChildElementsByClassName(SurveyClass.RadioGroup())){
				ansElement = questionelement.getChildElementsByClassName(SurveyClass.RadioGroup()).get(0);
				ansType = "RadioGroup";
				System.out.println("####ansElement : " + ansElement);
				System.out.println("####ansType: " + ansType);
		}
		else if(questionelement.hasChildElementsByClassName(SurveyClass.EditText()) && (editTxt.equalsIgnoreCase("Answer here"))){
			ansElement = questionelement.getChildElementsByClassName(SurveyClass.EditText()).get(0);
			ansType = "Numric";
			System.out.println("####ansElement : " + ansElement);
			System.out.println("####ansType : " + ansType);
		}
		else if(questionelement.hasChildElementsByClassName(SurveyClass.Textview()) && (text.equalsIgnoreCase("answer here"))){
			ansElement = questionelement.getChildElementsByClassName(SurveyClass.Textview()).get(1);
			ansType = "Text";
			System.out.println("####ansElement : " + ansElement);
			System.out.println("####ansType: " + ansType);
		}
		else if(questionelement.hasChildElementsByClassName(SurveyClass.LinearLayout())){
			ansElement = questionelement.getChildElementsByClassName(SurveyClass.Textview()).get(1);
			ansType = "PickList";
			System.out.println("####ansElement : " + ansElement);
			System.out.println("####ansType: " + ansType);
		}
	}
	
	public String getQuestionDesc(){
		return queDesc;				
	}
	public void ansQuestion() throws Exception{
		AppElement.scrollUntilVisible(queDesc);
		SurveyAnswer.fillAnswer(ansElement, ansType, SurveyAnswer.chooseDefaultAnswer(ansType));
	}

	public void ansQuestion(String value) throws Exception{
		AppElement.scrollUntilVisible(queDesc);
		SurveyAnswer.fillAnswer(ansElement, ansType, value);
	}
	
	public boolean isEqual(SurveyQuestion que){
		return queDesc.equals(que.getQuestionDesc());	
	}

}