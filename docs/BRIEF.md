# 💡 BRIEF: PO Management System

**Ngày tạo:** 2026-02-06
**Brainstorm cùng:** User

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT
- Khó khăn trong việc theo dõi đơn hàng đặt (PO) và đơn hàng mua nội bộ (SO).
- Mã hàng Khách (PO) và Mã hàng Nội bộ (SO) khác nhau dễ gây nhầm lẫn.
- Cần theo dõi chính xác số lượng đã giao và còn lại của từng PO.

## 2. GIẢI PHÁP ĐỀ XUẤT
Xây dựng **Web App quản lý PO/SO/Delivery** tập trung vào việc mapping mã hàng và tracking số lượng giao hàng realtime.

## 3. ĐỐI TƯỢNG SỬ DỤNG
- **Duy nhất:** User (Admin/Operation).

## 4. TÍNH NĂNG (MVP Scope)

### 📦 1. Quản lý Đặt hàng (Input)
- **Tạo PO Mới:**
    - Số PO (Khách hàng)
    - Item List: Mã hàng (Khách), Tên hàng, Số lượng đặt.
- **Tạo SO (Mua hàng):**
    - Nhập SO từ phòng mua hàng.
    - **Mapping:** Ghép Mã hàng Nội bộ <-> Mã hàng Khách.

### 🚚 2. Quản lý Giao hàng (EO - Export Order)
- Hệ thống tự động load thông tin PO/SO/Mã hàng/Tên hàng/Số lượng đặt.
- **Tính năng Thông minh: Smart PO Suggestion**
    - Khi tạo EO, hệ thống kiểm tra các PO cũ còn dư hàng.
    - **Suggest:** Gợi ý lấy hàng từ PO cũ (nếu có tồn) thay vì PO khách vừa gửi (tránh tồn đọng PO cũ).
    - **Decision:** User xác nhận chọn PO nào (PO khách gửi hay PO cũ được gợi ý).
- **Nhập thông tin giao:**
    - Số lượng giao thực tế.
    - Đơn vị tính (ĐVT).
    - Người giao hàng.
    - Thời điểm giao.
    - Ghi chú.
- **Validate:** Cảnh báo nếu giao quá số lượng tồn hoặc sai mã.

### 📊 3. Dashboard & Báo cáo
- **Mode 1 (Tổng quan PO):**
    - List PO | Tiến độ (Đã giao/Tổng) | Trạng thái (Đang giao/Xong).
- **Mode 2 (Chi tiết Item):**
    - Mã hàng | Tên hàng | Tổng Đặt | Tổng Đã Giao | Còn lại.

## 5. YÊU CẦU KỸ THUẬT
- **Platform:** Web App.
- **Input:** Nhập tay (Manual Form).
- **Tech Stack (Dự kiến):** Next.js (Web), Database lưu trữ PO/SO/Log giao hàng.

## 6. QUY TRÌNH RA QUYẾT ĐỊNH (Workflow)
1. Nhập PO (Khách)
2. Nhập SO (Map mã nội bộ)
3. Tạo phiếu giao (EO) -> Hệ thống trừ số lượng còn lại
4. Xem Dashboard theo dõi công nợ hàng hóa

## 7. BƯỚC TIẾP THEO
→ Chạy `/plan` để thiết kế Database Schema và UI Flow chi tiết.
