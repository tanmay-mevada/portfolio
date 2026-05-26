import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { UploadCloud, Plus, Loader2, Edit3, Trash2, X, UserPlus, Trash, CheckCircle2 } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import remarkGfm from "remark-gfm";

/* ── Syntax highlighter ── */
function colorizeCode(raw) {
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const tokenRegex = /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|export|from|default|const|let|var|function|return|if|else|else if|for|while|do|switch|case|break|continue|class|extends|new|this|super|async|await|try|catch|finally|throw|typeof|instanceof|void|null|undefined|true|false|int|char|float|double|long|short|bool|include|define|printf|scanf|cout|cin|main|public|private|protected|static)\b)|(\b\d+\.?\d*[fFuUlL]*\b)|(\b[A-Z][a-zA-Z0-9_]*\b)|(\b[a-zA-Z_]\w*(?=\s*\())/g;

  return escaped
    .split("\n")
    .map(line => {
      return line.replace(tokenRegex, (match, comment, str, keyword, number, type, func) => {
        if (comment) return `<span style="color:#6A9955;font-style:italic">${comment}</span>`;
        if (str) return `<span style="color:#CE9178">${str}</span>`;
        if (keyword) return `<span style="color:#3B82F6;font-weight:600">${keyword}</span>`;
        if (number) return `<span style="color:#B5CEA8">${number}</span>`;
        if (type) return `<span style="color:#4EC9B0">${type}</span>`;
        if (func) return `<span style="color:#DCDCAA">${func}</span>`;
        return match;
      });
    })
    .join("\n");
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  const raw = String(children).replace(/\n$/, "");

  const copy = () => {
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative max-w-full my-6 overflow-hidden border rounded-xl border-blue-500/20 bg-gray-950">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-blue-500/5 border-blue-500/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <button onClick={copy} type="button"
          className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md transition-all duration-200 ${
            copied ? "text-green-400 bg-green-400/10 border border-green-400/30" : "text-gray-500 bg-white/5 border border-white/5 hover:text-gray-300"
          }`}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-w-full p-5 overflow-x-auto font-mono text-sm leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: colorizeCode(raw) }} />
      </pre>
    </div>
  );
}

/* ── Markdown renderers ── */
const md = {
  h1: ({ children }) => <h1 className="pb-2 mt-8 mb-4 text-3xl font-extrabold leading-tight text-white break-words border-b-2 border-blue-500/20">{children}</h1>,
  h2: ({ children }) => <h2 className="pl-3 mt-8 mb-3 text-2xl font-bold leading-snug text-gray-200 break-words border-l-4 border-blue-500">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 mb-2 text-xl font-semibold text-blue-300 break-words">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-5 mb-2 text-lg font-semibold text-blue-200 break-words">{children}</h4>,
  p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-400 break-words">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 no-underline break-words transition-colors border-b border-blue-400/50 hover:text-blue-300 hover:border-blue-300">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-bold text-gray-200">{children}</strong>,
  em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
  ul: ({ children }) => <ul className="pl-0 mb-4 space-y-2 list-none">{children}</ul>,
  ol: ({ children }) => <ol className="pl-6 mb-4 space-y-2 text-gray-400 list-decimal">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start gap-2.5 text-gray-400 leading-relaxed break-words">
      <span className="text-blue-500 text-[10px] mt-2 flex-shrink-0">◆</span>
      <span className="min-w-0">{children}</span>
    </li>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="text-blue-300 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded text-sm font-mono break-words">{children}</code>
    ) : (
      <code>{children}</code>
    ),
  pre: ({ children }) => <CodeBlock>{children?.props?.children}</CodeBlock>,
  blockquote: ({ children }) => (
    <blockquote className="p-4 mb-5 italic text-gray-400 break-words border-l-4 border-blue-500 bg-blue-500/5 rounded-r-xl">{children}</blockquote>
  ),
  hr: () => <div className="h-px my-8 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />,
  table: ({ children }) => (
    <div className="max-w-full mb-6 overflow-x-auto border rounded-xl border-blue-500/20">
      <table className="w-full min-w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-blue-500/10">{children}</thead>,
  th: ({ children }) => <th className="p-3 font-semibold tracking-wide text-left text-gray-200 border-b border-blue-500/20 whitespace-nowrap">{children}</th>,
  td: ({ children }) => <td className="min-w-0 p-3 text-gray-400 break-words border-b border-blue-500/10">{children}</td>,
  img: ({ src, alt }) => <img src={src} alt={alt} className="block object-contain max-w-full my-5 border rounded-xl border-blue-500/20" />,
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [view, setView] = useState('list');
  const [successMsg, setSuccessMsg] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Dropdown Configurations
  const defaultCategories = ["Web Development", "Machine Learning", "Hardware Design", "App Development"];
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  
  const defaultTypes = ["Personal Project", "Team Project", "Hackathon", "College Project"];
  const [showCustomType, setShowCustomType] = useState(false);
  
  const defaultStatuses = ["completed", "ongoing", "partially working", "archived"];
  const [showCustomStatus, setShowCustomStatus] = useState(false);

  const [contributors, setContributors] = useState([]);

  const [formData, setFormData] = useState({
    title_disp: '',
    slug: '',
    date: '',
    type: 'Personal Project',
    category: 'Web Development',
    desc_concise: '',
    desc_detailed: '',
    status: 'completed',
    status_info: '',
    tech_stack: '',
    git_link: '',
    live_link: '',
    demo_link: ''
  });

  useEffect(() => {
    if (!editingId && formData.title_disp) {
      const generatedSlug = formData.title_disp
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title_disp, editingId]);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setFetchLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error("Error fetching projects:", error.message);
    else setProjects(data);
    setFetchLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      let imageUrls = [];
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `portfolio/${fileName}`;
          const { error: uploadError } = await supabase.storage.from('project-images').upload(filePath, file);
          if (uploadError) throw uploadError;
          const { data: publicUrlData } = supabase.storage.from('project-images').getPublicUrl(filePath);
          imageUrls.push(publicUrlData.publicUrl);
        }
      }

      const techArray = formData.tech_stack ? formData.tech_stack.split(',').map(i => i.trim()).filter(Boolean) : [];
      const validContributors = contributors.filter(c => c.name.trim() !== '');
      const finalImages = [...existingImages, ...imageUrls];

      const projectPayload = {
        title_disp: formData.title_disp,
        slug: formData.slug,
        date: formData.date || null,
        type: formData.type,
        category: formData.category,
        desc_concise: formData.desc_concise,
        desc_detailed: formData.desc_detailed,
        status: formData.status,
        status_info: formData.status_info,
        tech_stack: techArray,
        contributors: validContributors,
        git_link: formData.git_link,
        live_link: formData.live_link,
        demo_link: formData.demo_link,
        images: finalImages,
      };

      if (editingId) {
        const { error } = await supabase.from('projects').update(projectPayload).eq('id', editingId);
        if (error) throw error;
        setSuccessMsg('Project updated successfully!');
      } else {
        const { error } = await supabase.from('projects').insert([projectPayload]);
        if (error) throw error;
        setSuccessMsg('Project created successfully!');
      }

      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error.message);
      if (error.code === '23505') {
        alert("Error: A project with this SLUG already exists! Slugs must be unique.");
      } else {
        alert("Error saving project: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== id));
      setSuccessMsg('Project deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error("Error deleting:", error.message);
    }
  };

  const handleEditInit = (project) => {
    const projCategory = project.category || 'Web Development';
    setShowCustomCategory(!defaultCategories.includes(projCategory));
    
    const projType = project.type || 'Personal Project';
    setShowCustomType(!defaultTypes.includes(projType));
    
    const projStatus = project.status || 'completed';
    setShowCustomStatus(!defaultStatuses.includes(projStatus));

    setFormData({
      title_disp: project.title_disp || '',
      slug: project.slug || '',
      date: project.date || '',
      type: projType,
      category: projCategory,
      desc_concise: project.desc_concise || '',
      desc_detailed: project.desc_detailed || '',
      status: projStatus,
      status_info: project.status_info || '',
      tech_stack: project.tech_stack ? project.tech_stack.join(', ') : '',
      git_link: project.git_link || '',
      live_link: project.live_link || '',
      demo_link: project.demo_link || ''
    });
    setContributors(project.contributors || []);
    setExistingImages(project.images || []);
    setEditingId(project.id);
    setImageFiles([]);
    setView('form');
  };

  const resetForm = () => {
    setFormData({
      title_disp: '', slug: '', date: '', type: 'Personal Project', category: 'Web Development',
      desc_concise: '', desc_detailed: '', status: 'completed', status_info: '', tech_stack: '',
      git_link: '', live_link: '', demo_link: ''
    });
    setShowCustomCategory(false);
    setShowCustomType(false);
    setShowCustomStatus(false);
    setContributors([]);
    setExistingImages([]);
    setEditingId(null);
    setImageFiles([]);
    setView('list');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...newFiles]);
    }
    e.target.value = null; // reset input
  };

  const removePendingImage = (indexToRemove) => {
    setImageFiles(imageFiles.filter((_, idx) => idx !== indexToRemove));
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages(existingImages.filter((_, idx) => idx !== indexToRemove));
  };

  const addContributor = () => setContributors([...contributors, { name: '', github: '' }]);
  const updateContributor = (index, field, value) => {
    const updated = [...contributors];
    updated[index][field] = value;
    setContributors(updated);
  };
  const removeContributor = (index) => setContributors(contributors.filter((_, i) => i !== index));

  return (
    <div className="w-full min-w-0 text-gray-200" data-color-mode="dark">
      <style>{`
        .wmde-markdown { background-color: transparent !important; }
      `}</style>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => { resetForm(); setView('list'); }}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
              view === 'list' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => { resetForm(); setView('form'); }}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              view === 'form' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center justify-between p-4 mb-6 text-green-400 border shadow-lg border-green-500/30 rounded-xl bg-green-500/10 shadow-green-500/5">
          <span className="flex items-center gap-2"><CheckCircle2 size={18} /> {successMsg}</span>
          <button onClick={() => setSuccessMsg('')} className="transition-colors hover:text-green-300"><X size={18} /></button>
        </div>
      )}

      {/* VIEW: LIST */}
      {view === 'list' && (
        <div className="w-full overflow-hidden bg-gray-900 border shadow-2xl border-blue-500/20 rounded-2xl">
          {fetchLoading ? (
            <div className="flex flex-col items-center justify-center p-16 text-center text-gray-400">
              <Loader2 className="mb-4 text-blue-500 animate-spin" size={36} /> 
              <p className="text-lg">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-16 text-lg text-center text-gray-400">
              No projects found. Click "Add New" to build your portfolio!
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="text-xs tracking-widest text-gray-400 uppercase border-b bg-gray-950 border-blue-500/20">
                    <th className="p-5 font-semibold">Project</th>
                    <th className="p-5 font-semibold">Status</th>
                    <th className="p-5 font-semibold">Category & Type</th>
                    <th className="p-5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/10">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="transition-colors hover:bg-blue-500/5">
                      <td className="p-5 max-w-[200px] truncate">
                        <div className="text-base font-bold text-white truncate">{proj.title_disp}</div>
                        <div className="mt-1 font-mono text-xs text-gray-500 truncate">/{proj.slug}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 text-xs font-medium whitespace-nowrap rounded-full border ${
                          proj.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          proj.status === 'ongoing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="text-sm font-medium text-gray-300 truncate">{proj.category}</div>
                        <div className="mt-1 text-xs text-gray-500 truncate">{proj.type}</div>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEditInit(proj)} className="p-2.5 text-gray-400 transition-colors rounded-lg hover:text-blue-400 hover:bg-blue-500/10" title="Edit">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDelete(proj.id, proj.title_disp)} className="p-2.5 text-gray-400 transition-colors rounded-lg hover:text-red-400 hover:bg-red-500/10" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* VIEW: FORM */}
      {view === 'form' && (
        <div className="w-full max-w-4xl min-w-0 p-6 mx-auto bg-gray-900 border shadow-2xl md:p-10 rounded-2xl border-blue-500/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-white">
              {editingId ? <Edit3 className="text-blue-500" size={28} /> : <Plus className="text-blue-500" size={28} />}
              {editingId ? 'Edit Project' : 'Create New Project'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* SECTION 1: Core Info */}
            <div className="space-y-6 border shadow-inner p-7 rounded-xl border-blue-500/10 bg-gray-950/50">
              <h3 className="pb-3 text-sm font-bold tracking-widest text-blue-500 uppercase border-b border-blue-500/10">Core Identity</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">Display Title *</label>
                  <input required type="text" name="title_disp" value={formData.title_disp} onChange={handleChange}
                    className="w-full px-4 py-2.5 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="e.g. DStrA Learning Platform" />
                </div>
                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">URL Slug * <span className="text-xs font-normal text-gray-500">(Must be unique)</span></label>
                  <input required type="text" name="slug" value={formData.slug} onChange={handleChange}
                    className="w-full px-4 py-2.5 font-mono text-sm text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="e.g. dstra-platform" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Category Dropdown */}
                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">Category</label>
                  {showCustomCategory ? (
                    <div className="relative">
                      <input required type="text" name="category" value={formData.category} onChange={handleChange}
                        placeholder="Custom category..."
                        className="w-full px-4 py-2.5 pr-10 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      <button type="button" onClick={() => { setShowCustomCategory(false); setFormData(prev => ({ ...prev, category: defaultCategories[0] })); }}
                        className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-300">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <select name="category" value={formData.category}
                      onChange={(e) => {
                        if (e.target.value === 'custom_entry') { setShowCustomCategory(true); setFormData(prev => ({ ...prev, category: '' })); }
                        else { handleChange(e); }
                      }}
                      className="w-full px-4 py-2.5 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      {defaultCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      <option className="font-bold bg-gray-800" value="custom_entry">Other (Custom...)</option>
                    </select>
                  )}
                </div>

                {/* Type Dropdown */}
                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">Project Type</label>
                  {showCustomType ? (
                    <div className="relative">
                      <input required type="text" name="type" value={formData.type} onChange={handleChange}
                        placeholder="Custom project type..."
                        className="w-full px-4 py-2.5 pr-10 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      <button type="button" onClick={() => { setShowCustomType(false); setFormData(prev => ({ ...prev, type: defaultTypes[0] })); }}
                        className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-300">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <select name="type" value={formData.type}
                      onChange={(e) => {
                        if (e.target.value === 'custom_entry') { setShowCustomType(true); setFormData(prev => ({ ...prev, type: '' })); }
                        else { handleChange(e); }
                      }}
                      className="w-full px-4 py-2.5 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      {defaultTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      <option className="font-bold bg-gray-800" value="custom_entry">Other (Custom...)</option>
                    </select>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">Date Completed</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange}
                    className="w-full px-4 py-2.5 text-gray-300 transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* SECTION 2: Status & Tech */}
            <div className="space-y-6 border shadow-inner p-7 rounded-xl border-blue-500/10 bg-gray-950/50">
              <h3 className="pb-3 text-sm font-bold tracking-widest text-blue-500 uppercase border-b border-blue-500/10">Status & Technology</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                
                {/* Status Dropdown */}
                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">Current Status</label>
                  {showCustomStatus ? (
                    <div className="relative">
                      <input required type="text" name="status" value={formData.status} onChange={handleChange}
                        placeholder="Custom status..."
                        className="w-full px-4 py-2.5 pr-10 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      <button type="button" onClick={() => { setShowCustomStatus(false); setFormData(prev => ({ ...prev, status: defaultStatuses[0] })); }}
                        className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-300">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <select name="status" value={formData.status}
                      onChange={(e) => {
                        if (e.target.value === 'custom_entry') { setShowCustomStatus(true); setFormData(prev => ({ ...prev, status: '' })); }
                        else { handleChange(e); }
                      }}
                      className="w-full px-4 py-2.5 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      {defaultStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                      <option className="font-bold bg-gray-800" value="custom_entry">Other (Custom...)</option>
                    </select>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">Status Info <span className="text-xs font-normal text-gray-500">(Optional Context)</span></label>
                  <input type="text" name="status_info" value={formData.status_info} onChange={handleChange}
                    className="w-full px-4 py-2.5 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="e.g. Needs API key updates..." />
                </div>
              </div>
              <div className="min-w-0">
                <label className="block mb-2 text-sm font-medium text-gray-400">Tech Stack <span className="text-xs font-normal text-gray-500">(comma separated) *</span></label>
                <input required type="text" name="tech_stack" value={formData.tech_stack} onChange={handleChange}
                  className="w-full px-4 py-2.5 text-white transition-all bg-gray-900 border rounded-lg outline-none border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 break-words" placeholder="React, Node.js, Tailwind, PostgreSQL" />
              </div>
            </div>

            {/* SECTION 3: Descriptions */}
            <div className="space-y-6">
              <div className="min-w-0">
                <label className="block mb-2 text-sm font-medium text-gray-400">Concise Description * <span className="text-xs font-normal text-gray-500">(For the grid card)</span></label>
                <textarea required name="desc_concise" value={formData.desc_concise} onChange={handleChange} rows="2"
                  className="w-full px-4 py-3 text-white transition-all bg-gray-900 border border-gray-700 rounded-lg outline-none resize-y focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>

              {/* ── Markdown Editor ── */}
              <div className="w-full max-w-full min-w-0">
                <label className="flex items-center justify-between block mb-2 text-sm font-medium text-gray-400">
                  <span>Detailed Description <span className="ml-1 text-xs font-normal text-gray-500">(Markdown supported)</span></span>
                </label>

                <div
                  className="w-full overflow-hidden transition-all border border-gray-700 shadow-inner rounded-xl focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                  style={{ '--color-canvas-default': '#111827', '--color-border-default': 'transparent' }}
                >
                  <MDEditor
                    value={formData.desc_detailed}
                    onChange={(val) => setFormData(prev => ({ ...prev, desc_detailed: val || '' }))}
                    height={450}
                    data-color-mode="dark"
                    preview="live"
                    visibleDragbar={false}
                    previewOptions={{
                      remarkPlugins: [remarkGfm],
                      components: md
                    }}
                    style={{
                      background: '#111827',
                      borderRadius: 0,
                      border: 'none',
                    }}
                    textareaProps={{
                      placeholder: '## Features\n- User Auth\n- Realtime DB\n\n## Tech Details\n...',
                      style: { background: '#111827', color: '#e2e8f0', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', padding: '1rem', fontSize: '15px', lineHeight: '1.6' }
                    }}
                  />
                </div>

                <div className="flex flex-wrap px-1 mt-3 font-mono text-xs text-gray-500 gap-x-4 gap-y-2">
                  {[['**bold**','bold'], ['*italic*','italic'], ['# H1','heading'], ['- item','list'], ['`code`','inline code'], ['```js','code block'], ['[text](url)','link']].map(([syntax, label]) => (
                    <span key={label}><span className="text-blue-400/80">{syntax}</span> → {label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 4: Links & Contributors */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="space-y-5">
                <h3 className="pb-3 text-sm font-bold tracking-widest text-blue-500 uppercase border-b border-blue-500/10">External Links</h3>
                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">GitHub Repo</label>
                  <input type="url" name="git_link" value={formData.git_link} onChange={handleChange} className="w-full px-4 py-2.5 text-white bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none" placeholder="[https://github.com/](https://github.com/)..." />
                </div>
                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">Live URL</label>
                  <input type="url" name="live_link" value={formData.live_link} onChange={handleChange} className="w-full px-4 py-2.5 text-white bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none" placeholder="https://..." />
                </div>
                <div className="min-w-0">
                  <label className="block mb-2 text-sm font-medium text-gray-400">Demo / Video URL</label>
                  <input type="url" name="demo_link" value={formData.demo_link} onChange={handleChange} className="w-full px-4 py-2.5 text-white bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none" placeholder="[https://youtube.com/](https://youtube.com/)..." />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between pb-3 border-b border-blue-500/10">
                  <h3 className="text-sm font-bold tracking-widest text-blue-500 uppercase">Contributors</h3>
                  <button type="button" onClick={addContributor} className="flex items-center gap-1.5 text-xs font-medium transition-colors text-blue-400 hover:text-blue-300">
                    <UserPlus size={14} /> Add Member
                  </button>
                </div>
                {contributors.length === 0 && <p className="py-2 text-sm italic text-gray-500">No contributors added.</p>}
                
                <div className="space-y-3">
                  {contributors.map((contrib, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-800 shadow-sm rounded-xl bg-gray-950">
                      <div className="flex-1 min-w-0 space-y-3">
                        <input type="text" placeholder="Member Name" value={contrib.name} onChange={(e) => updateContributor(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700 rounded-md outline-none focus:border-blue-500" />
                        <input type="url" placeholder="GitHub URL (Optional)" value={contrib.github} onChange={(e) => updateContributor(index, 'github', e.target.value)}
                          className="w-full px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700 rounded-md outline-none focus:border-blue-500" />
                      </div>
                      <button type="button" onClick={() => removeContributor(index)} className="p-2.5 text-red-400 transition-colors rounded-lg hover:bg-red-500/10 hover:text-red-300 flex-shrink-0">
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 5: Images */}
            <div className="p-8 transition-all border-2 border-gray-700 border-dashed bg-gray-950/50 rounded-2xl hover:border-blue-500/50">
              
              {/* Existing Images Display */}
              {existingImages.length > 0 && (
                <div className="mb-8">
                  <p className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Existing Images
                  </p>
                  <div className="flex gap-4 pb-4 overflow-x-auto">
                    {existingImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative overflow-hidden bg-gray-900 border border-gray-700 shadow-md w-28 h-28 shrink-0 rounded-xl group">
                        <img src={imgUrl} alt={`Existing ${idx}`} className="object-cover w-full h-full" />
                        <div className="absolute inset-0 transition-opacity opacity-0 bg-gray-900/60 backdrop-blur-sm group-hover:opacity-100" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(idx)}
                          className="absolute p-2 text-white transition-all -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-lg shadow-lg opacity-0 top-1/2 left-1/2 hover:bg-red-600 hover:scale-110 group-hover:opacity-100"
                          title="Remove image"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pending Uploads Display */}
              {imageFiles.length > 0 && (
                <div className="mb-8">
                  <p className="flex items-center gap-2 mb-4 text-sm font-semibold text-green-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Pending Uploads ({imageFiles.length})
                  </p>
                  <div className="flex gap-4 pb-4 overflow-x-auto">
                    {imageFiles.map((file, idx) => {
                      const previewUrl = URL.createObjectURL(file);
                      return (
                        <div key={idx} className="relative overflow-hidden bg-gray-900 border-2 shadow-md w-28 h-28 shrink-0 rounded-xl border-green-500/50 group">
                          <img src={previewUrl} alt={`Pending ${idx}`} className="object-cover w-full h-full opacity-70" />
                          <div className="absolute inset-0 transition-opacity opacity-0 bg-gray-900/60 backdrop-blur-sm group-hover:opacity-100" />
                          <button
                            type="button"
                            onClick={() => removePendingImage(idx)}
                            className="absolute p-2 text-white transition-all -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-lg shadow-lg opacity-0 top-1/2 left-1/2 hover:bg-red-600 hover:scale-110 group-hover:opacity-100"
                            title="Remove pending image"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-2 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-blue-500 rounded-full bg-blue-500/10">
                  <UploadCloud size={32} />
                </div>
                <p className="mb-2 text-base font-medium text-gray-300">
                  Select images to append to the gallery
                </p>
                <p className="mb-6 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                <input type="file" multiple accept="image/*" onChange={handleImageChange}
                  className="block w-full max-w-xs mx-auto text-sm text-gray-400 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col gap-4 pt-8 border-t border-gray-800 sm:flex-row">
              <button disabled={loading} type="submit"
                className="flex items-center justify-center flex-1 gap-2 px-8 py-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? <><Loader2 className="animate-spin" size={24} /> Saving Securely...</> : (editingId ? 'Update Project' : 'Publish Project')}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm}
                  className="px-8 py-4 font-semibold text-gray-300 transition-colors bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 hover:text-white">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;