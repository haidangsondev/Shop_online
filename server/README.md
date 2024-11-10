# Dự Án Bán Hàng Điện Tử - Backend

## 1. Mô Tả Dự Án

Dự án **Bán Hàng Điện Tử** cung cấp một hệ thống quản lý sản phẩm, người dùng và đơn hàng cho website bán hàng trực tuyến. Dự án bao gồm các tính năng như quản lý người dùng, đăng nhập, đăng ký, quản lý sản phẩm, danh mục sản phẩm, mã giảm giá, đơn hàng, và hỗ trợ thanh toán trực tuyến. Hệ thống được phát triển bằng Node.js và Express cho backend, sử dụng MongoDB làm cơ sở dữ liệu.

## 2. Tính Năng Chính

- **Quản lý người dùng**: Đăng ký, đăng nhập, quản lý thông tin người dùng.
- **Quản lý sản phẩm**: Thêm, chỉnh sửa, xóa sản phẩm.
- **Quản lý bài viết**: Thêm, chỉnh sửa, xóa bài viết.
- **Quản lý danh mục sản phẩm**: Quản lý các danh mục cho sản phẩm.
- **Quản lý danh mục bài viết**: Quản lý các danh mục cho bài viết.
- **Quản lý mã giảm giá**: Tạo, chỉnh sửa, xóa mã giảm giá.
- **Quản lý đơn hàng**: Theo dõi và quản lý các đơn hàng của khách hàng.
- **Xác thực người dùng**: Sử dụng JWT để xác thực và bảo mật.
- **Tích hợp thanh toán**: Hỗ trợ thanh toán thông qua các dịch vụ trực tuyến.

## 3. Kiến Trúc Hệ Thống

Dự án sử dụng mô hình MVC (Model-View-Controller) để tách biệt các phần như sau:

- **Models**: Định nghĩa các schema cho người dùng, sản phẩm, danh mục sản phẩm, bài viết, danh mục bài viết, đơn hàng và mã giảm giá.
- **Views**: Sử dụng JSON để trả về dữ liệu cho client (REST API).
- **Controllers**: Xử lý logic nghiệp vụ như quản lý người dùng, sản phẩm, và đơn hàng.
- **Routes**: Định tuyến các API liên quan đến người dùng, sản phẩm, đơn hàng.
- **Middlewares**: Xử lý xác thực JWT, phân quyền và quản lý lỗi.

## 4. Công Nghệ Sử Dụng

- **Ngôn ngữ lập trình**: Node.js
- **Framework**: Express.js
- **Cơ sở dữ liệu**: MongoDB
- **Thư viện hỗ trợ**:
  - bcrypt (Mã hóa mật khẩu)
  - Cloudinary (Lưu trữ đám mây cho hình ảnh và video)
  - cookie-parser (Phân tích và quản lý cookies)
  - CORS (Hỗ trợ yêu cầu giữa các nguồn gốc khác nhau)
  - dotenv (Quản lý biến môi trường)
  - Express (Framework cho Node.js)
  - express-async-handler (Xử lý lỗi không đồng bộ)
  - JWT (JSON Web Token cho xác thực)
  - MongoDB (Cơ sở dữ liệu NoSQL)
  - Mongoose (ORM cho MongoDB)
  - Multer (Middleware cho việc tải file)
  - multer-storage-cloudinary (Lưu trữ tệp trên Cloudinary)
  - Nodemailer (Gửi email)
  - Slugify (Chuyển đổi chuỗi thành slug)
  - uniqid (Tạo ID ngẫu nhiên duy nhất)

## 5. Hướng Dẫn Cài Đặt

### Các bước để cài đặt và chạy dự án:
1. Clone repository:
   ```bash
   git clone [link repository]
   ```
2. Cài đặt các gói cần thiết:
   ```bash
   npm install
   ```
3. Tạo file `.env` và cấu hình các biến môi trường:
- PORT = 5000
- URL_MONGODB = your_url_mongodb
- URL_SERVER = http://localhost:5000
- URL_CLIENT =  http://localhost:3000
- APP_PASSWORD = your_app_password for email 
- EMAIL_NAME = your_email
- JWT_SECRETKEY = your_jwt_secretkey
- CLOUDINARY_NAME = your_cloudinary_name
- CLOUDINARY_KEY = your_cloudinary_key
- CLOUDINARY_SECRET = your_cloudinary_secret

4. Chạy dự án:
- npm run dev
   ```bash
   "dev": "nodemon index.js"
   ```
5. Truy cập hệ thống qua đường dẫn:
   ```
   http://localhost:5000
   ```
## 6. Kết luận 
Dự án hệ thống bán hàng trực tuyến này cung cấp các tính năng quản lý người dùng, sản phẩm, đơn hàng, và mã giảm giá một cách hiệu quả. Bằng cách tích hợp các công nghệ mạnh mẽ như Node.js, Express, MongoDB, cùng với các thư viện hỗ trợ như JWT cho xác thực và Cloudinary cho quản lý hình ảnh, dự án không chỉ đảm bảo hiệu suất mà còn đáp ứng được yêu cầu bảo mật và tiện lợi cho người dùng.

Trong tương lai, dự án có thể được mở rộng thêm các tính năng như quản lý kho hàng, báo cáo doanh thu, và cải thiện trải nghiệm người dùng với giao diện thân thiện và tương tác hơn. Hệ thống sẽ tiếp tục được tối ưu hóa để phù hợp với quy mô lớn hơn và tăng cường khả năng mở rộng nhằm hỗ trợ nhiều người dùng truy cập cùng lúc, cũng như phát triển thêm các tính năng phân tích dữ liệu để hỗ trợ hoạt động kinh doanh.






