package test.java.orderexecution.forms;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import test.common.Alerts;
import test.common.AppElement;
import test.common.SgConfiguration;
import test.java.orderexecution.OrderExecutionWidgetId;

	public class FormSurveyKA  {
		AppElement flxSection;
		List<SurveySection> sections;
		List<AppElement> UIAScrollViews;
		
		
		public FormSurveyKA() throws Exception{
			
			flxSection=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection"));
			setSections();
			
		}
		
		private void setSections() throws Exception
		{
			sections = new ArrayList<>();		
			flxSection = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection"));
			List<AppElement> flxsections = flxSection.getChildElementsByClassName(SurveyClass.Textview());
			
			if(SgConfiguration.getInstance().isIOS())
			{
				//set section scrollViews for iOS since it will fetch all data from all section but this is not true in android.
				
				AppElement flxAllSections= new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxAllSections"));
				List<AppElement> UIAScrollViews = new ArrayList<>();
				for(int k=0; k!=flxsections.size(); k++){
					flxsections.get(k).click();
					UIAScrollViews = flxAllSections.getChildElementsByClassName("XCUIElementTypeScrollView");
				}
				flxsections.get(0).click();				
				for(int i=0;i<flxsections.size();i++)
				{		
					sections.add(new SurveySection(flxsections.get(i),UIAScrollViews.get(i)));
				}
			}else{
				for(int i=0;i<flxsections.size();i++)
				{		
					sections.add(new SurveySection(flxsections.get(i),null));
				}
			}
			
		}
		
		public List<SurveySection> getSections(){
			return sections;
		}
		
		
		public void fillSurvey() throws Exception{
		
			for(int i=0; i<sections.size();i++){				
				sections.get(i).ansQuestions();	
			}
			
		}
		
		
		public void fillSurveySection(int sectionIndex, List<String> answers) throws Exception{
			
			if(sectionIndex<sections.size()){
				sections.get(sectionIndex).ansQuestions(answers);
			}else{
				throw new Exception("There are only "+sections.size()+" sections in the survey..");
			}
			
			
		}

		public void fillSurvey(HashMap<String, String> answers) throws Exception{
			
			for(int i=0; i<sections.size();i++){				
				sections.get(i).ansQuestions(answers);
				
			}			
		}
		
		public void clickDone() throws Exception{
			AppElement btnDone=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnDoneKA"));
			btnDone.click();			
		}
		public void clickDoneandExit() throws Exception{
			AppElement btnDone=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnDoneKA"));
			btnDone.click();
			if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("OK_Button"),25)){
				Alerts.btnClickLable("OK");
				AppElement btnclose=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnCloseKA"));
				btnclose.click();
				AppElement btnclosealert=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnYes"));
				btnclosealert.click();
			}else if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnConfirmYes")))
			{
				AppElement btnclosealert=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnConfirmYes"));
				btnclosealert.click();
				Thread.sleep(5000);
				AppElement btnSubmitNo=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnSubmitNo"));
				btnSubmitNo.click();				
			}
			
		}
		public void clickCloseButton() throws Exception{
			
			AppElement btnClose = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnCloseKA"));
			btnClose.click();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnYes"));
			AppElement btnCrossOnAlert = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnNo"));
			AppElement btnTickOnAlert = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnYes"));
			btnCrossOnAlert.click();
			btnClose.click();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnYes"));
			btnTickOnAlert.click();
		}
		public void clickDoneForSaveSurvey() throws Exception{
			AppElement btnDone=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnDoneKA"));
			btnDone.click();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnConfirmYes"));
			AppElement btnCrossOnAlert = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnConfirmYes"));
			btnCrossOnAlert.click();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnSubmitNo"));
			AppElement btnSubmissionAlertCloseButton = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnSubmitNo"));
			btnSubmissionAlertCloseButton.click();
		}
  }
	
		



