export const formatAMPM = (date) => {
  // console.log(date);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};

export const formatTimeAMPM = (isoTime) => {
  const newTimeDate = new Date(isoTime);

  let hours = newTimeDate.getHours();
  let minutes = newTimeDate.getMinutes();
  const ampm = hours + 1 >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes}-${hours + 1}:${minutes}  ${ampm}`;
  return strTime;
};

export const convertISOToReadableTime = (isoTime) => {
  //     const isoToReadAble = new Date(isoTime);
  const newTimeDate = new Date(isoTime);
  const newDate = `${newTimeDate.getDate()}-${newTimeDate.getMonth()}-${newTimeDate.getFullYear()}`;
  //   const amORpm = newTimeDate.getHours() > 12 ? 'PM' : 'AM';
  const formathours = formatAMPM(newTimeDate);
  return `${newDate} ${formathours}`;
};

export const formatAsDate = (isoTime: string) => {
  //     const isoToReadAble = new Date(isoTime);
  const newTimeDate = new Date(isoTime);
  const year = newTimeDate.getFullYear();
  const month = (newTimeDate.getMonth() + 1).toString().padStart(2, '0');
  const day = newTimeDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
export const formatDate = (isoTime: string, format: string | null = null, dateOffset: number = 0, monthOffset = 0, yearOffset = 0) => {
  //     const isoToReadAble = new Date(isoTime);
  const newTimeDate = new Date(isoTime);
  const year = newTimeDate.getFullYear() + yearOffset;
  const month = (newTimeDate.getMonth() + 1 + monthOffset).toString().padStart(2, '0');
  const day = (newTimeDate.getDate() + dateOffset).toString().padStart(2, '0');

  let formattedDate = `${year}-${month}-${day}`;
  if (format) {
    switch (format.toLowerCase()) {
      case 'dd-mm-yyyy':
        formattedDate = `${day}-${month}-${year}`;
        break;
      case 'dd/mm/yyyy':
        formattedDate = `${day}/${month}/${year}`;
        break;
      case 'mm-dd-yyyy':
        formattedDate = `${month}-${day}-${year}`;
        break;
      case 'mm/dd/yyyy':
        formattedDate = `${month}/${day}/${year}`;
        break;

      case 'yyyy-mm-dd':
        formattedDate = `${year}-${month}-${day}`;
        break;
      case 'yyyy/mm/dd':
        formattedDate = `${year}/${month}/${day}`;
        break;

      case 'yyyy-dd-mm':
        formattedDate = `${year}-${day}-${month}`;
        break;
      case 'yyyy/dd/mm':
        formattedDate = `${year}-${day}-${month}`;
        break;

      default:
        break;
    }
  }
  return formattedDate;
};

export const makeSlot = (isoTime) => {
  //     const isoToReadAble = new Date(isoTime);
  const newTimeDate = new Date(isoTime);
  const newDate = `${newTimeDate.getHours()}-${newTimeDate.getHours() + 1}`;
  return newDate;
};

export const convertReadableToISOTime = (readableTime) => readableTime;

export const inputToISOtime = (inputedDT) => {
  const newDateTime = new Date(inputedDT);
  return newDateTime.toISOString();
};

export const calculateDuration = (startTime, hours) => startTime;

export function isoToDateTime(isoString: any) {
  const dateObj = new Date(isoString);
  const year = dateObj.getFullYear() % 100;
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const date = `${day}-${month}-${year}`;
  const time = `${hours}:${minutes}`;
  return { date, time };
}
