document.addEventListener('DOMContentLoaded', () => {
    const playerWrapper = document.getElementById('detail-player-wrapper');

    if (playerWrapper) {
        playerWrapper.addEventListener('click', function playVideo() {
            const youtubeVideoUrl = 'https://www.youtube.com/embed/TftycSYuckg?si=UyvAJjbXRSjOqt-v'; // 여기에 실제 외부 영상 링크

            this.innerHTML = `<iframe 
                src="${youtubeVideoUrl}?autoplay=1&mute=1" 
                style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                allow="autoplay; fullscreen" 
                allowfullscreen>
            </iframe>`;
        }, { once: true });
    }
});
