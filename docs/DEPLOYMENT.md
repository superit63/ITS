# 🚀 Hướng dẫn Deploy lên Netlify (Không cần VPS)

Vì Netlify là nền tảng **Serverless** (không có ổ cứng lưu trữ lâu dài), bạn **KHÔNG THỂ** dùng SQLite hay chạy Database trực tiếp trên Netlify được (dữ liệu sẽ bị mất mỗi khi app khởi động lại).

**Giải pháp Chuẩn & Miễn phí:**
Sử dụng **Managed Database** (Database được quản lý sẵn). Bạn chỉ cần lấy **URL kết nối** dán vào Netlify là xong.
👉 Đề xuất: **Neon** hoặc **Supabase** (đều có gói Free, không cần VPS, setup 1 phút).

---

## BƯỚC 1: Tạo Database (Dùng Neon.tech cho nhanh)

1.  Truy cập [neon.tech](https://neon.tech) -> Đăng ký account (Free).
2.  Tạo Project mới -> Chọn Postgres.
3.  Nó sẽ hiện ra **Connection String** (giống vầy: `postgres://user:pass@ep-xyz.aws.neon.tech/neondb...`).
4.  **Copy chuỗi này lưu lại.**

---

## BƯỚC 2: Đẩy Code lên GitHub

Bạn cần đẩy code hiện tại lên GitHub cá nhân của bạn:

1.  Vào [github.com](https://github.com) tạo repository mới (VD: `po-manager`).
2.  Chạy lệnh ở folder dự án:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/<username>/po-manager.git
    git push -u origin main
    ```

---

## BƯỚC 3: Deploy lên Netlify

1.  Vào [netlify.com](https://netlify.com) -> Đăng ký/Login.
2.  Chọn **"Add new site"** -> **"Import from Git"**.
3.  Chọn **GitHub** -> Chọn repo `po-manager` vừa tạo.
4.  Ở phần **Build settings** (Netlify thường tự nhận diện Next.js):
    *   Build command: `npm run build`
    *   Publish directory: `.next`
5.  **QUAN TRỌNG:** Bấm vào **"Environment variables"** (Biến môi trường) -> Chọn **Add a variable**:
    *   Key: `DATABASE_URL`
    *   Value: *(Dán chuỗi Connection String của Neon ở Bước 1 vào)*
6.  Bấm **Deploy site**.

---

## BƯỚC 4: Tạo dữ liệu (Migrate)

Sau khi deploy, database trên Neon vẫn đang rỗng. Bạn cần chạy lệnh này dưới máy local để tạo bảng trên Neon:

1.  Mở file `.env` ở máy bạn, sửa `DATABASE_URL` thành chuỗi của Neon.
2.  Chạy lệnh:
    ```bash
    npx prisma db push
    ```
    *(Lệnh này sẽ kết nối lên Neon và tạo bảng Users, PO, SO...)*

setup xong! Giờ vào link Netlify là chạy được ngay.
