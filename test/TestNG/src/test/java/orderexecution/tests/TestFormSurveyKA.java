package test.java.orderexecution.tests;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;





import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.Alerts;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormSurveyKA;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.forms.SurveyQuestion;
import test.java.orderexecution.forms.SurveySection;

public class TestFormSurveyKA extends OrderExecutionBaseTest{

	public TestFormSurveyKA(){
		// TODO Auto-generated constructor stub
	}
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_lblHeaderKA"));
		} catch (Exception e) {
			if (ele == null){
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//					frmLoginKA =  new FormLogInKA();//							
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				System.out.println("TestSurveyForm.setupBeforeTest(): Not on the Survey Form");
				FormOrderListKA frmorderlist =new FormOrderListKA();
				frmorderlist.clickWorkorder(OrderState.state);
				FormOrderExecution orderexecution = new FormOrderExecution();
				orderexecution.clickOnRoute();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnHoldKA"));
				AppElement btnStart=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnHoldKA"));
				btnStart.click();	
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection"),240);
			}
				else
				System.out.println("TestMyOrdersList.setupBeforeTest(): Something went worng form");
			}

	}
	
	//Fill custom answers in survey form
	@Test
	public void Surveytest() throws Exception{		
		HashMap<String,String> QA = new HashMap<>();
		QA.put("Gloves used?", "Yes");
		QA.put("Eye Protection used?", "No");
		QA.put("Protective Clothing Used?", "Yes");
		QA.put("Is the area free from protruding nails, splinters, holes and loose boards?", "No");
		QA.put("Observe any abnormalities?", "Nothing");
		QA.put("What is your risk assessment on the work place?", "Totally Safe");
		
		QA.put("Are you trained to fix the issue?", "Yes");
		QA.put("What is the expected duration of job?", "10");
		QA.put("Inspection for hazard completed?", "No");
		QA.put("Information shared with the Customer?", "Yes");
		QA.put("Are you prepared for emergencies?", "No");
		QA.put("Expected process to use?", "Hazard control");
		
		FormSurveyKA frmSurveyKA = new FormSurveyKA();	
		frmSurveyKA.fillSurvey(QA);
	}
	
	//Fill custom answers in survey form
		@Test
		public void test_ansfewquestions() throws Exception{
			SoftAssert sa = new SoftAssert();
			FormSurveyKA frmSurveyKA = new FormSurveyKA();	
			List<SurveySection> sections = frmSurveyKA.getSections();
			List<SurveyQuestion> questions = sections.get(0).getQuestions();
			for(int i=0;i<questions.size();i++){
				if(questions.get(i).getQuestionDesc().equalsIgnoreCase("Gloves used?")||
					questions.get(i).getQuestionDesc().equalsIgnoreCase("Protective Clothing Used?")){
					questions.get(i).ansQuestion();
				}
			}
			frmSurveyKA.clickDone();
			Alerts.validateAlertMsg("Please fill all the mandatory fields");
			Alerts.btnClickLable("OK");
			sa.assertTrue(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection")));
			sa.assertAll();
		}
		
		@Test
		public void test_ansquestions() throws Exception{
			SoftAssert sa = new SoftAssert();
			HashMap<String,String> QA = new HashMap<>();
			QA.put("Gloves used?", "Yes");
			QA.put("Eye Protection used?", "No");
			QA.put("Protective Clothing Used?", "Yes");
			QA.put("Is the area free from protruding nails, splinters, holes and loose boards?", "No");
			QA.put("Observe any abnormalities?", "Nothing");
			QA.put("What is your risk assessment on the work place?", "Totally Safe");
			
			QA.put("Are you trained to fix the issue?", "Yes");
			QA.put("What is the expected duration of job?", "10");
			QA.put("Inspection for hazard completed?", "No");
			QA.put("Information shared with the Customer?", "Yes");
			QA.put("Are you prepared for emergencies?", "No");
			QA.put("Expected process to use?", "Hazard control");
			
			FormSurveyKA frmSurveyKA = new FormSurveyKA();	
			frmSurveyKA.fillSurvey(QA);
			frmSurveyKA.clickDoneandExit();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"),5);
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue.getText(),"Order Execution");
			sa.assertAll();
		}
		
		@AfterClass(alwaysRun=true)
		public void setupAfterClass() throws Exception{
			SoftAssert sa = new SoftAssert();
			try{			
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"),2);
			FormOrderExecution frmOrderExecution=new FormOrderExecution();
			frmOrderExecution.clicknavigatebackOrderLists();
			AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		    sa.assertEquals(lblValue1.getText(),"My Orders");
		    sa.assertAll();	
		}catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
	      }
	    }
	
}
