const styles = {
  "data-centered": {
    number:"01", category:"SHARED DATA", title:"Data-centered architecture",
    definition:"A central data store is shared by multiple independent components that read, add, update, or delete information. The store may act as a passive repository or, in a blackboard variation, notify clients when relevant data changes.",
    diagramTitle:"A shared repository",
    nodes:[
      {id:"clientA",label:"Admin portal",sub:"CLIENT",x:5,y:10,desc:"The admin portal asks the shared store to create or update a student's record."},
      {id:"clientB",label:"Student portal",sub:"CLIENT",x:67,y:10,desc:"The student portal reads information from the same central store, such as a profile or announcement."},
      {id:"store",label:"Central repository",sub:"SHARED DATA",x:36,y:42,desc:"The repository is the common source of stored information. Clients can access it without directly depending on each other." ,store:true},
      {id:"clientC",label:"Reports",sub:"CLIENT",x:5,y:72,desc:"A reporting component reads records from the repository to prepare summaries."},
      {id:"clientD",label:"Notification service",sub:"CLIENT",x:67,y:72,desc:"Another client can read relevant data and, in a blackboard-style variation, react to updates."}
    ],
    edges:[["clientA","store"],["clientB","store"],["store","clientC"],["store","clientD"]],
    steps:[
      ["Clients request data","A component sends a read or update request to the central repository."],
      ["Repository handles the request","The repository reads, adds, changes, or removes the requested information."],
      ["Shared data stays consistent","Other clients can access the same central source instead of keeping unrelated copies."],
      ["Clients use the result","Portals, reports, or other components continue their own work using the returned data."]
    ],
    work:["A client sends a read or update request.","The repository processes the data operation.","The result is available to other authorized clients.","Each client continues its own task."],
    exampleTitle:"College student-record system",
    exampleText:"An admin updates a student's course. The student portal and report generator read the updated record from the same database. They do not need to maintain separate, conflicting copies.",
    flow:["Admin portal","Shared database","Student portal"],
    pros:"Easy to share and integrate information; clients can often be added or changed independently.",
    cons:"The repository can become a bottleneck or single point of failure. Access control, concurrency, and data availability need careful design."
  },
  "data-flow": {
    number:"02", category:"PIPELINE PROCESSING", title:"Data-flow architecture",
    definition:"Input data moves through a sequence of processing components called filters. Pipes carry each filter's output to the next stage. Filters focus on their own transformation rather than the internal workings of neighboring filters.",
    diagramTitle:"From input to processed output",
    nodes:[
      {id:"input",label:"Input",sub:"RAW DATA",x:1,y:42,desc:"The pipeline receives the original input, such as an uploaded image or a text file."},
      {id:"filter1",label:"Validate",sub:"FILTER 01",x:23,y:42,desc:"The first filter checks the input and rejects invalid or unsupported data."},
      {id:"filter2",label:"Transform",sub:"FILTER 02",x:46,y:42,desc:"The next filter transforms the validated input, such as resizing an image or normalizing text."},
      {id:"filter3",label:"Optimize",sub:"FILTER 03",x:69,y:42,desc:"A later filter applies another independent processing step, such as compression or formatting."},
      {id:"output",label:"Output",sub:"RESULT",x:88,y:42,desc:"The final output is ready to save, display, or pass to another system."}
    ],
    edges:[["input","filter1"],["filter1","filter2"],["filter2","filter3"],["filter3","output"]],
    steps:[
      ["Receive input","Raw data enters the pipeline."],
      ["Validate the data","A filter checks whether the input is usable."],
      ["Transform and optimize","Each filter performs one defined operation and passes its output along a pipe."],
      ["Produce output","The final stage produces the processed result."]
    ],
    work:["Input data enters the first filter.","Each filter performs one transformation.","Pipes pass output to the next filter.","The final filter produces the result."],
    exampleTitle:"Image-processing pipeline",
    exampleText:"When an image is uploaded, a pipeline can validate its format, resize it, adjust its properties, compress it, and save the final image. Each step can be tested separately.",
    flow:["Input","Validate","Resize","Compress","Output"],
    pros:"Processing steps are modular, reusable, and easier to test or replace independently.",
    cons:"A strict pipeline may add processing overhead. It is less natural for systems requiring frequent shared state or complex back-and-forth interaction."
  },
  "call-return": {
    number:"03", category:"CONTROL HIERARCHY", title:"Call-and-return architecture",
    definition:"A main program controls execution by calling subprograms, which may call additional subprograms and return results. A related subtype, remote procedure call (RPC), lets a program invoke an operation hosted on another computer over a network.",
    diagramTitle:"A program calls its subprograms",
    nodes:[
      {id:"main",label:"Main program",sub:"ENTRY POINT",x:36,y:5,desc:"The main program starts the workflow and decides which operation should run next."},
      {id:"auth",label:"Login function",sub:"SUBPROGRAM",x:4,y:42,desc:"The main program calls a login function to check the user's credentials."},
      {id:"balance",label:"Balance function",sub:"SUBPROGRAM",x:36,y:42,desc:"A balance function retrieves the account balance when requested."},
      {id:"transfer",label:"Transfer function",sub:"SUBPROGRAM",x:68,y:42,desc:"A transfer function validates and processes a transfer request."},
      {id:"return",label:"Return result",sub:"RESULT",x:36,y:76,desc:"After a subprogram finishes, control and any result return to the caller."}
    ],
    edges:[["main","auth"],["main","balance"],["main","transfer"],["auth","return"],["balance","return"],["transfer","return"]],
    steps:[
      ["Start in the main program","The main program receives a task and determines the next operation."],
      ["Call a subprogram","It invokes a function such as login, balance checking, or transfer."],
      ["Execute the operation","The called subprogram performs its defined task and may call other functions."],
      ["Return control and result","The subprogram finishes and returns a result to the caller, which continues execution."]
    ],
    work:["The main program begins execution.","It calls the required subprogram.","The subprogram performs its operation.","Control and result return to the caller."],
    exampleTitle:"Banking application",
    exampleText:"A banking workflow calls an authentication function first. After login, the main program may call a balance function or a transfer function. Each operation returns a success result or an error.",
    flow:["Main program","Call function","Run operation","Return result"],
    pros:"Clear control flow; functions can be reused and tested individually; works well for procedural tasks.",
    cons:"Deep call hierarchies can become difficult to follow. Tightly coupled functions may be harder to change, and remote calls add network failure and latency concerns."
  },
  "object-oriented": {
    number:"04", category:"OBJECTS & MESSAGES", title:"Object-oriented architecture",
    definition:"The system is organized around objects that encapsulate data and the operations that manipulate it. Objects collaborate by sending messages or invoking methods, while hiding internal implementation details behind defined interfaces.",
    diagramTitle:"Objects collaborate to complete a task",
    nodes:[
      {id:"customer",label:"Customer",sub:"USER OBJECT",x:3,y:13,desc:"The customer object represents the user and starts an action, such as placing an order."},
      {id:"order",label:"Order",sub:"BUSINESS OBJECT",x:38,y:13,desc:"The order object stores order-specific state and coordinates the items and total for a purchase."},
      {id:"product",label:"Product",sub:"CATALOG OBJECT",x:70,y:13,desc:"The product object provides details such as item name, price, and availability."},
      {id:"payment",label:"Payment",sub:"SERVICE OBJECT",x:21,y:65,desc:"The payment object handles the payment operation and reports whether it succeeded."},
      {id:"inventory",label:"Inventory",sub:"STOCK OBJECT",x:57,y:65,desc:"The inventory object checks or updates stock after an order is confirmed."}
    ],
    edges:[["customer","order"],["product","order"],["order","payment"],["order","inventory"]],
    steps:[
      ["An object receives a request","A customer object initiates an action such as placing an order."],
      ["Objects exchange messages","The order object asks product objects for details and availability."],
      ["Objects perform their responsibilities","Payment and inventory objects carry out their own operations."],
      ["Results are coordinated","The objects return results so the order can be confirmed or rejected."]
    ],
    work:["The customer initiates an action.","The Order object requests details from Product.","Payment and Inventory objects perform their tasks.","The system coordinates the returned results."],
    exampleTitle:"Online shopping system",
    exampleText:"When a customer checks out, Order requests product details, Payment processes the payment, and Inventory updates stock. Each object owns its own data and behavior.",
    flow:["Customer","Order","Payment","Inventory"],
    pros:"Encapsulation supports modularity, reuse, and easier maintenance when object responsibilities are well designed.",
    cons:"Poorly designed object dependencies can become complex. Excessive messaging and unclear object responsibilities make systems harder to understand."
  },
  "layered": {
    number:"05", category:"SEPARATION OF CONCERNS", title:"Layered architecture",
    definition:"The system is divided into layers, each responsible for a particular kind of work. In the textbook's example, the layers are user interface, application, utility, and core. A request travels through the appropriate layers to reach the functionality it needs.",
    diagramTitle:"A system arranged in layers",
    nodes:[
      {id:"ui",label:"User interface layer",sub:"PRESENTATION",x:23,y:5,layer:true,desc:"The user-interface layer displays screens and receives user input. It should focus on presentation rather than core business rules."},
      {id:"app",label:"Application layer",sub:"WORKFLOW",x:23,y:27,layer:true,desc:"The application layer coordinates use cases and the sequence of work needed to fulfill a user request."},
      {id:"utility",label:"Utility layer",sub:"SHARED SERVICES",x:23,y:49,layer:true,desc:"The utility layer provides reusable services, such as formatting, validation helpers, or shared technical functions."},
      {id:"core",label:"Core layer",sub:"FOUNDATION",x:23,y:71,layer:true,desc:"The core layer contains fundamental domain rules and essential system capabilities."}
    ],
    edges:[["ui","app"],["app","utility"],["utility","core"]],
    steps:[
      ["User interacts with the interface","The outer layer receives an action, such as submitting a student search."],
      ["Application layer coordinates work","It determines the operations required to complete the request."],
      ["Shared and core services are used","The workflow uses utility services and core functionality as needed."],
      ["A result returns to the interface","The system prepares a response and presents it to the user."]
    ],
    work:["The user sends a request through the UI layer.","The application layer coordinates the use case.","Utility and core services perform required work.","The result is returned for presentation."],
    exampleTitle:"College management application",
    exampleText:"A student searches for a result. The UI receives the request, the application layer coordinates the lookup, utility services help format the result, and core rules determine what information can be shown.",
    flow:["UI","Application","Utility","Core"],
    pros:"Clear separation of responsibilities makes code easier to understand, test, and maintain; layers can provide stable interfaces.",
    cons:"Requests may pass through extra layers, adding overhead. Poor boundaries can create unnecessary dependencies or changes that ripple across layers."
  },
  "mvc": {
    number:"06", category:"WEB APPLICATION STRUCTURE", title:"Model–View–Controller (MVC)",
    definition:"MVC separates an application into three responsibilities: the Model manages data and application state, the View presents information, and the Controller handles user requests and coordinates the response.",
    diagramTitle:"From user request to rendered page",
    nodes:[
      {id:"browser",label:"Browser",sub:"USER REQUEST",x:1,y:42,desc:"The user interacts with a page and sends a request, such as opening a student profile."},
      {id:"controller",label:"Controller",sub:"REQUEST HANDLER",x:25,y:42,desc:"The controller receives the request, chooses the relevant behavior, calls the model when needed, and selects a view."},
      {id:"model",label:"Model",sub:"DATA & STATE",x:52,y:13,desc:"The model manages application data and state. It may retrieve or update information in a database."},
      {id:"database",label:"Database",sub:"PERSISTENT DATA",x:75,y:13,desc:"The database stores persistent records. The model interacts with it to retrieve or update information."},
      {id:"view",label:"View",sub:"PRESENTATION",x:53,y:67,desc:"The view formats the result for presentation, such as rendering the student's name, course, and profile details."}
    ],
    edges:[["browser","controller"],["controller","model"],["model","database"],["model","view"],["controller","view"]],
    steps:[
      ["User sends a request","The browser requests a page or an action, such as viewing a student profile."],
      ["Controller handles the request","The controller determines the behavior required and coordinates the response."],
      ["Model accesses data","The model reads or updates application data, often through a database."],
      ["View presents the result","The appropriate view formats the data and the server returns the response to the browser."]
    ],
    work:["The browser sends a user request.","The controller chooses the appropriate action.","The model retrieves or updates the required data.","The view presents the result to the browser."],
    exampleTitle:"Student profile portal",
    exampleText:"A student opens their profile. The controller handles the request, the model retrieves the student's record, and the view renders the profile page. This separates data handling from presentation.",
    flow:["Browser","Controller","Model","View"],
    pros:"Separates data, presentation, and request handling; supports organized web applications and makes UI changes easier to isolate.",
    cons:"Adds structure that may feel heavy for very small apps. Teams must keep responsibilities clear and avoid putting business logic in the view."
  }
};

