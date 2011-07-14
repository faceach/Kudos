//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// File:            login.js
// Defines:
// Dependencies:
// Description:     this is the document ready functions for login page
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function($) {

    var Form = function() {

        var hint = function() {
            ZM.Dom.textHint('#input-password', '#input-password-hint', true);
            ZM.Dom.textHint('#input-mail', '#input-mail-hint', true);
        };

        this.init = function() {
            hint();
        };

    };

    ZM.UI.Login = {

        init: function() {

            var form = new Form;
            form.init();

        }

    };

})(jQuery);

// Document Ready.
jQuery(function($) {

	ZM.UI.Login.init();

});
