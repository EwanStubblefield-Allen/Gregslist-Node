import { dbContext } from "../db/DbContext.js"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class JobsService {
  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

  async getJobsById(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (!job) {
      throw new BadRequest(`No house found with this id: ${jobId}`)
    }
    return job
  }

  async createJobs(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }

  async updateJobs(userId, jobId, jobData) {
    const originalJob = await this.getJobsById(jobId)
    if (originalJob.creatorId.toString() != userId) {
      throw new UnAuthorized('YOU ARE NOT THE OWNER OF THIS JOB')
    }
    originalJob.position = jobData.position || originalJob.position
    originalJob.isFullTime = jobData.isFullTime || originalJob.isFullTime
    originalJob.schedule = jobData.schedule || originalJob.schedule
    originalJob.description = jobData.description || originalJob.description
    await originalJob.save()
    return originalJob
  }

  async removeJobs(userId, jobId) {
    const jobToDelete = await this.getJobsById(jobId)
    if (jobToDelete.creatorId.toString() != userId) {
      throw new UnAuthorized('YOU ARE NOT THE OWNER OF THIS JOB')
    }
    jobToDelete.remove()
  }
}

export const jobsService = new JobsService()