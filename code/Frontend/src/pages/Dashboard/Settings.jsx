import React, { useState } from 'react';
import { Save, Bell, Users, Shield, Database } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      attendanceThreshold: 80,
      scoreThreshold: 60,
    },
    riskAssessment: {
      attendanceWeight: 40,
      scoreWeight: 40,
      feeWeight: 20,
      autoCalculateRisk: true,
    },
    system: {
      autoBackup: true,
      dataRetention: 365,
      enableAnalytics: true,
    },
  });

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <button
          onClick={handleSaveSettings}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 md:mt-0"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </button>
      </div>
      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Alerts</label>
              <p className="text-sm text-gray-500">Send email notifications for critical alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={e => updateSetting('notifications', 'emailAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">SMS Alerts</label>
              <p className="text-sm text-gray-500">Send SMS notifications for urgent matters</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.smsAlerts}
                onChange={e => updateSetting('notifications', 'smsAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attendance Alert Threshold (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.notifications.attendanceThreshold}
                onChange={e => updateSetting('notifications', 'attendanceThreshold', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Score Alert Threshold (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.notifications.scoreThreshold}
                onChange={e => updateSetting('notifications', 'scoreThreshold', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Risk Assessment Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 text-green-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Risk Assessment Configuration</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto-Calculate Risk Levels</label>
              <p className="text-sm text-gray-500">Automatically update student risk levels based on data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.riskAssessment.autoCalculateRisk}
                onChange={e => updateSetting('riskAssessment', 'autoCalculateRisk', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Risk Calculation Weights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.riskAssessment.attendanceWeight}
                  onChange={e => updateSetting('riskAssessment', 'attendanceWeight', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Score Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.riskAssessment.scoreWeight}
                  onChange={e => updateSetting('riskAssessment', 'scoreWeight', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fee Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.riskAssessment.feeWeight}
                  onChange={e => updateSetting('riskAssessment', 'feeWeight', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Total: {settings.riskAssessment.attendanceWeight + settings.riskAssessment.scoreWeight + settings.riskAssessment.feeWeight}%
            </div>
          </div>
        </div>
      </div>
      {/* System Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Database className="h-5 w-5 text-green-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto Backup</label>
              <p className="text-sm text-gray-500">Automatically backup data daily</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.system.autoBackup}
                onChange={e => updateSetting('system', 'autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Enable Analytics</label>
              <p className="text-sm text-gray-500">Enable advanced analytics and reporting</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.system.enableAnalytics}
                onChange={e => updateSetting('system', 'enableAnalytics', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Retention Period (days)
            </label>
            <input
              type="number"
              min="30"
              max="3650"
              value={settings.system.dataRetention}
              onChange={e => updateSetting('system', 'dataRetention', parseInt(e.target.value))}
              className="mt-1 block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">How long to keep historical data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
