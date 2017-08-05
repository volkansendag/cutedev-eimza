$(document).ready(function () {
    var $input = $('input[name="file"]').file2Base64(),
        $pin = $('#pin');

    function initForm() {

        $("form").submit(function () {
            var base64 = $input.data("base64");

            if (!base64) {
                $("#response").html("Dosya seçilmemiş.");
            } else {
                $("#response").html("Dosya imzalanıyor...");
                cute.eimza.imzala({
                    base64File: base64,
                    pin: $pin.val(),
                    tip: 0, // 0:BES, 1:EST, 2:XLONG
                    ayar: {
                        ZDServerUrl: "http://zd.kamusm.gov.tr",
                        ZDMusteriNo: "",
                        ZDMusteriParola: "",
                        UploadUrl: "",
                    }
                },
                function (response) {
                    if (response.Error)
                        $("#response").html(response.Message);
                    else {
                        var val = response.Value;
                        if (val.PostResult) {
                            $("#response").html(val.PostResult)
                        } else if (response.Value.signedBase64File) {
                            var url = 'data:' + $input.data("type") + ';base64,' + response.Value.signedBase64File;
                            cute.saveAs(url, $input.data("name") + ".p7s");
                            $("#response").html("Dosya imzalandı.")
                        } else {
                            $("#response").html("Sonuç hatalı.")
                        }
                    }
                    console.log("success", response);
                },
                function (e) {
                    console.log("error", e);
                    $("#response").html("İmzalama başarısız. Ex:" + e.message);
                });

            }
            return false;
        });
    }

    cute.eimza.detectExtension("ehjffgchplohbcbeakpncbgconplfjpg", function (installed) {
        if (!installed) {
            $("#install-info").show();
        } else {
            $("#imzala").show();
            initForm();
        }
    });
});