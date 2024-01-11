import axios from 'axios';

const KEY_API = '25810966-6fb22a4db6c9a757ebd742847';
const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchImages(searchValue, page, perPage) {
  try {
    return await axios.get(
      `${BASE_URL}?key=${KEY_API}&q=${searchValue}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`
    );
  } catch (error) {
    console.log(error);
  }
}
