import { CVInfoContext } from '@/context/CVInfoContext';
import React, { useContext } from 'react';

function CVPreview() {
  const { CVInfo, setCVInfo } = useContext(CVInfoContext);
  return (
    <div
      className="px-[30px] py-[40px] shadow-lg heigh-full w-full bg-white  border border-t-8"
      style={{ borderColor: CVInfo?.themeColor }}
    >
      <h2
        className=" font-bold text-center text-xl"
        style={{ color: CVInfo?.themeColor }}
      >
        {(CVInfo?.firstName || '') + ' ' + (CVInfo?.lastName || '')}
      </h2>
      <h2 className="text-center text-sm font-medium">{CVInfo?.jobTitle}</h2>
      <h2
        className="text-center text-sm font-medium"
        style={{ color: CVInfo?.themeColor }}
      >
        {CVInfo?.address}
      </h2>
      <div
        className="flex justify-between mt-4"
        style={{ color: CVInfo?.themeColor }}
      >
        <div className="text-sm">{CVInfo?.phone}</div>
        <div className="text-sm">{CVInfo?.email}</div>
      </div>
      <hr
        className=" border-2 my-2"
        style={{ borderColor: CVInfo?.themeColor }}
      />
      <p className="text-sm text-left">{CVInfo?.summery}</p>
      {CVInfo?.experience && (
        <h2
          className="mt-3 text-center text-sm font-bold"
          style={{ color: CVInfo?.themeColor }}
        >
          experience
        </h2>
      )}
      {CVInfo?.experience && (
        <hr
          className=" border-1 my-2"
          style={{ borderColor: CVInfo?.themeColor }}
        />
      )}
      {CVInfo?.experience &&
        CVInfo?.experience.map(function (exp, index) {
          return (
            <div className="my-3" key={index}>
              <h3 className="text-sm font-bold">{exp?.title}</h3>
              <div className="flex justify-between">
                <h3 className="text-xs font-medium">
                  {exp?.company},{exp?.location}
                </h3>
                <h3 className="text-xs font-medium">
                  {exp?.startYear}- {exp?.endYear}
                </h3>
              </div>
              <p className="text-xs py-1">{exp?.description}</p>
            </div>
          );
        })}

      {CVInfo?.education && (
        <h2
          className="mt-3 text-center text-sm font-bold"
          style={{ color: CVInfo?.themeColor }}
        >
          education
        </h2>
      )}
      {CVInfo?.education && (
        <hr
          className=" border-1 my-2"
          style={{ borderColor: CVInfo?.themeColor }}
        />
      )}
      {CVInfo?.education &&
        CVInfo?.education.map(function (edu, index) {
          return (
            <div className="my-3" key={index}>
              <h3 className="text-sm font-bold">{edu?.school}</h3>
              <div className="flex justify-between">
                <h3 className="text-xs font-medium">
                  {edu?.degree} in {edu?.major}
                </h3>
                <h3 className="text-xs font-medium">
                  {edu?.startYear}- {edu?.endYear}
                </h3>
              </div>
              <p className="text-xs py-1">{edu?.description}</p>
            </div>
          );
        })}

      {CVInfo?.skills && (
        <h2
          className="mt-3 text-center text-sm font-bold"
          style={{ color: CVInfo?.themeColor }}
        >
          skills
        </h2>
      )}
      {CVInfo?.skills && (
        <hr
          className=" border-1 my-2"
          style={{ borderColor: CVInfo?.themeColor }}
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        {CVInfo?.skills &&
          CVInfo?.skills.map(function (skill, index) {
            return (
              <div className="flex items-center justify-between" key={index}>
                <h3 className="test-xs">{skill?.name}</h3>
                <div className="h-2 w-[10vw] bg-gray-300">
                  <div
                    className="h-full"
                    style={{
                      width: skill?.level + '%',
                      backgroundColor: CVInfo?.themeColor,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CVPreview;
