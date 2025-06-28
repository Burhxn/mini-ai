import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import NewCampaignModal from '../components/Campaign/NewCampaignModal';
import { useCampaignStore } from '../store/useCampaignStore';

const Campaign = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { campaigns, selectedType, addCampaign, setSelectedType } = useCampaignStore();

  const handleCreateCampaign = (newCampaign: {
    name: string;
    type: 'call' | 'sms' | 'email';
    scheduledDate: string;
    message: string;
  }) => {
    addCampaign(newCampaign);
    
    toast.message('Campaign Created Successfully', {
      description: newCampaign.name,
      duration: 3000,
      style: {
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        color: '#166534'
      }
    });
  };

  const campaignTypeIcons = {
    call: 'carbon:phone',
    sms: 'carbon:message',
    email: 'carbon:email'
  };

  const campaignTypeColors = {
    call: 'bg-blue-50 text-blue-700 border-blue-200',
    sms: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    email: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  };

  const statusColors = {
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    Running: 'bg-amber-50 text-amber-700 border-amber-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  const statusIcons = {
    Scheduled: 'carbon:time',
    Running: 'carbon:play-filled',
    Completed: 'carbon:checkmark'
  };

  const filteredCampaigns = selectedType === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.type === selectedType);

  return (
    <div className="p-6">
      <Toaster 
        position="top-right"
        theme="light"
        expand={false}
        visibleToasts={1}
        duration={3000}
      />
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
            <p className="mt-1 text-sm text-gray-500">Create and manage your communication campaigns</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg
              hover:bg-indigo-700 transition-all duration-200 shadow-sm text-sm"
          >
            <Icon icon="carbon:add" className="w-4 h-4 mr-1.5" />
            New Campaign
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Campaigns</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">{campaigns.length}</h3>
              </div>
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Icon icon="carbon:list-boxes" className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Running Campaigns</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  {campaigns.filter(c => c.status === 'Running').length}
                </h3>
              </div>
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <Icon icon="carbon:play-filled" className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Responses</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  {campaigns.reduce((sum, c) => sum + c.responses, 0).toLocaleString()}
                </h3>
              </div>
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Icon icon="carbon:user-multiple" className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Engagement</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  {Math.round(campaigns
                    .filter(c => c.engagement !== '-')
                    .reduce((sum, c) => sum + parseInt(c.engagement), 0) / 
                    campaigns.filter(c => c.engagement !== '-').length
                  )}%
                </h3>
              </div>
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Icon icon="carbon:chart-line" className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-3 py-1.5 rounded-lg border transition-all duration-200 text-sm font-medium ${
            selectedType === 'all'
              ? 'bg-indigo-600 text-white border-transparent shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm'
          }`}
        >
          <span className="flex items-center">
            <Icon icon="carbon:category" className="w-4 h-4 mr-1.5" />
            All Campaigns
          </span>
        </button>
        {(['call', 'sms', 'email'] as const).map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex items-center px-3 py-1.5 rounded-lg border transition-all duration-200 text-sm font-medium ${
              selectedType === type
                ? campaignTypeColors[type] + ' shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <Icon icon={campaignTypeIcons[type]} className="w-4 h-4 mr-1.5" />
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Campaign Name</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Type</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Responses</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</div>
        </div>

        {filteredCampaigns.map((campaign) => (
          <div 
            key={campaign.name}
            className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
          >
            <div className="col-span-2">
              <div className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {campaign.name}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{campaign.engagement} engagement</div>
            </div>
            <div>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${campaignTypeColors[campaign.type]}`}>
                <Icon icon={campaignTypeIcons[campaign.type]} className="w-3.5 h-3.5 mr-1" />
                {campaign.type.toUpperCase()}
              </span>
            </div>
            <div>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${statusColors[campaign.status]}`}>
                <Icon icon={statusIcons[campaign.status]} className="w-3.5 h-3.5 mr-1" />
                {campaign.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">{campaign.responses.toLocaleString()}</div>
            <div className="text-sm text-gray-600">{campaign.lastRun}</div>
          </div>
        ))}
      </div>

      <NewCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
};

export default Campaign; 