
const videos = [
    { id: "yc0nbEJTDow", title: "Hôi miệng: Nguyên nhân bạn không ngờ đến!" },
    { id: "iq4NSv43WOU", title: "Tạm biệt cao răng! Công nghệ Làm Sạch Kép" },
    { id: "tZ_mZAGN3Kc", title: "Mão răng ảnh hưởng đến sức khỏe nướu như thế nào?" },
    { id: "GdUEGsgPkAo", title: "Nước Bọt: 'Bộ Giáp Vô Hình' Đang Âm Thầm Bảo Vệ Răng Miệng Bạn Mỗi Ngày" },
    { id: "YN8DPAMBgwc", title: "Cẩm nang bọc răng sứ: quy trình chuẩn, chăm sóc đúng, phòng rủi ro" },
    { id: "U0fm8xtrqNE", title: "Mới niềng răng cần biết: 3 việc quan trọng nhất những ngày đầu" }
];

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('video-gallery');
    if (gallery) {
        gallery.innerHTML = ''; // Xóa placeholder
        videos.forEach(vid => {
            const card = document.createElement('div');
            card.className = 'card video-card';
            card.style.padding = '10px';
            
            // Xây dựng Thumbnail và nút Play giả
            card.innerHTML = `
                <div class="video-thumbnail" data-id="${vid.id}" style="position: relative; cursor: pointer; background: #000; border-radius: 8px; overflow: hidden;">
                    <img src="https://img.youtube.com/vi/${vid.id}/hqdefault.jpg" alt="${vid.title}" style="width:100%; display:block; opacity: 0.8; transition: opacity 0.3s;">
                    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); 
                                background:rgba(200,0,0,0.8); color:#fff; width: 50px; height: 50px; 
                                border-radius:50%; display:flex; justify-content:center; align-items:center; font-size: 20px;">
                        ▶
                    </div>
                </div>
                <h4 style="margin-top: 15px; font-size: 1rem; color: var(--navy);">${vid.title}</h4>
            `;
            gallery.appendChild(card);
        });

        // Xử lý sự kiện Lazy-load Iframe khi click
        document.querySelectorAll('.video-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                // Thay thế ảnh thành Iframe thực
                this.innerHTML = `<iframe width="100%" height="220" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 8px;"></iframe>`;
                // Xóa con trỏ pointer để báo hiệu không bấm được nữa
                this.style.cursor = 'default';
            });
        });
    }
});
