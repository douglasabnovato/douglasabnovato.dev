import { useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useResumeAccess } from '../model/useResumeAccess';

export const CurriculumAccessModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', company: '' });
  const [loading, setLoading] = useState(false);
  const { grantAccess } = useResumeAccess();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await supabase.from('curriculum_access_logs').insert([
        { first_name: form.name, company: form.company }
      ]);
      grantAccess(form.name, form.company);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao registrar acesso:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-sm w-full space-y-4 shadow-xl">
        <h2 className="font-bold text-lg text-white">Solicitar Acesso ao Currículo</h2>
        <p className="text-xs text-zinc-400">Informe seus dados para liberar a visualização imediata.</p>
        <input 
          required 
          placeholder="Primeiro Nome" 
          className="w-full p-2.5 bg-zinc-800 border border-zinc-700 text-white rounded text-sm focus:outline-none focus:border-accent" 
          onChange={e => setForm({...form, name: e.target.value})} 
        />
        <input 
          required 
          placeholder="Sua Empresa" 
          className="w-full p-2.5 bg-zinc-800 border border-zinc-700 text-white rounded text-sm focus:outline-none focus:border-accent" 
          onChange={e => setForm({...form, company: e.target.value})} 
        />
        <div className="flex gap-2 pt-2">
          <button 
            type="button" 
            onClick={onClose} 
            className="w-1/2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2.5 rounded text-sm font-medium transition-all"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="w-1/2 bg-white hover:bg-zinc-200 text-black p-2.5 rounded text-sm font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Liberando...' : 'Acessar'}
          </button>
        </div>
      </form>
    </div>
  );
};