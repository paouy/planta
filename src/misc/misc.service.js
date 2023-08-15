import { categoryService } from '../category/index.js'
import { equipmentService } from '../equipment/index.js'
import { operationService } from '../operation/index.js'
import { workerService } from '../worker/index.js'
import { workstationService } from '../workstation/index.js'

export const initializeApp = () => {
  const categories = categoryService.getAll()
  const equipments = equipmentService.getAll()
  const operations = operationService.getAll()
  const workers = workerService.getAll()
  const workstations = workstationService.getAll()

  return {
    categories,
    equipments,
    operations,
    workers,
    workstations
  }
}