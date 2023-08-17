import { categoryService } from '../category/index.js'
import { equipmentService } from '../equipment/index.js'
import { lookupService } from '../lookup/index.js'
import { operationService } from '../operation/index.js'
import { workerService } from '../worker/index.js'
import { workstationService } from '../workstation/index.js'

export const initializeApp = () => {
  const organizatioName = lookupService.getOne('organizationName')
  const categories = categoryService.getAll()
  const equipments = equipmentService.getAll()
  const operations = operationService.getAll()
  const workers = workerService.getAll()
  const workstations = workstationService.getAll()

  return {
    ...organizatioName,
    categories,
    equipments,
    operations,
    workers,
    workstations
  }
}