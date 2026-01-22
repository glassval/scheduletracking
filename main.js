
const schedule = {
    1: { 
        1: ["07:45", "08:35"], 2: ["08:41", "09:34"], 3: ["09:40", "10:30"], 
        4: ["10:36", "11:26"], 5: ["11:32", "12:22"], 6: ["12:28", "13:18"], 
        7: ["13:24", "14:14"], 8: ["14:20", "15:10"]
    },
    2: { 
        1: ["07:45", "08:30"], 2: ["08:35", "09:20"], "HOMEROOM": ["09:25", "10:10"], 
        3: ["10:15", "11:00"], 4: ["11:05", "11:50"], 5: ["11:55", "12:40"], 
        6: ["12:45", "13:30"], 7: ["13:35", "14:20"], 8: ["14:25", "15:10"]
    },
    3: { 
        1: ["09:00", "09:42"], 2: ["09:47", "10:29"], 3: ["10:34", "11:16"], 
        4: ["11:21", "12:03"], 5: ["12:08", "12:49"], 6: ["12:54", "13:36"], 
        7: ["13:41", "14:23"], 8: ["14:28", "15:10"]
    },
    4: { 
        1: ["07:45", "08:30"], 2: ["08:35", "09:20"], "HOMEROOM": ["09:25", "10:10"], 
        3: ["10:15", "11:00"], 4: ["11:05", "11:50"], 5: ["11:55", "12:40"], 
        6: ["12:45", "13:30"], 7: ["13:35", "14:20"], 8: ["14:25", "15:10"]
    },
    5: { 
        1: ["07:45", "08:35"], 2: ["08:41", "09:34"], 3: ["09:40", "10:30"], 
        4: ["10:36", "11:26"], 5: ["11:32", "12:22"], 6: ["12:28", "13:18"], 
        7: ["13:24", "14:14"], 8: ["14:20", "15:10"]
    }
};


function parseTimeToSeconds(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 3600 + m * 60;
}

function updateTimer() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    const periods = schedule[dayOfWeek];
    let currentPeriod = null;
    
    if (periods) {
        for (const [period, times] of Object.entries(periods)) {
            const start = parseTimeToSeconds(times[0]);
            const end = parseTimeToSeconds(times[1]);
            if (currentSeconds >= start && currentSeconds <= end) {
                currentPeriod = period;
                break;
            }
        }
    }

    if (currentPeriod) {
        const endSeconds = parseTimeToSeconds(periods[currentPeriod][1]);
        const diff = endSeconds - currentSeconds;
        if (diff > 0) {
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            document.getElementById('timer').textContent = '00:00';
        }
        document.getElementById('period').textContent = `Period ${currentPeriod}`;
    } else {
        document.getElementById('timer').textContent = '00:00';
        document.getElementById('period').textContent = 'No current period';
    }
}


updateTimer();
setInterval(updateTimer, 1000);
