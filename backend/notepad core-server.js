const express = require("express");
const cors = require("cors");
const si = require("systeminformation");
const { exec } = require("child_process");


const app = express();

app.use(cors());
app.use(express.json());



// Network Collector

function getNetworkSpeed(){

    return new Promise((resolve)=>{


        exec(
            "powershell -ExecutionPolicy Bypass -File network-speed.ps1",
            (error,stdout)=>{


                if(error){

                    resolve({
                        upload:"0 KB/s",
                        download:"0 KB/s"
                    });

                    return;
                }


                try{

                    const data =
                    JSON.parse(stdout);


                    resolve({

                        upload:
                        data.upload+" KB/s",

                        download:
                        data.download+" KB/s"

                    });


                }
                catch{

                    resolve({

                        upload:"0 KB/s",
                        download:"0 KB/s"

                    });

                }


            }
        );


    });

}





// Diagnosis Engine

function diagnose(cpu,ram,disk){


    let issues=[];



    if(cpu > 85){

        issues.push({

            type:"CPU",

            problem:"High CPU usage",

            solution:
            "Close heavy background applications"

        });

    }



    if(ram > 85){

        issues.push({

            type:"RAM",

            problem:"High memory usage",

            solution:
            "Close unused applications"

        });

    }



    if(disk > 90){

        issues.push({

            type:"DISK",

            problem:"Low storage space",

            solution:
            "Clean unnecessary files"

        });

    }



    return {

        status:
        issues.length
        ?
        "WARNING"
        :
        "HEALTHY",

        issues

    };

}





// Dashboard API

app.get("/dashboard", async(req,res)=>{


try{


const cpu =
await si.currentLoad();


const memory =
await si.mem();


const disk =
await si.fsSize();



const network =
await getNetworkSpeed();





const processes =
await si.processes();




const topProcesses =

processes.list

.map(p=>({


name:p.name,


cpu:
Number(
p.cpu.toFixed(2)
),


memory:
Number(
p.mem.toFixed(2)
)


}))


.sort(
(a,b)=>
b.memory-a.memory
)


.slice(0,10);





const cpuUsage =
Number(
cpu.currentLoad.toFixed(2)
);


const ramUsage =
Number(
(
memory.used /
memory.total *
100
)
.toFixed(2)
);



const diskUsage =
Number(
(
disk[0].used /
disk[0].size *
100
)
.toFixed(2)
);




res.json({


system:{


cpu:
cpuUsage,


ram:
ramUsage,


disk:
diskUsage,


network

},



topProcesses,



health:
diagnose(
cpuUsage,
ramUsage,
diskUsage
)


});



}
catch(error){


res.status(500)
.json({

error:error.message

});


}



});





app.listen(5000,()=>{


console.log(
"SysMedic Core running on port 5000"
);


});