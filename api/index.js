require("dotenv").config();

const app = require("./app");
const supabase = require("./config/supabase");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const { error } = await supabase
      .from("users")
      .select("id")
      .limit(1);

    if (error && error.code !== "PGRST205") {
      throw error;
    }

    console.log("✅ Supabase Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect to Supabase");
    console.error(err.message);
    process.exit(1);
  }
}

startServer();