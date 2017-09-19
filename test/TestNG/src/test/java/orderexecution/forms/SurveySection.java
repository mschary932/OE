package test.java.orderexecution.forms;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import test.common.AppElement;
import test.common.SgConfiguration;
import test.java.orderexecution.OrderExecutionWidgetId;

public class SurveySection {
	AppElement surveyButton;
	AppElement flxAllSections;
	AppElement flxSection;
	List<SurveyQuestion> questions ;
	AppElement UIAScrollView;
	
	public SurveySection(AppElement element, AppElement UIAScrollView) throws Exception{
		this.surveyButton = element;
		this.UIAScrollView = UIAScrollView;
		flxSection = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection"));
		flxAllSections= new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxAllSections"));
		questions = null;
	}
	
	private void setQuestionsForAndroid() throws Exception {
		if(questions !=null)
			return;
		questions = new ArrayList<SurveyQuestion>();
		surveyButton.click();		
		
		List<String> queDesclst = new ArrayList<>();
		
		//Setting first element in each array since there should be at least one element in array.
		List<AppElement> viewelements = flxAllSections.getChildElementsByClassName(SurveyClass.View());
		System.out.println("####viewelements:  " + viewelements);
		SurveyQuestion sq = new SurveyQuestion(viewelements.get(1));			
		String queDesc = sq.getQuestionDesc();
		queDesclst.add(queDesc);			
		questions.add(sq);
		System.out.println("######queDesclsttt "+queDesclst);
		//end of adding one element to each array.
		
		int i=1;
		int count = 0;
		for(count =0; count<2; count++){
			i = 1;
			viewelements = flxAllSections.getChildElementsByClassName(SurveyClass.View());
		
			System.out.println("####viewelements:  " + viewelements);
			while(i<viewelements.size()-1){				
				System.out.println("####Questionsections:  " +viewelements.get(i));
				sq = new SurveyQuestion(viewelements.get(i));			
				queDesc = sq.getQuestionDesc();
//				System.out.println("######queDesc "+queDesc);	
				
				if(!queDesclst.contains(queDesc)){
					questions.add(sq);	
					queDesclst.add(queDesc);				
				}
				System.out.println("######queDesclsttt "+queDesclst);	
				i+=3;
										
			}
			flxAllSections.swipeUp();
			Thread.sleep(3000);
		}
			flxAllSections.swipeDown();
			Thread.sleep(3000);	
			flxAllSections.swipeDown();
		}
	private void setQuestionsForIOS() throws Exception {
		if(questions !=null)
			return;
		if(UIAScrollView == null){
			return;
		}
		questions = new ArrayList<SurveyQuestion>();
		surveyButton.click();
		
		
		List<String> queDesclst = new ArrayList<>();
		
		List<AppElement> viewelements1 = UIAScrollView.getChildElementsByClassName(SurveyClass.View());
		List<AppElement> viewelements = new ArrayList<>(); 
		for(int l=0; l<viewelements1.size(); l++){
			String name = viewelements1.get(l).getAttribute("name").toString();
			if((!name.equals("")) && (name.length()>8)){
				String frmName = name.substring(name.length()-7, name.length());
				if(frmName.equalsIgnoreCase("flxQues")){
					viewelements.add(viewelements1.get(l));
					System.out.println("@@@@ "+l+": "+name);
				}
			}
			
		}
		System.out.println("@@@@@"+viewelements);
	
		
		SurveyQuestion sq = new SurveyQuestion(viewelements.get(0));			
		String queDesc = sq.getQuestionDesc();
		queDesclst.add(queDesc);			
		questions.add(sq);
		System.out.println("######queDesclsttt "+queDesclst);
		

		for(int i=0; i<viewelements.size(); i++)
		{
			System.out.println("####Questionsections:  " +viewelements.get(i));
			
			sq = new SurveyQuestion(viewelements.get(i));
			queDesc = sq.getQuestionDesc();
			
			System.out.println("######queDesc "+queDesc);	
				
			if(!queDesclst.contains(queDesc))
			{
				questions.add(sq);	
				queDesclst.add(queDesc);				
			}
			System.out.println("######queDesclsttt "+queDesclst);						
		}

}

	public List<SurveyQuestion> getQuestions() throws Exception{
		if(questions == null){
			if(SgConfiguration.getInstance().isIOS())
			{
				setQuestionsForIOS();
			}else{
				setQuestionsForAndroid();
			}
		}
		
		return questions;
	}
	
	public void ansQuestions() throws Exception{
		
		if(questions == null){
			if(SgConfiguration.getInstance().isIOS())
			{
				setQuestionsForIOS();
			}else{
				setQuestionsForAndroid();
			}
		}
		
		//Process section
		for (SurveyQuestion surveyQuestion : questions) {
			surveyQuestion.ansQuestion();
		}
	}
	
	
	public void ansQuestions(List<String> answers) throws Exception
	{
		
		if(questions == null){
			if(SgConfiguration.getInstance().isIOS())
			{
				setQuestionsForIOS();
			}else{
				setQuestionsForAndroid();
			}
		}
		
		//Process section
		for(int i=0; i<questions.size() && i<answers.size(); i++){
			AppElement.scrollUntilVisible(questions.get(i).getQuestionDesc());
			questions.get(i).ansQuestion(answers.get(i));
		}
		
		if(answers.size()<questions.size())
			System.out.println("INFO# Not all answer provided in the answers list.");
	}	
	
	public void ansQuestions(HashMap<String, String> answers) throws Exception{
		
		if(questions == null){
			if(SgConfiguration.getInstance().isIOS())
			{
				setQuestionsForIOS();
			}else{
				setQuestionsForAndroid();
			}
		}
		//Process section
		for(int i=0; i<questions.size(); i++){
			AppElement.scrollUntilVisible(questions.get(i).getQuestionDesc());
			if(answers.containsKey(questions.get(i).getQuestionDesc()))
					questions.get(i).ansQuestion(answers.get(questions.get(i).getQuestionDesc()));
			else
				System.out.println("There is no answer available for question: "+ questions.get(i).getQuestionDesc());
		}
		
	}	
	
}