const express = require('express');
const TikTokScraper = require('tiktok-scraper');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Define the root route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the TikTok Downloader API');
});

// Define the /download route
app.post('/download', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: 'No URL provided' });
  }

  try {
    const video = await TikTokScraper.getVideoMeta(url);
    const videoUrl = video.collector[0].videoUrl;

    if (videoUrl) {
      return res.json({ success: true, downloadLink: videoUrl });
    } else {
      return res.status(404).json({ success: false, error: 'Video URL not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: 'Error fetching video' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
