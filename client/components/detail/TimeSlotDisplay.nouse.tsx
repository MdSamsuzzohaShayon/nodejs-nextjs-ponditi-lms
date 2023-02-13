/* eslint-disable no-loop-func */
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { TimeSlotDisplayPropsInterface } from '../../types/components/LayoutInterface';
import { formatAsDate } from '../../utils/timeFunction';
import { TimeAMPMEnum } from '../../types/enums';

function TimeSlotDisplay({ offset, timeSlotList, slotLimit, additionalClasses, initializeSchedule }: TimeSlotDisplayPropsInterface) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedAmpm, setSelectedAmpm] = useState<string | null>(null);

  const acceptedSCOU = useAppSelector((state) => state.scheduledclass.acceptedSCOU);

  const initiateSlot = () => {
    const slotItemList = [];
    // acceptedSCOU
    // console.log({ initializeSchedule_date: formatAsDate(initializeSchedule.date), acceptedSCOU: formatAsDate(acceptedSCOU[0].start)});
    // console.log(acceptedSCOU);

    // console.log(acceptedSCOU);
    for (let i = offset; i < slotLimit; i += 1) {
      const slotBooked = acceptedSCOU.find((sc) => {
        const startedDate = new Date(sc.start).toISOString().substring(0, 10);
        // console.log({date: initializeSchedule.date, iso: new Date(initializeSchedule.date).toISOString()});

        let slotTime = timeSlotList[i].slot;
        if (timeSlotList[i].ampm === TimeAMPMEnum.PM) {
          slotTime += 12;
        }
        if (initializeSchedule.date && formatAsDate(new Date(initializeSchedule.date).toISOString()) === startedDate && new Date(sc.start).getHours() === slotTime) {
          return sc;
        }
        return null;
      });
      let newItem: React.ReactElement | null = null;
      // console.log({slotBooked});
      // if (slotBooked) {
      //   console.log('===============BOOKED');
      // }

      if (slotBooked) {
        newItem = (
          <button type="button" key={timeSlotList[i].id} className="btn mb-2 btn-secondary" disabled>
            {`${timeSlotList[i].slotName} ${timeSlotList[i].ampm}`}
          </button>
        );
      } else {
        newItem = (
          <button
            type="button"
            key={timeSlotList[i].id}
            onClick={(sse) => selectSlotHandler(sse, timeSlotList[i].slot, timeSlotList[i].ampm)}
            className={timeSlotList[i].slot === selectedSlot && timeSlotList[i].ampm === selectedAmpm ? 'btn mb-2 btn-primary' : 'btn mb-2 btn-outline-primary'}
          >
            {`${timeSlotList[i].slotName} ${timeSlotList[i].ampm}`}
          </button>
        );
      }
      slotItemList.push(newItem);
    }

    return <div className={`time-slot d-flex w-full justify-content-md-between align-items-center flex-wrap ${additionalClasses}`}>{slotItemList}</div>;
  };
  return <div className="TimeSlotDisplay">{initiateSlot()}</div>;
}

export default TimeSlotDisplay;
