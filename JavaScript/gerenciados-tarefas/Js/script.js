const qs = s=>document.querySelector(s);

const titleInput = qs('#taskTitle');
const contentInput = qs('#taskContent');
const tagInput = qs('#taskTags');
const prioritySelect = qs('#taskPriority');
const saveBtn = qs('#saveTask');
const newBtn = qs('#newTask');
const search = qs('#search');
const sortSelect = qs('#sort');
const grid = qs('#grid');
const empty = qs('#empty');
const countEl = qs('#count');
const tagCountEl = qs('#tagCount');
const btnClear = qs('#btn-clear');

let tasks=[];
let editingId=null;

function genId(){ return 't_'+Math.random().toString(36).substr(2,9); }

function saveAll(){ localStorage.setItem('taskgalaxy_tasks',JSON.stringify(tasks)); render(); }
function loadAll(){ try{ tasks=JSON.parse(localStorage.getItem('taskgalaxy_tasks'))||[] }catch{ tasks=[]; } }

function createTask({title,content,tags,priority}){
  tasks.unshift({id:genId(),title,content,tags,priority,created:Date.now(),updated:Date.now()});
  saveAll();
}

function updateTask(id,data){
  const idx=tasks.findIndex(t=>t.id===id);
  if(idx===-1)return;
  tasks[idx]={...tasks[idx],...data,updated:Date.now()};
  saveAll();
}

function deleteTask(id){
  if(confirm('Excluir esta tarefa?')){ tasks=tasks.filter(t=>t.id!==id); saveAll(); }
}

function openForEdit(id){
  const t=tasks.find(x=>x.id===id);
  if(!t)return;
  editingId=t.id;
  titleInput.value=t.title;
  contentInput.value=t.content;
  tagInput.value=(t.tags||[]).join(', ');
  prioritySelect.value=t.priority||'';
}

function render(){
  const q=search.value.toLowerCase();
  const sort=sortSelect.value;

  let filtered=tasks.filter(t=>t.title.toLowerCase().includes(q)||
    t.content.toLowerCase().includes(q)||
    (t.tags||[]).some(tag=>tag.toLowerCase().includes(q))
  );

  if(sort==='title') filtered.sort((a,b)=>a.title.localeCompare(b.title));
  else if(sort==='oldest') filtered.sort((a,b)=>a.created-b.created);
  else if(sort==='priority') filtered.sort((a,b)=>['high','medium','low'].indexOf(a.priority)-['high','medium','low'].indexOf(b.priority));

  grid.innerHTML='';
  if(filtered.length===0) empty.style.display='flex';
  else{
    empty.style.display='none';
    filtered.forEach(t=>{
      const el=document.createElement('div');
      el.className='note';
      if(t.priority==='high') el.style.borderLeft='4px solid #ff4b2b';
      else if(t.priority==='medium') el.style.borderLeft='4px solid #facc15';
      else if(t.priority==='low') el.style.borderLeft='4px solid #10b981';

      el.innerHTML=`
        <h3>${t.title||'(Sem título)'}</h3>
        <p>${t.content||''}</p>
        <div class="tags">${(t.tags||[]).map(tag=>`<span class="tag">${tag}</span>`).join('')}</div>
        <div class="note-actions">
          <button class="icon-btn" title="Editar">✏️</button>
          <button class="icon-btn" title="Excluir">🗑️</button>
        </div>
      `;

      el.querySelector('[title="Editar"]').onclick=()=>openForEdit(t.id);
      el.querySelector('[title="Excluir"]').onclick=()=>deleteTask(t.id);
      grid.appendChild(el);
    });
  }

  countEl.textContent=tasks.length;
  tagCountEl.textContent=Array.from(new Set(tasks.flatMap(t=>t.tags||[]))).length;
}

saveBtn.addEventListener('click',()=>{
  const title=titleInput.value.trim();
  const content=contentInput.value.trim();
  const tags=tagInput.value.split(',').map(t=>t.trim()).filter(Boolean);
  const priority=prioritySelect.value;
  if(!title && !content){ alert('Preencha título ou descrição'); return; }
  if(editingId) { updateTask(editingId,{title,content,tags,priority}); editingId=null; }
  else createTask({title,content,tags,priority});
  titleInput.value=''; contentInput.value=''; tagInput.value=''; prioritySelect.value='';
  render();
});

newBtn.addEventListener('click',()=>{
  editingId=null; titleInput.value=''; contentInput.value=''; tagInput.value=''; prioritySelect.value=''; titleInput.focus();
});

search.addEventListener('input',render);
sortSelect.addEventListener('change',render);

btnClear.addEventListener('click',()=>{ if(confirm('Deseja limpar todas as tarefas?')){ tasks=[]; saveAll(); } });

window.addEventListener('keydown',(e)=>{
  if(e.ctrlKey && e.key.toLowerCase()==='s'){ e.preventDefault(); saveBtn.click(); }
  if(e.ctrlKey && e.key.toLowerCase()==='n'){ e.preventDefault(); newBtn.click(); }
  if(e.key==='/'){ e.preventDefault(); search.focus(); }
});

loadAll();
render();
