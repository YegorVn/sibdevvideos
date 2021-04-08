import axios from 'axios';
const KEY = 'AIzaSyDINrJg7H3tnRYo5FqZYrEK7TAJCbXonLo';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY
    }
})