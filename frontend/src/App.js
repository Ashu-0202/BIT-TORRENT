import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const axios = require('axios');

const supabaseUrl = 'https://wxclovvoqatqaitqunzy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Y2xvdnZvcWF0cWFpdHF1bnp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDMyMzM2NCwiZXhwIjoyMDI5ODk5MzY0fQ.J0K4otBLDnrf0UhPWtTHonA6ts-Q_fIYbnfdc5VE94U';
const supabase = createClient(supabaseUrl, supabaseKey);


const sendFileUrlToLocalhost = async (fileUrl) => {
  try {
    const response = await axios.post('http://localhost:5000/', {
      fileUrl,
    });
    console.log('File URL sent to localhost:', response.data);
  } catch (error) {
    console.error('Error sending file URL to localhost:', error.message);
  }
};

const uploadFile = async (file, file_path) => {
  console.log(file_path);
  if(file!=null){
  try {
    const { data, error } = await supabase.storage
      .from('torrent-file')
      .upload(file_path, file);

    if (error) {
      console.error('Error uploading file:', error.message);
    } else {
      console.log('File uploaded successfully:', data);
      const fileUrl = `https://wxclovvoqatqaitqunzy.supabase.co/storage/v1/object/public/torrent-file${file_path}`;
      
      sendFileUrlToLocalhost(fileUrl);

    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }}
  else {
    const {data} = supabase.storage.from('torrentfile').getPublicUrl(file_path);
    console.log(data.publicUrl);
  }
};

function App() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = async () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';

    // Trigger a click event on the input element
    input.click();

    // Handle the file selection
    input.onchange = async (e) => {
      const file = e.target.files[0];
      setUploadedFile(file.name);

      // Upload the file to Supabase
      await uploadFile(file, `/${file.name}`);
    };
  };

  const handleDownload = () => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 95 ? prevProgress + 5 : prevProgress));
    }, 500);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
    }, 5000);

    setTimeout(() => {
      setError('Download failed: Connection timed out');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-md shadow-md p-10 space-y-6 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">BitTorrent Application</h1>
          <button
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md mb-6"
            onClick={handleUpload}
          >
            Upload File
          </button>
          {uploadedFile && (
            <div className="flex items-center mb-6">
              <svg
                className="w-8 h-8 text-gray-600 mr-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 13l4-4-4-4M4 12h15" />
              </svg>
              <span className="text-lg text-gray-800">{uploadedFile}</span>
            </div>
          )}
          <button
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md mt-6"
            onClick={handleDownload}
          >
            Download File
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Download Status</h2>
            {error && (
              <div className="mb-6">
                <span className="text-red-600">{error}</span>
              </div>
            )}
            {/* Messages and errors during download */}
            <div>
              {/* Sample messages */}
              <div className="mb-4">
                <span className="text-lg text-gray-800">Connecting to peers...</span>
              </div>
              <div className="mb-4">
                <span className="text-lg text-gray-800">Downloading file...</span>
              </div>
              {/* Sample error */}
              {/* <div className="mb-4">
                <span className="text-red-600">Download failed: Connection timed out</span>
              </div> */}
            </div>
            {progress > 0 && (
              <div className="mb-4 text-lg text-gray-800">Torrent File Progress:</div>
            )}
            {progress > 0 && (
              <div className="w-full bg-gray-200 h-8 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full text-center text-white"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
