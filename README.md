# Resume — Tripoom Singhaart (Portfolio)

**แยกจาก `moonracle-web` โดยสิ้นเชิง** — ใช้แสดง Portfolio / Resume ส่วนตัวเท่านั้น

---

## อัปขึ้นเว็บไปที่ไหน

| รายการ | ค่า |
|--------|-----|
| **Hosting** | GitHub Pages (ผ่าน GitHub Actions) |
| **Repo** | https://github.com/poomiiz/resume-tripoom |
| **Workflow** | **Deploy GitHub Pages** (`.github/workflows/deploy-pages.yml`) |
| **URL จริง** | https://resume-tripoom.moonracle.com |
| **โดเมน** | `resume-tripoom.moonracle.com` ใน `public/CNAME` |

**ไม่เกี่ยวกับ** Firebase / `moonracle-web` / `firebase deploy`

---

## ปล่อยทุกครั้ง (3 ขั้น)

### 1) ตั้ง GitHub ครั้งเดียว

- **Settings → Pages → Source = GitHub Actions**
- Custom domain: `resume-tripoom.moonracle.com` (ไม่มี `/` ท้าย)

### 2) Push โค้ด

```powershell
cd C:\Users\poomi\Downloads\MoonRacle\resume
git add -A
git commit -m "อธิบายสั้น ๆ"
git push origin main
```

(ถ้า remote ชื่อ `poomiiz`: `git push poomiiz main`)

### 3) รอ Actions แล้วเช็ค

- GitHub → **Actions** → **Deploy GitHub Pages** → รอเขียว
- เปิด https://resume-tripoom.moonracle.com (Ctrl+F5)

ถ้า push แล้วไม่รัน workflow → **Run workflow** มือ (branch `main`)

---

## Tech

- Next.js static export, Tailwind, Framer Motion
- `npm run build` → โฟลเดอร์ `out/` (Actions build ให้บน cloud — ไม่ต้องอัป `out/` เอง)

### Build บนเครื่อง (ทดสอบ)

```powershell
npm ci
npm run build
```

- โดเมน custom: **ไม่ตั้ง** `NEXT_BASE_PATH`
- ถ้าใช้แค่ `https://<user>.github.io/resume-tripoom/` เท่านั้น → ตั้ง `NEXT_BASE_PATH=/resume-tripoom` ตอน build (ดู comment ใน workflow)

---

## ปัญหาที่เจอบ่อย

- หน้าเป็น **README** → รัน workflow ผิดตัว ต้องเป็น **Deploy GitHub Pages** ไม่ใช่ “pages build and deployment”
- **404** → ยังไม่เปิด Pages แบบ GitHub Actions

---

## คู่มือรวมแพลตฟอร์ม

[`moonracle-web/docs/DEPLOY.md`](../moonracle-web/docs/DEPLOY.md)

## AI

- ห้ามปนโค้ด MoonRacle เข้า repo นี้
- ห้ามใส่ PAT/token ใน git remote URL
