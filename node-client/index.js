// capture performance and send it the socket.io sever

import os from 'os';


const performanceData= ()=>{
    return new Promise(async (resolve,reject)=>{
        
        // Free Memory
        let freeMemory = os.freemem() / (1024 * 1024);
        // Total Memory
        let totalMemory = os.totalmem() / (1024 * 1024);

        // Memory Usage
        let memoryUsage = totalMemory - freeMemory;
        // OS Type
        let osType = os.type();

        // Uptime
        let uptime = os.uptime() / 60;

        // Cpu Info
        let cpus = os.cpus();
        // model 
        let model = cpus[0].model;
        // num of cores
        let numOfCores = cpus.length;
        // speed
        let speed = cpus[0].speed;
        const cpuLoad = await performancePercentage();
        resolve({
            speed,
            model,
            cpuLoad,
            numOfCores,
            uptime,
            memoryUsage,
            totalMemory,
            freeMemory,
            osType
        })
    })
}

const cpuAverage =  ()=>{
    const cpus = os.cpus();
    let idleTime = 0, totalTime = 0;
    cpus.forEach(core=>{
        for(const time in core.times){
            totalTime += core.times[time]
        }
        idleTime +=  core.times.idle
    });
    return {idleTime,totalTime};
}

const performancePercentage = () =>{
    return new Promise((resolve)=>{
        const start = cpuAverage();
        setTimeout(()=>{
            const end = cpuAverage();
            const idleDiff = end.idleTime - start.idleTime;
            const totalDiff = end.totalTime - start.totalTime;
            const perc = 100 - Math.floor(100 * idleDiff /totalDiff) ;
            resolve(perc) 
        },100)
    })
}

//setInterval(()=>performanceData().then(res=>console.log(res)),1000);
performanceData().then(res=>console.log(res))