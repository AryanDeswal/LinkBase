// // const AWS = require('aws-sdk');
// // const multer = require('multer');
// // const ModalData = require('../models/ArchiTectureModel');
// // const { v4: uuidv4 } = require('uuid');

// // const BUCKET_NAME = 'awsbucke2'; // Your bucket name

// // AWS.config.update({
// //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //     region: 'ap-south-1'
// // });

// // const s3 = new AWS.S3({
// //     signatureVersion: 'v4',
// //     params: { Bucket: BUCKET_NAME }
// // });

// // const storage = multer.memoryStorage();
// // const upload = multer({
// //     storage,
// //     limits: { fileSize: 10 * 1024 * 1024 }
// // }).fields([
// //     { name: 'Presentation_Drawing_1', maxCount: 1 },
// //     { name: 'Presentation_Drawing_2', maxCount: 1 },
// //     { name: 'Presentation_Drawing_3', maxCount: 1 },
// //     { name: 'File_Model_3D_1', maxCount: 1 },
// //     { name: 'File_Model_3D_2', maxCount: 1 },
// //     { name: 'File_Model_3D_3', maxCount: 1 },
// //     { name: 'Submission_Drawing', maxCount: 1 },
// //     { name: 'All_Floor_Plan', maxCount: 1 },
// //     { name: 'All_Section', maxCount: 1 },
// //     { name: 'All_Elevation', maxCount: 1 },
// //     { name: 'toilet', maxCount: 1 },
// //     { name: 'All_Electric_Drawing', maxCount: 1 },
// //     { name: 'tile_Layout', maxCount: 1 },
// //     { name: 'All_Grills_And_Railing', maxCount: 1 },
// //     { name: 'Column_Footing', maxCount: 1 },
// //     { name: 'Pleanth_Beam', maxCount: 1 },
// //     { name: 'Stair_Case_Drawing', maxCount: 1 },
// //     { name: 'Slab_1', maxCount: 1 },
// //     { name: 'Slab_2', maxCount: 1 },
// //     { name: 'Slab_3', maxCount: 1 },
// //     { name: 'Slab_4', maxCount: 1 },
// //     { name: 'Slab_5', maxCount: 1 },
// //     { name: 'Property_Card', maxCount: 1 },
// //     { name: 'Property_Map', maxCount: 1 },
// //     { name: 'Completion_Drawing', maxCount: 1 },
// //     { name: 'SanctionDrawing', maxCount: 1 },
// //     { name: 'Revise_Sanction', maxCount: 1 },
// //     { name: 'Completion_Letter', maxCount: 1 }
// // ]);

// // const uploadToS3 = async (file, folder) => {
// //     if (!file) return null;

// //     const fileName = `${folder}/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    
// //     const params = {
// //         Bucket: BUCKET_NAME,
// //         Key: fileName,
// //         Body: file.buffer,
// //         ContentType: file.mimetype
// //     };

// //     try {
// //         const uploadResult = await s3.putObject(params).promise();
// //         const fileUrl = `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileName}`;
// //         return fileUrl;
// //     } catch (error) {
// //         console.error('S3 Upload Error:', error);
// //         throw new Error(`Upload failed: ${error.message}`);
// //     }
// // };

// // const createModalData = async (req, res) => {
// //     try {
// //         if (!req.files || Object.keys(req.files).length === 0) {
// //             return res.status(400).json({ error: 'No files uploaded' });
// //         }

// //         const modalData = {
// //             ...req.body,
// //             createdAt: new Date()
// //         };

// //         const uploadPromises = [];
// //         for (const fieldName in req.files) {
// //             const file = req.files[fieldName][0];
// //             uploadPromises.push(
// //                 uploadToS3(file, 'uploads')
// //                     .then(fileUrl => {
// //                         modalData[fieldName] = fileUrl;
// //                     })
// //                     .catch(error => {
// //                         throw new Error(`Failed to upload ${fieldName}: ${error.message}`);
// //                     })
// //             );
// //         }

// //         await Promise.all(uploadPromises);

// //         if (!modalData.title) {
// //             return res.status(400).json({ error: 'Title is required' });
// //         }

// //         const newModalData = await ModalData.create(modalData);

// //         res.status(201).json({
// //             success: true,
// //             message: 'Upload successful',
// //             data: newModalData
// //         });

// //     } catch (error) {
// //         console.error('Server Error:', error);
// //         res.status(500).json({
// //             success: false,
// //             error: 'Upload failed',
// //             details: error.message
// //         });
// //     }
// // };

// // const updateModalData = async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         const modalDataUpdates = {
// //             ...req.body,
// //             updatedAt: new Date()
// //         };

// //         const uploadPromises = [];

