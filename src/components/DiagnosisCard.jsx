function DiagnosisCard({health}){


return (

<div className="
bg-slate-800
rounded-xl
p-6
border
border-slate-700
">


<h2 className="
text-xl
font-bold
">

🧠 AI Diagnosis

</h2>



<div className="
mt-3
text-lg
">

Status:

<span className="
text-yellow-400
ml-2
">

{health.status}

</span>


</div>



{

health.issues.map(
(issue,index)=>(


<div 
key={index}
className="
mt-4
bg-slate-900
p-4
rounded-lg
">


<p>

⚠ {issue.problem}

</p>


<p className="
text-gray-400
mt-1
">

💡 {issue.solution}

</p>


</div>


)

)


}



</div>


);


}


export default DiagnosisCard;