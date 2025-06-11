document.addEventListener('DOMContentLoaded', () => {
    const playerWrapper = document.getElementById('detail-player-wrapper');

    if (playerWrapper) {
        playerWrapper.addEventListener('click', function playVideo() {
            // 쿼리 파라미터는 &로 이어야 함 (이미 ?si=... 붙어 있음)
            const youtubeVideoUrl = 'https://player.vimeo.com/video/1092426344?context=Vimeo%5CController%5CApi%5CResources%5CVideoController.&h=994ce2662b&s=5cb0888b97cf2be2659033d1b4c950a5c6f8f5ea_1749742399';

            this.innerHTML = `<iframe 
                src="${youtubeVideoUrl}" 
                style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                allow="autoplay; fullscreen" 
                allowfullscreen>
            </iframe>`;
        }, { once: true });
    }
});
