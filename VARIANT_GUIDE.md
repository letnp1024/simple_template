# Hướng dẫn tạo Variant Template

## Tổng quan

Bạn đã có sẵn cấu trúc để tạo **variant** (biến thể) của template với cùng HTML nhưng màu sắc/theme khác.

## Cấu trúc files

```
scss/
  ├── _variables.scss          # Variables theme chính (Blue/Yellow)
  ├── _variables-variant.scss  # Variables theme variant (Teal/Cyan)
  ├── style.scss               # Main stylesheet
  └── style-variant.scss        # Variant stylesheet

index.html                      # Template chính
index-variant.html              # Template variant (cùng HTML, CSS khác)
```

## Cách sử dụng

### 1. Compile CSS cho variant

```bash
# Compile một lần
npm run compile:sass:variant

# Compile + watch (tự động rebuild khi có thay đổi)
npm run compile:sass:variant:watch
```

### 2. Mở variant template

Mở file `index-variant.html` trong browser. File này:
- Cùng HTML với `index.html`
- Link đến `assets/css/style-variant.css` (thay vì `style.css`)
- Sử dụng màu sắc từ `_variables-variant.scss`

### 3. Tùy chỉnh variant

Chỉnh sửa file `scss/_variables-variant.scss` để thay đổi:
- Màu sắc (primary, secondary, accent, etc.)
- Typography (nếu cần)
- Spacing, shadows, etc.

**Lưu ý**: Chỉ thay đổi **màu sắc** và các biến design tokens. Không thay đổi cấu trúc sections.

## Ví dụ: Tạo variant mới

### Variant 1: Teal/Cyan (đã có sẵn)
```scss
$color-primary: #0d7377;   // Teal
$color-secondary: #14ffec;  // Cyan
```

### Variant 2: Purple/Pink
Tạo file `scss/_variables-variant2.scss`:
```scss
$color-primary: #6a0dad;   // Purple
$color-secondary: #ff69b4; // Pink
```

Tạo `scss/style-variant2.scss`:
```scss
@use 'variables-variant2' as *;
// ... import sections giống style-variant.scss
```

Thêm script vào `package.json`:
```json
"compile:sass:variant2": "sass scss/style-variant2.scss:assets/css/style-variant2.css"
```

## Workflow

1. **Development**: 
   - Chỉnh sửa `_variables-variant.scss`
   - Chạy `npm run compile:sass:variant:watch`
   - Mở `index-variant.html` để xem kết quả

2. **Production**:
   - Chạy `npm run compile:sass:variant` để build CSS
   - Deploy cả `index.html` và `index-variant.html`

## Lưu ý

- **HTML giống nhau**: Cả 2 file HTML có cùng cấu trúc, chỉ khác CSS
- **JavaScript giống nhau**: Cùng file `main.js`, không cần variant riêng
- **Images giống nhau**: Dùng chung folder `images/`
- **Chỉ khác CSS**: Variant chỉ thay đổi màu sắc và design tokens

## Tùy chỉnh nâng cao

Nếu cần thay đổi layout/structure (không chỉ màu sắc), bạn có thể:
1. Tạo file SCSS override riêng: `scss/sections/_hero-variant.scss`
2. Import vào `style-variant.scss` thay vì `_hero.scss`
3. Override các class cần thiết

