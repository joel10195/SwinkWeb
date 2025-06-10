document.addEventListener('DOMContentLoaded', () => {

  // ======================================================
  // 1. index.js에서 가져온 기존 '틀 코드' 기능
  // ======================================================
  // 이 부분은 physics.html에 해당 요소가 없을 수 있으므로,
  // 에러 방지를 위해 각 기능마다 if문으로 감싸줌
  const tree = document.getElementById('tree');
  if (tree) {
    const apples = document.querySelectorAll('.apple');
    const groundLevel = 370;

    tree.addEventListener('click', () => {
      tree.classList.add('shake');
      if (apples && apples.length > 0) {
        apples.forEach((apple, i) => {
          setTimeout(() => { startGravityBounce(apple); }, i * 300);
        });
      }
      setTimeout(() => { tree.classList.remove('shake'); }, 1000);
    });

    function startGravityBounce(apple) {
      let position = parseFloat(apple.style.top);
      let velocity = 0;
      const gravity = 0.6;
      const bounce = 0.7;
      const originalPosition = apple.style.top;
      const interval = setInterval(() => {
        velocity += gravity;
        position += velocity;
        if (position >= groundLevel) {
          position = groundLevel;
          velocity *= -bounce;
          if (Math.abs(velocity) < 1) {
            clearInterval(interval);
            setTimeout(() => { apple.style.top = originalPosition; }, 3000);
            return;
          }
        }
        apple.style.top = `${position}px`;
      }, 16);
    }
  }

  const subjectBtn = document.querySelector('.category-toggle button:nth-child(1)');
  const gradeBtn = document.querySelector('.category-toggle button:nth-child(2)');
  const subjectIcons = document.querySelector('.category-icons');
  const gradeIcons = document.querySelector('.grade-icons');
  if (subjectBtn && gradeBtn && subjectIcons && gradeIcons) {
    subjectBtn.addEventListener('click', () => {
      subjectBtn.classList.add('active');
      gradeBtn.classList.remove('active');
      subjectIcons.style.display = 'flex';
      gradeIcons.style.display = 'none';
    });
    gradeBtn.addEventListener('click', () => {
      gradeBtn.classList.add('active');
      subjectBtn.classList.remove('active');
      subjectIcons.style.display = 'none';
      gradeIcons.style.display = 'flex';
    });
  }

  const clearButton = document.getElementById('clearButton');
  const searchInput = document.querySelector('.search-box input');
  if (clearButton && searchInput) {
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
    });
  }

  // ======================================================
  // 2. 메인 필터 기능 (교육기관, 학년, 학기, 단원)
  // ======================================================
  const institutionSelect = document.getElementById('institution-select');
  const gradeSelect = document.getElementById('grade-select');
  const semesterSelect = document.getElementById('semester-select');
  const unitSelect = document.getElementById('unit-select');
  const allFilters = [institutionSelect, gradeSelect, semesterSelect, unitSelect];
  const resetButton = document.getElementById('reset-btn');
  const applyButton = document.getElementById('apply-btn');

  if (institutionSelect && gradeSelect && semesterSelect && unitSelect && resetButton && applyButton) {
    const filterData = {
      elementary: {
        grades: ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'],
        units: { '3': { '1': ['물질의 성질', '동물의 한살이', '자석의 이용', '지구의 모습', '과학자는 어떻게 탐구할까요?'] } }
      },
      middle: { grades: ['1학년', '2학년', '3학년'], units: {} },
      high: { grades: ['1학년', '2학년', '3학년'], units: {} }
    };

    const updateApplyButtonState = () => {
      const allSelected = allFilters.every(select => select.value);
      if (allSelected) { applyButton.classList.remove('inactive'); } 
      else { applyButton.classList.add('inactive'); }
    };

    allFilters.forEach(select => {
      select.addEventListener('change', () => {
        if (select.value) { select.classList.add('selected'); } 
        else { select.classList.remove('selected'); }
        updateApplyButtonState();
      });
    });

    institutionSelect.addEventListener('change', (event) => {
      const selectedInstitution = event.target.value;
      gradeSelect.innerHTML = '<option value="">학년</option>';
      semesterSelect.innerHTML = '<option value="">학기</option>';
      unitSelect.innerHTML = '<option value="">단원</option>';
      gradeSelect.classList.remove('selected');
      semesterSelect.classList.remove('selected');
      unitSelect.classList.remove('selected');
      if (selectedInstitution && filterData[selectedInstitution]) {
        filterData[selectedInstitution].grades.forEach(grade => {
          gradeSelect.innerHTML += `<option value="${grade}">${grade}</option>`;
        });
        semesterSelect.innerHTML += '<option value="1">1학기</option><option value="2">2학기</option>';
      }
      updateApplyButtonState();
    });

    semesterSelect.addEventListener('change', () => {
      const selectedInstitution = institutionSelect.value;
      const selectedGrade = gradeSelect.value.replace('학년', '');
      const selectedSemester = semesterSelect.value;
      unitSelect.innerHTML = '<option value="">단원</option>';
      unitSelect.classList.remove('selected');
      if (selectedInstitution && selectedGrade && selectedSemester &&
          filterData[selectedInstitution]?.units[selectedGrade]?.[selectedSemester]) {
        filterData[selectedInstitution].units[selectedGrade][selectedSemester].forEach(unit => {
          unitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        });
      }
      updateApplyButtonState();
    });

    resetButton.addEventListener('click', () => {
      allFilters.forEach(select => {
        select.value = '';
        select.classList.remove('selected');
      });
      gradeSelect.innerHTML = '<option value="">학년</option>';
      semesterSelect.innerHTML = '<option value="">학기</option>';
      unitSelect.innerHTML = '<option value="">단원</option>';
      updateApplyButtonState();
      document.getElementById('popular-videos-section').style.display = 'block';
      document.getElementById('filtered-videos-section').style.display = 'none';
    });
    
    applyButton.addEventListener('click', (event) => {
      if(applyButton.classList.contains('inactive')) {
        event.preventDefault(); return;
      }
      const institution = institutionSelect.value;
      const grade = gradeSelect.value;
      const semester = semesterSelect.value;
      const unit = unitSelect.value;
      if(institution === 'elementary' && grade === '3학년' && semester === '1' && unit === '물질의 성질') {
        document.getElementById('popular-videos-section').style.display = 'none';
        document.getElementById('filtered-videos-section').style.display = 'block';
      } else {
        alert('다른 필터 결과는 아직 준비 안됐다.');
      }
    });

    updateApplyButtonState();
  }

  // ======================================================
  // 3. 서브 필터 버튼 정렬 기능 (날짜 정렬 로직 수정)
  // ======================================================
  const subFilterButtons = document.querySelectorAll('#filtered-videos-section .sub-filter-buttons button');
  const videoGrid = document.querySelector('#filtered-videos-section .video-grid');

  if (subFilterButtons.length > 0 && videoGrid) {
    const originalOrderElements = Array.from(videoGrid.querySelectorAll('.video-item'));

    subFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
        subFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterType = button.textContent.trim();
        
        if (filterType === '최근 업로드된 영상') {
          const videoItems = Array.from(videoGrid.querySelectorAll('.video-item'));
          videoItems.sort((a, b) => {
            const dateA_text = a.querySelector('.date').textContent.trim();
            const dateB_text = b.querySelector('.date').textContent.trim();
            
            // 더 안정적인 날짜 파싱 로직으로 변경
            const partsA = dateA_text.split('.').map(part => parseInt(part.trim(), 10));
            const partsB = dateB_text.split('.').map(part => parseInt(part.trim(), 10));

            // 월(month)은 0부터 시작하므로 -1 해줘야 함
            const dateA = new Date(partsA[0], partsA[1] - 1, partsA[2]);
            const dateB = new Date(partsB[0], partsB[1] - 1, partsB[2]);

            return dateB - dateA; // 최신순 정렬
          });
          videoItems.forEach(item => videoGrid.appendChild(item));

        } else if (filterType === '전체') {
          originalOrderElements.forEach(item => videoGrid.appendChild(item));
        }
      });
    });
  }
});

