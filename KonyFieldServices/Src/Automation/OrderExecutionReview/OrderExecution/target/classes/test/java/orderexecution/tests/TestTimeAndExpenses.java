package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;




import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormAddExpenseItem;
import test.java.orderexecution.forms.FormAddTimeAndExpenses;
import test.java.orderexecution.forms.FormAddTimeItem;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.forms.FormTimeAndExpenses;
import test.java.orderexecution.forms.FormTimeDetailsKA;

 public class TestTimeAndExpenses extends OrderExecutionBaseTest {
	 
	 private FormTimeAndExpenses frmTimeAndExpenses;
	 private FormAddTimeAndExpenses formAddTimeAndExpenses;
	 private FormAddTimeItem formAddTimeItem;
	 private FormAddExpenseItem formAddExpenseItem;
 
	 @BeforeMethod(alwaysRun=true)
     public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
         
         AppElement ele=null;
         try{
             ele=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_BtnTimeKA"));
         }
         catch(Exception e){
                 if(ele==null){
                	 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
							FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
							FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
							FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//							frmLoginKA =  new FormLogInKA();//							
							FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
							AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
							Assert.assertEquals(lblexpect.getText(),"My Orders");					
					}
                  try{
                    if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")){
                    FormOrderListKA formOrderListKA=new FormOrderListKA();
                    formOrderListKA.clickWorkorder(OrderState.state);
                 }
                 }catch(Exception ex){
                                 System.out.println("*****Its not relaunch*****");
                 }
                 FormOrderExecution frmOrderExecution = new FormOrderExecution();
 				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
 				    frmOrderExecution.clickOnRoute();
 					frmOrderExecution.clickStart();
 				 }
                 frmOrderExecution.navigateToTimeExpense();         
                 }
         }
     }
	 
	 @Test
	 public void TestNavigateToAddTimeExpenses() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmTimeAndExpenses=new FormTimeAndExpenses();
		frmTimeAndExpenses.clickTime();
		frmTimeAndExpenses.clickExpense();
		frmTimeAndExpenses.clickBoth();
		frmTimeAndExpenses.navigatetoAddTimeAndExpense();
		formAddTimeAndExpenses=new FormAddTimeAndExpenses();
		formAddTimeAndExpenses.navigateToAddTime();
		formAddTimeItem=new FormAddTimeItem();
		formAddTimeItem.SelectLabour(); 
		formAddTimeItem.selectDate();
		formAddTimeItem.setDuration();
		formAddTimeItem.ClickDone();
		
		frmTimeAndExpenses.navigatetoAddTimeAndExpense();
		formAddTimeAndExpenses=new FormAddTimeAndExpenses();	
		formAddTimeAndExpenses.navigateToAddExpenses();
		formAddExpenseItem = new FormAddExpenseItem();
		formAddExpenseItem.SelectExpense();
		formAddExpenseItem.selectDate();
		formAddExpenseItem.SetAmount();
		formAddExpenseItem.ClickDone();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
	    sa.assertEquals(lblValue1.getText(),"Time & Expense");
	    sa.assertAll();
	   }
  
	@Test
	public void TestNavigateToTimeDetails() throws Exception{
		   SoftAssert sa = new SoftAssert();
		   AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
		   FormTimeAndExpenses frmTimeAndExpenses=new FormTimeAndExpenses();
		   frmTimeAndExpenses.navigateToTimeDetails();
		   String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_lblTaskDetailsKA")).getText();
		   sa.assertEquals(lblValue,"Time details");
		   FormTimeDetailsKA frmTimeDetailsKA = new FormTimeDetailsKA();
		   frmTimeDetailsKA.back();
		   String lblValue1 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA")).getText();
		   sa.assertEquals(lblValue1,"Time & Expense");
		   sa.assertAll();
	}
 
 
 @AfterClass(alwaysRun=true)
 public void setupAfterClass() throws Exception{
	 SoftAssert sa = new SoftAssert();
	 try{
	 FormTimeAndExpenses  formTimeAndExpenses=new FormTimeAndExpenses();
	 formTimeAndExpenses.navigateBack();	
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
	 FormOrderExecution frmOrderExecution=new FormOrderExecution();
	 frmOrderExecution.clicknavigatebackOrderLists();
	 AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	 sa.assertEquals(lblValue1.getText(),"My Orders");
	 sa.assertAll();
	 }
	 catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
   }
 }
 }