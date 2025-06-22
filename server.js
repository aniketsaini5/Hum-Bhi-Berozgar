const express = require("express")
const { MongoClient } = require("mongodb")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT =  3000
const MONGODB_URI =  "mongodb+srv://2209301058aniket:saini123aniket@cluster0.mgyvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const DB_NAME = "hum_bhi_berozgar"

let client = null

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

// Connect to MongoDB
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(MONGODB_URI)
        await client.connect()
        console.log("MongoDB se connection successful hai!")
    }
    return client.db(DB_NAME)
}

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "index.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "register.html"))
})

app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "users.html"))
})

// API Routes
app.post("/api/register", async (req, res) => {
    try {
        const { name, degree, college, year } = req.body

        // Validation
        if (!name || !degree || !college || !year) {
            return res.status(400).json({
                error: "Saare fields zaroori hain bhai!",
            })
        }

        // Name validation (only letters and spaces)
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return res.status(400).json({
                error: "Naam mein sirf letters aur spaces allowed hain!",
            })
        }

        // Year validation
        const currentYear = new Date().getFullYear()
        const graduationYear = Number.parseInt(year)
        if (graduationYear < 1970 || graduationYear > currentYear) {
            return res.status(400).json({
                error: "Sahi graduation year enter karo yaar!",
            })
        }

        const db = await connectToDatabase()
        const collection = db.collection("users")

        // Check for existing user
        const existingUser = await collection.findOne({
            name: name.trim(),
            college: college.trim(),
        })

        if (existingUser) {
            return res.status(409).json({
                error: "Arre yaar, is naam aur college se koi already register hai!",
            })
        }

        // Insert new user
        const newUser = {
            name: name.trim(),
            degree: degree.trim(),
            college: college.trim(),
            year: year.toString(),
            registeredAt: new Date().toISOString(),
        }

        const result = await collection.insertOne(newUser)

        res.status(201).json({
            message: "Badhaai ho! Registration successful hai!",
            userId: result.insertedId,
        })
    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({
            error: "Server mein kuch problem hai, thoda wait karo!",
        })
    }
})

app.get("/api/users", async (req, res) => {
    try {
        const db = await connectToDatabase()
        const collection = db.collection("users")

        const users = await collection.find({}).sort({ registeredAt: -1 }).toArray()

        res.json({
            users,
            count: users.length,
            message: "Saare users mil gaye!",
        })
    } catch (error) {
        console.error("Error fetching users:", error)
        res.status(500).json({
            error: "Users load nahi ho rahe, try again!",
        })
    }
})

// Start server
app.listen(PORT, () => {
    console.log(`Server chal raha hai port ${PORT} pe!`)
    console.log(`Website dekho: http://localhost:${PORT}`)
})

// Graceful shutdown
process.on("SIGINT", async () => {
    if (client) {
        await client.close()
        console.log("MongoDB connection band kar diya!")
    }
    process.exit(0)
})
