import React from "react";


function calculateHealth(cpu, ram, disk) {

    let score = 100;

    let issues = [];


    if (cpu > 85) {

        score -= 20;

        issues.push(
            "High CPU usage detected"
        );

    }


    if (ram > 85) {

        score -= 25;

        issues.push(
            "Memory usage is critical"
        );

    }


    if (disk > 90) {

        score -= 15;

        issues.push(
            "Disk space is low"
        );

    }


    return {
        score,
        issues
    };

}





export default function HealthScore({
    cpu,
    ram,
    disk
}) {


    const {
        score,
        issues

    } = calculateHealth(
        cpu,
        ram,
        disk
    );





    let status = "Healthy";

    let emoji = "🟢";

    let badge =
        "bg-green-500/20 text-green-400";




    if(score < 70){

        status =
        "Needs Attention";

        emoji =
        "⚠️";

        badge =
        "bg-yellow-500/20 text-yellow-400";

    }




    if(score < 40){

        status =
        "Critical";

        emoji =
        "🔴";

        badge =
        "bg-red-500/20 text-red-400";

    }






    return (

        <div
            className="
            bg-slate-800
            rounded-xl
            p-6
            shadow-lg
            "
        >



            <h2
                className="
                text-xl
                font-bold
                "
            >

                🧠 System Health

            </h2>





            <div
                className="
                mt-4
                text-5xl
                font-bold
                "
            >

                {score}

                <span
                    className="
                    text-2xl
                    text-slate-400
                    "
                >

                    /100

                </span>


            </div>







            <div
                className={`
                mt-4
                inline-block
                px-4
                py-2
                rounded-full
                font-semibold
                ${badge}
                `}
            >

                {emoji} {status}


            </div>








            <div
                className="
                mt-5
                space-y-2
                "
            >


            {

                issues.length === 0 ?


                (

                    <p
                    className="
                    text-green-400
                    "
                    >

                    ✅ System running normally

                    </p>

                )


                :


                issues.map(
                    (issue,index)=>(

                    <p
                    key={index}

                    className="
                    text-red-400
                    "
                    >

                    ✗ {issue}

                    </p>

                    )

                )


            }


            </div>





        </div>

    );

}