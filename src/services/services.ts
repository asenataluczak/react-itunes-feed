import axios from 'axios';

const iTunesUrl = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

export default function fetchITunesFeed() {
  return axios.get(iTunesUrl).catch((err) => {
    console.error(err);
    return {};
  });
}
