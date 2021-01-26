import { Career } from './career.interface'
import { Course } from './course.interface'

export interface User {
  username: string
  name: string
  avatar: string
  points: string
  questions: string
  answers: string
  flag: string
  country: string
  isStaff: boolean
  userId: string
  url: string
  bio: string
  directMessage: string
  logged: boolean
  sameProfile: boolean
  badge: string
  profile_url: string
  careers: Career[]
  courses: Course[]
  deprecated: Course[]
}
