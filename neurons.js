document.addEventListener('DOMContentLoaded', () => {
    const playerWrapper = document.getElementById('detail-player-wrapper');

    if (playerWrapper) {
        playerWrapper.addEventListener('click', function playVideo() {
            // 쿼리 파라미터는 &로 이어야 함 (이미 ?si=... 붙어 있음)
            const youtubeVideoUrl = 'https://www.youtube.com/embed/TftycSYuckg?si=UyvAJjbXRSjOqt-v&autoplay=1&mute=1';

            this.innerHTML = `<iframe 
                src="${youtubeVideoUrl}" 
                style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                allow="autoplay; fullscreen" 
                allowfullscreen>
            </iframe>`;
        }, { once: true });
    }
});
