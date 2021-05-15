export default function getFileSizeInMB(bytes) {
  if (bytes === 0) {
    return 0;
  } else {
    return bytes / Math.pow(10, 6).toFixed(1);
  }
}
