if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Current weather in " + Session.get('currentcity') + " is " + Session.get('temperature') ;
  };

  Template.hello.events({
    'click input': function () {
        fetchWeather();     
    }
  });

  // template data, if any, is available in 'this'
  var fetchWeather = Meteor.call('checkWeather', function(error,results) {
        console.log(results.data.name);
        Session.set('currentcity',results.data.name);
        Session.set('temperature',results.data.main.temp);
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

      Meteor.methods({
       checkWeather: function () {
            this.unblock();
            return Meteor.http.call(
                                    "GET", 
                                    "http://api.openweathermap.org/data/2.5/weather",
                                    {
                                        query: "q=Moscow,ru&units=metric"
                                    }
            );
        }
    }); 


  });
}
