const clockTimeElement = document.querySelector('#clock-time');

const hourOffsets = [
    135, 267, 398, 534, 678, 840,
    1058, 1334, 1645, 1926, 2104, 2243,
    2371, 2496, 2626, 2773, 2978, 3299,
    3590, 3834, 3984, 4100, 4208, 4319
];

function calcTime(secondsSinceMidnight) {
    const inGameOffset = Math.floor(secondsSinceMidnight) % 4320;
    const currentHour = hourOffsets.filter(hourOffset => hourOffset < inGameOffset).length;
    const startOffset = (currentHour > 0) ? (hourOffsets[currentHour - 1] + 1) : 0;
    const endOffset = hourOffsets[currentHour];
    const currentMinute = Math.round(((inGameOffset - startOffset) / (endOffset - startOffset)) * 59);

    return `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
}

function getCurrentSecondsSinceMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0);
    const secondsSinceMidnight = (now - midnight) / 1000;

    // Adding 1440 seconds as per the original Python script
    return secondsSinceMidnight + 1440;
}

function main() {
    setInterval(() => {
        const secondsSinceMidnight = getCurrentSecondsSinceMidnight();
        const inGameTime = calcTime(secondsSinceMidnight);
        clockTimeElement.innerText = inGameTime;
    }, 100);
}

main();
