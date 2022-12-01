// It helps to download file by taking blob and filename which receives from the server
export const downloadFiles = (blob, filename="download.txt") => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};
