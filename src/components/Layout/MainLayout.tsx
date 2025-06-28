import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Campaigns',
      icon: 'carbon:list-boxes',
      path: '/campaign'
    }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <nav 
        className={`${
          isCollapsed ? 'w-16' : 'w-64'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col relative`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full
            flex items-center justify-center text-gray-500 hover:text-gray-700
            transition-colors duration-200 z-50 shadow-sm"
        >
          <Icon 
            icon={isCollapsed ? 'carbon:chevron-right' : 'carbon:chevron-left'}
            className="w-4 h-4"
          />
        </button>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Icon 
                icon="carbon:ai-status"
                className="w-5 h-5 text-indigo-600"
              />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <span className="text-lg font-bold tracking-tight text-gray-900">Reem</span>
                <span className="text-lg font-medium tracking-tight text-indigo-600">AI</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-2.5 mb-1 mx-2 rounded-lg
                transition-all duration-200 relative group
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon icon={item.icon} className="w-5 h-5" />
              {!isCollapsed && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="border-t border-gray-100">
          <div className="p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Icon icon="carbon:user" className="w-4 h-4 text-gray-600" />
              </div>
              {!isCollapsed && (
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Admin User</div>
                      <div className="text-xs text-gray-500">admin@reem.ai</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 relative group"
                    >
                      <Icon icon="carbon:logout" className="w-4 h-4" />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                        Logout
                      </span>
                    </button>
                  </div>
                </div>
              )}
              {isCollapsed && (
                <button
                  onClick={handleLogout}
                  className="ml-auto p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 relative group"
                >
                  <Icon icon="carbon:logout" className="w-4 h-4" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                    Logout
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 