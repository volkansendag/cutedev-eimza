(function ($) {

    $.fn.file2Base64 = function (options) {

        var defaults = {

        };

        var settings = $.extend({}, defaults, options);

        return this.each(function (i, v) {
            $this = $(this);
            $this.change(function (evt) {
                var files = evt.target.files;
                var file = files[0];

                if (files && file) {
                    var reader = new FileReader();

                    reader.onload = function (readerEvt) {
                        var binaryString = readerEvt.target.result;
                        $this.data("base64", btoa(binaryString));
                        $this.data("name", file.name);
                        $this.data("type", file.type);
                    };

                    reader.readAsBinaryString(file);
                }
            })
        });
    }

}(jQuery));