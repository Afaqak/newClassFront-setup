import { toast } from 'react-hot-toast';

export const notify = (message, type) => {
  toast(message, {
    style: {
      background: type === 'error' ? '#F87171' : '#2563eb',
      color: '#fff',
    },
  });
};

const formatDate = (date) => {
  const d = new Date(date);
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric' };
  const formattedDate = d.toLocaleDateString('en-US', dateOptions);
  const formattedTime = d.toLocaleTimeString('en-US', timeOptions);
  return `${formattedDate} at ${formattedTime}`;
};

export const checkUserData = (data) => {
  if (data !== '') {
    return 'text-transparent';
  }
  return 'top-2 text-gray-300';
};

export default formatDate;
