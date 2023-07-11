import { dbContext } from "../db/DbContext.js"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class HousesService {
  async getHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }

  async getHousesById(houseId) {
    const foundHouse = await dbContext.Houses.findById(houseId)
    if (!foundHouse) {
      throw new BadRequest(`No house found with this id: ${houseId}`)
    }
    return foundHouse
  }

  async createHouses(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async updateHouses(userId, houseId, houseData) {
    const originalHouse = await this.getHousesById(houseId)
    if (originalHouse.creatorId.toString() != userId) {
      throw new UnAuthorized('YOU ARE NOT THE OWNER OF THIS HOUSE')
    }
    originalHouse.bedrooms = houseData.bedrooms || originalHouse.bedrooms
    originalHouse.bathrooms = houseData.bathrooms || originalHouse.bathrooms
    originalHouse.year = houseData.year || originalHouse.year
    originalHouse.price = houseData.price || originalHouse.price
    originalHouse.description = houseData.description || originalHouse.description
    await originalHouse.save()
    return originalHouse
  }

  async removeHouses(userId, houseId) {
    const houseToDelete = await this.getHousesById(houseId)
    if (houseToDelete.creatorId.toString() != userId) {
      throw new UnAuthorized('YOU ARE NOT THE OWNER OF THIS HOUSE')
    }
    await houseToDelete.remove()
  }
}

export const housesService = new HousesService()