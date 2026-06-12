import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardPage from '../dashboard/DashboardPage';
import GenerateFormPage from '../form/GenerateFormPage';
import RiwayatPage from '../tables/RiwayatPage';
import PegawaiPage from '../tables/PegawaiPage';
import SettingPage from '../tables/SettingPage';
import LogPage from '../tables/LogPage';
import { IS_DEVELOPMENT } from '../../data/constants';

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState(IS_DEVELOPMENT ? 'form' : 'dashboard');
  const [notification, setNotification] = useState(null);

  function pushNotification(msg, type) {
    setNotification({ msg, type });
  }

  const pages = {
    dashboard: <DashboardPage />,
    form: <GenerateFormPage onNotify={pushNotification} />,
    riwayat: <RiwayatPage />,
    pegawai: <PegawaiPage />,
    setting: <SettingPage />,
    log: <LogPage />,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        <Topbar activeTab={activeTab} />
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {notification && (
            <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 ${
              notification.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              <i className={`fa-solid ${notification.type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'} text-base`}></i>
              <div>{notification.msg}</div>
            </div>
          )}
          {pages[activeTab]}
        </main>
      </div>
    </div>
  );
}