// ===============================================
// 달고나 영상 상세 페이지 보기 및 재생 기능 (수정본)
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    const dalgonaLink = document.getElementById('dalgona-video-link');
    const backLink = document.getElementById('back-to-list-link');
    const detailSection = document.getElementById('video-detail-section');
    const detailPlayerWrapper = document.getElementById('detail-player-wrapper');
    const mainContentSections = document.querySelectorAll('.physics-content > *:not(#video-detail-section)');

    if (dalgonaLink && detailSection && backLink && detailPlayerWrapper) {
        
        const originalPlayerHTML = detailPlayerWrapper.innerHTML; // 썸네일+버튼 초기 상태 저장

        // 영상 재생 이벤트를 플레이어에 붙여주는 함수
        const attachPlayEvent = () => {
            detailPlayerWrapper.addEventListener('click', function playVideoOnce() {
                // 니가 쓴 파일 이름 그대로 씀. 경로가 정확해야 함.
                const localVideoSrc = '../videos/부풀어오르는달고나만들기.mp4'; 
                
                this.innerHTML = `<video 
                    src="${localVideoSrc}" 
                    style="position:absolute; top:0; left:0; width:100%; height:100%; border:0; object-fit:cover;" 
                    autoplay 
                    controls 
                    muted>
                </video>`;
            }, { once: true }); // once: true 옵션으로 딱 한번만 실행되고 이벤트는 자동 제거됨
        };

        // '달고나' 썸네일 클릭 -> 상세 페이지 보이기
        dalgonaLink.addEventListener('click', (event) => {
            event.preventDefault();
            mainContentSections.forEach(sec => sec.style.display = 'none');
            detailSection.style.display = 'block';
            
            // 상세 페이지가 보일 때, 재생 이벤트를 붙여줌
            attachPlayEvent();
        });

        // '목록으로' 버튼 클릭 -> 다시 목록 화면으로
        backLink.addEventListener('click', (event) => {
            event.preventDefault();
            detailSection.style.display = 'none';
            detailPlayerWrapper.innerHTML = originalPlayerHTML; // 플레이어를 다시 원래 썸네일로 복원
            
            mainContentSections.forEach(sec => {
                // 원래 display 값으로 복원
                if (sec.classList.contains('filter-section')) {
                    sec.style.display = 'flex';
                } else if (sec.id === 'popular-videos-section') {
                    sec.style.display = 'none'; // 목록으로 돌아갈땐 항상 필터 결과 화면으로
                } else {
                    sec.style.display = 'block';
                }
            });
        });
    }
});