// class/select
const issueCount = document.getElementById('issue-count');
const issuesCard= document.getElementById('issue-card');




// all isue load and display

async function alIssue() {

     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data.data)

    displayIssues(data.data)
}





// array

const createElements=(arr)=>{

    const htmLElement = arr.map(el => `<button class=" flex justify-center items-center gap-1 ${el ==='bug'?'text-error border border-[#FECACA] bg-[#FECACA]/40 ' : el==='documentation'?'bg-gray-300 text-yellow'
       : el =='help wanted'? 'bg-warning/40 text-warning' : 
       el === 'enhancement' ? 'bg-success/50 text-success' :'bg-secondary/40 text-secondary'}  px-3 py-1  rounded-md "> <img src="${el==='bug'?'./assets/BugDroid.png': el==='help wanted'?'./assets/Vector.png' :'./assets/Sparkle.png' } " alt="" >  ${el}</button>`)

    // console.log(htmLElement)
     return htmLElement.join('');

}




function displayIssues(issues){


    // array

const createElements=(arr)=>{

    const htmLElement = arr.map(el => `<button class=" flex justify-center items-center gap-1 ${el ==='bug'?'text-error border border-[#FECACA] bg-[#FECACA]/40 ' : el==='documentation'?'bg-gray-300 text-yellow'
       : el =='help wanted'? 'bg-warning/40 text-warning' : 
       el === 'enhancement' ? 'bg-success/50 text-success' :'bg-secondary/40 text-secondary'}  px-3 py-1  rounded-md "> <img src="${el==='bug'?'./assets/BugDroid.png': el==='help wanted'?'./assets/Vector.png' :'./assets/Sparkle.png' } " alt="" >  ${el.toUpperCase()}</button>`)

    // console.log(htmLElement)
     return htmLElement.join('');

}

    

    // issues calculation

    const totalCount = issues.length
//    console.log(totalCount)
 issueCount.innerText = `${totalCount} Issues`
    

    // console.log(issues)

    issues.forEach((issue) => {



        const cardIssues = document.createElement('div')
        cardIssues.innerHTML=`
        
        
        
       <div class="p-6 ${issue.status ==='open'?'border-t-2  border-[#00A96E]':'border-t-2 border-purple-700'} shadow-lg rounded-xl space-y-2">

        <div class="flex justify-between items-center">
        <img src="${issue.status==='open'?'./assets/Open-Status.png' : './assets/Closed- Status .png'}" class="h-6">
        <p class="${ issue.priority==='high'?'bg-red-100 text-[#EF4444]': issue.priority === 'medium'?'bg-warning/20 text-warning': 'bg-neutral-content text-gray font-bold'} px-2 py-1 rounded-md text-xs font-bold">${issue.priority}</p>
        </div>

        <div class="pt-3">
            <h2 class="font-semibold text-[#1F2937]">${issue.title}</h2>
        <p class=" line-clamp-2  text-[#64748B]">${issue.description}</p>
        </div>
<!-- button -->
        <div class="flex items-center gap-3 pt-5">

        ${ createElements(issue.labels)}


        </div>


           <div class="pt-5 ">

             <hr class="text-gray-400 opacity-35  ">
                <div class="space-y-2 pt-5">
                    <p class="text-[#64748B] text-[12]">${issue.author}</p>
                    <p class="text-[#64748B] text-[12]">${new Date(issue.createdAt).toLocaleDateString('en-US')}</p>
           </div>


        </div>




       </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        `

        issuesCard.append(cardIssues)



    })


}

 alIssue()