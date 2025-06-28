const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Conversations</h3>
          <p className="text-3xl font-semibold text-gray-900">128</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Active Time</h3>
          <p className="text-3xl font-semibold text-gray-900">5.2 hrs</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Response Rate</h3>
          <p className="text-3xl font-semibold text-gray-900">98.5%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 