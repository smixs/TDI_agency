import React, { useEffect, useRef } from 'react'

interface PixelCanvasProps {
  gap?: number
  speed?: number
  colors?: string[]
  variant?: 'default' | 'icon'
  noFocus?: boolean
}

export function PixelCanvas({
  gap = 10,
  speed = 20,
  colors = [],
  variant = 'default',
  noFocus = false,
}: PixelCanvasProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof customElements === 'undefined') {
      return
    }

    if (!customElements.get('pixel-canvas')) {
      customElements.define('pixel-canvas', PixelCanvasElement)
    }

    const element = ref.current
    if (!element) return

    const pixelCanvas = document.createElement('pixel-canvas')

    if (gap) pixelCanvas.setAttribute('data-gap', gap.toString())
    if (speed) pixelCanvas.setAttribute('data-speed', speed.toString())
    if (colors.length) pixelCanvas.setAttribute('data-colors', colors.join(','))
    if (variant) pixelCanvas.setAttribute('data-variant', variant)
    if (noFocus) pixelCanvas.setAttribute('data-no-focus', 'true')

    element.appendChild(pixelCanvas)

    return () => {
      element.removeChild(pixelCanvas)
    }
  }, [gap, speed, colors, variant, noFocus])

  return <div ref={ref} className="absolute inset-0 -z-10" />
}

class Pixel {
  x: number
  y: number
  dir: number
  color: string
  turnFactor: number
  turnDirection: number
  speedBias: number
  isFading: boolean
  opacity: number

  constructor(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    this.dir = Math.random() * Math.PI * 2
    this.color = color

    // Randomize pixel behavior
    this.turnFactor = 0.1 + Math.random() * 0.1
    this.turnDirection = Math.random() > 0.5 ? 1 : -1
    this.speedBias = 0.5 + Math.random() * 1
    this.isFading = false
    this.opacity = 1
  }

  update(
    deltaTime: number,
    speed: number,
    containerWidth: number,
    containerHeight: number,
    isActive: boolean,
    isIcon: boolean
  ) {
    // Update direction with a slight turn to create natural movement
    this.dir += this.turnDirection * this.turnFactor * deltaTime

    let pixelSpeed = speed * this.speedBias

    // If this is an icon, create a pull toward the center when inactive
    if (isIcon && !isActive) {
      const centerX = containerWidth / 2
      const centerY = containerHeight / 2
      const dx = centerX - this.x
      const dy = centerY - this.y
      const angleToCenter = Math.atan2(dy, dx)
      
      // Gradually align direction towards center
      const turnStrength = 0.03
      let angleDiff = angleToCenter - this.dir
      
      // Normalize angle difference to [-π, π]
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
      
      this.dir += angleDiff * turnStrength * deltaTime
      
      // Slow down when close to center
      const distToCenter = Math.sqrt(dx * dx + dy * dy)
      const slowFactor = Math.min(distToCenter / 50, 1)
      pixelSpeed *= slowFactor
    }

    if (isActive) {
      // When active, move away from the origin point (bottom left or center)
      const originX = isIcon ? containerWidth / 2 : 0
      const originY = isIcon ? containerHeight / 2 : containerHeight

      const dx = this.x - originX
      const dy = this.y - originY
      const currentAngle = Math.atan2(dy, dx)

      // Gradually align direction away from origin
      if (isActive) {
        const turnStrength = 0.05
        let angleDiff = currentAngle - this.dir
        
        // Normalize angle difference to [-π, π]
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
        
        this.dir += angleDiff * turnStrength * deltaTime
      }
    }

    // Update position
    this.x += Math.cos(this.dir) * pixelSpeed * deltaTime
    this.y += Math.sin(this.dir) * pixelSpeed * deltaTime

    // Handle fading when pixel is outside bounds
    const margin = 20 // Margin to start fading before reaching the boundary
    if (
      this.x < -margin ||
      this.x > containerWidth + margin ||
      this.y < -margin ||
      this.y > containerHeight + margin
    ) {
      this.isFading = true
    }

    if (this.isFading) {
      this.opacity -= 1 * deltaTime
      if (this.opacity <= 0) {
        this.opacity = 0
        
        // Reset position to the origin
        if (isIcon) {
          this.x = containerWidth / 2
          this.y = containerHeight / 2
        } else {
          this.x = 0
          this.y = containerHeight
        }
        
        // Reset state
        this.isFading = false
        this.opacity = 0
        this.dir = Math.random() * Math.PI * 2
      }
    } else if (!isActive && this.opacity < 1) {
      // Fade in when returning to inactive state
      this.opacity += 0.5 * deltaTime
      if (this.opacity > 1) this.opacity = 1
    }
  }

  draw(ctx: CanvasRenderingContext2D, size: number) {
    if (this.opacity <= 0) return

    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size)
    ctx.globalAlpha = 1
  }
}

class PixelCanvasElement extends HTMLElement {
  shadow: ShadowRoot
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  observer: ResizeObserver
  pixels: Pixel[]
  gap: number
  speed: number
  colors: string[]
  variant: 'default' | 'icon'
  noFocus: boolean
  isActive: boolean
  lastTime: number
  requestId: number | null
  eventsBound: boolean

