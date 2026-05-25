import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { UploadCloud, Plus, Loader2, Edit3, Trash2, ExternalLink, X, UserPlus, Trash, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [view, setView] = useState('list'); 
  const [successMsg, setSuccessMsg] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  
  // Custom Category State
  const defaultCategories = ["Web Development", "Machine Learning", "Hardware Design", "App Development"];
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // Dynamic Contributors State
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

  useEffect(() => {
    fetchProjects();
  }, []);

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

      const techArray = formData.tech_stack ? formData.tech_stack.split(',').map((item) => item.trim()).filter(Boolean) : [];
      const validDate = formData.date ? formData.date : null; 
      const validContributors = contributors.filter(c => c.name.trim() !== ''); 

      const projectPayload = {
        title_disp: formData.title_disp,
        slug: formData.slug,
        date: validDate,
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
        ...(imageUrls.length > 0 && { images: imageUrls }),
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
    
    // Check if the loaded project has a category outside the default 4
    if (!defaultCategories.includes(projCategory)) {
      setShowCustomCategory(true);
    } else {
      setShowCustomCategory(false);
    }

    setFormData({
      title_disp: project.title_disp || '',
      slug: project.slug || '',
      date: project.date || '',
      type: project.type || 'Personal Project',
      category: projCategory,
      desc_concise: project.desc_concise || '',
      desc_detailed: project.desc_detailed || '',
      status: project.status || 'completed',
      status_info: project.status_info || '',
      tech_stack: project.tech_stack ? project.tech_stack.join(', ') : '',
      git_link: project.git_link || '',
      live_link: project.live_link || '',
      demo_link: project.demo_link || ''
    });
    setContributors(project.contributors || []);
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
    setContributors([]);
    setEditingId(null);
    setImageFiles([]);
    setView('list');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImageFiles(Array.from(e.target.files));

  const addContributor = () => setContributors([...contributors, { name: '', github: '' }]);
  const updateContributor = (index, field, value) => {
    const newContributors = [...contributors];
    newContributors[index][field] = value;
    setContributors(newContributors);
  };
  const removeContributor = (index) => setContributors(contributors.filter((_, i) => i !== index));

  return (
    <div className="w-full">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-4">
          <button onClick={() => { resetForm(); setView('list'); }}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'list' ? 'bg-blue text-dark' : 'text-gray-400 hover:text-white border border-transparent hover:border-gray-700'}`}>
            All Projects
          </button>
          <button onClick={() => { resetForm(); setView('form'); }}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${view === 'form' ? 'bg-blue text-dark' : 'text-gray-400 hover:text-white border border-transparent hover:border-gray-700'}`}>
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center justify-between p-4 mb-6 text-green-400 border rounded-lg bg-green-500/10 border-green-500/30">
          <span className="flex items-center gap-2"><CheckCircle2 size={18}/> {successMsg}</span>
          <button onClick={() => setSuccessMsg('')} className="hover:text-green-300"><X size={18} /></button>
        </div>
      )}

      {/* VIEW: PROJECT LIST */}
      {view === 'list' && (
        <div className="overflow-hidden border shadow-xl bg-dark2 rounded-xl border-blue/20">
          {fetchLoading ? (
            <div className="flex flex-col items-center p-10 text-center text-gray-400">
              <Loader2 className="mb-2 text-blue animate-spin" size={32} /> Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No projects found. Click "Add New" to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-sm tracking-wider text-gray-400 uppercase border-b bg-dark border-blue/20">
                    <th className="p-4 font-medium">Project</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Category & Type</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue/10">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="transition-colors hover:bg-blue/5">
                      <td className="p-4">
                        <div className="font-bold text-white">{proj.title_disp}</div>
                        <div className="mt-1 font-mono text-xs text-gray-500">/{proj.slug}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-md border ${proj.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : proj.status === 'ongoing' ? 'bg-blue/10 text-blue border-blue/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-300">{proj.category}</div>
                        <div className="mt-1 text-xs text-gray-500">{proj.type}</div>
                      </td>
                      <td className="flex justify-end gap-3 p-4 text-right">
                        <button onClick={() => handleEditInit(proj)} className="p-2 text-gray-400 transition-colors rounded-lg hover:text-blue hover:bg-blue/10" title="Edit">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDelete(proj.id, proj.title_disp)} className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-500 hover:bg-red-500/10" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* VIEW: FORM (Create & Edit) */}
      {view === 'form' && (
        <div className="max-w-4xl p-6 mx-auto border shadow-xl md:p-8 bg-dark2 rounded-xl border-blue/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              {editingId ? <Edit3 className="text-blue" /> : <Plus className="text-blue" />}
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* SECTION 1: Core Info */}
            <div className="p-6 space-y-6 border rounded-xl border-blue/10 bg-dark/50">
              <h3 className="pb-2 text-sm font-bold tracking-wider uppercase border-b text-blue border-blue/10">Core Identity</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Display Title *</label>
                  <input required type="text" name="title_disp" value={formData.title_disp} onChange={handleChange} 
                    className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" placeholder="e.g. DStrA Learning Platform" />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">URL Slug * <span className="text-xs text-gray-500">(Must be unique)</span></label>
                  <input required type="text" name="slug" value={formData.slug} onChange={handleChange} 
                    className="w-full px-4 py-2 text-white font-mono transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" placeholder="e.g. dstra-platform" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Category</label>
                  {showCustomCategory ? (
                    <div className="relative">
                      <input 
                        required 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                        placeholder="Type custom category..."
                        className="w-full px-4 py-2 pr-10 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          setShowCustomCategory(false);
                          setFormData(prev => ({ ...prev, category: defaultCategories[0] }));
                        }}
                        className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={(e) => {
                        if (e.target.value === 'custom_entry') {
                          setShowCustomCategory(true);
                          setFormData(prev => ({ ...prev, category: '' }));
                        } else {
                          handleChange(e);
                        }
                      }} 
                      className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]"
                    >
                      {defaultCategories.map(cat => (
                        <option key={cat} className="bg-gray-900" value={cat}>{cat}</option>
                      ))}
                      <option className="font-bold bg-gray-900" value="custom_entry">Other (Custom...)</option>
                    </select>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Project Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} 
                    className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]">
                    <option className="bg-gray-900" value="Personal Project">Personal Project</option>
                    <option className="bg-gray-900" value="Team Project">Team Project</option>
                    <option className="bg-gray-900" value="Hackathon">Hackathon</option>
                    <option className="bg-gray-900" value="College Project">College Project</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Date Completed</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} 
                    className="w-full px-4 py-2 text-gray-300 transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" />
                </div>
              </div>
            </div>

            {/* SECTION 2: Status & Tech */}
            <div className="p-6 space-y-6 border rounded-xl border-blue/10 bg-dark/50">
              <h3 className="pb-2 text-sm font-bold tracking-wider uppercase border-b text-blue border-blue/10">Status & Technology</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Current Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} 
                    className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]">
                    <option className="bg-gray-900" value="completed">Completed</option>
                    <option className="bg-gray-900" value="ongoing">Ongoing</option>
                    <option className="bg-gray-900" value="partially working">Partially Working</option>
                    <option className="bg-gray-900" value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Status Info <span className="text-xs text-gray-500">(Optional Context)</span></label>
                  <input type="text" name="status_info" value={formData.status_info} onChange={handleChange} 
                    className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" placeholder="e.g. Needs API key updates..." />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Tech Stack (comma separated) *</label>
                <input required type="text" name="tech_stack" value={formData.tech_stack} onChange={handleChange} 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" placeholder="React, Node.js, Tailwind, PostgreSQL" />
              </div>
            </div>

            {/* SECTION 3: Descriptions */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm text-gray-400">Concise Description * <span className="text-xs text-gray-500">(For the grid card)</span></label>
                <textarea required name="desc_concise" value={formData.desc_concise} onChange={handleChange} rows="2" 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]"></textarea>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Detailed Description <span className="text-xs text-gray-500">(Supports Markdown)</span></label>
                <textarea name="desc_detailed" value={formData.desc_detailed} onChange={handleChange} rows="8" 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue font-mono text-sm focus:bg-[#0B1221]" placeholder="## Features&#10;- User Auth&#10;- Realtime DB"></textarea>
              </div>
            </div>

            {/* SECTION 4: Links & Contributors */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                 <h3 className="pb-2 text-sm font-bold tracking-wider uppercase border-b text-blue border-blue/10">External Links</h3>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">GitHub Repo</label>
                  <input type="url" name="git_link" value={formData.git_link} onChange={handleChange} className="w-full px-4 py-2 text-white bg-transparent border rounded-lg border-blue/20 focus:border-blue" />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Live URL</label>
                  <input type="url" name="live_link" value={formData.live_link} onChange={handleChange} className="w-full px-4 py-2 text-white bg-transparent border rounded-lg border-blue/20 focus:border-blue" />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Demo/Video URL</label>
                  <input type="url" name="demo_link" value={formData.demo_link} onChange={handleChange} className="w-full px-4 py-2 text-white bg-transparent border rounded-lg border-blue/20 focus:border-blue" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between pb-2 border-b border-blue/10">
                  <h3 className="text-sm font-bold tracking-wider uppercase text-blue">Contributors</h3>
                  <button type="button" onClick={addContributor} className="flex items-center gap-1 text-xs transition-colors text-blue hover:text-white"><UserPlus size={14}/> Add</button>
                </div>
                
                {contributors.length === 0 && <p className="text-sm italic text-gray-500">No contributors added.</p>}
                
                {contributors.map((contrib, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded-lg bg-dark border-blue/10">
                    <div className="flex-1 space-y-2">
                      <input type="text" placeholder="Name" value={contrib.name} onChange={(e) => updateContributor(index, 'name', e.target.value)} className="w-full px-3 py-1 text-sm text-white bg-transparent border rounded outline-none border-blue/20 focus:border-blue" />
                      <input type="url" placeholder="GitHub URL (Optional)" value={contrib.github} onChange={(e) => updateContributor(index, 'github', e.target.value)} className="w-full px-3 py-1 text-sm text-white bg-transparent border rounded outline-none border-blue/20 focus:border-blue" />
                    </div>
                    <button type="button" onClick={() => removeContributor(index)} className="p-2 text-red-400 transition-colors rounded-lg hover:bg-red-500/10"><Trash size={16}/></button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: Images */}
            <div className="p-8 text-center transition-colors bg-transparent border-2 border-dashed rounded-xl border-blue/30 hover:border-blue/50">
              <UploadCloud className="mx-auto mb-4 text-blue" size={40} />
              <p className="mb-2 text-sm font-medium text-gray-300">
                {editingId ? "Upload new images to overwrite existing ones (or leave blank to keep current)" : "Select project images"}
              </p>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue/10 file:text-blue hover:file:bg-blue/20" />
              {imageFiles.length > 0 && <p className="mt-3 text-xs text-green-400">{imageFiles.length} file(s) selected</p>}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t border-blue/10">
              <button disabled={loading} type="submit" className="flex items-center justify-center flex-1 gap-2 px-6 py-4 text-lg font-bold transition-colors rounded-lg bg-blue text-dark hover:bg-blue/80 disabled:opacity-50">
                {loading ? <><Loader2 className="animate-spin" size={24} /> Saving securely...</> : (editingId ? 'Update Project' : 'Publish Project')}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-8 py-4 text-gray-300 transition-colors bg-transparent border border-gray-600 rounded-lg hover:bg-gray-800">
                  Cancel
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