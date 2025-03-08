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
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    $('.bi-clipboard').click(function(e){
        const rekNumber = $(this).parent().find('span').text().replaceAll(' ','')
        navigator.clipboard.writeText(rekNumber)
        const tooltip = bootstrap.Tooltip.getInstance(this)
        tooltip.hide()
        $(this).attr('data-bs-title', 'Copied!');
        const newTooltip = new bootstrap.Tooltip(this);
        newTooltip.show()
        $(this).toggleClass('bi-clipboard')
        $(this).toggleClass('bi-clipboard-check')
        setTimeout(() => {
            $(this).toggleClass('bi-clipboard-check')
            $(this).toggleClass('bi-clipboard')
            $(this).attr('data-bs-title', 'Copy to clipboard');
            newTooltip.dispose()
            new bootstrap.Tooltip(this);
        }, 1500);
    })

    const weddingDate = new Date("May 24, 2025 09:00:00").getTime();
    startCountdown(weddingDate);

    const music = $("#bg-music")[0];
    music.pause()
    $(".landing-content button").on("click", function() {
        $("#landing").fadeOut(500, function() {
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