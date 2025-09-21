// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai');

// Setup Express app
const app = express();
const port = 5000;

// Configure Multer to store uploaded files in 'uploads/' directory
const upload = multer({ dest: 'uploads/' });

// Initialize the Google Document AI client
const client = new DocumentProcessorServiceClient({
  keyFilename: path.join(__dirname, "gen-lang-client-0029878396-be627b5776dd.json"),
});

// Define your project, location, and processor ID
const projectId = '1009656554406';
const location = 'us';
const processorId = 'a3e16c1fe324fd16';

// POST endpoint to handle document processing
app.post('/processDocument', upload.single('file'), async (req, res) => {
  try {
    // Get file path and buffer
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);

    // Define Document AI request
    const request = {
      name: `projects/${projectId}/locations/${location}/processors/${processorId}`,
      rawDocument: {
        content: fileBuffer,
        mimeType: req.file.mimetype, // 'application/pdf' expected
      },
    };

    // Process document using Document AI
    const [result] = await client.processDocument(request);

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    // Send extracted text as response
    res.status(200).send(result.document.text);
  } catch (error) {
    console.error('Failed to process document:', error);
    res.status(500).send('Failed to process document');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
