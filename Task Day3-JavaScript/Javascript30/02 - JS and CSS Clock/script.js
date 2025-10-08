const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const alarmSound = document.getElementById('alarmSound');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const stopAlarmBtn = document.getElementById('stopAlarmBtn');
const alarmStatus = document.getElementById('alarmStatus');

let alarmTime = null;
let alarmSet = false;

function setDate() {
  const now = new Date();

  // Clock hands rotation
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  // Check alarm
  if (alarmSet) {
    const currentTime = now.toTimeString().slice(0, 5);
    if (currentTime === alarmTime) {
      alarmSound.play();
      alarmStatus.textContent = `⏰ Alarm ringing at ${alarmTime}!`;
      stopAlarmBtn.disabled = false;
    }
  }
}

// Set Alarm
setAlarmBtn.addEventListener('click', () => {
  alarmTime = alarmTimeInput.value;
  if (!alarmTime) {
    alert('Please select a valid time!');
    return;
  }
  alarmSet = true;
  alarmStatus.textContent = `✅ Alarm set for ${alarmTime}`;
  setAlarmBtn.disabled = true;
  stopAlarmBtn.disabled = false;
});

// Stop Alarm
stopAlarmBtn.addEventListener('click', () => {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmSet = false;
  alarmStatus.textContent = `❌ Alarm stopped`;
  setAlarmBtn.disabled = false;
  stopAlarmBtn.disabled = true;
});

setInterval(setDate, 1000);
setDate();
