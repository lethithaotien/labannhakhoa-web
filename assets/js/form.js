/**
 * Tệp xử lý biểu mẫu tư vấn: assets/js/form.js
 * Nhiệm vụ: Thu thập dữ liệu form, chống spam, gửi ngầm sang Google Apps Script 
 * và hiển thị thông báo thành công/lỗi trực quan cho khách hàng.
 */
import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('consult-form');
    const statusBox = document.getElementById('form-status');

    // Nếu trang hiện tại không tìm thấy form thì dừng lại
    if (!form || !statusBox) return;

    // 1. Tự động lấy địa chỉ trang web hiện tại và các tham số quảng cáo UTM điền vào ô ẩn
    const fillHiddenTrackingFields = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sourceUrlInput = document.getElementById('source_url');
        if (sourceUrlInput) {
            sourceUrlInput.value = window.location.href;
        }

        const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
        utmFields.forEach((field) => {
            const inputEl = document.getElementById(field);
            if (inputEl && urlParams.has(field)) {
                inputEl.value = urlParams.get(field);
            }
        });
    };

    fillHiddenTrackingFields();

    // 2. Xử lý sự kiện khi khách hàng bấm nút "Gửi Yêu Cầu Tư Vấn"
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Ngăn trình duyệt tải lại trang mặc định

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : 'Gửi Yêu Cầu Tư Vấn';

        // Kiểm tra chống spam (Honeypot): Nếu bot tự điền vào ô ẩn thì dừng lại
        const honeypotInput = form.querySelector('input[name="honeypot"]');
        if (honeypotInput && honeypotInput.value.trim() !== '') {
            return;
        }

        // Cập nhật lại thông tin URL nguồn mới nhất trước khi gửi
        fillHiddenTrackingFields();

        // Lấy các thông tin cơ bản để hiển thị tóm tắt cho khách
        const need = document.getElementById('need')?.value || '';
        const area = document.getElementById('area')?.value || '';
        const phone = document.getElementById('phone')?.value || '';

        // Hiển thị trạng thái "Đang gửi..." và khóa nút bấm tránh khách bấm nhiều lần
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi thông tin...';
        }
        
        statusBox.style.display = 'block';
        statusBox.style.backgroundColor = '#FDF8F0';
        statusBox.style.border = '1px solid #B37D38';
        statusBox.style.color = '#0F2537';
        statusBox.innerHTML = 'Đang kết nối hệ thống, vui lòng đợi trong giây lát...';

        try {
            // Kiểm tra xem đã điền link Google Apps Script trong config.js chưa
            if (!config.formScriptUrl || config.formScriptUrl.trim() === '') {
                throw new Error('Chưa cấu hình đường dẫn formScriptUrl trong tệp config.js');
            }

            // Đóng gói toàn bộ dữ liệu form (dựa vào thuộc tính name="..." trong HTML)
            const formData = new FormData(form);

            // Gửi dữ liệu ngầm sang Google Apps Script bằng phương thức POST
            const response = await fetch(config.formScriptUrl, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.result === 'success') {
                // HIỂN THỊ THÔNG BÁO THÀNH CÔNG CHO KHÁCH HÀNG
                statusBox.style.backgroundColor = '#E6F2F0';
                statusBox.style.border = '1px solid #1F7A78';
                statusBox.style.color = '#0F2537';
                statusBox.innerHTML = `
                    <div style="font-size: 1.05rem; font-weight: bold; margin-bottom: 6px; color: #1F7A78;">
                        ✓ Gửi yêu cầu tư vấn thành công!
                    </div>
                    Cảm ơn bạn đã tin tưởng <strong>La Bàn Nha Khoa</strong>. Chúng tôi đã ghi nhận nhu cầu <strong>"${need}"</strong> tại khu vực <strong>${area}</strong>.<br>
                    Bộ phận chuyên môn sẽ xem xét thông tin và liên hệ lại với bạn qua số điện thoại <strong>${phone}</strong> trong thời gian sớm nhất.<br><br>
                    Nếu cần trao đổi gấp ngay bây giờ, mời bạn nhắn trực tiếp qua: 
                    <a href="${config.zalo}" target="_blank" rel="noopener" style="color:#8B1E24; font-weight:bold; text-decoration:underline;">Zalo ${config.hotline}</a>
                `;

                // Xóa trắng toàn bộ các ô nhập trong form sau khi gửi thành công
                form.reset();
                const otherBox = document.getElementById('other-contact-box');
                if (otherBox) {
                    otherBox.style.display = 'none';
                }
            } else {
                throw new Error(result.error || 'Lỗi phản hồi từ máy chủ Google');
            }
        } catch (error) {
            // Trường hợp mạng lỗi hoặc mất kết nối, hiển thị thông báo hỗ trợ thay thế
            console.error('Lỗi khi gửi biểu mẫu:', error);
            statusBox.style.backgroundColor = '#FDF2F2';
            statusBox.style.border = '1px solid #8B1E24';
            statusBox.style.color = '#8B1E24';
            statusBox.innerHTML = `
                <strong>Thông báo:</strong> Hệ thống kết nối đang tạm gián đoạn. Để được hỗ trợ ngay lập tức, quý khách vui lòng nhắn trực tiếp qua 
                <a href="${config.zalo}" target="_blank" rel="noopener" style="color:#0F2537; font-weight:bold; text-decoration:underline;">Zalo ${config.hotline}</a> 
                hoặc gọi điện trực tiếp số <a href="tel:${config.hotline.replace(/\./g, '')}" style="color:#0F2537; font-weight:bold; text-decoration:underline;">${config.hotline}</a>. Cảm ơn quý khách!
            `;
        } finally {
            // Mở khóa lại nút bấm sau khi hoàn tất quá trình
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        }
    });
});