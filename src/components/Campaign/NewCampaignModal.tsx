import { Icon } from '@iconify/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { z } from 'zod';

// Base schema for form validation
const campaignSchema = z.object({
  name: z.string()
    .min(1, 'Campaign name is required')
    .max(100, 'Campaign name must be less than 100 characters'),
  type: z.enum(['call', 'sms', 'email'] as const),
  message: z.string()
    .min(1, 'Message is required')
    .max(500, 'Message must be less than 500 characters'),
  scheduledDate: z.date()
    .min(new Date(), 'Schedule date must be in the future')
});

// Schema for the submitted data (with ISO string date)
const submissionSchema = campaignSchema.transform((data) => ({
  ...data,
  scheduledDate: data.scheduledDate.toISOString()
}));

type CampaignFormData = z.infer<typeof campaignSchema>;
type CampaignSubmissionData = z.infer<typeof submissionSchema>;

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: CampaignSubmissionData) => void;
}

const NewCampaignModal = ({ isOpen, onClose, onSubmit }: NewCampaignModalProps) => {
  const [formData, setFormData] = useState<Omit<CampaignFormData, 'scheduledDate'>>({
    name: '',
    type: 'call',
    message: ''
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    type?: string;
    message?: string;
    scheduledDate?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    try {
      // Validate and transform the data for submission
      const validatedData = submissionSchema.parse({
        ...formData,
        scheduledDate: selectedDate
      });
      
      onSubmit(validatedData);
      onClose();
      setFormData({
        name: '',
        type: 'call',
        message: ''
      });
      setSelectedDate(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, err) => ({
          ...acc,
          [err.path[0]]: err.message
        }), {});
        setErrors(newErrors);
      }
    }
  };

  if (!isOpen) return null;

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

  // Custom input component for DatePicker
  const CustomInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
    <div 
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 
        shadow-sm cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <Icon icon="carbon:calendar" className="w-4 h-4 text-gray-400 mr-2" />
        <span className={`text-sm ${value ? 'text-gray-900' : 'text-gray-400'}`}>
          {value || 'Select date and time'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Icon icon="carbon:campaign" className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Create New Campaign</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon icon="carbon:close" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Campaign Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) {
                    setErrors({ ...errors, name: undefined });
                  }
                }}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                  shadow-sm text-sm text-gray-900 placeholder-gray-400"
                placeholder="Enter campaign name"
              />
              {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Campaign Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Type
              </label>
              <div className="flex gap-2">
                {(['call', 'sms', 'email'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, type });
                      if (errors.type) {
                        setErrors({ ...errors, type: undefined });
                      }
                    }}
                    className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                      ${formData.type === type
                        ? campaignTypeColors[type] + ' shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm'
                      }`}
                  >
                    <Icon icon={campaignTypeIcons[type]} className="w-4 h-4 mr-1.5" />
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
              {errors.type && <p className="mt-1.5 text-sm text-red-600">{errors.type}</p>}
            </div>

            {/* Schedule Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  if (errors.scheduledDate) {
                    setErrors({ ...errors, scheduledDate: undefined });
                  }
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                customInput={<CustomInput />}
                className="w-full"
                calendarClassName="!bg-white !border-gray-200 !rounded-lg !shadow-lg !font-sans !text-sm"
                wrapperClassName="w-full"
              />
              {errors.scheduledDate && (
                <p className="mt-1.5 text-sm text-red-600">{errors.scheduledDate}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) {
                    setErrors({ ...errors, message: undefined });
                  }
                }}
                rows={3}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                  shadow-sm text-sm text-gray-900 placeholder-gray-400 resize-none"
                placeholder="Enter your campaign message"
              />
              {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50
                transition-all duration-200 shadow-sm text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                transition-all duration-200 shadow-sm text-sm font-medium"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCampaignModal; 