  constructor() {
    super()
    
    // Create shadow DOM
    this.shadow = this.attachShadow({ mode: 'open' })
    
    // Create canvas
    this.canvas = document.createElement('canvas')
    this.canvas.style.display = 'block'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    
    // Add styles
    const style = document.createElement('style')
    style.textContent = `
      :host {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
    `
    
    this.shadow.appendChild(style)
    this.shadow.appendChild(this.canvas)
    
    // Initialize properties
    this.ctx = this.canvas.getContext('2d')
    this.pixels = []
    this.gap = 10
    this.speed = 20
    this.colors = ['#0070f3', '#ff0080', '#00f5d4']
    this.variant = 'default'
    this.noFocus = false
    this.isActive = false
    this.lastTime = 0
    this.requestId = null
    this.eventsBound = false
    
    // Create resize observer
    this.observer = new ResizeObserver(() => this.handleResize())
  }
  
  static get observedAttributes() {
    return ['data-gap', 'data-speed', 'data-colors', 'data-variant', 'data-no-focus']
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    
    switch (name) {
      case 'data-gap':
        this.gap = parseInt(newValue) || 10
        break
      case 'data-speed':
        this.speed = parseInt(newValue) || 20
        break
      case 'data-colors':
        this.colors = newValue.split(',').map(c => c.trim()).filter(Boolean)
        if (this.colors.length === 0) {
          this.colors = ['#0070f3', '#ff0080', '#00f5d4']
        }
        break
      case 'data-variant':
        this.variant = newValue === 'icon' ? 'icon' : 'default'
        break
      case 'data-no-focus':
        this.noFocus = newValue === 'true'
        break
    }
    
    // Reinitialize pixels when attributes change
    if (this.canvas.width > 0 && this.canvas.height > 0) {
      this.initializePixels()
    }
  }
  
  connectedCallback() {
    // Start observing size changes
    this.observer.observe(this)
    
    // Initialize pixels
    this.handleResize()
    
    // Start animation
    if (!this.requestId) {
      this.lastTime = performance.now()
      this.updatePixels(this.lastTime)
    }
    
    // Bind events if not already bound
    if (!this.eventsBound) {
      this.bindEvents()
    }
  }
  
  disconnectedCallback() {
    // Stop observing size changes
    this.observer.unobserve(this)
    
    // Stop animation
    if (this.requestId) {
      cancelAnimationFrame(this.requestId)
      this.requestId = null
    }
    
    // Unbind events
    this.unbindEvents()
  }
  
  bindEvents() {
    if (!this.parentNode || this.eventsBound) return
    
    // State change events
    this.parentNode.addEventListener('mouseenter', this.handleActivate)
    this.parentNode.addEventListener('mouseleave', this.handleDeactivate)
    
    if (!this.noFocus) {
      this.parentNode.addEventListener('focus', this.handleActivate)
      this.parentNode.addEventListener('blur', this.handleDeactivate)
    }
    
    this.eventsBound = true
  }
  
  unbindEvents() {
    if (!this.parentNode || !this.eventsBound) return
    
    this.parentNode.removeEventListener('mouseenter', this.handleActivate)
    this.parentNode.removeEventListener('mouseleave', this.handleDeactivate)
    
    if (!this.noFocus) {
      this.parentNode.removeEventListener('focus', this.handleActivate)
      this.parentNode.removeEventListener('blur', this.handleDeactivate)
    }
    
    this.eventsBound = false
  }
  
  handleActivate = () => {
    this.isActive = true
  }
  
  handleDeactivate = () => {
    this.isActive = false
  }
  
  handleResize() {
    const rect = this.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    
    this.canvas.width = rect.width * dpr
    this.canvas.height = rect.height * dpr
    
    if (this.ctx) {
      this.ctx.scale(dpr, dpr)
    }
    
    this.initializePixels()
  }
  
  initializePixels() {
    this.pixels = []
    const rect = this.getBoundingClientRect()
    
    if (this.variant === 'icon') {
      // For icon variant, create a cluster of pixels in the center
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(rect.width, rect.height) / 4
      
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.random() * radius
        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r
        const color = this.colors[Math.floor(Math.random() * this.colors.length)]
        this.pixels.push(new Pixel(x, y, color))
      }
    } else {
      // For default variant, create a grid of pixels in the bottom-left corner
      const size = 3
      const totalWidth = size * this.gap
      const totalHeight = size * this.gap
      
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const color = this.colors[Math.floor(Math.random() * this.colors.length)]
          this.pixels.push(
            new Pixel(x * this.gap, rect.height - (size - y) * this.gap, color)
          )
        }
      }
    }

    if (!this.requestId) {
      this.lastTime = performance.now()
      this.updatePixels(this.lastTime)
    }
  }
  
  updatePixels = (time: number) => {
    const deltaTime = Math.min((time - this.lastTime) / 1000, 0.1)
    this.lastTime = time

    if (!this.ctx) return

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Update and draw pixels
    const rect = this.getBoundingClientRect()
    for (const pixel of this.pixels) {
      pixel.update(deltaTime, this.speed, rect.width, rect.height, this.isActive, this.variant === 'icon')
      pixel.draw(this.ctx, 4)
    }

    this.requestId = requestAnimationFrame(this.updatePixels)
  }
}

// Удаляем дублирующий именованный экспорт и оставляем только экспорт по умолчанию
export default PixelCanvas 