const $ = (id) => document.getElementById(id);
let currentStyle = "data-centered";
let currentStep = 0;
let currentNode = null;
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function makeSvgEdges(style) {
  const s = styles[style];
  const nodeById = Object.fromEntries(s.nodes.map(n => [n.id, n]));
  const edges = s.edges.map(([from,to],i) => {
    const a=nodeById[from], b=nodeById[to];
    const x1=a.x+6, y1=a.y+12, x2=b.x+6, y2=b.y+12;
    let d;
    if (style==="layered") d=`M ${x1} ${y1} L ${x2} ${y2}`;
    else if (style==="data-flow") d=`M ${x1} ${y1} L ${x2} ${y2}`;
    else d=`M ${x1} ${y1} L ${x2} ${y2}`;
    return `<path class="diagram-edge" data-edge="${from}|${to}" d="${d}"></path>`;
  }).join("");
  return `<svg class="diagram-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="arrowhead" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#a78bfa"></path></marker></defs>${edges}</svg>`;
}

function renderDiagram() {
  const s = styles[currentStyle];
  const stage = $("diagramStage");
  const nodes = s.nodes.map(n => {
    const cls = `diagram-node${n.store?" store":""}${n.layer?" layer":""}${n.id===currentNode?" active":""}`;
    return `<button type="button" class="${cls}" data-node="${n.id}" style="left:${n.x}%;top:${n.y}%;transform:translate(0,0)" aria-pressed="${n.id===currentNode}" title="Explain ${n.label}">${n.label}<small>${n.sub||""}</small></button>`;
  }).join("");
  stage.innerHTML = `<div class="diagram-canvas">${makeSvgEdges(currentStyle)}${nodes}</div>`;
  stage.querySelectorAll(".diagram-node").forEach(btn => btn.addEventListener("click", () => {
    currentNode = btn.dataset.node;
    const node = s.nodes.find(n => n.id===currentNode);
    $("componentTitle").textContent = node.label;
    $("componentExplanation").textContent = node.desc;
    renderDiagram();
  }));
  // Highlight edges involved in the selected node, using a robust non-geometric fallback.
  stage.querySelectorAll(".diagram-edge").forEach(edge => {
    const [from,to]=edge.dataset.edge.split("|");
    edge.classList.toggle("active",from===currentNode||to===currentNode);
  });
  // CSS-positioned nodes are intentionally used so every component can be clicked.
}

