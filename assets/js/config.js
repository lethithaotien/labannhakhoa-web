/**
 * Tệp cấu hình trung tâm: assets/js/config.js
 * Chứa toàn bộ thông tin liên hệ, mạng xã hội, đường dẫn gửi Form, link AppSheet và mã đo lường.
 */
const config = {
    // 1. Thông tin liên hệ chính
    hotline: "0902.555.556",
    zalo: "https://zalo.me/0902555556",
    whatsapp: "https://wa.me/84902555556",
    messenger: "https://m.me/61595449269266",

    // 2. Kênh mạng xã hội chính thức
    fanpage: "https://www.facebook.com/profile.php?id=61595449269266",
    youtube: "https://www.youtube.com/@labannhakhoa",
    tiktok: "https://www.tiktok.com/@labannhakhoa",

    // 3. Đường dẫn Web App của Google Apps Script (nhận dữ liệu từ Form)
    formScriptUrl: "https://script.google.com/macros/s/AKfycbx0r_6szoZCwoJckL-mOQZ9cc-s04dHivZ3-qWtknKhwrqgALWB5HL9KxZFgrYa0S0B/exec",

    // 4. Đường dẫn Cổng điều phối nội bộ AppSheet (Chỉ nhân viên được cấp quyền mới mở được)
    appsheetUrl: "https://www.appsheet.com/start/c3d687f0-b18c-4a4c-9081-0669ed984385",

    // 5. Mã theo dõi (Chỉ điền khi triển khai quảng cáo thực tế)
    ga4Id: "",
    metaPixelId: ""
};

export default config;