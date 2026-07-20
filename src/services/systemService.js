import si from "systeminformation";


export async function getSystemInfo(){

    const cpu = await si.currentLoad();

    const memory = await si.mem();

    const disk = await si.fsSize();


    return {

        cpu:
        cpu.currentLoad.toFixed(2),


        ram:
        (
            (memory.used / memory.total) * 100
        ).toFixed(2),


        disk:
        (
            disk[0].used /
            disk[0].size *
            100
        ).toFixed(2)

    };

}