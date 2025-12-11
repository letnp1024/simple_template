## Flow thực hiện dự án

- **Mục tiêu ngắn hạn**: hoàn thiện một trang `index` tĩnh (HTML/CSS/JS) với đầy đủ các section đã yêu cầu, dùng làm nền để chuyển sang theme WordPress sau này.
- **Mục tiêu dài hạn**: đóng gói thành theme WordPress đạt chuẩn (SEO, ThemeForest), có sẵn asset và cấu trúc để mở rộng CPT/Customizer.

### 1) Chuẩn bị & môi trường
- Kiểm tra/giữ nguyên cấu trúc `assets/`, `scss/`, `images/`, `ts/`.
- Dùng Node/NPM sẵn có (xem `package.json`); cài nếu cần: `npm install`.
- Quy ước: code SCSS chính tại `scss/style.scss`, build ra `assets/css`. JS nhẹ đặt ở `assets/js`.

### 2) Lập dàn trang index (HTML tĩnh)
- Tạo skeleton HTML: wrap toàn trang, container grid (Bootstrap sẵn có).
- Thứ tự section (bắt buộc):  
  `info row` → `head-nav` → `hero` → `about us` → `contact/form` → `product/services list` → `category list` → `news list` → `portfolio list` → `testimonials` → `footer`.
- Mỗi section nên có: heading, mô tả ngắn, CTA nếu hợp lý, placeholder data (để dễ map sang WP Loop sau).
- Áp dụng responsive cơ bản (breakpoint Bootstrap) và thêm animation nhẹ (animate.css/GSAP nếu cần).

### 3) Style & asset
- SCSS: tổ chức biến, mixin ở `scss/components/_mixins.scss`, typography ở `_typography.scss`, button ở `_buttons.scss`; import vào `style.scss`.
- Webfonts/fontawesome đã có trong `assets/vendors`; chỉ import gọn các kiểu dùng.
- Kiểm tra màu và spacing dùng biến để sau này map sang Customizer/ACF dễ dàng.

### 4) Tương tác & hiệu ứng
- Slider/Carousel: dùng Swiper cho hero/portfolio/testimonials nếu cần.
- Scroll/animation: có thể dùng GSAP hoặc animate.css; giữ cấu hình nhẹ, tắt nếu không cần.
- Form contact: chỉ markup và validation front-end đơn giản; chưa cần backend.

### 5) Kiểm tra nhanh
- Responsive ba mốc chính: mobile, tablet, desktop.
- Cross-browser cơ bản (Chrome, Firefox, Safari/Edge).
- Hiệu suất: tránh import thừa, gom CSS/JS cần thiết cho trang đơn.

### 6) Chuẩn bị chuyển sang WordPress (sau khi HTML ổn)
- Tách phần header/footer/section thành block rõ ràng để đưa vào `header.php`, `footer.php`, các template part.
- Định nghĩa region cho: menu (`wp_nav_menu`), logo/site name, hero content, danh sách Services/Products, Categories, News (Loop), Portfolio (CPT), Testimonials (CPT).
- Lên danh sách CPT dự kiến: `service`, `portfolio`, `team`, `testimonial`; xác định field cần (có thể dùng ACF).
- Enqueue: kế hoạch dùng `wp_enqueue_style/script` cho vendor và bundle chính.

### 7) Bàn giao tạm thời
- Cung cấp: `index.html`, `assets` (css/js/images), file hướng dẫn này.
- Ghi chú rõ dependency vendor (Bootstrap, Swiper, GSAP, FontAwesome).

### 8) Bước tiếp theo (WordPress)
- Sinh file `style.css`, `functions.php` (enqueue, menu, sidebar), `header.php`, `footer.php`, `index.php`, `page.php`, `single.php`, `archive.php`, `404.php`.
- Chuẩn SEO: sử dụng thẻ meta cơ bản, cấu trúc heading chuẩn, hỗ trợ featured image, breadcrumbs nếu cần.
- Chuẩn bị demo content và Theme Check sau khi hoàn thiện.

