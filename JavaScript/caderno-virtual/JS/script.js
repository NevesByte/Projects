const qs = (s) => document.querySelector(s);

const titleInput = qs('#title');
const contentInput = qs('#content');
const tagInput = qs('#tagInput');
const colorSelect = qs('#colorSelect');
const saveBtn = qs('#saveBtn');
const newBtn = qs('#newBtn');
const search = qs('#search');
const sortSelect = qs('#sort');
const grid = qs('#grid');
const empty = qs('#empty');
const stats = qs('#stats');
const countEl = qs('#count');

const btnExport = qs('#btn-export');
const btnImport = qs('#btn-import');
const btnClear = qs('#btn-clear');

const modal = qs('#modal');
const modalClose = qs('#modalClose');
const modalDownload = qs('#modalDownload');
const modalArea = qs('#modalArea');

let notes = [];
let editingId = null;

function genId() {
  return 'n_' + Math.random().toString(36).substr(2, 9);
}

function saveAll() {
  localStorage.setItem('caderno_notes', JSON.stringify(notes));
  updateUI();
}

function loadAll() {
  const raw = localStorage.getItem('caderno_notes');
  if (raw) {
    try {
      notes = JSON.parse(raw);
    } catch {
      notes = [];
    }
  }
}

function createNote({ title, content, tags, color }) {
  const n = {
    id: genId(),
    title,
    content,
    tags,
    color,
    created: Date.now(),
    updated: Date.now()
  };
  notes.unshift(n);
  saveAll();
}

function updateNote(id, data) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return;
  notes[idx] = { ...notes[idx], ...data, updated: Date.now() };
  saveAll();
}

function deleteNote(id) {
  if (confirm('Excluir esta anotação?')) {
    notes = notes.filter(n => n.id !== id);
    saveAll();
  }
}

function render() {
  const q = search.value.toLowerCase();
  const sort = sortSelect.value;

  let filtered = notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q) ||
    (n.tags || []).some(t => t.toLowerCase().includes(q))
  );

  if (sort === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'oldest') {
    filtered.sort((a, b) => a.created - b.created);
  } else {
    filtered.sort((a, b) => b.updated - a.updated);
  }

  grid.innerHTML = '';
  if (filtered.length === 0) {
    empty.style.display = 'flex';
  } else {
    empty.style.display = 'none';
    for (const n of filtered) {
      const el = document.createElement('div');
      el.className = 'note';
      if (n.color) el.style.borderLeft = `4px solid ${n.color}`;

      el.innerHTML = `
        <h3>${n.title || '(Sem título)'}</h3>
        <p>${n.content || ''}</p>
        <div class="meta">
          <div class="tags">
            ${(n.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="note-actions">
            <button class="icon-btn" title="Editar">✏️</button>
            <button class="icon-btn" title="Excluir">🗑️</button>
          </div>
        </div>
      `;

      el.querySelector('[title="Editar"]').onclick = () => openForEdit(n.id);
      el.querySelector('[title="Excluir"]').onclick = () => deleteNote(n.id);

      grid.appendChild(el);
    }
  }

  updateStats();
}

function updateStats() {
  countEl.textContent = notes.length;
  const totalTags = Array.from(new Set(notes.flatMap(n => n.tags || []))).length;
  stats.textContent = `${notes.length} anotações • ${totalTags} tags únicas`;
}

function updateUI() {
  render();
}

function openForEdit(id) {
  const n = notes.find(x => x.id === id);
  if (!n) return;
  editingId = n.id;
  titleInput.value = n.title;
  contentInput.value = n.content;
  tagInput.value = (n.tags || []).join(', ');
  colorSelect.value = n.color || '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const tags = tagInput.value.split(',').map(t => t.trim()).filter(Boolean);
  const color = colorSelect.value;

  if (!title && !content) {
    alert('Preencha título ou conteúdo');
    return;
  }

  if (editingId) {
    updateNote(editingId, { title, content, tags, color });
    editingId = null;
  } else {
    createNote({ title, content, tags, color });
  }

  titleInput.value = '';
  contentInput.value = '';
  tagInput.value = '';
  colorSelect.value = '';
  render();
});

newBtn.addEventListener('click', () => {
  editingId = null;
  titleInput.value = '';
  contentInput.value = '';
  tagInput.value = '';
  colorSelect.value = '';
  titleInput.focus();
});

search.addEventListener('input', render);
sortSelect.addEventListener('change', render);

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 's') {
    e.preventDefault();
    saveBtn.click();
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'n') {
    e.preventDefault();
    newBtn.click();
  }
  if (e.key === '/') {
    e.preventDefault();
    search.focus();
  }
});

btnExport.addEventListener('click', () => {
  modal.classList.add('open');
  qs('#modalTitle').textContent = 'Exportar anotações (JSON)';
  modalArea.value = JSON.stringify(notes, null, 2);
});

btnImport.addEventListener('click', () => {
  modal.classList.add('open');
  qs('#modalTitle').textContent = 'Importar (cole JSON no campo)';
  modalArea.value = '[\n  {"id":"n_abc","title":"Exemplo","content":"...","tags":["x"],"created":123,"updated":123}\n]';
});

modalClose.addEventListener('click', () => {
  const title = qs('#modalTitle').textContent;
  if (title.includes('Importar')) {
    try {
      const incoming = JSON.parse(modalArea.value);
      if (Array.isArray(incoming)) {
        const sanitized = incoming.map(n => ({
          ...n,
          id: n.id || genId(),
          created: n.created || Date.now(),
          updated: n.updated || Date.now()
        }));
        notes = sanitized.concat(notes);
        saveAll();
        alert('Importado com sucesso');
      } else {
        alert('JSON precisa ser um array de objetos');
      }
    } catch {
            alert('JSON inválido');
    }
  } else {
    modal.classList.remove('open');
  }
});

modalDownload.addEventListener('click', () => {
  const blob = new Blob([modalArea.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'anotacoes.json';
  a.click();
  URL.revokeObjectURL(url);
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

loadAll();
render();
