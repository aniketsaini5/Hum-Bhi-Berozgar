// Main JavaScript file for homepage functionality

document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetSection = document.querySelector(targetId)

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                })
            }
        })
    })

    // Add animation to feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
            }
        })
    }, observerOptions)

    // Observe feature cards
    const featureCards = document.querySelectorAll(".feature-card")
    featureCards.forEach((card) => {
        card.style.opacity = "0"
        card.style.transform = "translateY(30px)"
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        observer.observe(card)
    })

    // Animate statistics numbers
    const statNumbers = document.querySelectorAll(".stat-number")

    const animateNumbers = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target
                const finalNumber = target.textContent
                const numericValue = Number.parseInt(finalNumber.replace(/\D/g, ""))

                if (numericValue) {
                    animateCounter(target, 0, numericValue, 2000)
                }
            }
        })
    }

    const numberObserver = new IntersectionObserver(animateNumbers, observerOptions)

    statNumbers.forEach((number) => {
        numberObserver.observe(number)
    })

    // Counter animation function
    function animateCounter(element, start, end, duration) {
        const range = end - start
        const increment = range / (duration / 16)
        let current = start

        const timer = setInterval(() => {
            current += increment
            if (current >= end) {
                current = end
                clearInterval(timer)
            }

            const suffix = element.textContent.replace(/\d/g, "")
            element.textContent = Math.floor(current) + suffix
        }, 16)
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".btn")

    buttons.forEach((button) => {
        button.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-2px)"
        })

        button.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)"
        })
    })

    console.log("Hum Bhi Berozgar website loaded successfully! 🎉")
})
