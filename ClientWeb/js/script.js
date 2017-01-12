$(document).ready(function () {
    var $input = $('input[name="file"]').file2Base64(),
        $pin = $('#pin');

    function detectExtension(extensionId, callback) {
        var img;
        img = new Image();
        img.src = "chrome-extension://" + extensionId + "/img/icon.png";
        img.onload = function () { callback(true); };
        img.onerror = function () { callback(false); };
    }

    function saveAs(uri, filename) {
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
    }

    function initForm() {

        window.addEventListener("message", function (e) {
            if (e.data && e.data.type && e.data.type == "FROM_APP") {
                var response = e.data.response;
                if (response.Error) {
                    $("#response").html(response.Message);
                } else if (response.Value) {
                    var url = 'data:' + $input.data("type") + ';base64,' + response.Value.signedBase64File;
                    saveAs(url, $input.data("name") + ".p7s");
                    $("#response").html("Dosya imzalandı.");
                } else if (typeof response == "string") {
                    $("#response").html(response);
                } else {
                    $("#response").html("Sonuç alınamadı.");
                }
            }
        }, false);

        $("form").submit(function () {
            var base64 = $input.data("base64");

            if (!base64) {
                $("#response").html("Dosya seçilmemiş.");
            } else {
                $("#response").html("Dosya imzalanıyor...");
                try {
                    window.postMessage({
                        type: "FROM_PAGE",
                        methodName: "imzala",
                        callbackId: "78465416549879",
                        Data: {
                            base64File: base64,
                            pin: $pin.val(),
                        }
                    }, "*");
                } catch (e) {
                    $("#response").html("İmzalama başarısız. Ex:" + e.message);
                    console.log(e);
                }

            }
            return false;
        });
    }

    detectExtension("ehjffgchplohbcbeakpncbgconplfjpg", function (installed) {
        if (!installed) {
            $("#install-info").show();
        } else {
            $("#imzala").show();
            initForm();
        }
    });
});