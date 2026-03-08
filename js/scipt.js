// class/select
const issueCount = document.getElementById('issue-count');
const issuesCard= document.getElementById('issue-card');
const loadingSpinner = document.getElementById('loading-spinner')
const allBtn = document.getElementById('btn-all')
const btnOpen = document.getElementById('btn-open')
const btnClosed = document.getElementById('btn-closed')
const showIssueModal = document.getElementById('my_modal_5')
const modalId = document.getElementById('modal')


let currentStatus = []


 // label array

const createElements=(arr)=>{

    const htmLElement = arr.map(el => `<button class=" flex  justify-center items-center gap-1 ${el ==='bug'?'text-error border border-[#FECACA] bg-[#FECACA]/40 ' : el==='documentation'?'bg-gray-300 text-yellow'
       : el =='help wanted'? 'bg-warning/40 text-warning' : 
       el === 'enhancement' ? 'bg-success/50 text-success' :'bg-secondary/40 text-secondary'}  px-3 py-1  rounded-md "> <img src="${el==='bug'?'./assets/BugDroid.png': el==='help wanted'?'./assets/Vector.png' :'./assets/Sparkle.png' } " alt="" >  ${el.toUpperCase()}</button>`)

    // console.log(htmLElement)
     return htmLElement.join('');

}







// all isue load and display

async function alIssue() {
    
    loadingSpinner.classList.remove('hidden')
    loadingSpinner.classList.add('flex')

     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data.data)
    loadingSpinner.classList.add('hidden')

    currentStatus =data.data;

    displayIssues(currentStatus)
}



// display issue card

function displayIssues(issues){

   // issues calculation

 const totalCount = issues.length


//    console.log(totalCount)

 issueCount.innerText = `${totalCount} Issues`

    // console.log(issues)

    issuesCard.innerHTML=''
    issues.forEach((issue) => {



        const cardIssues = document.createElement('div')


        cardIssues.innerHTML=`
        
        
        
       <div onclick="loadIssuesDetail('${issue.id}')" class="p-6 ${issue.status ==='open'?'border-t-2  border-[#00A96E]':'border-t-2 border-purple-700'} shadow-lg rounded-xl space-y-2">

        <div class="flex justify-between items-center"  >
        <img src="${issue.status==='open'?'./assets/Open-Status.png' : './assets/Closed- Status .png'}" class="h-6">
        <p class="${ issue.priority==='high'?'bg-red-100 text-[#EF4444]': issue.priority === 'medium'?'bg-warning/20 text-warning': 'bg-neutral-content text-gray font-bold'} px-2 py-1 rounded-md text-xs font-bold">${issue.priority}</p>
        </div>

        <div class="pt-3">
            <h2 class="font-semibold text-[#1F2937]">${issue.title}</h2>
        <p class=" line-clamp-2  text-[#64748B]">${issue.description}</p>
        </div>
<!-- button -->
        <div class=" flex flex-col md:flex-row my-4  items-center   gap-4  pt-5">

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




// Modal

  const loadIssuesDetail= async(id)=>{
    
     loadingSpinner.classList.remove('hidden')
    loadingSpinner.classList.add('flex')

     const res = await fetch (`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
     const data = await res.json();
     
      loadingSpinner.classList.add('hidden')

     displayIssueModal(data.data)
    

    showIssueModal.showModal()


}

const displayIssueModal =(issue) =>{


    modalId.innerHTML=`
    
    <h3 class="text-lg font-bold">${issue.title}</h3>
    
    <div class="flex items-center gap-3 mt-1 ">
      <div class="badge ${issue.status=='open'?'badge-success':'badge-error'}  text-white">${issue.status}</div>
      <p class="text-gray-400 text-xs">. Opened by ${issue.author} .</p>
      <span class="text-gray-400 text-xs" >${new Date(issue.updatedAt).toLocaleDateString('en-US')}</span>
    </div>

    <div class="flex gap-2 pt-7">

        ${ createElements(issue.labels)}

    </div>

    <p  class="  text-gray-400 text-xs pt-5">${issue.description}</p>

    <div class="flex  gap-50 items-center pt-8">

      <div class="space-y-1 " >
        <p  class="  text-gray-400 text-xs">Assignee:</p>
        <h4 class="font-bold text-xl" >${issue.assignee ? issue.assignee : ''}</h4>

      </div>

      <div class="space-y-1">
        <p  class="  text-gray-400 text-xs">Priority:</p>
        <div class="badge ${ issue.priority==='high'?'bg-red-100 text-[#EF4444]': issue.priority === 'medium'?'bg-warning/20 text-warning': 'bg-neutral-content text-gray font-bold'}">${issue.priority}</div>
      </div>


    </div>
    
    `
}








//  search
document.getElementById('btn-search').addEventListener('click',async ()=>{

    const input=document.getElementById('input-search');
    const searchValue=input.value.trim().toLowerCase();

    console.log(searchValue)

   
     const res = await fetch (`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
     const data = await res.json();



 displayIssues(data.data)
      
})





//  toggle

  function toggleBtn (id){

 

      // remove btn-primary from  all button 
    allBtn.classList.remove('btn-primary');
    btnOpen.classList.remove('btn-primary');
    btnClosed.classList.remove('btn-primary');


    
   //  added btn-active to all button 
    allBtn.classList.add('btn-outcome');
    btnOpen.classList.add('btn-outcome');
    btnClosed.classList.add('btn-outcome');
    

    // const selected = getElementId(id);

    const selected = document.getElementById(id);
  
    selected.classList.add('btn-primary');
    selected.classList.remove('btn-outcome');

    issuesCard.innerHTML=''

    if(id === 'btn-all'){

      displayIssues(currentStatus)

    } else if (id === 'btn-open'){
        
        const OpenIssue = currentStatus.filter(issue => issue.status ==='open')
        displayIssues(OpenIssue)
        
    }else{

  const closedIssue = currentStatus.filter(issue => issue.status ==='closed')
        displayIssues(closedIssue)
    }



 }



 alIssue()



