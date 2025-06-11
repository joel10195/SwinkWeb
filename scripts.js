const tree = document.getElementById('tree');
const apples = document.querySelectorAll('.apple');
const groundLevel = 370;

tree.addEventListener('click', () => {
  tree.classList.add('shake');
  apples.forEach((apple, i) => {
    setTimeout(() => {
      startGravityBounce(apple);
    }, i * 300);
  });
  setTimeout(() => {
    tree.classList.remove('shake');
  }, 1000);
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
        setTimeout(() => {
          apple.style.top = originalPosition;
        }, 3000);
        return;
      }
    }
    apple.style.top = position + 'px';
  }, 16);
}

const subjectBtn = document.querySelector('.category-toggle button:nth-child(1)');
const gradeBtn = document.querySelector('.category-toggle button:nth-child(2)');
const subjectIcons = document.querySelector('.category-icons');
const gradeIcons = document.querySelector('.grade-icons');

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

const searchBox = document.getElementById('searchBox');
const clearButton = document.getElementById('clearButton');
const searchInput = document.querySelector('.search-box input');
const suggestionsBox = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  suggestionsBox.innerHTML = '';
  suggestionsBox.style.display = 'none';
  searchBox.classList.remove('expanded');

  if (query.includes('뉴')) {
    const suggestions = ['🔍︎  뉴런                                                                                              생명과학 > 인체 > 신경', '🔍︎  뉴턴                                                                                              물리학 > 중력 > 학자'];
    suggestions.forEach(suggestion => {
      const suggestionDiv = document.createElement('div');
      suggestionDiv.textContent = suggestion;
      suggestionDiv.addEventListener('click', () => {
        if (suggestion === '🔍︎  뉴턴                                                                                              물리학 > 중력 > 학자') {
          window.open('newton.html', '_self');
        }
        if (suggestion === '🔍︎  뉴런                                                                                              생명과학 > 인체 > 신경') {
          window.open('neurons.html', '_self');
        }
        searchInput.value = suggestion;
        suggestionsBox.style.display = 'none';
        searchBox.classList.add('expanded');
      });
      suggestionsBox.appendChild(suggestionDiv);
    });
    suggestionsBox.style.display = 'flex';
    searchBox.classList.add('expanded');
  }
});

searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    suggestionsBox.style.display = 'none';
    searchBox.classList.remove('expanded');
  }, 200);
});

searchInput.addEventListener('focus', () => {
  const query = searchInput.value.trim();
  if (query.includes('뉴')) {
    suggestionsBox.style.display = 'flex';
    searchBox.classList.add('expanded');
  }
});

clearButton.addEventListener('click', () => {
  searchInput.value = '';
  suggestionsBox.innerHTML = '';
  suggestionsBox.style.display = 'none';
  searchBox.classList.remove('expanded');
  searchInput.focus();
});

const sortButton = document.getElementById('sortButton');
const filterPanel = document.getElementById('filterPanel');
const closeFilterButton = document.getElementById('closeFilterButton');

filterPanel.style.display = 'none';

sortButton.addEventListener('click', () => {
  const isHidden = filterPanel.style.display === 'none' || filterPanel.style.display === '';
  filterPanel.style.display = isHidden ? 'block' : 'none';
});

closeFilterButton.addEventListener('click', () => {
  filterPanel.style.display = 'none';
});

function resetFilter() {
  const selects = filterPanel.querySelectorAll('select');
  selects.forEach(select => select.selectedIndex = 0);
}

function applyFilter() {
  alert('필터가 적용되었습니다.');
}
