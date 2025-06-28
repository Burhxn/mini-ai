import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CampaignType = 'call' | 'sms' | 'email';
export type CampaignStatus = 'Scheduled' | 'Running' | 'Completed';

export interface Campaign {
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  responses: number;
  engagement: string;
  lastRun: string;
  message?: string;
  scheduledDate: string;
}

interface CampaignState {
  campaigns: Campaign[];
  selectedType: CampaignType | 'all';
  filteredCampaigns: Campaign[];
  // Actions
  addCampaign: (campaign: Omit<Campaign, 'status' | 'responses' | 'engagement' | 'lastRun'>) => void;
  setSelectedType: (type: CampaignType | 'all') => void;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      campaigns: [
        {
          name: 'Customer Satisfaction Survey',
          type: 'call',
          status: 'Running',
          responses: 245,
          engagement: '78%',
          lastRun: '2h ago',
          message: 'Hello! We would love to hear your feedback about our service.',
          scheduledDate: '2024-03-20T10:00'
        },
        {
          name: 'Appointment Reminders',
          type: 'sms',
          status: 'Completed',
          responses: 1893,
          engagement: '92%',
          lastRun: '30m ago',
          message: 'Reminder: Your appointment is scheduled for tomorrow at 2 PM.',
          scheduledDate: '2024-03-19T14:00'
        },
        {
          name: 'Monthly Newsletter',
          type: 'email',
          status: 'Scheduled',
          responses: 0,
          engagement: '-',
          lastRun: 'Starts in 2d',
          message: 'Check out our latest updates and featured products!',
          scheduledDate: '2024-03-22T09:00'
        }
      ],
      selectedType: 'all',
      filteredCampaigns: [],

      addCampaign: (newCampaign) => {
        const campaign: Campaign = {
          ...newCampaign,
          status: 'Scheduled',
          responses: 0,
          engagement: '-',
          lastRun: `Starts ${new Date(newCampaign.scheduledDate).toLocaleDateString()}`
        };
        
        set((state) => ({
          campaigns: [campaign, ...state.campaigns]
        }));
      },

      setSelectedType: (type) => {
        set((state) => ({
          selectedType: type,
          filteredCampaigns: type === 'all' 
            ? state.campaigns 
            : state.campaigns.filter(campaign => campaign.type === type)
        }));
      }
    }),
    {
      name: 'campaign-storage', // unique name for localStorage key
      partialize: (state) => ({ 
        campaigns: state.campaigns,
        // We don't need to store selectedType or filteredCampaigns as they can be derived
      }),
    }
  )
); 