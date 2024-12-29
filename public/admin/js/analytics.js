document.addEventListener('DOMContentLoaded', function() {
    // Traffic Overview Chart
    const trafficCtx = document.getElementById('trafficOverview');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Page Views',
                    data: [10000, 15000, 12000, 18000, 16000, 21000, 19000, 23000, 22000, 25000, 24000, 28000],
                    borderColor: '#5e72e4',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // User Demographics Chart
    const demographicsCtx = document.getElementById('userDemographics');
    if (demographicsCtx) {
        new Chart(demographicsCtx, {
            type: 'pie',
            data: {
                labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
                datasets: [{
                    data: [15, 30, 25, 20, 10],
                    backgroundColor: ['#5e72e4', '#2dce89', '#11cdef', '#fb6340', '#f5365c']
                }]
            }
        });
    }

    // Device Distribution Chart
    const deviceCtx = document.getElementById('deviceDistribution');
    if (deviceCtx) {
        new Chart(deviceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet'],
                datasets: [{
                    data: [45, 40, 15],
                    backgroundColor: ['#5e72e4', '#2dce89', '#11cdef']
                }]
            }
        });
    }
}); 