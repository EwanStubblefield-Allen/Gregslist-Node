import { Auth0Provider } from "@bcwdev/auth0provider";
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJobsById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJobs)
      .put('/:jobId', this.updateJobs)
      .delete('/:jobId', this.removeJobs)
  }
  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async getJobsById(req, res, next) {
    try {
      const jobId = req.params.jobId
      const job = await jobsService.getJobsById(jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async createJobs(req, res, next) {
    try {
      const jobData = req.body
      jobData.creatorId = req.userInfo.id
      const job = await jobsService.createJobs(jobData)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async updateJobs(req, res, next) {
    try {
      const userId = req.userInfo.id
      const jobId = req.params.jobId
      const jobData = req.body
      const job = await jobsService.updateJobs(userId, jobId, jobData)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async removeJobs(req, res, next) {
    try {
      const userId = req.userInfo.id
      const jobId = req.params.jobId
      await jobsService.removeJobs(userId, jobId)
      res.send('Job was deleted')
    } catch (error) {
      next(error)
    }
  }
}