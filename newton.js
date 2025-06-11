document.addEventListener('DOMContentLoaded', () => {
    const playerWrapper = document.getElementById('detail-player-wrapper');

    if (playerWrapper) {
        playerWrapper.addEventListener('click', function playVideo() {
            // 쿼리 파라미터는 &로 이어야 함 (이미 ?si=... 붙어 있음)
            const youtubeVideoUrl = 'https://player.vimeo.com/video/1092426945?h=af529275c2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479';

            this.innerHTML = `<iframe 
                src="${youtubeVideoUrl}" 
                style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                allow="autoplay; fullscreen" 
                allowfullscreen>
            </iframe>`;
        }, { once: true });
    }
});
