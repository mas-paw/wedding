// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";;
import { getDatabase, set, ref ,push, child, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtS4zMhOQ-yIKrdph2qPsW0QDo7Sr1d_U",
  authDomain: "weddingpaw.firebaseapp.com",
  databaseURL: "https://weddingpaw-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "weddingpaw",
  storageBucket: "weddingpaw.firebasestorage.app",
  messagingSenderId: "261128765075",
  appId: "1:261128765075:web:19a7ae15762b19f3f15766",
  measurementId: "G-QQWQKCRW1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const tableName = 'attendance'

const getComments = () => {
	const dbRef = ref(db, `${tableName}/`)
	$('#comments').html('')
	
	onValue(dbRef, renderUcapan);
}

const timeAgo = (time) =>{
    const now = Date.now();
    const diff = Math.floor((now - time) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
    return `${Math.floor(diff / 31536000)} years ago`;
}

const renderUcapan = (snapshot) =>{
    const ucapanList = document.getElementById('comments');
    ucapanList.innerHTML = '';
    snapshot.forEach(child => {
        const { name, comment, createdAt, attendance } = child.val();
        const waktu = timeAgo(createdAt);
        const ucapanItem = `
            <div class='card p-2 mb-2 text-start'>
                <p><strong>${name}</strong> <strong>${attendance}</strong></p>
                <p class='mb-1'>${comment}</p>
                <p class='mb-0'><i class="bi bi-clock"></i><small>${waktu}</small></p>
            </div>
        `;
        ucapanList.innerHTML += ucapanItem;
    });
}

$(function(){
    getComments();
    
    $('#attendanceForm').submit(function(e){
        // Add loading screen
        $('#loadingScreen').addClass('show');
        e.preventDefault();
        
        // Ambil data dari form
        const name = $('#name').val();
        const comment = $('#comment').val();
        const attendance = $('#attendance').val();
        
        // Simpan data ke Realtime database
        const userId = push(child(ref(db), tableName)).key;
        set(ref(db, `${tableName}/${userId}`), {
            name: name,
            comment: comment,
            attendance: attendance,
            createdAt : Date.now()
        }).then(() => {
        
            // Reset form
            $('#name').val('');
            $('#comment').val('');
            $('#attendance').val('');
            
            getComments();
        }).catch((error) => {
            console.error("Error submitting data:", error);
        }).finally(() => {
            // Menyembunyikan loading screen secara perlahan
            setTimeout(() => {
                $('#loadingScreen').removeClass('show');
            }, 2000); // Menghapus class 'show' setelah 2 detik
        });
    });
});
