// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service-card, .value-card, .testimonial-card, .service-card-detailed, .stat-item",
  )
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll")
    observer.observe(el)
  })
})

// Particles animation for hero section
function createParticles() {
  const particlesContainer = document.querySelector(".particles")
  if (!particlesContainer) return

  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 213, 0.3);
            border-radius: 50%;
            pointer-events: none;
        `

    // Random position
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"

    // Random animation
    const duration = 3 + Math.random() * 4
    const delay = Math.random() * 2

    particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`

    particlesContainer.appendChild(particle)
  }
}

// CSS animation for particles
const style = document.createElement("style")
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.5;
        }
        75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.9;
        }
    }
`
document.head.appendChild(style)

// Initialize particles
document.addEventListener("DOMContentLoaded", createParticles)

// Contact form handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const submitButton = this.querySelector(".submit-button")
    const originalText = submitButton.innerHTML

    // Show loading state
    submitButton.innerHTML = '<div class="loading"></div> Enviando...'
    submitButton.disabled = true

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Reset button
      submitButton.innerHTML = originalText
      submitButton.disabled = false

      // Show success message
      showSuccessMessage("¡Mensaje enviado correctamente! Te contactaremos pronto.")

      // Reset form
      this.reset()
    }, 2000)
  })
}

function showSuccessMessage(message) {
  // Remove existing success message
  const existingMessage = document.querySelector(".success-message")
  if (existingMessage) {
    existingMessage.remove()
  }

  // Create new success message
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.textContent = message

  // Insert after form
  const form = document.getElementById("contactForm")
  if (form) {
    form.parentNode.insertBefore(successDiv, form.nextSibling)

    // Show message
    setTimeout(() => {
      successDiv.classList.add("show")
    }, 100)

    // Hide message after 5 seconds
    setTimeout(() => {
      successDiv.classList.remove("show")
      setTimeout(() => {
        successDiv.remove()
      }, 300)
    }, 5000)
  }
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
    const suffix = counter.textContent.replace(/\d/g, "")
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target + suffix
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current) + suffix
      }
    }, 20)
  })
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section")
  if (statsSection) {
    statsObserver.observe(statsSection)
  }
})

// Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Add hover effects to service cards
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card, .service-card-detailed")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Scroll to top functionality
function createScrollToTop() {
  const scrollButton = document.createElement("button")
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollButton.className = "scroll-to-top"
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-accent);
        border: none;
        border-radius: 50%;
        color: var(--primary-color);
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 1000;
        box-shadow: var(--shadow-primary);
    `

  document.body.appendChild(scrollButton)

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollButton.style.opacity = "1"
      scrollButton.style.visibility = "visible"
    } else {
      scrollButton.style.opacity = "0"
      scrollButton.style.visibility = "hidden"
    }
  })

  // Scroll to top when clicked
  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Hover effect
  scrollButton.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)"
  })

  scrollButton.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", createScrollToTop)

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)
