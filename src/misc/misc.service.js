import { categoryService } from '../category/index.js'
import { equipmentService } from '../equipment/index.js'
import { operationService } from '../operation/index.js'
import { workstationService } from '../workstation/index.js'

export const initializeApp = () => {
  const collections = categoryService.getAll()
  const equipments = equipmentService.getAll()
  const operations = operationService.getAll()
  const workstations = workstationService.getAll()

  return {
    collections,
    equipments,
    operations,
    workstations
  }
}