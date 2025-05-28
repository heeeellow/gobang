import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    roomId: null,
    ready: false,
    isMyTurn: false,
    startTime: 0,
    pieces: []      // {x,y,color}
  }),
  actions: {
    reset(){
      Object.assign(this.$state, { ready:false, isMyTurn:false, startTime:0, pieces:[] })
    }
  }
})
