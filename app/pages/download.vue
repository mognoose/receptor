<template>
  <div class="download-page">
    <h1>Download Our App</h1>
    <p>Get the latest version of our application for your device.</p>
    <div class="download-links">
      <a role="button" href="http://sapatti.synology.me/receptor_setup_latest.exe" class="download-button" download="receptor_setup_latest.exe">Download for Windows</a>
      <a role="button" href="http://sapatti.synology.me/receptor_latest.Appimage" class="download-button">Download for Linux</a>
    </div>
  </div>
</template>

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