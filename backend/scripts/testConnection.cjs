// scripts/testConnection.cjs
// Quick connectivity check for MONGODB_URI. Run from backend/:
//   node scripts/testConnection.cjs
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ تم الاتصال بقاعدة البيانات بنجاح!");
    process.exit(0);
  } catch (err) {
    console.error("❌ فشل الاتصال بقاعدة البيانات:", err.message);
    process.exit(1);
  }
})();
