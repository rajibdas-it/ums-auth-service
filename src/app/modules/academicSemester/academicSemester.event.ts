import { RedisClient } from '../../../shared/redis';
import { academicSemesterServices } from './academicSemester.service';
import {
  Event_Academic_Semester_Created,
  Event_Academic_Semester_Deleted,
  Event_Academic_Semester_Updated,
} from './academicSemeter.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemeter.interface';

const AcademicSemesterEvents = () => {
  RedisClient.subscribe(Event_Academic_Semester_Created, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await academicSemesterServices.createSemesterFromEvent(data);
  });

  RedisClient.subscribe(Event_Academic_Semester_Updated, async (e: string) => {
    const data = JSON.parse(e);
    await academicSemesterServices.updateSemesterFromEvent(data);
    // console.log('updated data:', data);
  });

  RedisClient.subscribe(Event_Academic_Semester_Deleted, async (e: string) => {
    const data = JSON.parse(e);
    await academicSemesterServices.deleteSemesterFromEvent(data.id);
  });
};

export default AcademicSemesterEvents;
