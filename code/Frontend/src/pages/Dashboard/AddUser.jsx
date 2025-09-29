import React, { useState, useRef, useEffect } from 'react';
import { Upload, Users, Eye, EyeOff, X, Trash2 } from 'lucide-react';
import { registerUser, removeUser, userList, sendfile } from '../../api/auth';
import { LightButton, DarkButton } from '../../components/index';

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
  const [studentDetailsLink, setStudentDetailsLink] = useState('');
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [removingUserId, setRemovingUserId] = useState(null);

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
  const studentDetailsFileRef = useRef();

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
    
    setSubmitLoading(true);
    try {
      await registerUser({
        username: formData.username,
        domain: formData.email.split('@')[1], 
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
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancel = () => {
    setShowAddAdminForm(false);
    setFormData({ username: '', contactNumber: '', email: '', department: '', password: '' });
  };

  const handleRemoveUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;
    
    setRemovingUserId(userId);
    try {
      await removeUser({ userId });
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to remove user');
    } finally {
      setRemovingUserId(null);
    }
  };

  const handleUploadLinks = async () => {
    if (!attendanceLink || !feesLink || !marksheetLink || !studentDetailsLink) {
      alert('Please fill in all Google Sheets links before uploading');
      return;
    }

    setUploadLoading(true);
    try {
      await sendfile({
        attendanceLink,
        feesLink,
        marksheetLink,
        studentDetailsLink
      });
      alert('Google Sheets links uploaded successfully!');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to upload links');
    } finally {
      setUploadLoading(false);
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
        <h2 className="text-lg font-medium text-zinc-800 mb-6">
          Upload or Link Google Sheets for Attendance, Fees, and Marksheet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 overflow-x-auto">
          {/* Attendance Google Sheet */}
          <div className="bg-white rounded-lg border border-zinc-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-zinc-800 w-full text-start group relative cursor-help">
                Attendance Google Sheet link
                <div className="hidden group-hover:block absolute z-10 w-55 p-4 bg-zinc-200 text-zinc-800 text-sm rounded-lg shadow-lg -translate-x-1/2 left-1/2 top-full mt-2">
                  <p className="font-semibold mb-2">Required Fields:</p>
                  <ul className="list-disc list-inside">
                    <li>Student ID</li>
                    <li>Attendance Percentage</li>
                  </ul>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-zinc-200"></div>
                </div>
              </label>
              
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
              className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          {/* Fees Google Sheet */}
          <div className="bg-white rounded-lg border border-zinc-300 p-6">
            <div className="flex items-center justify-center mb-3">
              <label className="text-sm font-medium text-zinc-800 w-full text-start group relative cursor-help">
                Fees Google Sheet link
                <div className="hidden group-hover:block absolute z-10 w-55 p-4 bg-zinc-200 text-zinc-800 text-sm rounded-lg shadow-lg -translate-x-1/2 left-1/2 top-full mt-2">
                  <p className="font-semibold mb-2">Required Fields:</p>
                  <ul className="list-disc list-inside">
                    <li>Student ID</li>
                    <li>Pending Fees</li>
                    <li>Family Income</li>
                  </ul>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-zinc-200"></div>
                </div>
              </label>
              
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
              className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          {/* Marksheet Google Sheet */}
          <div className="bg-white rounded-lg border border-zinc-300 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 w-full text-start group relative cursor-help">
                Marksheet Google Sheet link
                <div className="hidden group-hover:block absolute z-10 w-55 p-4 bg-zinc-200 text-zinc-800 text-sm rounded-lg shadow-lg -translate-x-1/2 left-1/2 top-full mt-2">
                  <p className="font-semibold mb-2">Required Fields:</p>
                  <ul className="list-disc list-inside">
                    <li>Student ID</li>
                    <li>Test Score 1</li>
                    <li>Test Score 2</li>
                    <li>Test Score 3</li>
                  </ul>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-zinc-200"></div>
                </div>
              </label>
              
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
              className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          {/* Student Details Link Only */}
          <div className="bg-white rounded-lg border border-zinc-300 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-zinc-700 w-full text-start group relative cursor-help">
                StudentDetail Sheet link
                <div className="hidden group-hover:block absolute z-10 w-55 p-2 bg-zinc-200 text-zinc-800 text-sm rounded-lg shadow-lg -translate-x-1/2 left-1/2 top-full mt-2">
                  <p className="font-semibold mb-2">Required Fields:</p>
                  <ul className="list-disc list-inside">
                    <li>Student ID</li>
                    <li>Name</li>
                    <li>Email</li>
                    <li>Phone</li>
                  
                    <li>Department</li>
                   
                  </ul>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-zinc-200"></div>
                </div>
              </label>
              
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                ref={studentDetailsFileRef}
                onChange={e => handleFileChange(e, 'Student Details')}
              />
            </div>
            <input
              type="url"
              value={studentDetailsLink}
              onChange={(e) => setStudentDetailsLink(e.target.value)}
              placeholder="Enter Google Sheets link"
              className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        {/* Upload Button below the links section */}
        <div className="flex justify-end mb-4 right-0">
          <LightButton
            text={uploadLoading ? "Uploading..." : "Upload"}
            className="justify-center"
            onClick={handleUploadLinks}
            loading={uploadLoading}
            disabled={uploadLoading}
          />
        </div>
        </div>
        {/* Add Admin Button */}
        <button 
          onClick={() => setShowAddAdminForm(true)}
          className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm "
        >
          Add admin
        </button>
      </div>

      {/* Add Admin Form Modal */}
      {showAddAdminForm && (
        <>
          <div className="fixed inset-0 bg-zinc-50 bg-opacity-30 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-x-auto">
            <div className="bg-zinc-50 rounded-lg border border-zinc-300 w-full max-w-2xl overflow-x-auto">
              <div className="flex items-center justify-between p-6 border-b border-zinc-200">
                <h3 className="text-lg font-semibold text-zinc-800">Add New Admin</h3>
                <button
                  onClick={handleCancel}
                  className="text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                       Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter contact number"
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        className="w-full px-3 py-2 pr-10 border border-zinc-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-gray-600"
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
                  <LightButton
                    text="Cancel"
                    onClick={handleCancel}
                    className="justify-center"
                    disabled={submitLoading}
                    />
                  <DarkButton
                    text={submitLoading ? "Sending..." : "Send Password"}
                    className="justify-center"
                    loading={submitLoading}
                    disabled={submitLoading}
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* Created Users Section */}
      <div className="bg-white rounded-lg border border-zinc-200 mt-8 overflow-x-auto">
        <div className="px-6 py-4 border-b border-zinc-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-zinc-900">Created Users</h3>
            <span className="text-sm text-zinc-500">
              {users.length} user{users.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="px-6 py-4">
          {loading ? (
            <div className="text-center py-8 text-zinc-500">Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm">No users yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
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
                            <p className="text-sm text-zinc-500">{user.contactNumber}</p>
                            <p className="text-sm text-zinc-500">{user.username}</p>
                          </div>
                          <div>
                            {/* Optionally display department if available */}
                            {/* <p className="text-sm text-gray-600">{user.department}</p> */}
                            <p className="text-xs text-zinc-400">
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
                        disabled={removingUserId === user._id}
                        className={`ml-2 px-2 py-1 rounded transition-colors flex items-center ${
                          removingUserId === user._id 
                            ? 'bg-red-100 text-red-400 cursor-not-allowed' 
                            : 'bg-red-100 hover:bg-red-200 text-red-700'
                        }`}
                        title="Remove user"
                      >
                        <Trash2 className={`w-4 h-4 ${removingUserId === user._id ? 'animate-pulse' : ''}`} />
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