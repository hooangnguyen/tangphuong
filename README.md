# Love Message for Phương 💖

Một website tương tác với hiệu ứng 3D đẹp mắt, hiển thị những lời nhắn yêu thương cho bạn Phương.

## Tính năng ✨

- **Responsive Design**: Hoạt động tốt trên cả desktop và mobile
- **3D Effects**: Hiệu ứng xoay và tương tác 3D
- **Touch Support**: Hỗ trợ cảm ứng trên thiết bị di động
- **Bootstrap Integration**: Sử dụng Bootstrap 5 cho responsive layout
- **Smooth Animations**: Hiệu ứng chuyển động mượt mà

## Cách sử dụng 🚀

### Trên Desktop:
- **Click và kéo**: Xoay scene 3D
- **Scroll chuột**: Phóng to/thu nhỏ

### Trên Mobile:
- **Chạm và kéo**: Xoay scene 3D
- **Pinch to zoom**: Phóng to/thu nhỏ (nếu được hỗ trợ)

## Cấu trúc file 📁

```
web sk/
├── index.html      # File HTML chính với Bootstrap
├── style.css       # CSS tùy chỉnh
├── script.js       # JavaScript cho hiệu ứng 3D
└── README.md       # File hướng dẫn này
```

## Responsive Breakpoints 📱

- **Mobile**: ≤ 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: > 1024px

## Tối ưu hóa cho Mobile 📱

- Giảm số lượng particle và text elements
- Tối ưu hiệu ứng animation
- Hỗ trợ touch events
- Font size responsive
- Giảm độ phức tạp của 3D effects

## Công nghệ sử dụng 🛠️

- **HTML5**
- **CSS3** với 3D transforms
- **JavaScript** ES6+
- **Bootstrap 5** cho responsive design
- **Touch Events API** cho mobile

## Cách chạy 🎯

1. Mở file `index.html` trong trình duyệt web
2. Hoặc sử dụng local server:
   ```bash
   # Sử dụng Python
   python -m http.server 8000
   
   # Sử dụng Node.js
   npx serve .
   ```

## Tùy chỉnh 🎨

### Thay đổi text:
Chỉnh sửa mảng `texts` trong file `script.js`

### Thay đổi màu sắc:
Chỉnh sửa mảng `colors` trong file `script.js`

### Thay đổi hiệu ứng:
Điều chỉnh các thông số trong file `script.js` và `style.css`

## Hỗ trợ trình duyệt 🌐

- Chrome (khuyến nghị)
- Firefox
- Safari
- Edge
- Mobile browsers

## Lưu ý ⚠️

- Cần trình duyệt hỗ trợ CSS3 3D transforms
- Hiệu suất có thể giảm trên thiết bị cũ
- Touch events chỉ hoạt động trên thiết bị có màn hình cảm ứng

---

Made with ❤️ for Phương 