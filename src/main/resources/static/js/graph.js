
let myChart;

// 그래프 초기화 함수
function initializeChart(type, labels, data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // 기존 그래프 제거
    if (myChart) {
        myChart.destroy();
    }

        // 그래프 유형에 따라 범례 표시 여부 설정
const shouldDisplayLegend = type === 'doughnut' || type === 'pie';

    // 각 요소에 대해 다른 색상을 지정
    const colors = [
    'rgba(255, 99, 132, 0.8)', // 빨간색
    'rgba(54, 162, 235, 0.8)', // 파란색
    'rgba(255, 206, 86, 0.8)', // 노란색
    'rgba(75, 192, 192, 0.8)', // 녹색
    'rgba(153, 102, 255, 0.8)', // 보라색
    'rgba(255, 159, 64, 0.8)'  // 주황색
    ];

    // 새로운 그래프 생성
    myChart = new Chart(ctx, {
        type: type, // 선택한 그래프 유형
        data: {
            labels: labels, // X축 레이블
            datasets: [{
                label: 'Graph Data', // 그래프 데이터 레이블
                data: data, // 데이터 포인트
                backgroundColor: type === 'doughnut' || type === 'pie'
                ? [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 64, 0.4)'
                ].slice(0, data.length)
                : 'rgba(104, 86, 82,0.2)', // 도넛/파이 그래프일 때만 색상 배열 적용
                borderColor: 'rgba(104, 86, 82)',
                borderWidth: 1

               // borderColor: 'rgba(104, 86, 82)', // 선 색상
                //backgroundColor: 'rgba(75, 192, 192, 0.2)', // 배경 색상
              //  borderWidth: 1 // 선 두께
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: shouldDisplayLegend // 조건에 따라 범례 표시
                }
            },
            scales: type === 'line' || type === 'bar'
            ? {
                x: { beginAtZero: true }, // X축 설정
                y: { beginAtZero: true }  // Y축 설정
            }
            : {}   // 도넛과 파이 그래프에서는 축 비활성화
        }
    });
}


// 그래프 업데이트 함수
function updateGraph() {
    // 그래프 유형 가져오기
    const graphType = document.getElementById('graphType').value;

    // 레이블과 데이터 입력값 가져오기
    const labelsInput = document.getElementById('labelsInput').value.trim();
    const dataInput = document.getElementById('dataInput').value.trim();

    // 입력값 유효성 검사
    if (!labelsInput || !dataInput) {
        alert("Please enter both labels and data.");
        return;
    }

    // 레이블과 데이터 배열로 변환
    const labels = labelsInput.split(',').map(label => label.trim());
    const dataPoints = dataInput.split(',').map(item => parseFloat(item.trim()));

    // 유효하지 않은 숫자가 있는지 확인
    if (dataPoints.some(isNaN)) {
        alert("Please enter valid numbers for data.");
        return;
    }

    // 레이블과 데이터 길이 일치 여부 확인
    if (labels.length !== dataPoints.length) {
        alert("The number of labels and data points must match.");
        return;
    }

    // 그래프 초기화 함수 호출
    initializeChart(graphType, labels, dataPoints);

    // 그래프 컨테이너 표시
    const graphContainer = document.getElementById('graph-container');
    graphContainer.style.display = 'block'; // 그래프 컨테이너를 표시
}

