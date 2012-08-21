var Shareabouts = Shareabouts || {};

(function(S, $, console) {
  S.SubmissionCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
      this.options = options;
    },

    url: function() {
      var submissionType = this.options.submissionType,
          placeId = this.options.placeModel.id;

      if (!placeId) { throw new Error('Place model id is not defined. You ' +
                                      'must save the Place before saving ' +
                                      'its ' + submissionType + '.'); }

      return '/api/places/' + placeId + '/' + submissionType + '/';
    }
  });

  S.PlaceModel = Backbone.Model.extend({
    initialize: function(attributes, options) {
      this.responseCollection = new S.SubmissionCollection([], {
        placeModel: this,
        submissionType: options.responseType
      });

      this.supportCollection = new S.SubmissionCollection([], {
        placeModel: this,
        submissionType: options.supportType
      });
    }
  });

  S.PlaceCollection = Backbone.Collection.extend({
    url: '/api/places/',
    model: S.PlaceModel,

    initialize: function(models, options) {
      this.options = options;
    },

    add: function(models, options) {
      // Pass the submissionType into each PlaceModel so that it makes its way
      // to the SubmissionCollections
      options = options || {};
      options.responseType = this.options.responseType;
      options.supportType = this.options.supportType;
      return S.PlaceCollection.__super__.add.call(this, models, options);
    }
  });

  S.ActivityCollection = Backbone.Collection.extend({
    url: '/api/activity/'
  });

})(Shareabouts, jQuery, Shareabouts.Util.console);


/*****************************************************************************

CSRF Validation
---------------
Django protects against Cross Site Request Forgeries (CSRF) by default. This
type of attack occurs when a malicious Web site contains a link, a form button
or some javascript that is intended to perform some action on your Web site,
using the credentials of a logged-in user who visits the malicious site in their
browser.

Since the API proxy view sends requests that write data to the Shareabouts
service authenticated as the owner of this dataset, we want to protect the API
view against CSRF. In order to ensure that AJAX POST/PUT/DELETE requests that
are made via jQuery will not be caught by the CSRF protection, we use the
following code. For more information, see:
https://docs.djangoproject.com/en/1.4/ref/contrib/csrf/

*/

jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
