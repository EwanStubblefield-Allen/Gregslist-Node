import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHousesById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouses)
      .put('/:houseId', this.updateHouses)
      .delete('/:houseId', this.removeHouses)
  }
  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHousesById(req, res, next) {
    try {
      const houseId = req.params.houseId
      const house = await housesService.getHousesById(houseId)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async createHouses(req, res, next) {
    try {
      const houseData = req.body
      houseData.creatorId = req.userInfo.id
      const house = await housesService.createHouses(houseData)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async updateHouses(req, res, next) {
    try {
      const userId = req.userInfo.id
      const houseId = req.params.houseId
      const houseData = req.body
      const houses = await housesService.updateHouses(userId, houseId, houseData)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async removeHouses(req, res, next) {
    try {
      const userId = req.userInfo.id
      const houseId = req.params.houseId
      await housesService.removeHouses(userId, houseId)
      res.send('House was deleted')
    } catch (error) {
      next(error)
    }
  }
}