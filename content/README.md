# เนื้อหา Portfolio (แก้ที่นี่)

โฟลเดอร์นี้เก็บข้อความ ลิงก์วิดีโอ และรูปเป็น JSON — แก้แล้วรัน `npm run dev` หรือ `npm run build` จะอัปเดตหน้าเว็บ

## ไฟล์สำคัญ

| ไฟล์ | ใช้ทำอะไร |
|------|-----------|
| `profile.json` | ชื่อ บทบาท คำอธิบาย ติดต่อ |
| `ui.json` | ข้อความปุ่ม/หัวข้อ TH และ EN |
| `jobs.json` | ประวัติงานแต่ละบริษัท |
| `timeline.json` | วิดีโอรายปี + featured (ดูด้านล่าง) |
| `skills.json` | ทักษะ / interests |
| `media.json` | รูป hero, งาน, thumbnail วิดีโอ |
| `brands.json` | โลโก้แบรนด์ |
| `career-arc.json` | เส้นทางอาชีพสั้น ๆ |
| `tech.json` | โปรไฟล์ tech + โปรเจกต์ |
| `work-tools.json` | ไอคอนเครื่องมือ |

## เพิ่ม / ลบวิดีโอในประวัติ (`timeline.json`)

แต่ละรายการปี:

```json
{
  "year": 2024,
  "jobKey": "goExtra",
  "showreel": {
    "url": "https://www.youtube.com/watch?v=...",
    "thumbKey": "y2024",
    "label": null
  }
}
```

- **url** — ลิงก์ YouTube (แนะนำ) หรือ TikTok
- **thumbKey** — รูปปก YouTube (ชื่อต้องตรงกับ `media.json` → `reelThumbs`)
- **thumbUrl** — (ไม่บังคับ) รูปปกเอง เช่น `"/portfolio/nina-reel-1.jpg"` ใช้กับ Facebook Reel
- **jobKey** — `aiContent` | `goExtra` | `clickMotion` | `shortgun`

รายการพิเศษ (ไม่มีปี):

```json
{
  "kind": "featured",
  "id": "ads-motion",
  "jobKey": null,
  "showreel": {
    "url": "https://youtu.be/...",
    "thumbKey": "adsMotion",
    "label": { "th": "ชื่อไทย", "en": "English title" }
  }
}
```

ลบแถวทั้งก้อนใน array = หายจากไทม์ไลน์

## เปลี่ยนรูป (`media.json`)

- รูปในเครื่อง: วางไฟล์ใน `public/portfolio/` แล้วตั้ง `"local": "/portfolio/ชื่อไฟล์.jpg"`
- รูปจาก Framer: ใช้ `"framerId"` + `"ext"` (ดูตัวอย่างในไฟล์)

## ข้อความสองภาษา

ทุกที่ที่เห็น `th` / `en` ต้องมีทั้งคู่
