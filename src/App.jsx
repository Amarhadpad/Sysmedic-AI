import { useEffect, useState } from "react";
import { getDashboard } from "./api";

import SystemCard from "./components/SystemCard";
import DiagnosisCard from "./components/DiagnosisCard";
import HealthScore from "./components/HealthScore";


function App() {


  const [data, setData] = useState(null);



  useEffect(() => {


    const load = () => {

      getDashboard()
        .then(setData)
        .catch(err => console.log(err));

    };


    load();


    const timer = setInterval(
      load,
      3000
    );


    return () => clearInterval(timer);


  }, []);





  if (!data)

    return (

      <div
        className="
        h-screen
        flex
        items-center
        justify-center
        text-3xl
        "
      >

        Loading SysMedic AI...

      </div>

    );





  const cpu = Number(data.system.cpu);
  const ram = Number(data.system.ram);
  const disk = Number(data.system.disk);



  return (

    <div
      className="
      min-h-screen
      bg-slate-950
      text-white
      p-8
      "
    >



      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >

        🩺 SysMedic AI

      </h1>





      {/* SYSTEM HEALTH CARDS */}


      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-5
        "
      >



        <SystemCard

          title="CPU"

          value={
            cpu.toFixed(1) + "%"
          }

          icon="⚡"

          status={
            cpu > 85
              ?
              "Critical"
              :
              cpu > 60
                ?
                "Warning"
                :
                "Normal"
          }

        />





        <SystemCard

          title="RAM"

          value={
            ram.toFixed(1) + "%"
          }

          icon="🧠"

          status={
            ram > 85
              ?
              "Critical"
              :
              ram > 60
                ?
                "Warning"
                :
                "Normal"
          }

        />





        <SystemCard

          title="Disk"

          value={
            disk.toFixed(1) + "%"
          }

          icon="💾"

          status={
            disk > 90
              ?
              "Critical"
              :
              disk > 70
                ?
                "Warning"
                :
                "Normal"
          }

        />





        <HealthScore

          cpu={cpu}

          ram={ram}

          disk={disk}

        />



      </div>







      {/* APPLICATIONS + AI */}



      <div
        className="
        mt-8
        grid
        md:grid-cols-2
        gap-6
        "
      >






        {/* TOP APPLICATIONS */}



        <div
          className="
          bg-slate-800
          rounded-xl
          p-6
          "
        >


          <h2
            className="
            text-xl
            font-bold
            mb-4
            "
          >

            🔥 Top Resource Consumers

          </h2>





          {

            data.topProcesses.map(

              (p, i) => (


                <div

                  key={i}

                  className="
                  mt-3
                  bg-slate-900
                  p-4
                  rounded-lg
                  "

                >


                  <div
                    className="
                    flex
                    justify-between
                    "
                  >

                    <span>
                      {p.name}
                    </span>


                    <span>
                      RAM {Number(p.memory).toFixed(1)}%
                    </span>


                  </div>





                  <div
                    className="
                    mt-2
                    h-2
                    bg-slate-700
                    rounded
                    "
                  >

                    <div

                      className="
                      h-2
                      bg-blue-500
                      rounded
                      "

                      style={{

                        width:
                          `${p.memory}%`

                      }}

                    />

                  </div>



                </div>


              )

            )

          }



        </div>








        {/* AI DIAGNOSIS */}



        <DiagnosisCard

          health={data.health}

        />




      </div>




    </div>

  );


}


export default App;