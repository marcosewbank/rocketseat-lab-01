import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateEnrollmentParams {
  courseId: string;
  studentId: string;
}

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  getCourseAndStudentId({
    studentId,
    courseId,
  }: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: { courseId, studentId, canceledAt: null },
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId, canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  createEnrollment({ studentId, courseId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: { studentId, courseId },
    });
  }
}
