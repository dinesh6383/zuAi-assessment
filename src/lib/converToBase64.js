export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export async function base64ToBlob(base_url) {
  const int8Array = await fetch(base_url)
    .then((res) => res.arrayBuffer())
    .then((buffer) => new Uint8Array(buffer));
  const type = base_url?.slice(5, base_url.indexOf(";"));
  const blob = new Blob([int8Array], { type });
  const blob_url = URL.createObjectURL(blob);
  return blob_url;
}
