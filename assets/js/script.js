const openMaps = () =>{
    window.open("https://maps.app.goo.gl/JtPxqpMchqJZdW16A", "_blank")
}
const toggleMusic = () =>{
    const music = document.getElementById('bg-music');
    $(".music-control").find('i').toggleClass('bi-volume-up')
    $(".music-control").find('i').toggleClass('bi-volume-mute')
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
const startCountdown = (targetDate) => {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "<h3>Hari Bahagia Telah Tiba!</h3>";
            return;
        }

        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}
$(function(){
    const weddingDate = new Date("May 24, 2025 09:00:00").getTime();
    startCountdown(weddingDate);

    const music = $("#bg-music")[0];
     // Kunci scroll saat awal
    $(".scroll-content").addClass("locked");
    $(".landing-content button").on("click", function() {
        $("#landing").fadeOut(800, function() {
            $(".scroll-content").removeClass("locked"); // Aktifkan scroll setelah hilang
        });

        music.play().catch(error => console.log("Autoplay masih diblokir:", error));
    });

    function enableMusic() {
        music.play().catch(error => console.log("Autoplay masih diblokir:", error));
        $(document).off("click scroll", enableMusic);
    }

    $(document).on("click scroll", enableMusic);
    $(document).on("visibilitychange", function() {
        if (document.hidden) {
            music.pause();
        }else{
            music.play();
        }
    });
})