# 🎯 Trello Task Manager

> Ứng dụng quản lý công việc kiểu Trello hiện đại, được xây dựng với React, Material-UI và dnd-kit

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-6.3-007FFF?logo=mui)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Tính Năng Nổi Bật

### 🎨 **Giao Diện Hiện Đại**
- ✅ Gradient background đẹp mắt với hiệu ứng glass morphism
- ✅ Animations mượt mà và responsive design
- ✅ Dark mode ready với Material-UI theming
- ✅ Hover effects và transitions chuyên nghiệp

### 📋 **Quản Lý Task**
- ✅ **Drag & Drop** - Kéo thả tasks giữa các cột dễ dàng
- ✅ **CRUD Operations** - Tạo, đọc, cập nhật, xóa tasks và columns
- ✅ **Timestamp Tracking** - Lưu thời gian tạo và cập nhật
- ✅ **Labels & Colors** - Gắn nhãn màu cho tasks để phân loại
- ✅ **Column Customization** - Đổi màu cho từng column

### 💾 **Lưu Trữ Dữ Liệu**
- ✅ **LocalStorage Integration** - Tự động lưu dữ liệu, không mất khi refresh
- ✅ **Real-time Updates** - Mọi thay đổi được lưu ngay lập tức
- ✅ **Data Persistence** - Dữ liệu được bảo toàn giữa các phiên làm việc

### 🎯 **Trải Nghiệm Người Dùng**
- ✅ Inline editing cho tasks
- ✅ Confirmation dialogs để tránh xóa nhầm
- ✅ Visual feedback khi kéo thả
- ✅ Responsive design cho mọi thiết bị

## 🚀 Demo Trực Tuyến

**🔗 [Xem Demo Tại Đây](https://your-app-name.vercel.app)** *(Sẽ cập nhật sau khi deploy)*

## 🛠️ Công Nghệ Sử Dụng

| Công nghệ | Mục đích | Phiên bản |
|-----------|----------|-----------|
| **React** | UI Framework | 18.3.1 |
| **Vite** | Build Tool | 6.0.1 |
| **Material-UI** | Component Library | 6.3.0 |
| **@dnd-kit** | Drag & Drop Library | 6.3.1 |
| **LocalStorage API** | Data Persistence | Native |

### 📦 Dependencies Chính

```json
{
  "react": "^18.3.1",
  "@mui/material": "^6.3.0",
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^9.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0"
}
```

## 📥 Cài Đặt & Chạy Dự Án

### Yêu Cầu
- Node.js 18+ 
- npm hoặc yarn

### Bước 1: Clone Repository
```bash
git clone https://github.com/yourusername/trello-task-manager.git
cd trello-task-manager
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
# hoặc
yarn install
```

### Bước 3: Chạy Development Server
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Bước 4: Build Production
```bash
npm run build
# hoặc
yarn build
```

## 🌐 Deploy Lên Vercel

### Cách 1: Deploy Qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Cách 2: Deploy Qua GitHub (Khuyến Nghị)

1. Push code lên GitHub repository
2. Truy cập [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Chọn repository GitHub của bạn
5. Click "Deploy" - Vercel sẽ tự động detect Vite config

**Thời gian deploy:** ~2-3 phút

### Cách 3: Deploy Lên Netlify

```bash
# Build project
npm run build

# Deploy với Netlify CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## 📁 Cấu Trúc Dự Án

```
trelloapp/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── Board.jsx     # Main board với drag & drop logic
│   │   ├── Column.jsx    # Column component với color picker
│   │   ├── TaskCard.jsx  # Task card với labels
│   │   └── Header.jsx    # App header
│   ├── data/
│   │   └── initialData.js # Initial data & label colors
│   ├── App.jsx           # Root component với localStorage
│   └── main.jsx          # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 💡 Cách Sử Dụng

### 1️⃣ Tạo Task Mới
- Click nút "**Thêm Thẻ**" ở cuối mỗi cột
- Task mới sẽ xuất hiện với tên "Nhiệm vụ mới"
- Click icon ✏️ để chỉnh sửa nội dung

### 2️⃣ Thêm Labels Cho Task
- Click icon 🏷️ trên task card
- Chọn màu labels từ menu
- Có thể chọn nhiều labels cho một task

### 3️⃣ Kéo Thả Tasks
- Click và giữ task để kéo
- Thả vào vị trí mong muốn trong cùng cột hoặc cột khác
- Thời gian cập nhật sẽ tự động thay đổi

### 4️⃣ Đổi Màu Column
- Click icon 🎨 trên header của column
- Chọn màu từ bảng màu
- Màu sẽ được áp dụng cho border của column

### 5️⃣ Thêm Column Mới
- Click nút "**Thêm Danh Sách**" bên phải
- Column mới xuất hiện với tên "Danh Sách Mới"

### 6️⃣ Xóa Task/Column
- Click icon 🗑️ để xóa
- Hệ thống sẽ hỏi xác nhận trước khi xóa

## 🎓 Kiến Thức Áp Dụng

### Frontend Skills
- ✅ React Hooks (useState, useEffect)
- ✅ Component Design Patterns
- ✅ Props Drilling & State Management
- ✅ Event Handling & User Interactions
- ✅ Conditional Rendering

### UI/UX Design
- ✅ Material Design Principles
- ✅ Responsive Web Design
- ✅ Color Theory & Visual Hierarchy
- ✅ Animations & Transitions
- ✅ Accessibility Best Practices

### Data Management
- ✅ LocalStorage API
- ✅ JSON Serialization/Deserialization
- ✅ Data Persistence Strategies
- ✅ CRUD Operations

### Advanced Libraries
- ✅ dnd-kit for Drag & Drop
- ✅ Material-UI Component Library
- ✅ Emotion for CSS-in-JS

## 🔧 Tùy Chỉnh

### Thay Đổi Theme Colors

Chỉnh sửa file `src/App.jsx`:

```jsx
const theme = createTheme({
  palette: {
    primary: { main: '#YOUR_COLOR' },
    secondary: { main: '#YOUR_COLOR' },
  },
})
```

### Thêm Label Colors

Chỉnh sửa file `src/data/initialData.js`:

```javascript
export const labelColors = [
  { id: 'your-id', name: 'Tên Màu', color: '#HEX_CODE' },
  // ... thêm màu khác
]
```

### Thay Đổi Gradient Background

Chỉnh sửa `background` trong `src/App.jsx`:

```jsx
background: 'linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%)'
```

## 🐛 Troubleshooting

### Lỗi: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### LocalStorage không hoạt động
- Kiểm tra browser có bật cookies không
- Thử xóa localStorage: `localStorage.clear()`

### Drag & Drop không hoạt động
- Kiểm tra version của @dnd-kit
- Đảm bảo đã import đúng sensors

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Hãy:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 Roadmap

- [ ] Thêm due date cho tasks
- [ ] Tích hợp Firebase/Supabase
- [ ] Thêm search/filter functionality
- [ ] Export/Import board data
- [ ] Multi-user collaboration
- [ ] Dark mode toggle
- [ ] Task descriptions & comments
- [ ] Keyboard shortcuts
- [ ] Mobile app với React Native

## 📄 License

Dự án này được cấp phép theo giấy phép MIT - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👨‍💻 Tác Giả

**Tên của bạn**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Cảm Ơn

- [React Documentation](https://react.dev/)
- [Material-UI](https://mui.com/)
- [dnd-kit](https://dndkit.com/)
- [Trello](https://trello.com/) - Inspiration

---

⭐ Nếu bạn thấy project này hữu ích, hãy cho 1 star nhé!

**Made with ❤️ by [Your Name]**
