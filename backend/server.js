const express = require("express");
const cors = require("cors");
const si = require("systeminformation");
const { exec } = require("child_process");


const app = express();

app.use(cors());



function getNetworkSpeed(){

    return new Promise((resolve)=>{


        exec(
    "powershell -ExecutionPolicy Bypass -File network-speed.ps1",
    (error, stdout, stderr)=>{



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
                        data.upload + " KB/s",


                        download:
                        data.download + " KB/s"

                    });


                }
                catch(err){


                    resolve({

                        upload:"0 KB/s",
                        download:"0 KB/s"

                    });


                }


            }
        );


    });

}





app.get("/system", async(req,res)=>{


    try{


        const cpu =
        await si.currentLoad();


        const memory =
        await si.mem();


        const disk =
        await si.fsSize();



        const network =
        await getNetworkSpeed();



        res.json({


            cpu:
            cpu.currentLoad.toFixed(2),



            ram:
            (
                memory.used /
                memory.total *
                100
            ).toFixed(2),



            disk:
            disk.length
            ?
            (
                disk[0].used /
                disk[0].size *
                100
            ).toFixed(2)
            :
            0,



            upload:
            network.upload,


            download:
            network.download


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
        "System monitor running on port 5000"
    );

});
