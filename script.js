'use strict';

// Initialize app on page load
window.onload = function() {
    displayUploadedFiles();
};

// Upload file functionality with localStorage
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length > 0) {
        const file = files[0];
        let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        uploadedFiles.push(file.name);
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
        displayUploadedFiles();
    }
}

// Display uploaded files in grid
function displayUploadedFiles() {
    const filesGrid = document.getElementById('filesGrid');
    filesGrid.innerHTML = '';
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    uploadedFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.textContent = file;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteFile(file);
        };
        fileItem.appendChild(deleteButton);
        filesGrid.appendChild(fileItem);
    });
}

// Delete file function
function deleteFile(fileName) {
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    uploadedFiles = uploadedFiles.filter(file => file !== fileName);
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    displayUploadedFiles();
}

// Pages with content for movies/music/games/podcasts
function navigateTo(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<h1>' + page + '</h1><p>Content for ' + page + ' will go here.</p>';
}

// Dashboard with statistics
function dashboardStats() {
    const totalFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = '<p>Total Uploaded Files: ' + totalFiles.length + '</p>';
}

// Clear data function
function clearData() {
    localStorage.removeItem('uploadedFiles');
    displayUploadedFiles();
}