// //         // Check if there are files to update
// //         if (req.files && Object.keys(req.files).length > 0) {
// //             for (const fieldName in req.files) {
// //                 const file = req.files[fieldName][0];
// //                 uploadPromises.push(
// //                     uploadToS3(file, 'uploads')
// //                         .then(fileUrl => {
// //                             modalDataUpdates[fieldName] = fileUrl;
// //                         })
// //                         .catch(error => {
// //                             throw new Error(`Failed to upload ${fieldName}: ${error.message}`);
// //                         })
// //                 );
// //             }
// //         }

// //         await Promise.all(uploadPromises);

// //         const updatedModalData = await ModalData.findByIdAndUpdate(id, modalDataUpdates, { new: true });
// //         if (!updatedModalData) {
// //             return res.status(404).json({ success: false, message: 'Data not found' });
// //         }

// //         res.status(200).json({
// //             success: true,
// //             message: 'Data updated successfully',
// //             data: updatedModalData
// //         });
// //     } catch (error) {
// //         console.error('Update Error:', error);
// //         res.status(500).json({ success: false, error: 'Update failed', details: error.message });
// //     }
// // };

// // const deleteModalData = async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         console.log('Deleting data with ID:', id);

// //         const deletedData = await ModalData.findByIdAndDelete(id);
// //         if (!deletedData) {
// //             console.log('Data not found for ID:', id);
// //             return res.status(404).json({ success: false, message: 'Data not found' });
// //         }

// //         console.log('Deleted Data:', deletedData.toObject());

// //         const deletePromises = [];
// //         for (const fieldName in deletedData.toObject()) {
// //             if (fieldName.includes('Drawing') || fieldName.includes('File_Model') || fieldName.includes('Slab')) {
// //                 const fileUrl = deletedData[fieldName];
// //                 if (fileUrl) {
// //                     const urlParts = fileUrl.split(`/${BUCKET_NAME}/`);
// //                     if (urlParts.length > 1) {
// //                         const fileKey = urlParts[1];
// //                         console.log('Deleting file from S3:', fileKey);
// //                         deletePromises.push(
// //                             s3.deleteObject({ Bucket: BUCKET_NAME, Key: fileKey }).promise()
// //                         );
// //                     } else {
// //                         console.warn('Could not extract file key from URL:', fileUrl);
// //                     }
// //                 }
// //             }
// //         }

// //         await Promise.all(deletePromises);

// //         res.status(200).json({
// //             success: true,
// //             message: 'Data deleted successfully'
// //         });
// //     } catch (error) {
// //         console.error('Delete Error:', error);
// //         res.status(500).json({ success: false, error: 'Delete failed', details: error.message });
// //     }
// // };


// // const getModalData = async (req, res) => {
// //     try {
// //         const { id } = req.params;

// //         // If an ID is provided, fetch a single document
// //         if (id) {
// //             const modalData = await ModalData.findById(id);
// //             if (!modalData) {
// //                 return res.status(404).json({ success: false, message: 'Data not found' });
// //             }
// //             return res.status(200).json({
// //                 success: true,
// //                 data: modalData
// //             });
// //         }

// //         // If no ID is provided, fetch all documents
// //         const modalDataList = await ModalData.find();
// //         res.status(200).json({
// //             success: true,
// //             data: modalDataList
// //         });
// //     } catch (error) {
// //         console.error('Fetch Error:', error);
// //         res.status(500).json({ success: false, error: 'Failed to fetch data', details: error.message });
// //     }
// // };
// // const getModalDataById = async (req, res) => {
// //     try {
// //         const { id } = req.params;

// //         // Fetch a single document by ID
// //         const modalData = await ModalData.findById(id);

// //         // If no data found, send a 404 response
// //         if (!modalData) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: 'Data not found'
// //             });
// //         }

// //         // Return the data if found
// //         return res.status(200).json({
// //             success: true,
// //             data: modalData
// //         });
// //     } catch (error) {
// //         console.error('Fetch Error:', error);
// //         res.status(500).json({
// //             success: false,
// //             error: 'Failed to fetch data by ID',
// //             details: error.message
// //         });
// //     }
// // };


// // module.exports = {
// //     handleUpload: upload,
// //     createModalData,
// //     updateModalData,
// //     deleteModalData,
// //     getModalData,
// //     getModalDataById
// // };


// const AWS = require('aws-sdk');
// const multer = require('multer');
// const ModalData = require('../models/ArchiTectureModel');
// const { v4: uuidv4 } = require('uuid');

// // AWS S3 Configuration
// const BUCKET_NAME = 'awsbucke2'; // Your bucket name

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'ap-south-1'
// });

// const s3 = new AWS.S3({
//   signatureVersion: 'v4',
//   params: { Bucket: BUCKET_NAME }
// });

