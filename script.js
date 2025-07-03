// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    // Navigation functionality
    const navbar = document.getElementById("navbar")
    const hamburger = document.getElementById("hamburger")
    const navMenu = document.getElementById("nav-menu")
    const navLinks = document.querySelectorAll(".nav-link")

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled")
        } else {
            navbar.classList.remove("scrolled")
        }
    })

    // Mobile menu toggle
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active")
        hamburger.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active")
            hamburger.classList.remove("active")
        })
    })

    // Active navigation link
    window.addEventListener("scroll", () => {
        let current = ""
        const sections = document.querySelectorAll("section")

        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute("id")
            }
        })

        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active")
            }
        })
    })

    // Animated counters
    function animateCounters() {
        const counters = document.querySelectorAll(".stat-number")
        const speed = 200

        counters.forEach((counter) => {
            const target = +counter.getAttribute("data-target")
            const count = +counter.innerText
            const inc = target / speed

            if (count < target) {
                counter.innerText = Math.ceil(count + inc)
                setTimeout(() => animateCounters(), 1)
            } else {
                counter.innerText = target
            }
        })
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible")

                // Trigger counter animation when stats section is visible
                if (entry.target.classList.contains("stats-grid")) {
                    animateCounters()
                }
            }
        })
    }, observerOptions)

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".service-card, .stat-card, .about-text, .stats-grid")
    animatedElements.forEach((el) => {
        el.classList.add("fade-in")
        observer.observe(el)
    })

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

    // Contact form handling
    const contactForm = document.getElementById("contactForm")
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // Get form data
        const formData = new FormData(contactForm)
        const name = formData.get("name")
        const email = formData.get("email")
        const project = formData.get("project")
        const message = formData.get("message")

        // Simple validation
        if (!name || !email || !project || !message) {
            showNotification("Please fill in all fields", "error")
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            showNotification("Please enter a valid email address", "error")
            return
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector(".submit-btn")
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitBtn.disabled = true

        setTimeout(() => {
            submitBtn.innerHTML = originalText
            submitBtn.disabled = false
            contactForm.reset()
            showNotification("Thank you! Your message has been sent successfully.", "success")
        }, 2000)
    })

    // Hero button click effect
    const heroButton = document.getElementById("heroButton")
    heroButton.addEventListener("click", () => {
        // Scroll to contact section
        document.getElementById("contact").scrollIntoView({
            behavior: "smooth",
        })
    })

    // Service card interactions
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-15px) scale(1.02)"
        })

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)"
        })
    })

    // Parallax effect for floating shapes
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const shapes = document.querySelectorAll(".shape")

        shapes.forEach((shape, index) => {
            const speed = 0.5 + index * 0.1
            const yPos = -(scrolled * speed)
            shape.style.transform = `translateY(${yPos}px)`
        })
    })

    // Add loading animation
    window.addEventListener("load", () => {
        document.body.classList.add("loaded")
    })

    // Notification system
    function showNotification(message, type = "info") {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll(".notification")
        existingNotifications.forEach((notification) => notification.remove())

        // Create notification element
        const notification = document.createElement("div")
        notification.className = `notification notification-${type}`
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
                <span>${message}</span>
            </div>
        `

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `

        notification.querySelector(".notification-content").style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `

        document.body.appendChild(notification)

        // Animate in
        setTimeout(() => {
            notification.style.transform = "translateX(0)"
        }, 100)

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = "translateX(400px)"
            setTimeout(() => {
                notification.remove()
            }, 300)
        }, 5000)
    }

    // Add click effect to buttons
    const buttons = document.querySelectorAll("button, .cta-button")
    buttons.forEach((button) => {
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

    // Add ripple animation
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

    // Typing effect for hero title (optional enhancement)
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

    // Initialize typing effect after page load
    setTimeout(() => {
        const heroTitle = document.querySelector(".hero-title .title-line")
        if (heroTitle) {
            typeWriter(heroTitle, "TerraSculpt", 150)
        }
    }, 1500)
})

// Add custom cursor effect (optional)
document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".custom-cursor")
    if (!cursor) {
        const newCursor = document.createElement("div")
        newCursor.className = "custom-cursor"
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(212, 175, 55, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `
        document.body.appendChild(newCursor)
    }

    const customCursor = document.querySelector(".custom-cursor")
    customCursor.style.left = e.clientX - 10 + "px"
    customCursor.style.top = e.clientY - 10 + "px"
})

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener(
    "scroll",
    throttle(() => {
        // Scroll-based animations here
    }, 16),
) // ~60fps