function renderStyle(key) {
  currentStyle=key;
  currentStep=0;
  const s=styles[key];
  currentNode=s.nodes[0].id;
  $("detailTag").textContent=`STYLE ${s.number}`;
  $("detailCategory").textContent=s.category;
  $("detailTitle").textContent=s.title;
  $("detailDefinition").textContent=s.definition;
  $("diagramTitle").textContent=s.diagramTitle;
  $("workingSteps").innerHTML=s.work.map(x=>`<li>${x}</li>`).join("");
  $("exampleTitle").textContent=s.exampleTitle;
  $("exampleText").textContent=s.exampleText;
  $("exampleFlow").innerHTML=s.flow.map((x,i)=>`${i?'<span class="flow-arrow">→</span>':''}<span class="flow-chip">${x}</span>`).join("");
  $("prosText").textContent=s.pros;
  $("consText").textContent=s.cons;
  document.querySelectorAll(".style-tab").forEach(btn=>{
    const active=btn.dataset.style===key;
    btn.classList.toggle("active",active);
    btn.setAttribute("aria-selected",String(active));
  });
  updateStep();
}
function updateStep(){
  const s=styles[currentStyle];
  const step=s.steps[currentStep];
  const node=s.nodes[Math.min(currentStep,s.nodes.length-1)];
  currentNode=node.id;
  $("componentTitle").textContent=step[0];
  $("componentExplanation").textContent=step[1];
  $("stepCount").textContent=`STEP ${currentStep+1} / ${s.steps.length}`;
  $("prevStep").disabled=currentStep===0;
  $("prevStep").style.opacity=currentStep===0?".45":"1";
  $("nextStep").textContent=currentStep===s.steps.length-1?"Restart ↻":"Next step →";
  renderDiagram();
}
document.querySelectorAll(".style-tab").forEach(btn=>btn.addEventListener("click",()=>renderStyle(btn.dataset.style)));
$("prevStep").addEventListener("click",()=>{if(currentStep>0){currentStep--;updateStep();}});
$("nextStep").addEventListener("click",()=>{currentStep=currentStep===styles[currentStyle].steps.length-1?0:currentStep+1;updateStep();});