// // Multer Storage Configuration
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 } // Limit: 10MB
// }).fields([
//   { name: 'Presentation_Drawing', maxCount: 100 },
//   { name: 'File_Model_3D', maxCount: 100 },
//   { name: 'Drawings', maxCount: 100 },
// ]);

// const uploadToS3 = async (file, folder) => {
//   if (!file) return null;

//   const fileName = `${folder}/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
//   const params = {
//     Bucket: BUCKET_NAME,
//     Key: fileName,
//     Body: file.buffer,
//     ContentType: file.mimetype
//   };

//   try {
//     await s3.putObject(params).promise();
//     return `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileName}`;
//   } catch (error) {
//     console.error('S3 Upload Error:', error);
//     throw new Error(`Upload failed: ${error.message}`);
//   }
// };

// // Create Modal Data
// const createModalData = async (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ error: 'No files uploaded' });
//     }

//     const modalData = { ...req.body, createdAt: new Date() };
//     const uploadPromises = [];

//     for (const fieldName in req.files) {
//       const file = req.files[fieldName][0];
//       uploadPromises.push(
//         uploadToS3(file, 'uploads').then(fileUrl => {
//           modalData[fieldName] = fileUrl;
//         })
//       );
//     }

//     await Promise.all(uploadPromises);
//     const newModalData = await ModalData.create(modalData);

//     res.status(201).json({
//       success: true,
//       message: 'Upload successful',
//       data: newModalData
//     });
//   } catch (error) {
//     console.error('Create Error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Upload failed',
//       details: error.message
//     });
//   }
// };

// // Update Modal Data
// const updateModalData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const modalDataUpdates = { ...req.body, updatedAt: new Date() };

//     const uploadPromises = [];
//     if (req.files && Object.keys(req.files).length > 0) {
//       for (const fieldName in req.files) {
//         const file = req.files[fieldName][0];
//         uploadPromises.push(
//           uploadToS3(file, 'uploads').then(fileUrl => {
//             modalDataUpdates[fieldName] = fileUrl;
//           })
//         );
//       }
//     }

//     await Promise.all(uploadPromises);

//     const updatedModalData = await ModalData.findByIdAndUpdate(id, modalDataUpdates, { new: true });
//     if (!updatedModalData) {
//       return res.status(404).json({ success: false, message: 'Data not found' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Data updated successfully',
//       data: updatedModalData
//     });
//   } catch (error) {
//     console.error('Update Error:', error);
//     res.status(500).json({ success: false, error: 'Update failed', details: error.message });
//   }
// };

// // Delete Modal Data
// const deleteModalData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedData = await ModalData.findByIdAndDelete(id);

//     if (!deletedData) {
//       return res.status(404).json({ success: false, message: 'Data not found' });
//     }

//     const deletePromises = [];
//     for (const fieldName in deletedData.toObject()) {
//       if (deletedData[fieldName]?.startsWith(`https://${BUCKET_NAME}`)) {
//         const fileKey = deletedData[fieldName].split(`${BUCKET_NAME}/`)[1];
//         deletePromises.push(s3.deleteObject({ Bucket: BUCKET_NAME, Key: fileKey }).promise());
//       }
//     }

//     await Promise.all(deletePromises);

//     res.status(200).json({
//       success: true,
//       message: 'Data deleted successfully'
//     });
//   } catch (error) {
//     console.error('Delete Error:', error);
//     res.status(500).json({ success: false, error: 'Delete failed', details: error.message });
//   }
// };

// // Fetch All or Single Modal Data
// const getModalData = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (id) {
//       const modalData = await ModalData.findById(id);
//       if (!modalData) {
//         return res.status(404).json({ success: false, message: 'Data not found' });
//       }
//       return res.status(200).json({ success: true, data: modalData });
//     }

//     const modalDataList = await ModalData.find();
//     res.status(200).json({ success: true, data: modalDataList });
//   } catch (error) {
//     console.error('Fetch Error:', error);
//     res.status(500).json({ success: false, error: 'Fetch failed', details: error.message });
//   }
// };

// const getModalDataById = async (req, res) => {
//         try {
//             const { id } = req.params;
    
//             // Fetch a single document by ID
//             const modalData = await ModalData.findById(id);
    
//             // If no data found, send a 404 response
//             if (!modalData) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Data not found'
//                 });
//             }
    
//             // Return the data if found
//             return res.status(200).json({
//                 success: true,
//                 data: modalData
//             });
//         } catch (error) {
//             console.error('Fetch Error:', error);
//             res.status(500).json({
//                 success: false,
//                 error: 'Failed to fetch data by ID',
//                 details: error.message
//             });
//         }
//     };



