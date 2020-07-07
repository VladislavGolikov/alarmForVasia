const areaRealTime=document.querySelector('.realtime');
const alarmClockBlock=document.querySelector('.alarmclockblock');

const buttonBuildAlarmClock=document.querySelector('.buildalarmclock');
const buttonAllStops=document.querySelector('.allstops');
const buttonAllRem=document.querySelector('.allrem');

let buttonOnAlarm=document.querySelectorAll('.onalarm');
let buttonOffAlarm=document.querySelectorAll('.offalarm');
let buttonRemAlarm=document.querySelectorAll('.remalarm');

const areaAlarmClock=document.querySelector('.alarmclock');
const placeForInsert=document.querySelector('.alarmmenu');
const dataInsertAlarmClock=areaAlarmClock.outerHTML;
setInterval(realTimeToPage,100);

function realTimeToPage() {
    let clockReal=new Date();
    areaRealTime.innerHTML=`
    ${beforeZero(clockReal.getHours())} :
    ${beforeZero(clockReal.getMinutes())} :
    ${beforeZero(clockReal.getSeconds())}`;
}

function beforeZero(num) {
    if (num<10){num='0'+num;}
    return num;
}
document.addEventListener('click',parsingClicks);
/*--------------------- конец верстки ---------------------------------------------------*/

/*--------------------- начало класса ---------------------------------------------------*/

class AlarmClock {
    constructor(timeAlarm) {
        this.timeHours=parseInt(timeAlarm);
        this.timeMinutes=parseInt(timeAlarm.slice(3,5));
        this.timerId;
        this.runAlarmWav=new Audio('vinvlad.ogg');
    }

    vasyaGoUp(onOff,runAlarmWav) {
        if (onOff) {
            runAlarmWav.loop=true;
            runAlarmWav.play();
        }else{
            this.runAlarmWav.pause();
        }
    }

    doRightTime() {
        let timeHoursToDo=this.timeHours;
        let timeMinutesToDo=this.timeMinutes;
        let timeSecToDo=(timeHoursToDo*60+timeMinutesToDo)*60;

        let clockRealForDo=new Date();
        let timeSecReal=(clockRealForDo.getHours()*60+clockRealForDo.getMinutes())*60+clockRealForDo.getSeconds();
        let secDiff=timeSecToDo-timeSecReal;

        if (secDiff<0) {secDiff+=86400} /* количество секунд в сутках */

        this.timerId=setTimeout(this.vasyaGoUp, secDiff*1000, true, this.runAlarmWav);
  //  alert('запуск'+this.timeHours+this.timeMinutes);
    }
    stopRefrigerator() {
  //      alert('останав'+this.timeHours+this.timeMinutes);
        clearTimeout(this.timerId);
    }
    updateTimeAlarm(newTime) {
        this.timeHours=parseInt(newTime);
        this.timeMinutes=parseInt(newTime.slice(3,5));
    }

}

/*------------------------ конец класса ------------------------------------------------*/

function parsingClicks() {
    let onIndex , offIndex , remIndex;
    buttonOnAlarm.forEach(function(el,ind){if (el===event.target) onIndex=ind});
    buttonOffAlarm.forEach(function(el,ind){if (el===event.target) offIndex=ind});
    buttonRemAlarm.forEach(function(el,ind){if (el===event.target) remIndex=ind});

    event.stopPropagation();
    switch (event.target) {
        case buttonBuildAlarmClock: buildAlarmClock(); break;
        case buttonAllStops: allStops(); break;
        case buttonAllRem: allRem(); break;
        case buttonOnAlarm[onIndex]:
            let timeAlarm=buttonOnAlarm[onIndex].previousElementSibling.value;
            onAlarm(onIndex,timeAlarm); break;
        case buttonOffAlarm[offIndex]: alarmCollection[offIndex].vasyaGoUp(false); break;
        case buttonRemAlarm[remIndex]: remAlarm(remIndex); break;
    }
}

function buildAlarmClock() {
    placeForInsert.insertAdjacentHTML('beforebegin',dataInsertAlarmClock);
    updateDom();
}

function allStops() {
    for (i=0;i<=buttonOnAlarm.length-1;i++){

        if (buttonOnAlarm[i].classList.contains('notorder')&&
            !buttonAllStops.classList.contains('notorder')||
            !buttonOnAlarm[i].classList.contains('notorder')&&
            buttonAllStops.classList.contains('notorder')) {
            onAlarm(i,buttonOnAlarm[i].previousElementSibling.value);
        }

    }
    buttonAllStops.classList.toggle('notorder');

}

function allRem() {
for (i=0;i<=buttonRemAlarm.length-1;){remAlarm(i)}
}

function onAlarm(position,timeAlarm) {
    if (alarmCollection[position]===undefined) {
        alarmCollection[position]=new AlarmClock(timeAlarm);
    }

    if (buttonOnAlarm[position].classList.contains('notorder')) {
        alarmCollection[position].updateTimeAlarm(timeAlarm);
        alarmCollection[position].doRightTime();
    }else{
        alarmCollection[position].stopRefrigerator();
    }
    buttonOnAlarm[position].classList.toggle('notorder');
}

function remAlarm(position) {
    alarmClockBlock.childNodes[position+1].remove();
    alarmCollection.splice(position,1);
    updateDom();
}

function updateDom() {
    buttonOnAlarm=document.querySelectorAll('.onalarm');
    buttonOffAlarm=document.querySelectorAll('.offalarm');
    buttonRemAlarm=document.querySelectorAll('.remalarm');
}
/*---------------- конец фронта -------------------*/
let alarmCollection=[];








/*---------- пресервы! ----------------------------------------*/
function doRightTime(timeAlarm,nameToDo) {
    let timeHoursToDo=parseInt(timeAlarm);
    let timeMinutesToDo=parseInt(timeAlarm.slice(3,5));
    let timeSecToDo=(timeHoursToDo*60+timeMinutesToDo)*60;

    let clockRealForDo=new Date();
    let timeSecReal=(clockRealForDo.getHours()*60+clockRealForDo.getMinutes())*60+clockRealForDo.getSeconds();
    let secDiff=timeSecToDo-timeSecReal;

    if (secDiff<0) {secDiff+=86400} /* количество секунд в сутках */
  //  alert(`сделаем через ${secDiff} секунд!`);
    let timerId=setTimeout(nameToDo, secDiff*1000);
    return timerId;
}
/*---------- пресервы! ----------------------------------------*/
