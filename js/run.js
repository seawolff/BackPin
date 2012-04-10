(function ($) 
{
          
    Pin = Backbone.Model.extend({
        //Create a model to hold pin atribute
        name: null,
	      discription: null,
        source: null
    });
 
    Pins = Backbone.Collection.extend({
      //This is our Pins collection and holds our Pin models
      initialize: function (models, options) 
      {
        this.bind("add", options.view.addPinLi);
        //Listen for new additions to the collection and call a view function if so
      }
    });
 
    AppView = Backbone.View.extend({
      el: $("body"),
      initialize: function () 
       {
        this.pins = new Pins( null, { view: this });
        //Create a pins collection when the view is initialized.
        //Pass it a reference to this view to create a connection between the two
      },
      events: {
        "click #add-pin":  "showPrompt",
        "hover .item": "showCaption",
      },
        
      showPrompt: function () {
        var 
          pin_source = prompt("Pin an image: (Please paste image url)"),
          pin_name = prompt("Name your pin"),
		      pin_descrip = prompt("Describe your pin"),
          pin_model = new Pin({ name: pin_name, discription: pin_descrip, source: pin_source });

        //Add a new pin model to our pin collection
        this.pins.add( pin_model );
      },
        
      showCaption: function ()
      {
            //move the image in pixel
            var move = -15;
             
            //zoom percentage, 1.2 =120%
            var zoom = 1.2;
         
            //On mouse over those thumbnail
            $('.item').hover(
			       function() {
                 
                //Set the width and height according to the zoom percentage
                width = $('.item').width() * zoom;
                height = $('.item').height() * zoom;
                 
                //Move and zoom the image
                $(this).find('img').stop(false,true).animate({'width':width, 'height':height, 'top':move, 'left':move}, {duration:200});
                 
                //Display the caption
                $(this).find('div.caption').stop(false,true).fadeIn(200);
            },
            function() {
                //Reset the image
                $(this).find('img').stop(false,true).animate({'width':$('.item').width(), 'height':$('.item').height(), 'top':'0', 'left':'0'}, {duration:100});    
         
                //Hide the caption
                $(this).find('div.caption').stop(false,true).fadeOut(200);
            });
        },
        
      addPinLi: function (model) 
        {
            
            function myCallback(url, answer) 
            {
                alert(url + ': ' + answer);
            }
            
            function IsValidImageUrl(url, callback) 
            {
                var img = new Image();
                img.onerror = function() { 
                    alert("Sorry that is not an image. Please pin a valid image."); 
                }
                    
                img.onload =  function() {             
                    //The parameter passed is a reference to the model that was added
                      $("#pins-list").append("<li class='item'><a href=''><img src='" + model.get('source') + "' alt='title' title='' width='125' height='125' /></a> <div class='caption'> <a href='" + model.get('source') + "'><h2> " + model.get('name') + "</h2> <p>" + model.get('discription') + "</p> </a></div> </li>");
                    //Use .get to receive attributes of the model 
                }
                
                img.src = url
            }
            
            IsValidImageUrl(model.get('source'), myCallback);
            
            
        }
    });
 
var appview = new AppView;
 
})(jQuery);