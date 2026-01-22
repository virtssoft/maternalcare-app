
import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { UserRole } from '../types';

export const AlertsView: React.FC<{ role: UserRole }> = ({ role }) => {
  // Fix: UserRole.PRESTATAIRE does not exist. We check if the user is NOT a patient (hence a provider).
  const alerts = role !== UserRole.FEMME_ENCEINTE ? [
    { id: '1', type: 'danger', title: 'Hémorragie suspectée', patient: 'Aicha Kone', time: 'Il y a 10 min' },
    { id: '2', type: 'info', title: 'Nouvelle consultation CPN', patient: 'Safiata Traoré', time: 'Il y a 1h' },
    { id: '3', type: 'warning', title: 'RDV manqué', patient: 'Mariam Sidibe', time: 'Ce matin' },
  ] : [
    { id: '1', type: 'info', title: 'Rappel : CPN 3ème visite', time: 'Demain à 09:00' },
    { id: '2', type: 'success', title: 'Félicitations !', message: 'Vous avez complété 6 mois de grossesse.', time: 'Hier' },
    { id: '3', type: 'warning', title: 'Signe de danger', message: 'Si vous avez des maux de tête sévères, consultez immédiatement.', time: 'Aujourd\'hui' },
  ];

  return (
    <div className="p-4 space-y-4 pb-20 animate-in slide-in-from-bottom duration-500">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
      
      {alerts.map((alert) => (
        <div key={alert.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex space-x-4 hover:border-rose-100 transition-colors">
          <div className={`p-3 rounded-xl h-fit ${
            alert.type === 'danger' ? 'bg-red-50 text-red-500' :
            alert.type === 'warning' ? 'bg-amber-50 text-amber-500' :
            alert.type === 'success' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'
          }`}>
            {alert.type === 'danger' || alert.type === 'warning' ? <AlertTriangle size={20} /> : 
             alert.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-800 text-sm leading-tight">{alert.title}</h3>
              <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2 flex items-center">
                <Clock size={10} className="mr-1" /> {alert.time}
              </span>
            </div>
            {alert.patient && <p className="text-xs text-rose-500 font-bold mb-1">{alert.patient}</p>}
            <p className="text-xs text-gray-500 leading-relaxed">{alert.message || 'Cliquez pour plus de détails sur cette notification.'}</p>
          </div>
        </div>
      ))}

      <button className="w-full py-3 text-gray-400 text-xs font-bold uppercase tracking-widest border-t border-gray-50 mt-4">
        Marquer tout comme lu
      </button>
    </div>
  );
};
