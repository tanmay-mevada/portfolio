import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { UploadCloud, Plus, Loader2, Edit3, Trash2, ExternalLink, X } from 'lucide-react';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [view, setView] = useState('list'); 
  const [successMsg, setSuccessMsg] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '', date_display: '', description: '', category: 'Web Development', github: '', live: '', tech: '', 
  });

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

      const techArray = formData.tech.split(',').map((item) => item.trim());

      const projectPayload = {
        title: formData.title,
        date_display: formData.date_display,
        description: formData.description,
        category: formData.category,
        github: formData.github,
        live: formData.live,
        tech: techArray,
        status: 'completed',
        ...(imageUrls.length > 0 && { images: imageUrls }),
      };

      if (editingId) {
        const { error } = await supabase.from('projects').update(projectPayload).eq('id', editingId);
        if (error) throw error;
        setSuccessMsg('Project updated successfully! 🚀');
      } else {
        const { error } = await supabase.from('projects').insert([projectPayload]);
        if (error) throw error;
        setSuccessMsg('Project created successfully! 🎉');
      }

      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error.message);
      alert("Error saving project. Check the console.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
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
    setFormData({
      title: project.title,
      date_display: project.date_display || '',
      description: project.description,
      category: project.category,
      github: project.github || '',
      live: project.live || '',
      tech: project.tech ? project.tech.join(', ') : '',
    });
    setEditingId(project.id);
    setImageFiles([]);
    setView('form');
  };

  const resetForm = () => {
    setFormData({ title: '', date_display: '', description: '', category: 'Web Development', github: '', live: '', tech: '' });
    setEditingId(null);
    setImageFiles([]);
    setView('list');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImageFiles(Array.from(e.target.files));

  return (
    <div className="w-full">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-4">
          <button 
            onClick={() => { resetForm(); setView('list'); }}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'list' ? 'bg-blue text-dark' : 'text-gray-400 hover:text-white border border-transparent hover:border-gray-700'}`}
          >
            All Projects
          </button>
          <button 
            onClick={() => { resetForm(); setView('form'); }}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${view === 'form' ? 'bg-blue text-dark' : 'text-gray-400 hover:text-white border border-transparent hover:border-gray-700'}`}
          >
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center justify-between p-4 mb-6 text-green-400 border rounded-lg bg-green-500/10 border-green-500/30">
          {successMsg}
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
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Tech Stack</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue/10">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="transition-colors hover:bg-blue/5">
                      <td className="p-4">
                        <div className="font-bold text-white">{proj.title}</div>
                        <div className="flex gap-2 mt-1 text-xs text-gray-400">
                          {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue"><ExternalLink size={12}/> Repo</a>}
                          {proj.live && <a href={proj.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue"><ExternalLink size={12}/> Live</a>}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-300">
                        <span className="px-2 py-1 text-xs rounded-md bg-blue/10 text-blue">{proj.category}</span>
                      </td>
                      <td className="max-w-xs p-4 text-sm text-gray-400 truncate">
                        {proj.tech ? proj.tech.join(', ') : 'N/A'}
                      </td>
                      <td className="flex justify-end gap-3 p-4 text-right">
                        <button onClick={() => handleEditInit(proj)} className="p-2 text-gray-400 transition-colors rounded-lg hover:text-blue hover:bg-blue/10" title="Edit">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDelete(proj.id, proj.title)} className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-500 hover:bg-red-500/10" title="Delete">
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

          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-400">Project Title *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Date (Display) *</label>
                <input required type="text" name="date_display" value={formData.date_display} onChange={handleChange} 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" placeholder="e.g. July, 2025" />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" 
                className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]"></textarea>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-400">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]">
                  <option className="bg-gray-900" value="Web Development">Web Development</option>
                  <option className="bg-gray-900" value="Mobile Development">Mobile Development</option>
                  <option className="bg-gray-900" value="Machine Learning">Machine Learning</option>
                  <option className="bg-gray-900" value="Hardware Design">Hardware Design</option>
                  <option className="bg-gray-900" value="Desktop Application">Desktop Application</option>
                  <option className="bg-gray-900" value="CLI Tool">CLI Tool</option>
                  <option className="bg-gray-900" value="Learning">Learning</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Tech Stack (comma separated) *</label>
                <input required type="text" name="tech" value={formData.tech} onChange={handleChange} 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" placeholder="React, Next.js, Node" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-400">GitHub Repo URL</label>
                <input type="url" name="github" value={formData.github} onChange={handleChange} 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Live Site URL</label>
                <input type="url" name="live" value={formData.live} onChange={handleChange} 
                  className="w-full px-4 py-2 text-white transition-colors bg-transparent border rounded-lg outline-none border-blue/20 focus:border-blue focus:bg-[#0B1221]" />
              </div>
            </div>

            <div className="p-8 text-center transition-colors bg-transparent border-2 border-dashed rounded-xl border-blue/30 hover:border-blue/50">
              <UploadCloud className="mx-auto mb-4 text-blue" size={40} />
              <p className="mb-2 text-sm font-medium text-gray-300">
                {editingId ? "Upload new images to overwrite existing ones (or leave blank to keep current)" : "Select project images"}
              </p>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue/10 file:text-blue hover:file:bg-blue/20" />
              {imageFiles.length > 0 && <p className="mt-3 text-xs text-green-400">{imageFiles.length} file(s) selected</p>}
            </div>

            <div className="flex gap-4 pt-6 border-t border-blue/10">
              <button disabled={loading} type="submit" className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-bold transition-colors rounded-lg bg-blue text-dark hover:bg-blue/80 disabled:opacity-50">
                {loading ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : (editingId ? 'Update Project' : 'Publish Project')}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-6 py-3 text-gray-300 transition-colors bg-transparent border border-gray-600 rounded-lg hover:bg-gray-800">
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