const AWS = require("aws-sdk");
const multer = require("multer");

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure Multer for file uploads (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// File Upload Controller
const uploadFiles = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const file = req.file;

    // Prepare S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Correct your bucket env variable
      Key: file.originalname, // File name
      Body: file.buffer, // File content as buffer
      ContentType: file.mimetype, // File MIME type
    };

    // Upload file to S3
    const result = await s3.upload(params).promise();

    return res.status(201).json({
      message: "File uploaded successfully",
      fileUrl: result.Location,
    });
  } catch (e) {
    console.error("Upload Error:", e);
    return res.status(500).json({ message: "File upload failed", error: e.message });
  }
};

module.exports = { uploadFiles, upload };
