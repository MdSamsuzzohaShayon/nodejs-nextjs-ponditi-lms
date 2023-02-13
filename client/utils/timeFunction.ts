export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
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

export const calculateDuration = (startTime, hours) => {
  return startTime;
};
