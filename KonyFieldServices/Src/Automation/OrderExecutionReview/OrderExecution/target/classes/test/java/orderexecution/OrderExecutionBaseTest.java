package test.java.orderexecution;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;

import org.codehaus.jettison.json.JSONObject;
import org.kony.qa.stargate.logger.SgLog;
import org.kony.qa.stargate.wrappers.appy.Driver;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;





import test.java.orderexecution.CreateWorkOrders;
import test.common.Alerts;
import test.common.AppBaseTest;
import test.common.AppElement;
import test.common.SgConfiguration;
import test.dataconnector.sapconnector.*;
import test.java.orderexecution.forms.FormLogInKA;

public class OrderExecutionBaseTest extends AppBaseTest{
	SgConfiguration sg = SgConfiguration.getInstance();
	public static SAPDataConnector sapDataConn = null;
	public static JSONServer jsonserver =null;
	public static CreateWorkOrders createWO = null;
	public static DeleteWorkOrders deleteWO = null;
	public static String Filepath= System.getProperty("user.dir")+"\\"+"dataserver"+"\\"+"db"+"\\"; 

	@BeforeClass(alwaysRun = true)
	@Parameters({ "appNamePerClass", "packageNamePerClass",
		"activityNamePerClass", "bundleId" })

	public void beforeClass(
			@Optional("OrderExecution") String appNamePerClass,
			@Optional("com.verticalapps.orderexecution") String packageNamePerClass,
			@Optional(".KonyService") String activityNamePerClass,
			@Optional("com.kony.verticalapps") String bundleId) throws Exception {

		super.beforeClass(sg.getKeyValue("appname"), sg.getKeyValue("apppackage"),
				sg.getKeyValue("launchactivity"),sg.getKeyValue("bundle_id"));
	}

	@BeforeSuite(alwaysRun = true)
	public void beforeSuite() throws Exception {
		super.beforeSuite();
		SgConfiguration sgconfig = SgConfiguration.getInstance();
		sapDataConn = new SAPDataConnector();
		jsonserver = new JSONServer();
		createWO = new CreateWorkOrders();
		deleteWO=new DeleteWorkOrders();
		try
		{
		   if(sgconfig.getKeyValue("connector").equalsIgnoreCase("ECC"))
		   {
		     sapDataConn.getSessionKey(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"), sgconfig.getKeyValue("SKYInstanceURL"));
		     deleteWO.deleteWorkOrders(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"), sgconfig.getKeyValue("SKYInstanceURL"));
		   }
		}
		catch(Exception e)
		{
			System.out.println("In catch block of orderexecutionbasetest delete work orders");
			System.out.println(e.getMessage());
		}
		try
		{
			if(sgconfig.getKeyValue("connector").equalsIgnoreCase("ECC"))
			{
		      createWO.createWorkOrders(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"), sgconfig.getKeyValue("SKYInstanceURL"));
		      System.out.println("WorkOrders Creation Complete");
			}
			else
			{
				createWO.createWorkOrdersCRM(sgconfig.getKeyValue("SKYInstanceURL"));
				System.out.println("WorkOrders Creation Complete");
			}
		}
		catch(Exception e)
		{
			System.out.println("In catch block of orderexecutionbasetest create work orders");
			System.out.println(e.getMessage());
		}
		SgLog.info("Test Suite started");	 
	}
	@BeforeMethod(alwaysRun = true)
	public void beforeMethod(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		super.beforeMethod(method);
		int retry = 4;
		try{
			while(retry>0 &&AppElement.waitForName("Syncing...",2)){
			Thread.sleep(5000);
			retry--;
			}
		}
		catch (Exception e) {
            e.printStackTrace(); }
	}

	@AfterMethod(alwaysRun = true)
	public void afterMethod(ITestResult result) throws Exception {
		super.afterMethod(result);		
		if ((result.getStatus() == ITestResult.FAILURE || result.getStatus() == ITestResult.SKIP)&& !AppBaseTest.skipAllTestsNow ){	    	
			String methodName=result.getMethod().getMethodName();
			if(methodName.equalsIgnoreCase("test_app_login"))
			{
				AppBaseTest.skipAllTestsNow=true;
				return;
			}	    		
			relaunchApp();
			if(!doLogin()){
				AppBaseTest.skipAllTestsNow=true;
			}
		}
	}



	public boolean doLogin() throws Exception{
		try{
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmLoginKA_btnLoginKA"));
			FormLogInKA frmLogin =  new FormLogInKA();
			SgConfiguration sgconfig =SgConfiguration.getInstance();
			frmLogin.typeUserName(sgconfig.getKeyValue("username"));
			frmLogin.typePassword(sgconfig.getKeyValue("password"));
			frmLogin.clickLogin();
			if(SgConfiguration.getInstance().isIOS()){
				try{
					AppElement okBtn=new AppElement(OrderExecutionWidgetId.getWidgetId("OK_Button"));
					Alerts.btnClickLable("OK");
				} catch(Exception e){
					System.out.println("####No popup appeared");
				}				
			}
			else if(SgConfiguration.getInstance().isAndroid()){	
	        	if(Alerts.waitForAlert(200)){
	        		Alerts.acceptAlert();      
	          	   }
	        	Thread.sleep(2000);
	        	if(Alerts.waitForAlert(10)){
	        		Alerts.acceptAlert();      
	      	   	}
	         AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"),10);        	
	        }			
			return AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"),10);
		}
		catch (Exception e) {
            e.printStackTrace(); 
            return false;
        }
	}
	
	public void handleSync() throws Exception{
		int retry = 4;
		try{
			while(retry>0 &&AppElement.waitForName("Syncing...",2)){
			Thread.sleep(5000);
			retry--;
			}
		}
		catch (Exception e) {
            e.printStackTrace(); 
            }
	}
}
