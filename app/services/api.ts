import axios from 'axios';

// ⛔ Replace this with your machine's IP address when testing on a physical device
const MAIN_API = 'http://192.168.29.95:10000/api'; 

export const uploadMusicApi = async (data) => {
  try {
    const response = await axios.post(`${MAIN_API}/music`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error uploading music:', error.message);
    return { success: false, error: error.message };
  }
};

export const getAllMusicsApi = async () => {
  try {
    const response = await axios.get(`${MAIN_API}/music`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching musics:', error.message);
    return { success: false, data: [], error: error.message };
  }
};
