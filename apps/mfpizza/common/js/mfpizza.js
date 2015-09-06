// passing location of attthe store

function locateStore()
{
	mapInit(28.9963018, 77.7020387,"map_panel","map_panelbtn","map_canvas","I am here!");
	navigator.geolocation.getCurrentPosition(locSuccess, locError);						
}

function login(obj)
{
	if(obj.id=="facebook")
	{
		FB.login(
				function(response) {
					if (response.authResponse) {
						console.log('Welcome!');
						console.log(response);
						window.location.replace("#homePage");
					} else {
						console.log('User cancelled login or did not fully authorize.');
				}
			},{scope: 'publish_actions'});		
	}
}


/* Login and Signup function*/

function userSignup()
{
	var name = $("#signupName").val();
	var email = $("#signupEmail").val();
	var pwd = $("#signupPassword").val();
	var phone =$("#signupPhone").val();
	
	var invocationData ={
			
			adapter : "user",
			procedure : "procedure3",
			parameters : [email,name,pwd,phone]
			
	};
	
	var options = {	
			onSuccess : signupSuccess,
			onFailure : failure
	};
	
	WL.Client.invokeProcedure(invocationData, options);
	
	function signupSuccess(result)
	{
		console.log(result);
		var count  = result.invocationResult.updateStatementResult.updateCount;
		if(count>=0)
			alert("User Signed Up");
		else
			alert("User Not Signed Up");
	}	
}

function userLogin()
{
	var email = $("#loginId").val();
	var invocationData ={
			
			adapter : "user",
			procedure : "procedure1",
			parameters : [email]
			
	};
	
	var options = {
			
			onSuccess : loginSuccess,
			onFailure : failure
	};
	
	WL.Client.invokeProcedure(invocationData, options);
	
	function loginSuccess(result)
	{
		var length = result.invocationResult.resultSet.length;
		if(length==0)
		{
			alert("No user of this entry found!");
			return;
		}
		var password = $("#loginPassword").val();
		var correctPassword = result.invocationResult.resultSet[0].ctpwd;
		if(password==correctPassword)
		{
			alert("You are logged in");
			window.location.replace("#homePage");
		}
		else
			alert("You have entered wrong password!");
	}	
}

function failure()
{
	alert("Some error occured!");
}

/* New Order */

function newOrder()
{
	var invocationData ={
			adapter : "order",
			procedure : "procedure1",
			parameters:[]
			
	};
	var options = {
			onSuccess:pizzaOrderSuccess,
			onFailure:fail
	};
	
	WL.Client.invokeProcedure(invocationData, options);
	window.location.replace("#pizzaOrderPage");
	
	function pizzaOrderSuccess(result)
	{
		//$("#test").append(pizzaItem("","","","",""));
		console.log(result);
	}
}

// helper for notifying error
function fail()
{
	alert("Some error occurred!");
}

/* Notifications */

function showNotifications()
{
	var invocationData ={
			adapter : "notifications",
			procedure : "procedure1",
			parameters:[]
			
	};
	var options = {
			onSuccess:notificationsSuccess,
			onFailure:fail
	};
	
	WL.Client.invokeProcedure(invocationData, options);
	
	function notificationsSuccess(result)
	{
		var data = '<li data-role="list-divider" data-theme="d">Veg Pizza</li><li onClick="showSingleNotification(this)" id="id1"><a href="#"><img src="http://www.dominos.co.in/files/items/spicy-delight-final-427x298.jpeg" id="id1">Spicy Delight</a></li>';
		$("#notifications").html(data);
		window.location.replace("#notificationsPage");
	}	
}

function showSingleNotification(obj)
{
	var id = obj.id;
	
	var invocationData ={
			adapter : "notifications",
			procedure : "procedure3",
			parameters:[id]
			
	};
	var options = {
			onSuccess:signleNotificationSuccess,
			onFailure:fail
	};
	
	WL.Client.invokeProcedure(invocationData, options);
	
	function singleNotificationSuccess(result)
	{
		//var data = '<li data-role="list-divider" data-theme="d">Veg Pizza</li><li><a href="#"><img src="http://www.dominos.co.in/files/items/spicy-delight-final-427x298.jpeg" id="id1" onClick="showSingleNotification(this)">Spicy Delight</a></li>';
		//$("#notifications").html(data);
		window.location.replace("#notificationsSinglePage");
	}	
}


/* Utility Functions */

function pizzaItem(img,desc,small,medium,large)
{
	var pizza='<div data-role="collapsible-set" data-theme="d" data-content-theme="d" id="test">';
	
	pizza+= '<div data-role="collapsible" data-collapsed-icon="flat-time" data-expanded-icon="flat-cross" data-collapsed="false">';
	
    pizza+='<h3>Section 1</h3>';
    pizza+='<fieldset class="ui-block">';
    pizza+='<img src="images/icon.png" style="margin-left:60px;" class="item-img"/>';
	pizza+='</fieldset>';
	       
	pizza+='<div class="item-desc">';
	pizza+='<p>Spicy Delight Pizza is an exotic pizza which has a combination of Golden Corn, Jalapeno & Red Paprika as toppings</p>';
	pizza+='</div>';  
	        
	pizza+='<fieldset class="ui-block">';
	pizza+='<input type="checkbox" name="radio-choice-a" data-theme="c" id="radio-choice-1-a" value="choice-1"/>'
	pizza+='<label for="radio-choice-1-a">80</label>';                 
	pizza+='</fieldset>';    
	
    pizza+='</div>';
    pizza+='</div>';
    //<div data-role="collapsible" data-collapsed-icon="flat-time" data-expanded-icon="flat-cross" data-collapsed="false"><h3>Section 1</h3><fieldset class="ui-block"><img src="images/icon.png" style="margin-left:60px;" class="item-img"/></fieldset><div class="item-desc"><p>Spicy Delight Pizza is an exotic pizza which has a combination of Golden Corn, Jalapeno & Red Paprika as toppings</p></div><fieldset class="ui-block"><input type="checkbox" name="radio-choice-a" data-theme="c" id="radio-choice-1-a" value="choice-1"/><label for="radio-choice-1-a">80</label></fieldset></div>
    console.log(pizza);
    return pizza;
	
}

function sideOrderItem(img,desc,price)
{
	var side = '';
}



