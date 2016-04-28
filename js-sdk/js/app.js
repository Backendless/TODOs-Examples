const ENTER_KEY = 13;
const ESC_KEY = 27;

(function () {
	//check if logged user is valid
	Backendless.UserService.isValidLogin(new Backendless.Async(startApp, onLoginNotValid));

	function onLoginNotValid() {
		//if current user login is not valid we need to logout the user and create a new one
		Backendless.UserService.logout(new Backendless.Async(function () {
			//if current user is not exist or is not valid, we need to register and login a new Backendless user
			createAndLoginUser();
		}));
	}

	function createAndLoginUser() {
		//create a new Backendless user
		var user = new Backendless.User();

		// create a random and uniq user email
		var userEmail = user.email = guid() + '@email.com';

		// create a random user password
		var userPass = user.password = guid();

		//register a new user
		Backendless.UserService.register(user, new Backendless.Async(function () {
			//login new created user and keep it logged, event if you refreshed browser page the user stay logged
			Backendless.UserService.login(userEmail, userPass, true, new Backendless.Async(startApp));
		}));
	}

	//just generate random "useremail" and "password" for a new Backendless User
	function guid() {
		return s4() + s4() + s4() + s4() + '-' + (new Date()).getTime();
	}

	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	//main entry point
	function startApp() {
		new AppView();
	}
})();
