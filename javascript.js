
//دالة التحقق  من الاسم 
function validateArabicName(name) {
    if (name === "") return true;
    return /^[آ-ي ]+$/.test(name);
}
//دالة التحقق من صحة الرقم الوطني
function validateNationalID(nationalId) {
    if (nationalId === "") return false;
    if (!/^\d{11}$/.test(nationalId)) return false;
    var firstTwo = nationalId.substring(0, 2);
    var firstTwoNum = parseInt(firstTwo, 10);
    if (firstTwoNum < 1 || firstTwoNum > 14) return false;
    return true;
}
// دالة التحقق من صحة التاريخ 
function validateDateOfBirth(vdob) {
    if (vdob === "") return true;
    return /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(vdob);
}
//دالة التحقق من رقم الجوال
function validateMobile(mobile) {
    if (mobile === "") return true;
    return /^(093|094|095|096)\d{7}$/.test(mobile);
}
//دالة التحقق من الايميل
function validateEmail(email) {
    if (email === "") return true;
    return /.+@.+\..+/.test(email);
}
//دالة حساب السعر مع فرض الضريبة
function calculateTotalWithTax(prices) {
    var total = 0;
    for (var i = 0; i < prices.length; i++) {
        total += prices[i];
    }
    var tax = total * 0.05;
    return {
        total: total,
        tax: tax,
        finalTotal: total + tax
    };
}
// دالة اظهار رسالة فيها معلومات الطلب كاملة ان كانت الحقول مدخلة ام لا 
function showOrderMessage(mealsList, total, tax, finalTotal, customerInfo) {
    var message = "";
    message += "-----------------------------------\n";
    message += "         تفاصيل الطلب \n";
    message += "-----------------------------------\n\n";
    message += " الوجبات المختارة:\n";
    message += "-----------------------------------\n";
    message += mealsList;
    message += "------------------------------------\n";
    message += " المجموع: " + total.toLocaleString() + " ل.س\n";
    message += " الضريبة (5%): " + tax.toLocaleString() + " ل.س\n";
    message += " الإجمالي النهائي: " + finalTotal.toLocaleString() + " ل.س\n";
    message += "-----------------------------------\n\n";
    message += " معلومات الزبون:\n";
    message += "------------------------------------\n";
    message += "الاسم: " + (customerInfo.fullname || "غير مدخل") + "\n";
    message += "الرقم الوطني: " + customerInfo.nationalId + "\n";
    message += "تاريخ الميلاد: " + (customerInfo.vdob || "غير مدخل") + "\n";
    message += "رقم الموبايل: " + (customerInfo.mobile || "غير مدخل") + "\n";
    message += "الإيميل: " + (customerInfo.email || "غير مدخل") + "\n";
    message += "------------------------------------\n";
    message += "     شكراً لزيارتكم -\n";
    message += "------------------------------------";
    
    alert(message);
}

// تفاصيل الوجبات مع إضافة الصور
var mealsDetails = {
    "SF-001": {
        cuisine: "مصري",
        category: "مأكولات بحرية",
        ingredients: "4 سمكات بوري أحمر، ثوم، فلفل أحمر، طماطم، ليمون، بقدونس",
        image: "image/1.png"
    },
    "SF-002": {
        cuisine: "عالمي",
        category: "مقبلات بحرية",
        ingredients: "قريدس طازج، زيت زيتون، ثوم، ليمون، بقدونس، ملح، فلفل",
        image: "image/2.png"
    },
    "SF-003": {
        cuisine: "إيطالي",
        category: "مقبلات",
        ingredients: "كاليماري طازج، دقيق، بيض، بقسماط، صوص تارتار",
        image: "image/3.png"
    },
    "SF-004": {
        cuisine: "لبناني",
        category: "مشاوي بحرية",
        ingredients: "سمك هامور، زيت زيتون، ليمون، ثوم، كزبرة، بهارات",
        image:"image/4.png"
    },
    "SF-005": {
        cuisine: "سوري",
        category: "طواجن",
        ingredients: "فيليه سمك، بطاطا، جزر، فليفلة، بندورة، ثوم",
        image: "image/5.png"
    }
};
//دالة جلب معلومات الوجبة 
function getMealDetails(mealId) {
    return mealsDetails[mealId] || null;
}