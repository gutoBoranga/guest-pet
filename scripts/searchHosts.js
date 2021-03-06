// model

function ListModel(users) {
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
		var _this = this;

    this.listModified = new Event(this);
    this.searchButtonClicked = new Event(this);
    this.detailsButtonClicked = new Event(this);

    // attach listeners to HTML controls
		this.elements.searchButton.click(function () {
				_this.searchButtonClicked.notify();
		});

}

ListView.prototype = {
    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {
    		var found = this.model.list;
    		var list = this.elements.list;
    		list.html('');

        // console.log(found);

        if (found.length > 0) {
      		for (var i = 0; i < found.length; i++) {
      			var image = '<img src="../images/guestPetLogo.png" class="profilePicture">';
      			var info = '<p>' + found[i].name + '<br/>' + found[i].city + '</p>';
            var button = 'id="button' + i + '"';
            // console.log(button);
      			list.append($('<li id="list">' + image + info + '<button type="button" ' + button + ' class="host-details-button">Ver detalhes</button>' + '</li>'));
          }
        } else {
          var place = this.elements.city.val();

          if (place != 'cidade') {
            list.append($('<li class="searchResult">Nenhum host foi encontrado para a sua pesquisa</li>'));
          }
        }
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(users, view) {
    this.users = users;
    this.view = view;
		this.list = [];

    var _this = this;

    this.view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });

    this.view.searchButtonClicked.attach(function () {
        _this.search();
    });

    this.view.detailsButtonClicked.attach(function (sender, args) {
        _this.showDetails(args);
    })
}

ListController.prototype = {

    notifyResults: function () {
      var list = this.view.model.list;

      for (var i = 0; i < list.length; i++) {
        var string = '#button'+i;
        var button = $(string);

        button.click(function (e) {
            view.detailsButtonClicked.notify(e);
        });
      }
    },

    showDetails: function(e) {
      var index = e.currentTarget.id.split('button')[1];

      var userName = this.view.model.list[index].name;

      location.replace("../templates/hostProfile.html?="+userName);
    },


		search: function () {
  		var found = [];
      var _this = this;
      
      getUsersWithAvailableHomesInCity(_this.view.elements.city.val(), function (result) {
        _this.view.model.list = result;
        _this.view.rebuildList();
        _this.notifyResults();
      });
	   },

    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    }
};

$(function () {
  getUsers(function (result) {
    var users = result;
    
    model = new ListModel();
    view = new ListView(model, {
        'searchButton' : $('#searchButton'),
        'city'	:	$('#city'),
        'list' : $('#list'),
    });
    controller = new ListController(users, view);
    // controller.search();
    // view.show();
  });
});
