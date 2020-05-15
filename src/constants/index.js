// TODO: model directory 위치 정해지면 수정
import { CONSTANTS } from './constants'
// import { PLATFORM } from './../../scan.games.model/constants/platform'
const CONST = {
  // PLATFORM,
  CONSTANTS,
}
const $C = (key) => {
  const value = CONST[key]
              ? CONST[key]
              : key.split('.').reduce((prev, curr) => prev[curr], CONST)
  return value
}

//  USAGE:
//  $C('API_LIST.SEARCH')
export {
  $C,
}