import React from 'react';
import DownloadForm from '../components/DownloadForm';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">TikTok Video Downloader Without Watermark</h1>
      <p className="text-center mb-8">Download your favorite TikTok videos without watermark, quickly and easily!</p>
      <DownloadForm />
    </div>
  );
};

export default Home;