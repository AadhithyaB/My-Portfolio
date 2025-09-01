// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const loadingScreen = document.getElementById("loading-screen")
const contactForm = document.getElementById("contact-form")
const cursorTrail = document.getElementById("cursor-trail")
const atomicCanvas = document.getElementById("atomic-canvas")

// Loading Screen with Molecular Motion
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 3000)
})

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth Scrolling Function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 70
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Active Navigation Link
function updateActiveNavLink() {
  const sections = ["home", "about", "skills", "projects", "contact"]
  const scrollPosition = window.scrollY + 100

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    const navLink = document.querySelector(`[data-section="${sectionId}"]`)

    if (section && navLink) {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        navLink.classList.add("active")
      }
    }
  })
}

// Update navbar background on scroll
function updateNavbarBackground() {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(15, 15, 35, 0.98)"
    navbar.style.backdropFilter = "blur(20px)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.05)"
    navbar.style.backdropFilter = "blur(10px)"
  }
}

// Scroll Event Listener
window.addEventListener(
  "scroll",
  throttle(() => {
    updateActiveNavLink()
    animateOnScroll()
    animateSkillBars()
    updateNavbarBackground()
    const glowElements = document.querySelectorAll(".glow-on-scroll")

    glowElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (isVisible) {
        element.classList.add("visible")
      }
    })
  }, 16),
)

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

// Animate skill bars when they come into view
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const barTop = bar.getBoundingClientRect().top
    const barVisible = 150

    if (barTop < window.innerHeight - barVisible && !bar.classList.contains("animated")) {
      const width = bar.getAttribute("data-width")
      bar.style.width = width + "%"
      bar.classList.add("animated")
    }
  })
}

// Contact Form Handling
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  btnText.style.display = "none"
  btnLoading.style.display = "inline-flex"
  submitBtn.disabled = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    showNotification("Message sent successfully!", "success")
    contactForm.reset()
  } catch (error) {
    showNotification("Failed to send message. Please try again.", "error")
  } finally {
    btnText.style.display = "inline"
    btnLoading.style.display = "none"
    submitBtn.disabled = false
  }
})

// Notification System
function showNotification(message, type) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    backdrop-filter: blur(10px);
    ${
      type === "success"
        ? "background: linear-gradient(45deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9));"
        : "background: linear-gradient(45deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9));"
    }
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Typing Animation for Hero Section
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  setTimeout(() => {
    const heroSubtitle = document.querySelector(".hero-subtitle")
    if (heroSubtitle) {
      heroSubtitle.classList.remove("typing-animation")
      typeWriter(heroSubtitle, "Machine Learning Engineer", 150)
    }
  }, 4000)
})

// Cursor Trail Effect
let mouseX = 0,
  mouseY = 0
let trailX = 0,
  trailY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function updateCursorTrail() {
  const dx = mouseX - trailX
  const dy = mouseY - trailY

  trailX += dx * 0.1
  trailY += dy * 0.1

  cursorTrail.style.left = trailX - 10 + "px"
  cursorTrail.style.top = trailY - 10 + "px"

  requestAnimationFrame(updateCursorTrail)
}

updateCursorTrail()

// Atomic Canvas Animation
function initAtomicCanvas() {
  const canvas = atomicCanvas
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []
  const particleCount = 50

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 2
      this.vy = (Math.random() - 0.5) * 2
      this.radius = Math.random() * 3 + 1
      this.color = Math.random() > 0.5 ? "#06b6d4" : "#ec4899"
      this.opacity = Math.random() * 0.5 + 0.2
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1

      // Add some randomness
      this.vx += (Math.random() - 0.5) * 0.1
      this.vy += (Math.random() - 0.5) * 0.1

      // Limit velocity
      this.vx = Math.max(-3, Math.min(3, this.vx))
      this.vy = Math.max(-3, Math.min(3, this.vy))
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle =
        this.color +
        Math.floor(this.opacity * 255)
          .toString(16)
          .padStart(2, "0")
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = this.color
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Draw connections
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / 100)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(animate)
  }

  animate()

  // Resize handler
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Tilt Effect
function initTiltEffect() {
  const tiltElements = document.querySelectorAll(".tilt-element")

  tiltElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transformStyle = "preserve-3d"
    })

    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    })
  })
}

// Parallax Scrolling
function initParallaxScrolling() {
  const parallaxElements = document.querySelectorAll(".parallax-layer")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })
}

// Floating Elements Animation
function initFloatingElements() {
  const floatingElements = document.querySelectorAll(".floating-element")

  floatingElements.forEach((element, index) => {
    const speed = element.dataset.speed || 2
    const delay = index * 2

    element.style.animationDuration = `${20 / speed}s`
    element.style.animationDelay = `${delay}s`

    // Random positioning
    element.style.left = Math.random() * 100 + "%"

    // Random size
    const size = Math.random() * 6 + 2
    element.style.width = size + "px"
    element.style.height = size + "px"
  })
}

// Add fade-in class to elements that should animate
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".about-text, .about-cards, .skill-category, .project-card, .contact-info, .contact-form-container",
  )
  animateElements.forEach((element) => {
    element.classList.add("fade-in")
  })
})

// Add click event listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const sectionId = link.getAttribute("data-section")
    scrollToSection(sectionId)
  })
})

// Add click event listeners to buttons
document.addEventListener("click", (e) => {
  if (e.target.matches('[onclick*="scrollToSection"]')) {
    e.preventDefault()
    const onclick = e.target.getAttribute("onclick")
    const sectionId = onclick.match(/'([^']+)'/)[1]
    scrollToSection(sectionId)
  }
})

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Enhanced Hover Effects for Project Cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
    card.style.boxShadow = "0 20px 40px rgba(6, 182, 212, 0.3)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
    card.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)"
  })
})

// Enhanced Button Ripple Effect
document.querySelectorAll(".btn, .glow-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Performance optimization: Throttle function
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Initialize all effects when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initAtomicCanvas()
  initTiltEffect()
  initParallaxScrolling()
  initFloatingElements()
  updateActiveNavLink()

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element) => {
    observer.observe(element)
  })

  // Add loading animation to skill bars
  setTimeout(() => {
    animateSkillBars()
  }, 1000)
})

// Smooth cursor following for interactive elements
document.querySelectorAll(".glow-button, .social-link, .nav-link").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorTrail.style.transform = "scale(1.5)"
    cursorTrail.style.background =
      "radial-gradient(circle, rgba(6, 182, 212, 1) 0%, rgba(236, 72, 153, 0.6) 50%, transparent 70%)"
  })

  element.addEventListener("mouseleave", () => {
    cursorTrail.style.transform = "scale(1)"
    cursorTrail.style.background =
      "radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(236, 72, 153, 0.4) 50%, transparent 70%)"
  })
})

// Initialize everything
console.log("🚀 Portfolio loaded with advanced interactive effects!")
