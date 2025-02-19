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

const extractFileKey = (s3Url) => {
  try {
    const url = new URL(s3Url);  // Parse the URL
    return url.pathname.substring(1); // Remove the leading slash
  } catch (error) {
    console.error("Invalid URL:", error.message);
    return null;
  }
};

const extractBucketName = (s3Url) => {
  try {
    const url = new URL(s3Url); // Parse the URL
    const hostParts = url.hostname.split('.'); // Split the hostname by dots

    // For virtual-hosted style URLs (bucket-name.s3.amazonaws.com)
    if (hostParts.length > 3 && hostParts[1] === 's3') {
      return hostParts[0]; // The first part is the bucket name
    }

    // For path-style URLs (s3.amazonaws.com/bucket-name)
    const pathParts = url.pathname.split('/');
    if (pathParts.length > 1) {
      return pathParts[1]; // The first part after '/' is the bucket name
    }

    return null; // Return null if no bucket name is found
  } catch (error) {
    console.error("Invalid URL:", error.message);
    return null;
  }
};

const deleteFile = async (req, res) => {
  try {
    const { s3Url } = req.params;
    const fileKey = extractFileKey(s3Url);
    const bucketName = extractBucketName(s3Url);

    if (!fileKey) {
      return res.status(400).json({ success: false, error: "Invalid S3 URL" });
    }
    const params = {
      Bucket: bucketName,
      Key: fileKey
    };

    await s3.deleteObject(params).promise();
    console.log(`File deleted successfully: ${fileKey}`);
    res.status(200).json({
      success: true,
      message: 'Delete successful'
    });
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
    res.status(500).json({ success: false, error: 'Delete failed', details: error.message });
  }
};

module.exports = { deleteFile, uploadFiles, upload };