const questions=[
 {q:"Which style organizes multiple clients around one shared data store?",options:["Data-flow","Data-centered","Call-and-return","MVC"],answer:1,why:"Data-centered architecture places a shared repository at the center, accessed by multiple client components."},
 {q:"In a pipe-and-filter system, what does a pipe do?",options:["Stores every application record","Draws the user interface","Carries output from one filter to another","Calls the main program"],answer:2,why:"Pipes transfer data between filters. Each filter performs a defined transformation."},
 {q:"Which style uses a main program that invokes subprograms?",options:["Layered","Object-oriented","Data-centered","Call-and-return"],answer:3,why:"Call-and-return architecture structures control around calls to subprograms and returns to the caller."},
 {q:"Which statement best describes object-oriented architecture?",options:["All components must use one central file","Objects encapsulate data and operations","Every request must pass through four layers","Data only moves in a straight pipeline"],answer:1,why:"Objects bundle state and behavior, then collaborate through messages or method calls."},
 {q:"In MVC, which component handles the incoming user request?",options:["Controller","View","Database","CSS"],answer:0,why:"The controller handles the request, coordinates behavior with the model, and selects the view."}
];
function renderQuiz(){
  const q=questions[quizIndex];
  quizAnswered=false;
  $("quizProgressBar").style.width=`${(quizIndex+1)/questions.length*100}%`;
  $("quizProgressText").textContent=`QUESTION ${quizIndex+1} OF ${questions.length}`;
  $("quizContent").innerHTML=`<div class="quiz-question-number">QUESTION 0${quizIndex+1}</div><h3>${q.q}</h3><div class="quiz-options">${q.options.map((o,i)=>`<button class="quiz-option" type="button" data-option="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span>${o}</button>`).join("")}</div><div id="quizFeedback" aria-live="polite"></div>`;
  $("quizContent").querySelectorAll(".quiz-option").forEach(btn=>btn.addEventListener("click",()=>answerQuiz(Number(btn.dataset.option))));
}
function answerQuiz(selected){
  if(quizAnswered)return;
  quizAnswered=true;
  const q=questions[quizIndex];
  const buttons=[...$("quizContent").querySelectorAll(".quiz-option")];
  buttons.forEach((btn,i)=>{btn.disabled=true;if(i===q.answer)btn.classList.add("correct");if(i===selected&&selected!==q.answer)btn.classList.add("wrong");});
  const correct=selected===q.answer;
  if(correct)quizScore++;
  $("quizFeedback").innerHTML=`<p class="quiz-feedback ${correct?"good":"bad"}">${correct?"Correct!":"Not quite."} ${q.why}</p><button type="button" class="small-button small-button-accent quiz-next">${quizIndex===questions.length-1?"See result":"Next question →"}</button>`;
  $("quizFeedback").querySelector("button").addEventListener("click",()=>{
    if(quizIndex<questions.length-1){quizIndex++;renderQuiz();}
    else showQuizResult();
  });
}
function showQuizResult(){
  $("quizProgressBar").style.width="100%";
  $("quizProgressText").textContent="QUIZ COMPLETE";
  $("quizContent").innerHTML=`<div class="quiz-question-number">YOUR RESULT</div><h3>You scored ${quizScore} out of ${questions.length}.</h3><p class="quiz-feedback">${quizScore===questions.length?"Excellent work—you know the key differences.":quizScore>=3?"Good progress. Review any styles you found tricky, then try again.":"Keep exploring the diagrams and working steps, then give it another try."}</p><button type="button" class="small-button small-button-accent quiz-next" id="restartQuiz">Try again ↻</button>`;
  $("restartQuiz").addEventListener("click",()=>{quizIndex=0;quizScore=0;renderQuiz();});
}

$("menuToggle").addEventListener("click",()=> $("sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>{
  document.querySelectorAll(".nav-link").forEach(x=>x.classList.remove("active"));
  link.classList.add("active");
  $("sidebar").classList.remove("open");
}));
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      document.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${entry.target.id}`));
    }
  });
},{rootMargin:"-25% 0px -60% 0px"});
["home","styles","compare","quiz"].forEach(id=>{const el=$(id);if(el)sectionObserver.observe(el);});

renderStyle(currentStyle);
renderQuiz();
