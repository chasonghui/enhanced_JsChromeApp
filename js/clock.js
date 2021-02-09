const clock = document.querySelector(".js-clock .clock__text");
const day = document.querySelector(".js-date .day__text");
function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  clock.innerHTML = time;
  return;
}
function getDate(){
  const week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
  const now=new Date();
  const month=now.getMonth()+1;
  const date=now.getDate();
  const whatDay=week[now.getDay()];
  const year=now.getFullYear();
  const getdate=`${year}.${month}.${date}.${whatDay}`;
  day.innerHTML = getdate;
  return;
}
function init() {
  getDate();
  getTime();
  setInterval(getTime, 1000);
  return;
}

init();
