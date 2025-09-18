import React, { useState, useRef, useEffect } from 'react';
import { Upload, Users, Eye, EyeOff, X, Trash2 } from 'lucide-react';
import { registerUser, removeUser, userList, sendfile } from '../../api/auth';

function generateRandomPassword(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}


const AddUser = () => {
  const [attendanceLink, setAttendanceLink] = useState('');
  const [feesLink, setFeesLink] = useState('');
  const [marksheetLink, setMarksheetLink] = useState('');
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    contactNumber: '',
    email: '',
    department: '',
    password: ''
  });

  // File refs
  const attendanceFileRef = useRef();
  const feesFileRef = useRef();
  const marksheetFileRef = useRef();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userList();
      setUsers(res.data);
    } catch (err) {
      console.log(err);

    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePassword = () => {
    setFormData(prev => ({ ...prev, password: generateRandomPassword() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.contactNumber ||
      !formData.email ||
      !formData.password
    ) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      await registerUser({
        username: formData.username,
        domain: formData.email.split('@')[1], // domain from email
        password: formData.password,
        contactNumber: formData.contactNumber,
        // department: formData.department, // uncomment if backend expects department
      });
      

      await fetchUsers();
      setFormData({ username: '', contactNumber: '', email: '', department: '', password: '' });
      setShowAddAdminForm(false);
      alert(`Password sent to ${formData.email}`);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to add user');
    }
  };

  const handleCancel = () => {
    setShowAddAdminForm(false);
    setFormData({ username: '', contactNumber: '', email: '', department: '', password: '' });
  };

  const handleRemoveUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;
    try {
      await removeUser({ userId });
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to remove user');
    }
  };

  const handleUploadLinks = async () => {
    if (!attendanceLink || !feesLink || !marksheetLink) {
      alert('Please fill in all Google Sheets links before uploading');
      return;
    }

    try {
      await sendfile({
        attendanceLink,
        feesLink,
        marksheetLink
      });
      alert('Google Sheets links uploaded successfully!');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to upload links');
    }
  };

  // File input handlers (demo only)
  const handleFileChange = (e, label) => {
    if (e.target.files.length > 0) {
      alert(`Selected file for ${label}: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full overflow-x-hidden">
      {/* Upload Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Upload or Link Google Sheets for Attendance, Fees, and Marksheet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 overflow-x-auto">
          {/* Attendance Google Sheet */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Attendance Google Sheet link
              </label>
              <button type="button" onClick={() => attendanceFileRef.current.click()}>
                <Upload className="w-4 h-4 text-gray-400" />
              </button>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                ref={attendanceFileRef}
                onChange={e => handleFileChange(e, 'Attendance')}
              />
            </div>
            <input
              type="url"
              value={attendanceLink}
              onChange={(e) => setAttendanceLink(e.target.value)}
              placeholder="Enter Google Sheets link"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          {/* Fees Google Sheet */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Fees Google Sheet link
              </label>
              <button type="button" onClick={() => feesFileRef.current.click()}>
                <Upload className="w-4 h-4 text-gray-400" />
              </button>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                ref={feesFileRef}
                onChange={e => handleFileChange(e, 'Fees')}
              />
            </div>
            <input
              type="url"
              value={feesLink}
              onChange={(e) => setFeesLink(e.target.value)}
              placeholder="Enter Google Sheets link"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          {/* Marksheet Google Sheet */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Marksheet Google Sheet link
              </label>
              <button type="button" onClick={() => marksheetFileRef.current.click()}>
                <Upload className="w-4 h-4 text-gray-400" />
              </button>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                ref={marksheetFileRef}
                onChange={e => handleFileChange(e, 'Marksheet')}
              />
            </div>
            <input
              type="url"
              value={marksheetLink}
              onChange={(e) => setMarksheetLink(e.target.value)}
              placeholder="Enter Google Sheets link"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
        {/* Upload Button below the links section */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
            onClick={handleUploadLinks}
          >
            Upload
          </button>
        </div>
        {/* Add Admin Button */}
        <button 
          onClick={() => setShowAddAdminForm(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm w-full sm:w-auto"
        >
          Add admin
        </button>
      </div>

      {/* Add Admin Form Modal */}
      {showAddAdminForm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-x-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-x-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Add New Admin</h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                       Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter contact number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Economics">Economics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Generate Password
                  </button>
                </div>
                
                <div className="flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Send Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* Created Users Section */}
      <div className="bg-white rounded-lg border border-gray-200 mt-8 overflow-x-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Created Users</h3>
            <span className="text-sm text-gray-500">
              {users.length} user{users.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="px-6 py-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No users yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-6">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.email}</p>
                            <p className="text-sm text-gray-500">{user.contactNumber}</p>
                            <p className="text-sm text-gray-500">{user.username}</p>
                          </div>
                          <div>
                            {/* Optionally display department if available */}
                            {/* <p className="text-sm text-gray-600">{user.department}</p> */}
                            <p className="text-xs text-gray-400">
                              Added {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      {user.role}
                    </span>
                    {user.role !== 'owner' && (
                      <button
                        onClick={() => handleRemoveUser(user._id)}
                        className="ml-2 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors flex items-center"
                        title="Remove user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
