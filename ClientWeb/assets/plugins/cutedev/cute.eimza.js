(function (window) {

    window.cute = $.extend(window.cute, {
        saveAs: function saveAs(uri, filename) {
            var link = document.createElement('a');
            if (typeof link.download === 'string') {
                link.href = uri;
                link.download = filename;

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
            } else {
                window.open(uri);
            }
        },
        eimza: {
            imzala: function (data, successCallback, errorCallback) {
                var self = this;
                if (!self.installed) {
                    errorCallback("E-imza uygulaması hazır değil.");
                    console.error("E-imza uygulaması hazır değil.");
                    return false;
                }

                var listener = function (e) {
                    if (e.data && e.data.type && e.data.type == "FROM_APP") {
                        var response = e.data.response;
                        if (response.Error) {
                            errorCallback(response);
                        } else if (response.Value) {
                            successCallback(response);

                        } else if (typeof response == "string") {
                            errorCallback(response);
                        } else {
                            errorCallback("Sonuç alınamadı.");
                        }
                        window.removeEventListener("message", listener, false);
                    }
                };

                window.addEventListener("message", listener, false);

                try {
                    window.postMessage({
                        type: "FROM_PAGE",
                        methodName: "imzala",
                        callbackId: "78465416549879",
                        Data: data
                    }, "*");
                } catch (e) {
                    errorCallback(e);
                    console.error(e);
                }
            },
            installed: false,
            init: function (options, successCallback, errorCallback) {
                var self = this;
                self.detectExtension("ehjffgchplohbcbeakpncbgconplfjpg", function (installed) {
                    self.installed = installed;
                    if (!installed) {
                        $(".install-info").show();
                        if (typeof errorCallback == "function")
                            errorCallback(self);
                    } else {
                        $(".imzala").show();
                        if (typeof successCallback == "function")
                            successCallback(self);
                    }
                });
            },
            detectExtension: function detectExtension(extensionId, callback) {
                var img;
                img = new Image();
                img.src = "chrome-extension://" + extensionId + "/img/icon.png";
                img.onload = function () {
                    callback(true);
                };
                img.onerror = function () {
                    callback(false);
                };
            }
        }
    });

    window.cute.eimza.init();


})(window);

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