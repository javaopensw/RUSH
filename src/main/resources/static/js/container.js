const containers = document.querySelectorAll('.container');
const buttons = document.querySelectorAll('#sidebar button');


let isDragging = false;
let offsetX = 0; // 클릭한 지점과 컨테이너의 왼쪽 모서리 간 거리
let offsetY = 0; // 클릭한 지점과 컨테이너의 위쪽 모서리 간 거리
let currentContainer = null; // 현재 드래그 중인 컨테이너


// 컨테이너 표시/숨김 토글
   // 컨테이너 표시/숨김 및 위치 지정
   buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const container = containers[index];
        const isVisible = container.style.display === 'block';

        // 모든 컨테이너 숨기기
        containers.forEach(cont => cont.style.display = 'none');

        if (!isVisible) {
            container.style.display = 'block';
        
            // 모든 컨테이너가 동일한 위치에 열리도록 설정
            container.style.left = '800px'; // 왼쪽에서 100px
            container.style.top = '350px'; // 위에서 150px
        }
    });
});
    
    // 초기 위치 설정 (모든 컨테이너에 적용)
    containers.forEach(container => {
        container.style.left = '800px'; // 초기 위치: 왼쪽에서 800px
        container.style.top = '350px';  // 초기 위치: 위에서 350px
    });
    
    // 드래그 시작 이벤트
    containers.forEach(container => {
        const header = container.querySelector('.header'); // 헤더 부분만 드래그 가능
        const closeButton = container.querySelector('.close-btn');
    
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                container.style.display = 'none'; // 닫기 버튼 클릭 시 숨김
            });
        }
    
        header.addEventListener('mousedown', (e) => {
            // 드래그 시작
            isDragging = true;
            currentContainer = container;
    
            // 컨테이너의 현재 위치를 기준으로 offset 계산
            const containerRect = container.getBoundingClientRect();
            offsetX = e.clientX - containerRect.left; // 현재 위치의 왼쪽 모서리 기준
            offsetY = e.clientY - containerRect.top;  // 현재 위치의 위쪽 모서리 기준
    
            // 드래그 중임을 나타내는 스타일 변경
            header.style.cursor = 'grabbing';
        });
    
        // 드래그 종료 이벤트
        document.addEventListener('mouseup', () => {
            isDragging = false;
            currentContainer = null;
            containers.forEach(cont => cont.style.cursor = 'default'); // 커서 복원
        });
    
        // 드래그 중 이벤트
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                // 새로운 위치 계산
                const newLeft = e.clientX - offsetX; // 마우스의 X 좌표에서 offsetX를 뺀 값
                const newTop = e.clientY - offsetY;  // 마우스의 Y 좌표에서 offsetY를 뺀 값
    
                // 컨테이너 이동
                currentContainer.style.left = `${newLeft}px`;
                currentContainer.style.top = `${newTop}px`;
            }
        });
    });
    

