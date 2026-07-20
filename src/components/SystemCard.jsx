function SystemCard({title,value,icon,status}){


return (

<div className="
bg-slate-800
rounded-xl
p-5
shadow-lg
border
border-slate-700
">


<div className="
text-gray-400
text-sm
">

{icon} {title}

</div>


<div className="
text-3xl
font-bold
mt-3
">

{value}

</div>


{
status &&
<div className="
mt-2
text-yellow-400
">

{status}

</div>
}


</div>

);


}


export default SystemCard;