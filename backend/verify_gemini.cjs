const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const verifyGemini = async () => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("❌ ERROR: GEMINI_API_KEY is missing in .env");
        process.exit(1);
    }

    if (apiKey.startsWith("AIzaSy...")) {
        console.warn("⚠️ WARNING: It looks like you still have the placeholder key.");
    }

    console.log(`🔑 Key found: ${apiKey.substring(0, 8)}...`);

    try {
        console.log("📡 Connecting to Google Gemini...");
        const genAI = new GoogleGenerativeAI(apiKey);

        // Debug: List models
        console.log("🔍 Listing available models...");
        // the listModels method is not directly on genAI in all versions, 
        // sometimes it needs specific handling or just trying different names.
        // Actually, let's just try gemini-1.0-pro as a fallback test.

        const testModel = async (name) => {
            try {
                console.log(`🧪 Testing ${name}...`);
                const model = genAI.getGenerativeModel({ model: name });
                const result = await model.generateContent("Reply with 'Success: [ModelName]'");
                console.log(`✅ SUCCESS with ${name}: ${result.response.text()}`);
                return true;
            } catch (e) {
                console.log(`❌ FAILED with ${name}: ${e.message}`);
                return false;
            }
        };

        await testModel("gemini-flash-latest");
        await testModel("gemini-pro-latest");

    } catch (error) {
        console.error("❌ FAILURE: General error.");
        console.error(`Error: ${error.message}`);
    }
};

verifyGemini();
