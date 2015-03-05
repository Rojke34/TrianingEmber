App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource('dogs',function(){
  	this.resource('animal', { path: ':name_raza'})
  })
  this.resource('birds')

});

//Modelo para la plantilla index [por defecto]
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

//Modelo para la plantilla Dogs
App.DogsRoute = Ember.Route.extend({
	model : function(){
		return ['Pastor Aleman', 'Dalmata', 'Doberman', 'Pez', 'Cosmos', 'Universo', 'Cookies'];
	}
});


//Modelo para la plantilla Birds
var birds = ['Canario', 'Tucan', 'Loro', 'pez'];
localStorage.birds = JSON.stringify(birds);
App.BirdsRoute = Ember.Route.extend({
	model : function(){
		return JSON.parse(localStorage.birds)
	}
});

//controlador para la plantilla Birds
App.BirdsController = Ember.Controller.extend({
	isEditing: true,
	caja:  [2,3,4,'string',true],
	fx: function(){
		console.log(this.model)
	},
	actions: {
		add: function(){
			this.model.push('gato')

			this.fx()
		},
		show: function( ){
			this.isEditing = !this.isEditing
		}
	}
});

var apiKey = "9f30af6c000e4b7cf703a471edc86456";
var secreto = "341babc55455cc9e";
var endPoint = "https://api.flickr.com/services/rest/?";

var photoUrl = "https://www.flickr.com/photos/"
//Modelo para la plnatilla animal
App.AnimalRoute = Ember.Route.extend({
	model: function(param){
		var url = "method=flickr.photos.search&api_key="+apiKey+"&tags="+param["name_raza"]+"&safe_search=1&per_page=20";
		console.log(endPoint + url)
		return Ember.$.getJSON(endPoint + url + "&format=json&jsoncallback=?").then(function(data) {	
      var arrayPhotos = data.photos.photo
      for (var i = 0; i < arrayPhotos.length; i ++) {
				arrayPhotos[i].url = "https://farm"+ arrayPhotos[i].farm + ".staticflickr.com/" +arrayPhotos[i].server +"/" + arrayPhotos[i].id+ "_" + arrayPhotos[i].secret + ".jpg"
      }
      return data.photos.photo
      
    });

	}
})

App.AnimalController = Ember.Controller.extend({


})



