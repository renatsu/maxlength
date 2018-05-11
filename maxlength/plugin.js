/*
 * CKEditor Maxlength Plugin
 *
 * Adds a character count to the path toolbar of a CKEditor instance
 *
 * @package maxlength
 * @author Renato Corcovia
 * @version 1
 * based on MaxLength from Sage McEnery plugin from : https://divgo.wordpress.com/2013/01/04/ckeditor-maxlength-plugin/
 */
(function () {
    CKEDITOR.plugins.maxlength = {
    };

    var plugin = CKEDITOR.plugins.maxlength;

    function doCharacterCount(evt) {
        var editor = evt.editor;
        var keycode = evt.data.keyCode;
        
        var html = evt.data.html;
        
        console.log(html);
        
        if ($('span#cke_maxlength_' + editor.name).length > 0) { // Check element exists
            setTimeout(function () {
                var charCount = editor.document.getBody().getText().length;
                var wcTarget = $('span#cke_maxlength_' + editor.name);
                

                if (charCount > editor.config.max_length) {
                    wcTarget.css('color', 'red');
                    
                    if(keycode == '1086' || html != undefined)
                    	editor.setData(editor.document.getBody().getText().slice(0, editor.config.max_length));
                    else
                    	editor.execCommand('undo');
                    
                    charCount = editor.config.max_length;
                } else if (charCount == editor.config.max_length) {
                    editor.fire('saveSnapshot');
                    wcTarget.css('color', 'red');
                } else {
                    wcTarget.css('color', 'black');
                };
                
                if (editor.config.max_length > 0) {
                    wcTarget.html("Caracteres: " + charCount + "/" + editor.config.max_length);
                } else {
                    wcTarget.html("Caracteres: " + charCount);
                };
            }, 100);
        }
    }  
    

    /**
    * Adds the plugin to CKEditor
    */
    CKEDITOR.plugins.add('maxlength', {
        init: function (editor) {

            var maxLengthAttr = $("#" + editor.name).attr("maxlength"),
                dataMaxLengthAttr = $("#" + editor.name).attr("data-maxlen");

            if (typeof maxLengthAttr !== typeof undefined && maxLengthAttr !== false) {
                editor.config.max_length = maxLengthAttr;
            } else if (typeof dataMaxLengthAttr !== typeof undefined && dataMaxLengthAttr !== false) {
                editor.config.max_length = dataMaxLengthAttr;
            } else {
                editor.config.max_length = 0;
            };

            setTimeout(function () {
                if (editor.config.max_length > 0) {
                    $(".cke_bottom").append("<div style='padding:5px;'><span  id='cke_maxlength_" + editor.name + "'>Caracteres: " + editor.getData().length + '/' + editor.config.max_length + "</span></div>");
                } else {
                    $(".cke_bottom").append("<div style='padding:5px;'><span  id='cke_maxlength_" + editor.name + "'>Caracteres: " + editor.getData().length + '/' + editor.config.max_length + "</span></div>");
                }
            }, 1000);

           
            editor.on('key', doCharacterCount);
            editor.on('paste', doCharacterCount);
           
        }
    });
})();

// Plugin options
CKEDITOR.config.max_length = 0;