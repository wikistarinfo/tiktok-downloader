import React, { useState } from 'react';

const DownloadForm = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    setDownloadLink('');

    try {
      const response = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to download video: ${errorText}`);
      }

      const data = await response.json();

      if (data.success && data.downloadLink) {
        setMessage('Video download link received!');
        setDownloadLink(data.downloadLink);
      } else {
        setError(`Failed to get valid download link. Server message: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste TikTok video URL here"
        className="w-full px-4 py-2 border rounded mb-4"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Downloading...' : 'Download Video'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-500 mt-2">{message}</p>}
      {downloadLink && (
        <a href={downloadLink} className="text-blue-500 mt-2" target="_blank" rel="noopener noreferrer">
          Download Your Video
        </a>
      )}
    </form>
  );
};

export default DownloadForm;
