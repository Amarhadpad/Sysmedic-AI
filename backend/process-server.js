const express = require("express");
const cors = require("cors");
const si = require("systeminformation");


const app = express();

app.use(cors());



function formatMemory(percent,totalRAM){


    const bytes =
    (percent / 100) * totalRAM;


    const gb =
    bytes /
    1024 /
    1024 /
    1024;


    if(gb >= 1){

        return gb.toFixed(2)+" GB";

    }


    const mb =
    bytes /
    1024 /
    1024;


    return mb.toFixed(0)+" MB";

}





app.get("/processes", async(req,res)=>{


try{


const systemMemory =
await si.mem();



const processes =
await si.processes();



const list =
processes.list

.map(process=>({


name:
process.name,


pid:
process.pid,


cpu:
Number(
process.cpu.toFixed(2)
),


memoryPercent:
Number(
process.mem.toFixed(2)
),


memory:
formatMemory(
process.mem,
systemMemory.total
)


}))



.filter(
p =>
p.cpu > 0 ||
p.memoryPercent > 0
)



.sort(
(a,b)=>
b.memoryPercent -
a.memoryPercent
)



.slice(0,10);



res.json(list);



}
catch(error){


res.status(500)
.json({

error:error.message

});


}



});




app.listen(5001,()=>{


console.log(
"Process analyzer running on port 5001"
);


});