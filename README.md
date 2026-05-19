# 🚀 Resume - Tripoom Singhaart (Standalone)

**⚠️ สำคัญ:** โปรเจกต์นี้แยกขาดจาก `moonracle-web` โดยสิ้นเชิง เพื่อใช้สำหรับแสดง Portfolio และ Resume ส่วนตัวเท่านั้น

## 🛠️ รายละเอียดโปรเจกต์
- **Tech Stack:** Next.js (Static Export), Tailwind CSS, Framer Motion
- **Hosting:** GitHub Pages (โดเมน: `public/CNAME`)
- **URL:** [https://resume-tripoom.moonracle.com/](https://resume-tripoom.moonracle.com/) — build ค่าเริ่มต้นไม่ใช้ `basePath` (assets ที่ `/_next/...`)
- **GitHub.io แบบโปรเจกต์** (`/<repo>/`): ตอน build ตั้ง `NEXT_BASE_PATH=/resume-tripoom` แล้วค่อย deploy

## 📂 การจัดการไฟล์
- **Source:** `app/` (Next.js App Router)
- **Deployment:** รัน `npm run build` เพื่อสร้างโฟลเดอร์ `out` สำหรับขึ้น GitHub Pages

## 🤖 AI Agent Instructions
- ห้ามนำโค้ดจากโปรเจกต์ MoonRacle มาปนในนี้เด็ดขาด
- รักษาความคลีนของ CSS Scoping ให้เป็นอิสระ
- บันทึกความคืบหน้าลงใน Data Center ที่ `01_ACTIVE_PROJECTS/2026-05-18_Moonracle_PLAN_Separation_Resume.md`
