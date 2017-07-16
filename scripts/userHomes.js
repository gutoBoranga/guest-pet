// model
function findUser() {

  var i = 0;
  var cookie = document.cookie;

  while (i < users.length) {
    if (cookie == users[i].name) {
      return users[i];
    }
    i++;
  }
}

function ListModel() {
    this._list = [];
}

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */
function ListView(model, elements) {


    this.elements = elements;
		this.model = model;
		console.log(elements);
		var _this = this;

    this.logoutButtonClicked = new Event(this);
    this.ownerBoxClicked = new Event(this);
    this.hostBoxClicked = new Event(this);


}

ListView.prototype = {

    setUser: function (user) {
      this.elements.usersHome.text("Residências de " + user.name);
    },

    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {

    		var found = this.model.list;
    		var list = this.elements.list;
    		list.html('');

        if (found.length > 0) {
      		for (var i = 0; i < found.length; i++) {
      			var image = '<img src="../images/guestPetLogo.png" class="profilePicture">';
      			var info = '<p>' + found[i].name + '<br/>' + found[i].adress.city + '<br/>'
             + found[i].currentOccupation + '/' + found[i].capacity + '<br/>'
             + found[i].description + '<br/>' + 'R$' + found[i].value + '/dia </p>';
      			list.append($('<li>' + image + info + '</li>'));
          }
        }

        else {
          list.append($('<li class="searchResult">Nenhuma residência disponíveis</li>'));
        }
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(user, view) {

    var _this = this;

    this.user = user;
    this.view = view;
		this.list = [];

    this.view.setUser(user);

}

ListController.prototype = {

		search: function () {

    var found = [];

    for (var i = 0; i < this.user.homes.length; i++) {
      if (this.user.homes[i].currentOccupation < this.user.homes[i].capacity) { // se tem espaço na casa
        found.push(this.user.homes[i]);
      }
		}

		this.view.model.list = found;
		this.view.rebuildList();
	},

    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    }

};

function userByName(username) {

  for (var i = 0; i<users.length;i++) {
    if (users[i].name == username) {
      return users[i];
    }
  }
}

$(function () {

       var url = document.location;
	     var userName = url.toString().split("=")[1];
       console.log(userName);
       var user = userByName(userName);

				model = new ListModel();
        view = new ListView(model, {
            'usersHome' : $('#title'),
            'list' : $('#list')
        });
        controller = new ListController(user, view);
		controller.search();
    view.show();
});