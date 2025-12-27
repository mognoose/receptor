<template>
  <div class="download-page">
    <h1>Download Our App</h1>
    <p>Get the latest version of our application for your device.</p>
    <div class="download-links">
      <a role="button" class="download-button" @click="downloadFile('http://sapatti.synology.me/receptor_setup_latest.exe', 'receptor_setup_latest.exe')">Download for Windows</a>
      <a role="button" class="download-button" @click="downloadFile('http://sapatti.synology.me/receptor_latest.Appimage', 'receptor_latest.Appimage')">Download for Linux</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const downloadFile = (url: string, filename: string) => {
  // Creating a temporary anchor element to trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename; // Set the download attribute to suggest filename
  link.target = '_blank'; // Open in a new tab/window

  // Append to the body, trigger click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.download-page {
  padding: 2rem;
  text-align: center;
}

.download-links {
  margin-top: 1rem;
}

.download-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.download-button:hover {
  background-color: #0056b3;
}
</style>