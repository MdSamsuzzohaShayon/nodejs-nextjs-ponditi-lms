/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { locationSelection } from '../../utils/helper';
import { roles } from '../../config/keys';
import { isoToDateTime, formatTimeAMPM } from '../../utils/timeFunction';
import { StatusEnum } from '../../types/enums';

const { TEACHER, STUDENT } = roles;

function SingleScheduledClassInfo(props) {
  return (
    <div className="SingleScheduledClassInfo">
      {/* Basic info start  */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="icon-img">
            <img src="/icons/location.svg" alt="" />
          </div>
          <h4>Tuition Style</h4>
          <p>{locationSelection(props.singleScheduledClass?.types)}</p>
        </div>
        <div className="col-md-6">
          <div className="icon-img">
            <img src="/icons/status.svg" alt="" />
          </div>
          <h4>Scheduled Time</h4>
          {/* <p>{props.singleScheduledClass?.status}</p> */}
          {/* <p>{props.singleScheduledClass?.status}</p> */}
          <div className="row mb-3 mx-0">
            {isoToDateTime(props.singleScheduledClass.start).date} &nbsp; Slot : {`${formatTimeAMPM(props.singleScheduledClass.start)}`}
          </div>
        </div>
      </div>
      {/* Basic info end  */}

      {/* student, teacher and subject start  */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="card rounded-1">
            {props.authUserInfo.role === TEACHER && (
              <div className="card-body">
                <h5 className="card-title">Student&apos;s Detail</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.singleScheduledClass?.Sender?.name}</h6>
                <p className="card-text">
                  District: {props.singleScheduledClass?.Sender?.district}
                  <br />
                  Location: {props.singleScheduledClass?.Sender?.presentaddress}
                </p>
                {/* {props.singleScheduledClass.status === StatusEnum.APPROVED && <p className="card-text">Phone: {props.singleScheduledClass?.Sender?.phone}</p> } */}
              </div>
            )}
            {props.authUserInfo.role === STUDENT && (
              <div className="card-body">
                <h5 className="card-title">Teacher&apos;s Detail</h5>
                <h6 className="card-subtitle mb-2 text-muted text-uppercase">{props.singleScheduledClass?.Recever?.name}</h6>
                <p className="card-text">
                  District: {props.singleScheduledClass?.Recever?.district}
                  <br />
                  Location: {props.singleScheduledClass?.Recever?.presentaddress}
                </p>
                {props.singleScheduledClass.status === StatusEnum.APPROVED && <p className="card-text">Phone: {props.singleScheduledClass?.Sender?.phone}</p>}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card rounded-1">
            <div className="card-body">
              <h5 className="card-title">Subject Detail</h5>
              <h6 className="card-subtitle mb-2 text-muted">Class ID# {props.singleScheduledClass?.id}</h6>
              <p className="card-text">
                Institution: {props.singleScheduledClass?.Sender?.institution}
                <br />
                Class: {props.singleScheduledClass?.ClassType?.name}
              </p>
              <p className="card-text">Subject: {props.singleScheduledClass?.Subject?.name}</p>
            </div>
          </div>
        </div>
      </div>
      {/* student, teacher and subject end  */}

      {/* Time detail start  */}
      {/* <div className="row mb-3 mx-0">
        Scheduled Time : {convertISOToReadableTime(props.singleScheduledClass.start)}
        <br />
        Slot : {makeSlot(props.singleScheduledClass.start)}
      </div> */}
      {/* Time detail end  */}
      <style jsx>{`
        .icon-img img {
          width: 2rem;
        }
      `}</style>
    </div>
  );
}

export default SingleScheduledClassInfo;