// module.exports = {
//   handleUpload: upload,
//   createModalData,
//   updateModalData,
//   deleteModalData,
//   getModalData,
//   getModalDataById
// };

const AWS = require('aws-sdk');
const multer = require('multer');
const ModalData = require('../models/ArchiTectureModel');
const { v4: uuidv4 } = require('uuid');

// AWS S3 Configuration
const BUCKET_NAME = 'awsbucke2'; // Replace with your bucket name

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1',
});

const s3 = new AWS.S3({
    signatureVersion: 'v4',
    params: { Bucket: BUCKET_NAME },
});

// Multer Configuration for Handling Multiple Files
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
}).fields([
    { name: 'Presentation_Drawing', maxCount: 50 },
    { name: 'File_Model_3D', maxCount: 50 },
    { name: 'Drawings', maxCount: 50 },
]);

// Function to Upload Files to S3
const uploadToS3 = async (file, folder) => {
    if (!file) return null;

    const fileName = `${folder}/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        const response = await s3.upload(params).promise();
        return response.Location; // S3 URL of the uploaded file
    } catch (error) {
        console.error('S3 Upload Error:', error);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
};

// Controller for Handling Form Submission
const createModalData = async (req, res) => {
    try {
        const data = await req.body;
        console.log(data);
        const modelData = await new ModalData(data);
        console.log(modelData)
        await modelData.save();
        res.json("done")
    } catch (error) {
        res.json("server error")
    }
}

// Controller to Update ModalData
const updateModalData = async (req, res) => {
    try {
        const { id } = req.params;
        const modalDataUpdates = {
            ...req.body,
            updatedAt: new Date(),
        };

        console.log(modalDataUpdates)


        // Handle file updates
        // if (req.files && Object.keys(req.files).length > 0) {
        //     const uploadPromises = [];
        //     for (const fieldName in req.files) {
        //         const files = req.files[fieldName];
        //         modalDataUpdates[fieldName] = [];

        //         files.forEach((file) => {
        //             uploadPromises.push(
        //                 uploadToS3(file, 'uploads')
        //                     .then((fileUrl) => {
        //                         modalDataUpdates[fieldName].push(fileUrl);
        //                     })
        //                     .catch((error) => {
        //                         throw new Error(`Failed to upload ${fieldName}: ${error.message}`);
        //                     }),
        //             );
        //         });
        //     }
        //     await Promise.all(uploadPromises);
        // }

        // Update data in MongoDB
        const updatedModalData = await ModalData.findByIdAndUpdate(id, modalDataUpdates);
        if (!updatedModalData) {
            return res.status(404).json({ success: false, message: 'Data not found' });
        }
        console.log(updateModalData)
        res.status(200).json({
            success: true,
            message: 'Data updated successfully',
            data: updatedModalData,
        });
    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({ success: false, error: 'Update failed', details: error.message });
    }
};

// Controller to Delete ModalData
const deleteModalData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await ModalData.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({ success: false, message: 'Data not found' });
        }

        const deletePromises = [];
        for (const fieldName in deletedData.toObject()) {
            const fileUrls = deletedData[fieldName];
            if (Array.isArray(fileUrls)) {
                fileUrls.forEach((fileUrl) => {
                    const fileKey = fileUrl.split(`${BUCKET_NAME}/`)[1];
                    if (fileKey) {
                        deletePromises.push(
                            s3.deleteObject({ Bucket: BUCKET_NAME, Key: fileKey }).promise(),
                        );
                    }
                });
            }
        }

        await Promise.all(deletePromises);

        res.status(200).json({
            success: true,
            message: 'Data deleted successfully',
        });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ success: false, error: 'Delete failed', details: error.message });
    }
};

// Controller to Fetch ModalData
const getModalData = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const modalData = await ModalData.findById(id);
            if (!modalData) {
                return res.status(404).json({ success: false, message: 'Data not found' });
            }
            return res.status(200).json({ success: true, data: modalData });
        }

        const modalDataList = await ModalData.find();
        res.status(200).json({ success: true, data: modalDataList });
    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch data', details: error.message });
    }
};


const getModalDataById = async (req, res) => {
        try {
            const { id } = req.params;
    
            // Fetch a single document by ID
            const modalData = await ModalData.findById(id);
    
            // If no data found, send a 404 response
            if (!modalData) {
                return res.status(404).json({
                    success: false,
                    message: 'Data not found'
                });
            }
    
            // Return the data if found
            return res.status(200).json({
                success: true,
                data: modalData
            });
        } catch (error) {
            console.error('Fetch Error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch data by ID',
                details: error.message
            });
        }
    };



module.exports = {
    handleUpload: upload,
    createModalData,
    updateModalData,
    deleteModalData,
    getModalData,
    getModalDataById
};
