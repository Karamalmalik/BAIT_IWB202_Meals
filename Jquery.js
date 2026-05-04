$(document).ready(function() {

    // إظهار/إخفاء تفاصيل الوجبات
    $(document).on("change", ".details-checkbox", function() {
        var mealId = $(this).data("id");
        var detailsRow = $(".details-row[data-id='" + mealId + "']");
        
        if ($(this).is(":checked")) {
            if (detailsRow.length) return;
            var d = getMealDetails(mealId);
            if (!d) return;
            $("#row-" + mealId).after(
                '<tr class="details-row" data-id="' + mealId + '">' +
                '<td colspan="5" style="background:#FFF8E1;padding:15px;text-align:right">' +
                '<img src="' + d.image + '" style="width:80px;height:80px;float:left;margin-left:15px;border-radius:10px">' +
                '<b> المطبخ:</b> ' + d.cuisine + '<br>' +
                '<b> التصنيف:</b> ' + d.category + '<br>' +
                '<b> المكونات:</b> ' + d.ingredients +
                '</td>' +
                '</tr>'
            );
        } else {
            detailsRow.remove();
        }
    });

    // متابعة الطلب
    $("#checkout-btn").click(function() {
        $(".meal-check:checked").length ? $("#order-form").slideDown(400) && $(this).hide() : alert(" اختر وجبة");
    });

    // إلغاء الطلب
    $("#cancel-btn").click(function() {
        $("#order-form").slideUp(300);
        $("#checkout-btn").show();
        $("#customer-form")[0].reset();
        $(".error-msg").empty();
    });

    // إرسال الطلب
    $("#customer-form").submit(function(e) {
        e.preventDefault();
        $(".error-msg").empty();
        
        var fullname = $("#fullname").val().trim();
        var nationalId = $("#national-id").val().trim();
        var vdob = $("#vdob").val().trim();
        var mobile = $("#mobile").val().trim();
        var email = $("#email").val().trim();
        
        var isValid = 
            validateArabicName(fullname) &&
            validateNationalID(nationalId) &&
            validateDateOfBirth(vdob) &&
            validateMobile(mobile) &&
            validateEmail(email);
        
        if (!validateArabicName(fullname)) $("#fullname-error").text(" الاسم عربي فقط");
        if (!validateNationalID(nationalId)) $("#national-error").text(" رقم وطني 11 خانة (01-14)");
        if (!validateDateOfBirth(vdob)) $("#vdob-error").text(" صيغة: يوم-شهر-سنة");
        if (!validateMobile(mobile)) $("#mobile-error").text(" يبدأ بـ 093/094/095/096");
        if (!validateEmail(email)) $("#email-error").text(" إيميل غير صحيح");
        
        if (isValid) {
            var prices = [];
            var meals = $(".meal-check:checked").map(function() {
                prices.push(parseInt($(this).data("price")));
                return " " + $(this).data("name") + " : " + parseInt($(this).data("price")).toLocaleString() + " ل.س\n";
            }).get().join("");
            
            var total = prices.reduce((a,b) => a + b, 0);
            var tax = total * 0.05;
            var finalTotal = total + tax;
            
            showOrderMessage(meals, total, tax, finalTotal, {fullname, nationalId, vdob, mobile, email});
            
            localStorage.setItem("orderData", JSON.stringify({
                meals, total, tax, finalTotal, fullname: fullname || "غير مدخل",
                nationalId, vdob: vdob || "غير مدخل", mobile: mobile || "غير مدخل",
                email: email || "غير مدخل", date: new Date().toLocaleString()
            }));
            
            $("#customer-form")[0].reset();
            $("#order-form").slideUp(300);
            $("#checkout-btn").show();
            $(".meal-check, .details-checkbox").prop("checked", false);
            $(".details-row").remove();
        } else alert(" أخطاء في البيانات");
    });

    // تحديث عدد الوجبات
    $(".meal-check").change(function() {
        var count = $(".meal-check:checked").length;
        $("#checkout-btn").text(count ? "متابعة (" + count + ")" : "متابعة");
    });
});