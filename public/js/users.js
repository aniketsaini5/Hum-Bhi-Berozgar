// Users page JavaScript

document.addEventListener("DOMContentLoaded", () => {
    const loadingState = document.getElementById("loadingState")
    const noUsersState = document.getElementById("noUsersState")
    const usersGrid = document.getElementById("usersGrid")
    const userCount = document.getElementById("userCount")
    const searchInput = document.getElementById("searchInput")
    const degreeFilter = document.getElementById("degreeFilter")
    const yearFilter = document.getElementById("yearFilter")
    const clearFilters = document.getElementById("clearFilters")
    const foundMembers = document.getElementById("foundMembers")
    const uniqueDegrees = document.getElementById("uniqueDegrees")
    const uniqueYears = document.getElementById("uniqueYears")
    const noUsersMessage = document.getElementById("noUsersMessage")

    let allUsers = []
    let filteredUsers = []

    // Fetch users from API
    async function fetchUsers() {
        try {
            const response = await fetch("/api/users")
            const data = await response.json()

            if (response.ok) {
                allUsers = data.users
                filteredUsers = [...allUsers]
                populateFilters()
                displayUsers()
                updateStats()

                if (allUsers.length === 0) {
                    showNoUsers("Abhi tak koi register nahi hua! Pehle aap join karo.")
                } else {
                    userCount.textContent = `${allUsers.length} educated individuals se connect karo across India`
                }
            } else {
                showNoUsers("Users load nahi ho rahe. Page refresh karo!")
            }
        } catch (error) {
            console.error("Error fetching users:", error)
            showNoUsers("Network problem hai! Internet check karo.")
        } finally {
            loadingState.style.display = "none"
        }
    }

    // Populate filter dropdowns
    function populateFilters() {
        // Populate degree filter
        const degrees = [...new Set(allUsers.map((user) => user.degree))].sort()
        degreeFilter.innerHTML = '<option value="">Saari degrees</option>'
        degrees.forEach((degree) => {
            const option = document.createElement("option")
            option.value = degree
            option.textContent = degree
            degreeFilter.appendChild(option)
        })

        // Populate year filter
        const years = [...new Set(allUsers.map((user) => user.year))].sort(
            (a, b) => Number.parseInt(b) - Number.parseInt(a),
        )
        yearFilter.innerHTML = '<option value="">Saale years</option>'
        years.forEach((year) => {
            const option = document.createElement("option")
            option.value = year
            option.textContent = year
            yearFilter.appendChild(option)
        })
    }

    // Filter users based on search and filters
    function filterUsers() {
        const searchTerm = searchInput.value.toLowerCase().trim()
        const selectedDegree = degreeFilter.value
        const selectedYear = yearFilter.value

        filteredUsers = allUsers.filter((user) => {
            const matchesSearch =
                !searchTerm || user.name.toLowerCase().includes(searchTerm) || user.college.toLowerCase().includes(searchTerm)

            const matchesDegree = !selectedDegree || user.degree === selectedDegree
            const matchesYear = !selectedYear || user.year === selectedYear

            return matchesSearch && matchesDegree && matchesYear
        })

        displayUsers()
        updateStats()
    }

    // Display users in grid
    function displayUsers() {
        if (filteredUsers.length === 0) {
            if (allUsers.length === 0) {
                showNoUsers("Abhi tak koi register nahi hua! Pehle aap join karo.")
            } else {
                showNoUsers("Koi users nahi mile. Filters change karo ya search term badlo.")
            }
            return
        }

        noUsersState.style.display = "none"
        usersGrid.style.display = "grid"
        usersGrid.innerHTML = ""

        filteredUsers.forEach((user) => {
            const userCard = createUserCard(user)
            usersGrid.appendChild(userCard)
        })

        // Add animation to cards
        const cards = usersGrid.querySelectorAll(".user-card")
        cards.forEach((card, index) => {
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
            setTimeout(() => {
                card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
                card.style.opacity = "1"
                card.style.transform = "translateY(0)"
            }, index * 100)
        })
    }

    // Create user card element
    function createUserCard(user) {
        const card = document.createElement("div")
        card.className = "user-card"

        const registeredDate = new Date(user.registeredAt).toLocaleDateString("hi-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })

        card.innerHTML = `
            <div class="user-header">
                <h3>${escapeHtml(user.name)}</h3>
            </div>
            <div class="user-content">
                <div class="user-info">
                    <i class="fas fa-graduation-cap"></i>
                    <span><strong>${escapeHtml(user.degree)}</strong></span>
                </div>
                <div class="user-info college">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${escapeHtml(user.college)}</span>
                </div>
                <div class="user-info">
                    <i class="fas fa-calendar"></i>
                    <span>Graduated in ${escapeHtml(user.year)}</span>
                </div>
                <div class="user-footer">
                    Joined: ${registeredDate}
                </div>
            </div>
        `

        return card
    }

    // Update statistics
    function updateStats() {
        foundMembers.textContent = filteredUsers.length

        const degrees = [...new Set(filteredUsers.map((user) => user.degree))]
        uniqueDegrees.textContent = degrees.length

        const years = [...new Set(filteredUsers.map((user) => user.year))]
        uniqueYears.textContent = years.length
    }

    // Show no users state
    function showNoUsers(message) {
        noUsersMessage.textContent = message
        noUsersState.style.display = "block"
        usersGrid.style.display = "none"
        updateStats()
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement("div")
        div.textContent = text
        return div.innerHTML
    }

    // Event listeners
    searchInput.addEventListener("input", debounce(filterUsers, 300))
    degreeFilter.addEventListener("change", filterUsers)
    yearFilter.addEventListener("change", filterUsers)

    clearFilters.addEventListener("click", () => {
        searchInput.value = ""
        degreeFilter.value = ""
        yearFilter.value = ""
        filterUsers()
    })

    // Debounce function for search input
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

    // Initialize
    fetchUsers()

    console.log("Users page loaded successfully! 👥")
})
