document.addEventListener('DOMContentLoaded', () => {
    // 영상을 보여줄 프레임(영역)을 id로 찾음
    const playerWrapper = document.getElementById('detail-player-wrapper');

    // 프레임이 존재할 경우에만 실행
    if (playerWrapper) {
        
        // 프레임에 클릭 이벤트 딱 한 번만 실행되게 설정
        playerWrapper.addEventListener('click', function playVideo() {
            // 니 영상 파일 경로. 한글 이름은 나중에 문제될 수 있으니 newton.mp4 처럼 영어로 바꾸는 걸 추천.
            const localVideoSrc = 'videos/newton.mp4'; 
            
            // 프레임 안의 내용물(썸네일, 재생버튼)을 그냥 영상으로 교체
            this.innerHTML = `<video 
                src="${localVideoSrc}" 
                style="position:absolute; top:0; left:0; width:100%; height:100%; border:0; object-fit:cover;" 
                autoplay 
                controls 
                muted>
            </video>`;
            
        }, { once: true }); // once: true 옵션으로 딱 한번만 실행되고 이벤트는 자동 제거됨
    }
});
