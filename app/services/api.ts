import axios from 'axios';

// 📡 Use your machine IP when running on a physical device
const MAIN_API = 'http://192.168.29.95:10000/api';

/**
 * Upload a music file (title + audio file)
 * @param {FormData} data - FormData containing { title, music (File) }
 */
export const uploadMusicApi = async (data) => {
  try {
    const response = await axios.post(`${MAIN_API}/music`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error uploading music:', error?.response?.data || error.message);
    return { success: false, error: error?.response?.data?.message || error.message };
  }
};

/**
 * Fetch all uploaded music
 */
export const getAllMusicsApi = async () => {
  try {
    const response = await axios.get(`${MAIN_API}/music`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching musics:', error?.response?.data || error.message);
    return {
      success: false,
      data: [],
      error: error?.response?.data?.message || error.message,
    };
  }
};
