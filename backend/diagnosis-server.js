const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());


app.use(express.json());



app.post("/diagnose",(req,res)=>{


    const {

        cpu,
        ram,
        disk

    } = req.body;



    let issues = [];



    if(cpu > 85){

        issues.push({

            type:"CPU",
            problem:"High CPU usage",
            reason:
            "Processor usage is above 85%",
            solution:
            "Close heavy applications running in background"

        });

    }



    if(ram > 85){

        issues.push({

            type:"RAM",
            problem:"High memory usage",
            reason:
            "RAM usage is above 85%",
            solution:
            "Close unused applications or browser tabs"

        });

    }



    if(disk > 90){

        issues.push({

            type:"DISK",
            problem:"Low storage space",
            reason:
            "Disk usage is above 90%",
            solution:
            "Remove unnecessary files"

        });

    }





    let status =
    issues.length > 0
    ?
    "WARNING"
    :
    "HEALTHY";





    res.json({

        status,

        issues

    });



});





app.listen(5002,()=>{

console.log(
"AI diagnosis engine running on port 5002"
);

});