export const getWifiColor = (level) => {
    switch (level) {
      case 'STRONG':
        return 'bg-green-500'; // Green for strong
      case 'MODERATE':
        return 'bg-yellow-400'; // Yellow for moderate
      case 'WEAK':
        return 'bg-red-500'; // Red for weak
      case 'VERY_WEAK':
        return 'bg-gray-300'; // Gray for very weak
      default:
        return 'bg-gray-300'; // Default to gray
    }
  };

export const getWifiStrength = (strength) => {
  switch (strength) {
      case 'STRONG':
        return [true, true, true, true];
      case 'MODERATE':
        return [true, true, true, false];
      case 'WEAK':
        return [true, true, false, false];
      case 'VERY_WEAK':
        return [true, false, false, false];
      default:
        return [false, false, false, false];
  }
};
  
export const getDate = (date) => {
    const lastInteraction = new Date(date);
    const now = new Date();

    const isSameDay = (
        lastInteraction.getDate() === now.getDate() &&
        lastInteraction.getMonth() === now.getMonth() &&
        lastInteraction.getFullYear() === now.getFullYear()
    );
      
    if (isSameDay) {
        return "Aujourd'hui"
    } else {
        const year = lastInteraction.getFullYear();
        const month = String(lastInteraction.getMonth() + 1).padStart(2, '0');
        const day = String(lastInteraction.getDate()).padStart(2, '0');        
        
        return `${day}/${month}/${year}`;
    }
};

export const getTime = (date) => {
    const lastInteraction = new Date(date);

    let hours = lastInteraction.getHours();
    const minutes = String(lastInteraction.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    return `${hours}:${minutes} ${ampm}`;
};

// Recuper le nom du mode à partir de son enum
export const getMode = (mode) => {
    switch (mode) {
        case 'AUTOMATIC':
        return "Automatique";
        case 'MANUAL':
        return "Manuel";
        case 'SCHEDULE':
        return "Programmé";
        default:
        return "ERREUR"; // Default error case
    }
};
  