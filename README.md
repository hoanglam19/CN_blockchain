Trò chơi Đoán Số Blockchain
📌 1. Giới thiệu chung
"Trò chơi đoán số" là một ứng dụng phi tập trung (DApp) cho phép người chơi kết nối ví MetaMask, gửi phỏng đoán về một số bí mật và nhận phần thưởng nếu đoán đúng. Mỗi lượt chơi yêu cầu thanh toán một khoản phí nhỏ (ví dụ 0.01 ETH). Đây là dự án mẫu giúp sinh viên làm quen với Smart Contract, ReactJS, và tích hợp ví điện tử.

🧭 2. Sơ đồ hệ thống & chức năng

[Người dùng]
    ⬇️ Truy cập giao diện web (React)
    ⬇️ Kết nối ví MetaMask
    ⬇️ Gửi số đoán
    ⬇️ Giao tiếp với Smart Contract (Ethereum)
    ⬆️ Nhận kết quả thắng/thua
    ⬆️ (Tuỳ chọn) Hiển thị số bí mật
Chức năng chính:

Kết nối ví MetaMask

Gửi số đoán (từ 0–100)

Kiểm tra kết quả đoán

Nhận thông báo thắng/thua

Xem lại số bí mật

🛠️ 3. Công nghệ & kỹ thuật sử dụng
Thành phần	Mô tả
ReactJS	Tạo giao diện frontend người dùng
Ethers.js	Giao tiếp giữa frontend và smart contract trên blockchain
Solidity	Viết Smart Contract xử lý logic trò chơi
Hardhat	Môi trường phát triển và test Smart Contract
MetaMask	Ví tiền mã hóa để tương tác với blockchain
Ethereum (localhost)	Nền tảng blockchain sử dụng (qua Hardhat)

4. Hướng phát triển
Triển khai contract lên testnet như Sepolia

Lưu lịch sử đoán số

Giới hạn số lượt chơi / ngày

UI đẹp hơn với Tailwind hoặc Bootstrap

5. Ảnh minh họa
   ![image](https://github.com/user-attachments/assets/1b61398d-0b9f-4b4a-b20d-460b772abef9)

