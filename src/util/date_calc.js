/*jshint -W065 */

const dateCalc = date => {
  const seconds = Math.floor(new Date() - new Date(date))/1000;
  if (seconds > 604800) { return parseInt(seconds/604800) === 1 ? `${parseInt(seconds/604800)} week ago` : `${parseInt(seconds/604800)} weeks ago` } else
  if (seconds > 86400) { return parseInt(seconds/86400) === 1 ? `${parseInt(seconds/86400)} day ago` : `${parseInt(seconds/86400)} days ago` } else
  if (seconds > 3600) { return parseInt(seconds/3600) === 1 ? `${parseInt(seconds/3600)} hour ago` : `${parseInt(seconds/3600)} hours ago` } else
  if (seconds > 60) { return parseInt(seconds/60) === 1 ? `${parseInt(seconds/60)} minute ago` : `${parseInt(seconds/60)} minutes ago` } else {
    return parseInt(seconds) === 1 ? `${parseInt(seconds)} second ago` : `${parseInt(seconds)} seconds ago`;
  }
}

export default dateCalc;
