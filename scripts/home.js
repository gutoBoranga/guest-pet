const OWNER = 0;
const HOST = 1;

function HomeView(elements) {
    this.elements = elements;
    
    this.logoutButtonClicked = new Event(this);
    this.ownerButtonClicked = new Event(this);
    this.hostButtonClicked = new Event(this);
    
    var _this = this;
        
    this.elements.logoutButton.click(function (e) {
        _this.logoutButtonClicked.notify();
    });
    this.elements.ownerButton.click(function (e) {
        _this.ownerButtonClicked.notify();
    });
    this.elements.hostButton.click(function (e) {
        _this.hostButtonClicked.notify();
    });
}

HomeView.prototype = {
  setContent: function (view) {
    this.elements.contentBody.html(view.show());
  }
};

function HomeController(user, view, ownerController, hostController) {
    this.user = user;
    this.view = view;
    this.ownerController = ownerController;
    this.hostController = hostController;
    this.currentMode = OWNER;
    
    var _this = this;
    
    _this.view.logoutButtonClicked.attach(function (sender, args) {
        console.log("will logout");
        _this.logout();
    });
    this.view.ownerButtonClicked.attach(function (sender, args) {
        _this.switchUser(OWNER);
    });
    this.view.hostButtonClicked.attach(function (sender, args) {
        _this.switchUser(HOST);
    });
}

HomeController.prototype = {
  logout: function () {
    console.log("will logout");
  },
  
  switchUser: function (mode) {
    if (mode == OWNER) {
      console.log("Onwer mode");
      this.view.setContent(this.ownerController.view);
    } else {
      console.log("Host mode");
      this.view.setContent(this.hostController.view);
    }
    
  }
};

$(function () {
    var view = new HomeView({
      'logoutButton' : $('#logoutButton'),
      'ownerButton' : $('#ownerButton'),
      'hostButton' : $('#hostButton'),
      'contentBody' : $('#contentBody')
    });
    //just for test:
    var user = users[0];
    
    var ownerView = new OwnerView();
    var ownerController = new OwnerController(ownerView);
    
    var hostView = new HostView();
    var hostController = new HostController(hostView);
    
    var controller = new HomeController(user, view, ownerController, hostController);
});