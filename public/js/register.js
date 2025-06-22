// Registration page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm")
  const submitBtn = document.getElementById("submitBtn")
  const messageDiv = document.getElementById("message")
  const yearSelect = document.getElementById("year")
  const captchaQuestion = document.getElementById("captchaQuestion")
  const captchaAnswer = document.getElementById("captchaAnswer")
  const refreshCaptcha = document.getElementById("refreshCaptcha")

  let currentCaptchaAnswer = 0

  // Populate year dropdown
  function populateYears() {
    const currentYear = new Date().getFullYear()
    yearSelect.innerHTML = '<option value="">Graduation year select karo</option>'

    for (let year = currentYear; year >= 1970; year--) {
      const option = document.createElement("option")
      option.value = year
      option.textContent = year
      yearSelect.appendChild(option)
    }
  }

  // Generate CAPTCHA
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operations = ["+", "-", "*"]
    const operation = operations[Math.floor(Math.random() * operations.length)]

    let answer = 0
    let question = ""

    switch (operation) {
      case "+":
        answer = num1 + num2
        question = `${num1} + ${num2} = ?`
        break
      case "-":
        answer = num1 - num2
        question = `${num1} - ${num2} = ?`
        break
      case "*":
        answer = num1 * num2
        question = `${num1} × ${num2} = ?`
        break
    }

    captchaQuestion.textContent = question
    currentCaptchaAnswer = answer
    captchaAnswer.value = ""
  }

  // Show message
  function showMessage(text, type) {
    messageDiv.textContent = text
    messageDiv.className = `message ${type}`
    messageDiv.style.display = "block"

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  // Hide message
  function hideMessage() {
    messageDiv.style.display = "none"
  }

  // Validate form
  function validateForm(formData) {
    const name = formData.get("name").trim()
    const degree = formData.get("degree")
    const college = formData.get("college").trim()
    const year = formData.get("year")
    const userCaptchaAnswer = Number.parseInt(captchaAnswer.value)

    if (!name || !degree || !college || !year) {
      showMessage("Saare fields zaroori hain bhai!", "error")
      return false
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      showMessage("Naam mein sirf letters aur spaces allowed hain!", "error")
      return false
    }

    if (userCaptchaAnswer !== currentCaptchaAnswer) {
      showMessage("CAPTCHA galat hai! Phir se try karo.", "error")
      generateCaptcha()
      return false
    }

    return true
  }

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    if (!validateForm(formData)) {
      return
    }

    // Show loading state
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Register ho rahe hain...'
    hideMessage()

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name").trim(),
          degree: formData.get("degree"),
          college: formData.get("college").trim(),
          year: formData.get("year"),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        showMessage("Badhaai ho! Registration successful! Users page pe redirect ho rahe hain...", "success")

        // Reset form
        form.reset()
        generateCaptcha()

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "/users"
        }, 2000)
      } else {
        showMessage(result.error || "Registration mein problem hai, phir try karo!", "error")
        generateCaptcha()
      }
    } catch (error) {
      console.error("Registration error:", error)
      showMessage("Network problem hai! Internet check karo aur phir try karo.", "error")
      generateCaptcha()
    } finally {
      // Reset button state
      submitBtn.disabled = false
      submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Register Karo'
    }
  })

  // Refresh CAPTCHA button
  refreshCaptcha.addEventListener("click", generateCaptcha)

  // Initialize
  populateYears()
  generateCaptcha()

  // Add input validation feedback
  const inputs = form.querySelectorAll("input, select")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#dc3545"
      } else {
        this.style.borderColor = "#ff6b35"
      }
    })

    input.addEventListener("input", function () {
      if (this.style.borderColor === "rgb(220, 53, 69)") {
        this.style.borderColor = "#ff6b35"
      }
    })
  })

  console.log("Registration page loaded successfully! 📝")
})
