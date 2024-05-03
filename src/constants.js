export const SCENES = Object.freeze({
  PRELOAD: 'scene:preload',
  MAIN: 'scene:main',
  GAME_OVER: 'scene:game-over',
})

export const EVENTS = Object.freeze({
  CREATED_PLAYER: 'player:created',

  GENERATE_CLOUD: 'cloud:generate',
  DESTROY_CLOUD: 'cloud:destroy',

  GENERATE_OBSTACLE: 'obstacle:generate',
  CREATED_OBSTACLE: 'obstacle:created',

  GENERATE_COIN: 'coin:generate',
  CREATED_COIN: 'coin:created',
})
