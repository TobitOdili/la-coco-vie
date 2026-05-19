import { Howl, Howler } from 'howler'
import { CHAPTERS } from './useChapterScene'

let sounds = []
let tickSound = null
let soundOn = true
let initialized = false

export function useAudio() {
  function init() {
    if (initialized) return
    initialized = true

    tickSound = new Howl({
      src: ['/audio/tick.mp3'],
      volume: 0.5,
    })

    sounds = CHAPTERS.map((chapter) => {
      return new Howl({
        src: [chapter.audio],
        loop: true,
        volume: 0,
        html5: true,
      })
    })
  }

  function playTick() {
    if (!soundOn || !tickSound) return
    tickSound.play()
  }

  function setHoveredChapter(index) {
    if (!soundOn || !sounds.length) return
    sounds.forEach((s, i) => {
      if (i === index) {
        s.volume(0.1)
        if (!s.playing()) s.play()
      } else {
        s.volume(0)
      }
    })
  }

  function clearHover() {
    if (!sounds.length) return
    sounds.forEach((s) => s.volume(0))
  }

  function setChapterAudio(index, vol = 0.5) {
    if (!sounds.length) return
    sounds.forEach((s, i) => {
      if (i === index) {
        s.volume(vol)
        if (!s.playing()) s.play()
      } else {
        s.volume(0)
      }
    })
  }

  function toggleSound() {
    soundOn = !soundOn
    if (!soundOn) {
      Howler.mute(true)
    } else {
      Howler.mute(false)
    }
    return soundOn
  }

  function isSoundOn() {
    return soundOn
  }

  function destroy() {
    sounds.forEach((s) => s.unload())
    tickSound?.unload()
    initialized = false
    sounds = []
    tickSound = null
  }

  return {
    init,
    playTick,
    setHoveredChapter,
    clearHover,
    setChapterAudio,
    toggleSound,
    isSoundOn,
    destroy,
  }
}
