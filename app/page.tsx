"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  DollarSign,
  Heart,
  FolderOpen,
  BookOpen,
  Edit,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Search,
  Camera,
  Trophy,
  Clock,
  Target,
  Pencil,
} from "lucide-react"

// Type definitions
interface ProfileData {
  name: string
  title: string
  location: string
  age: number
  email: string
  phone: string
  photo: string
  totalProjects: number
  totalFavorites: number
  joinDate: string
}

interface Account {
  id: string
  name: string
  type: "current" | "savings" | "investment" | "trading"
  balance: number
  bank: string
  url: string
  icon: string
}

interface TradingAccount {
  id: string
  name: string
  broker: string
  startingBalance: number
  currentBalance: number
  url: string
  icon: string
}

interface Transaction {
  id: string
  accountId: string
  type: "buy" | "sell"
  symbol: string
  quantity: number
  price: number
  total: number
  pnl: number
  date: string
  notes: string
}

interface Favorite {
  id: string
  name: string
  url: string
  description: string
  icon: string
}

interface FavoriteCategory {
  id: string
  name: string
  icon: string
  color: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  status: "completed" | "in-progress" | "planned"
  liveUrl?: string
  githubUrl?: string
  image: string
}

interface LearningCategory {
  id: string
  name: string
  icon: string
  color: string
}

interface LearningResource {
  id: string
  categoryId: string
  name: string
  type: "course" | "book" | "video" | "article" | "practice"
  url: string
  progress: number
  status: "not-started" | "in-progress" | "completed"
  notes: string
}

export default function PersonalDashboard() {
  const [activeSection, setActiveSection] = useState("profile")
  const [isLoading, setIsLoading] = useState(true)

  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false)
  const [isEditTradingAccountModalOpen, setIsEditTradingAccountModalOpen] = useState(false)
  const [isAddTradingAccountModalOpen, setIsAddTradingAccountModalOpen] = useState(false)
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false)
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false)
  const [isAddFavoriteCategoryModalOpen, setIsAddFavoriteCategoryModalOpen] = useState(false)
  const [isAddFavoriteModalOpen, setIsAddFavoriteModalOpen] = useState(false)
  const [isEditFavoriteModalOpen, setIsEditFavoriteModalOpen] = useState(false)
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false)
  const [isAddLearningCategoryModalOpen, setIsAddLearningCategoryModalOpen] = useState(false)
  const [isAddLearningResourceModalOpen, setIsAddLearningResourceModalOpen] = useState(false)
  const [isEditLearningResourceModalOpen, setIsEditLearningResourceModalOpen] = useState(false)

  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [editingTradingAccount, setEditingTradingAccount] = useState<TradingAccount | null>(null)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [editingFavorite, setEditingFavorite] = useState<Favorite | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingLearningResource, setEditingLearningResource] = useState<LearningResource | null>(null)
  const [selectedFavoriteCategory, setSelectedFavoriteCategory] = useState<string>("")
  const [selectedLearningCategory, setSelectedLearningCategory] = useState<string>("")

  // Profile state
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    title: "Full Stack Developer",
    location: "Paris, France",
    age: 25,
    email: "john.doe@email.com",
    phone: "+33 6 12 34 56 78",
    photo: "/professional-headshot.png",
    totalProjects: 12,
    totalFavorites: 45,
    joinDate: "January 2024",
  })

  // Money state
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      name: "Current Account",
      type: "current",
      balance: 2500,
      bank: "BNP Paribas",
      url: "https://mabanque.bnpparibas",
      icon: "🏦",
    },
    {
      id: "2",
      name: "Livret A",
      type: "savings",
      balance: 15000,
      bank: "Crédit Agricole",
      url: "https://www.credit-agricole.fr",
      icon: "🐷",
    },
    {
      id: "3",
      name: "Assurance Vie",
      type: "investment",
      balance: 25000,
      bank: "AXA",
      url: "https://www.axa.fr",
      icon: "📈",
    },
  ])

  const [tradingAccounts, setTradingAccounts] = useState<TradingAccount[]>([
    {
      id: "1",
      name: "XTB Trading",
      broker: "XTB",
      startingBalance: 5000,
      currentBalance: 5750,
      url: "https://www.xtb.com",
      icon: "📊",
    },
    {
      id: "2",
      name: "Trading Republic",
      broker: "Trading Republic",
      startingBalance: 2000,
      currentBalance: 1850,
      url: "https://traderepublic.com",
      icon: "🚀",
    },
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      accountId: "1",
      type: "buy",
      symbol: "AAPL",
      quantity: 10,
      price: 150,
      total: 1500,
      pnl: 250,
      date: "2024-01-15",
      notes: "Strong earnings expected",
    },
    {
      id: "2",
      accountId: "2",
      type: "sell",
      symbol: "TSLA",
      quantity: 5,
      price: 200,
      total: 1000,
      pnl: -150,
      date: "2024-01-10",
      notes: "Taking profits",
    },
  ])

  // Favorites state
  const [favoriteCategories, setFavoriteCategories] = useState<FavoriteCategory[]>([
    { id: "1", name: "Streaming", icon: "🎬", color: "bg-red-500" },
    { id: "2", name: "Tools", icon: "🛠️", color: "bg-blue-500" },
    { id: "3", name: "Growth", icon: "🌱", color: "bg-green-500" },
    { id: "4", name: "Coding", icon: "💻", color: "bg-purple-500" },
  ])

  const [favorites, setFavorites] = useState<Record<string, Favorite[]>>({
    Streaming: [
      { id: "1", name: "Netflix", url: "https://netflix.com", description: "Movies and series", icon: "🎬" },
      { id: "2", name: "YouTube", url: "https://youtube.com", description: "Video content", icon: "📺" },
    ],
    Tools: [
      { id: "3", name: "ChatGPT", url: "https://chat.openai.com", description: "AI Assistant", icon: "🤖" },
      { id: "4", name: "Figma", url: "https://figma.com", description: "Design tool", icon: "🎨" },
    ],
  })

  // Portfolio state
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Restaurant Website",
      description: "Modern restaurant website with online ordering",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      status: "completed",
      liveUrl: "https://restaurant-demo.vercel.app",
      githubUrl: "https://github.com/user/restaurant-website",
      image: "/restaurant-website-hero.png",
    },
  ])

  // Learning state
  const [learningCategories, setLearningCategories] = useState<LearningCategory[]>([
    { id: "1", name: "Coding", icon: "💻", color: "bg-blue-500" },
    { id: "2", name: "Languages", icon: "🌍", color: "bg-green-500" },
    { id: "3", name: "Trading", icon: "📈", color: "bg-yellow-500" },
  ])

  const [learningResources, setLearningResources] = useState<Record<string, LearningResource[]>>({
    Coding: [
      {
        id: "1",
        categoryId: "1",
        name: "The Odin Project",
        type: "course",
        url: "https://theodinproject.com",
        progress: 75,
        status: "in-progress",
        notes: "Great full-stack curriculum",
      },
    ],
  })

  const addAccount = (accountData: Omit<Account, "id">) => {
    const newAccount: Account = {
      ...accountData,
      id: Date.now().toString(),
    }
    setAccounts([...accounts, newAccount])
  }

  const updateAccount = (id: string, accountData: Partial<Account>) => {
    setAccounts(accounts.map((acc) => (acc.id === id ? { ...acc, ...accountData } : acc)))
  }

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id))
  }

  const addTradingAccount = (accountData: Omit<TradingAccount, "id">) => {
    const newAccount: TradingAccount = {
      ...accountData,
      id: Date.now().toString(),
    }
    setTradingAccounts([...tradingAccounts, newAccount])
  }

  const updateTradingAccount = (id: string, accountData: Partial<TradingAccount>) => {
    setTradingAccounts(tradingAccounts.map((acc) => (acc.id === id ? { ...acc, ...accountData } : acc)))
  }

  const deleteTradingAccount = (id: string) => {
    setTradingAccounts(tradingAccounts.filter((acc) => acc.id !== id))
    // Also remove related transactions
    setTransactions(transactions.filter((t) => t.accountId !== id))
  }

  const addTransaction = (transactionData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    }
    setTransactions([...transactions, newTransaction])

    // Update trading account balance
    const account = tradingAccounts.find((acc) => acc.id === transactionData.accountId)
    if (account) {
      const newBalance = account.currentBalance + transactionData.pnl
      updateTradingAccount(account.id, { currentBalance: newBalance })
    }
  }

  const updateTransaction = (id: string, transactionData: Partial<Transaction>) => {
    const oldTransaction = transactions.find((t) => t.id === id)
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, ...transactionData } : t)))

    // Update trading account balance if P&L changed
    if (oldTransaction && transactionData.pnl !== undefined) {
      const account = tradingAccounts.find((acc) => acc.id === oldTransaction.accountId)
      if (account) {
        const balanceChange = transactionData.pnl - oldTransaction.pnl
        const newBalance = account.currentBalance + balanceChange
        updateTradingAccount(account.id, { currentBalance: newBalance })
      }
    }
  }

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find((t) => t.id === id)
    if (transaction) {
      // Revert balance change
      const account = tradingAccounts.find((acc) => acc.id === transaction.accountId)
      if (account) {
        const newBalance = account.currentBalance - transaction.pnl
        updateTradingAccount(account.id, { currentBalance: newBalance })
      }
    }
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const addFavoriteCategory = (categoryData: Omit<FavoriteCategory, "id">) => {
    const newCategory: FavoriteCategory = {
      ...categoryData,
      id: Date.now().toString(),
    }
    setFavoriteCategories([...favoriteCategories, newCategory])
    setFavorites({ ...favorites, [categoryData.name]: [] })
  }

  const addFavorite = (categoryName: string, favoriteData: Omit<Favorite, "id">) => {
    const newFavorite: Favorite = {
      ...favoriteData,
      id: Date.now().toString(),
    }
    setFavorites({
      ...favorites,
      [categoryName]: [...(favorites[categoryName] || []), newFavorite],
    })
    // Update profile total favorites count
    const totalFavorites = Object.values(favorites).reduce((sum, favs) => sum + favs.length, 0) + 1
    setProfileData((prev) => ({ ...prev, totalFavorites }))
  }

  const updateFavorite = (categoryName: string, id: string, favoriteData: Partial<Favorite>) => {
    setFavorites({
      ...favorites,
      [categoryName]: favorites[categoryName]?.map((fav) => (fav.id === id ? { ...fav, ...favoriteData } : fav)) || [],
    })
  }

  const deleteFavorite = (categoryName: string, id: string) => {
    setFavorites({
      ...favorites,
      [categoryName]: favorites[categoryName]?.filter((fav) => fav.id !== id) || [],
    })
    // Update profile total favorites count
    const totalFavorites = Object.values(favorites).reduce((sum, favs) => sum + favs.length, 0) - 1
    setProfileData((prev) => ({ ...prev, totalFavorites }))
  }

  const addProject = (projectData: Omit<Project, "id">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    }
    setProjects([...projects, newProject])
    // Update profile total projects count
    setProfileData((prev) => ({ ...prev, totalProjects: prev.totalProjects + 1 }))
  }

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects(projects.map((proj) => (proj.id === id ? { ...proj, ...projectData } : proj)))
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id))
    // Update profile total projects count
    setProfileData((prev) => ({ ...prev, totalProjects: prev.totalProjects - 1 }))
  }

  const addLearningCategory = (categoryData: Omit<LearningCategory, "id">) => {
    const newCategory: LearningCategory = {
      ...categoryData,
      id: Date.now().toString(),
    }
    setLearningCategories([...learningCategories, newCategory])
    setLearningResources({ ...learningResources, [categoryData.name]: [] })
  }

  const addLearningResource = (categoryName: string, resourceData: Omit<LearningResource, "id">) => {
    const newResource: LearningResource = {
      ...resourceData,
      id: Date.now().toString(),
    }
    setLearningResources({
      ...learningResources,
      [categoryName]: [...(learningResources[categoryName] || []), newResource],
    })
  }

  const updateLearningResource = (categoryName: string, id: string, resourceData: Partial<LearningResource>) => {
    setLearningResources({
      ...learningResources,
      [categoryName]:
        learningResources[categoryName]?.map((res) => (res.id === id ? { ...res, ...resourceData } : res)) || [],
    })
  }

  const deleteLearningResource = (categoryName: string, id: string) => {
    setLearningResources({
      ...learningResources,
      [categoryName]: learningResources[categoryName]?.filter((res) => res.id !== id) || [],
    })
  }

  const editFavoriteCategory = (categoryId: string, updatedData: Partial<FavoriteCategory>) => {
    setFavoriteCategories(favoriteCategories.map((cat) => (cat.id === categoryId ? { ...cat, ...updatedData } : cat)))

    // If name changed, update favorites object
    if (updatedData.name) {
      const oldCategory = favoriteCategories.find((cat) => cat.id === categoryId)
      if (oldCategory && oldCategory.name !== updatedData.name) {
        const categoryFavorites = favorites[oldCategory.name] || []
        const newFavorites = { ...favorites }
        delete newFavorites[oldCategory.name]
        newFavorites[updatedData.name] = categoryFavorites
        setFavorites(newFavorites)
      }
    }
  }

  const deleteFavoriteCategory = (categoryId: string) => {
    const categoryToDelete = favoriteCategories.find((cat) => cat.id === categoryId)
    if (categoryToDelete) {
      setFavoriteCategories(favoriteCategories.filter((cat) => cat.id !== categoryId))
      const newFavorites = { ...favorites }
      delete newFavorites[categoryToDelete.name]
      setFavorites(newFavorites)
    }
  }

  const editLearningCategory = (categoryId: string, updatedData: Partial<LearningCategory>) => {
    setLearningCategories(learningCategories.map((cat) => (cat.id === categoryId ? { ...cat, ...updatedData } : cat)))

    // If name changed, update learning resources object
    if (updatedData.name) {
      const oldCategory = learningCategories.find((cat) => cat.id === categoryId)
      if (oldCategory && oldCategory.name !== updatedData.name) {
        const categoryResources = learningResources[oldCategory.name] || []
        const newResources = { ...learningResources }
        delete newResources[oldCategory.name]
        newResources[updatedData.name] = categoryResources
        setLearningResources(newResources)
      }
    }
  }

  const deleteLearningCategory = (categoryId: string) => {
    const categoryToDelete = learningCategories.find((cat) => cat.id === categoryId)
    if (categoryToDelete) {
      setLearningCategories(learningCategories.filter((cat) => cat.id !== categoryId))
      const newResources = { ...learningResources }
      delete newResources[categoryToDelete.name]
      setLearningResources(newResources)
    }
  }

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedProfile = localStorage.getItem("profileData")
        if (savedProfile) setProfileData(JSON.parse(savedProfile))

        const savedAccounts = localStorage.getItem("accounts")
        if (savedAccounts) setAccounts(JSON.parse(savedAccounts))

        const savedTradingAccounts = localStorage.getItem("tradingAccounts")
        if (savedTradingAccounts) setTradingAccounts(JSON.parse(savedTradingAccounts))

        const savedTransactions = localStorage.getItem("transactions")
        if (savedTransactions) setTransactions(JSON.parse(savedTransactions))

        const savedFavoriteCategories = localStorage.getItem("favoriteCategories")
        if (savedFavoriteCategories) setFavoriteCategories(JSON.parse(savedFavoriteCategories))

        const savedFavorites = localStorage.getItem("favorites")
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites))

        const savedProjects = localStorage.getItem("projects")
        if (savedProjects) setProjects(JSON.parse(savedProjects))

        const savedLearningCategories = localStorage.getItem("learningCategories")
        if (savedLearningCategories) setLearningCategories(JSON.parse(savedLearningCategories))

        const savedLearningResources = localStorage.getItem("learningResources")
        if (savedLearningResources) setLearningResources(JSON.parse(savedLearningResources))
      } catch (error) {
        console.error("Error loading data from localStorage:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("profileData", JSON.stringify(profileData))
    }
  }, [profileData, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("accounts", JSON.stringify(accounts))
    }
  }, [accounts, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tradingAccounts", JSON.stringify(tradingAccounts))
    }
  }, [tradingAccounts, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("transactions", JSON.stringify(transactions))
    }
  }, [transactions, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("favoriteCategories", JSON.stringify(favoriteCategories))
    }
  }, [favoriteCategories, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("projects", JSON.stringify(projects))
    }
  }, [projects, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("learningCategories", JSON.stringify(learningCategories))
    }
  }, [learningCategories, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("learningResources", JSON.stringify(learningResources))
    }
  }, [learningResources, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const ProfileSection = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editData, setEditData] = useState(profileData)

    const totalProjects = projects.length
    const totalFavorites = Object.values(favorites).reduce((sum, favs) => sum + favs.length, 0)
    const netWorth =
      accounts.reduce((sum, acc) => sum + (acc.balance ?? 0), 0) +
      tradingAccounts.reduce((sum, acc) => sum + (acc.currentBalance ?? 0), 0)

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setEditData((prev) => ({ ...prev, photo: result }))
        }
        reader.readAsDataURL(file)
      }
    }

    const handleSave = () => {
      setProfileData(editData)
      setIsEditModalOpen(false)
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-50 max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={editData.photo || "/placeholder.svg"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <label className="absolute bottom-0 right-0 bg-violet-600 text-white p-2 rounded-full cursor-pointer hover:bg-violet-700 transition-colors">
                      <Camera className="h-4 w-4" />
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={editData.age}
                      onChange={(e) => setEditData((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editData.title}
                    onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editData.location}
                    onChange={(e) => setEditData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <img
                src={profileData.photo || "/professional-headshot.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">{profileData.name}</h3>
                <p className="text-lg text-gray-600">{profileData.title}</p>
                <p className="text-gray-500">{profileData.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">€{netWorth.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Net Worth</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-600">{totalProjects}</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalFavorites}</div>
                <div className="text-sm text-gray-600">Favorites</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{profileData.joinDate}</div>
                <div className="text-sm text-gray-600">Member Since</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const MoneySection = () => {
    const [activeTab, setActiveTab] = useState("management")
    const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false)
    const [isAddTradingAccountModalOpen, setIsAddTradingAccountModalOpen] = useState(false)
    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false)
    const [isEditAccountsModalOpen, setIsEditAccountsModalOpen] = useState(false)
    const [newAccount, setNewAccount] = useState<Omit<Account, "id">>({
      name: "",
      type: "current",
      balance: 0,
      bank: "",
      url: "",
      icon: "🏦",
    })
    const [newTradingAccount, setNewTradingAccount] = useState<Omit<TradingAccount, "id">>({
      name: "",
      broker: "",
      startingBalance: 0,
      currentBalance: 0,
      url: "",
      icon: "📊",
    })
    const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
      accountId: "",
      type: "buy",
      symbol: "",
      quantity: 0,
      price: 0,
      total: 0,
      pnl: 0,
      date: new Date().toISOString().split("T")[0],
      notes: "",
    })

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-gray-900">Money</h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("management")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "management" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Money Management
              </button>
              <button
                onClick={() => setActiveTab("trading")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "trading" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Trading
              </button>
            </div>
          </div>
        </div>

        {activeTab === "management" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      €{accounts.reduce((sum, acc) => sum + (acc.balance ?? 0), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Balance</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      €
                      {accounts
                        .filter((acc) => acc.type === "current")
                        .reduce((sum, acc) => sum + (acc.balance ?? 0), 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Current Accounts</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      €
                      {accounts
                        .filter((acc) => acc.type === "savings")
                        .reduce((sum, acc) => sum + (acc.balance ?? 0), 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Savings</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      €
                      {accounts
                        .filter((acc) => acc.type === "investment")
                        .reduce((sum, acc) => sum + (acc.balance ?? 0), 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Investments</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Accounts</h3>
              <div className="space-x-2">
                <Button
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                  onClick={() => setIsAddAccountModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
                {/* Changed Edit Accounts button color to green */}
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setIsEditAccountsModalOpen(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Accounts
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Accounts
                  <Dialog open={isAddAccountModalOpen} onOpenChange={setIsAddAccountModalOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-50">
                      <DialogHeader>
                        <DialogTitle>Add New Account</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="account-name">Account Name</Label>
                          <Input
                            id="account-name"
                            value={newAccount.name}
                            onChange={(e) => setNewAccount((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="account-type">Type</Label>
                          <Select
                            value={newAccount.type}
                            onValueChange={(value: Account["type"]) =>
                              setNewAccount((prev) => ({ ...prev, type: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="current">Current Account</SelectItem>
                              <SelectItem value="savings">Savings</SelectItem>
                              <SelectItem value="investment">Investment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="account-balance">Balance (€)</Label>
                          <Input
                            id="account-balance"
                            type="number"
                            value={newAccount.balance}
                            onChange={(e) => setNewAccount((prev) => ({ ...prev, balance: Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="account-bank">Bank</Label>
                          <Input
                            id="account-bank"
                            value={newAccount.bank}
                            onChange={(e) => setNewAccount((prev) => ({ ...prev, bank: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="account-url">Website URL</Label>
                          <Input
                            id="account-url"
                            value={newAccount.url}
                            onChange={(e) => setNewAccount((prev) => ({ ...prev, url: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="account-icon">Icon</Label>
                          <Input
                            id="account-icon"
                            value={newAccount.icon}
                            onChange={(e) => setNewAccount((prev) => ({ ...prev, icon: e.target.value }))}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddAccountModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              addAccount(newAccount)
                              setNewAccount({
                                name: "",
                                type: "current",
                                balance: 0,
                                bank: "",
                                url: "",
                                icon: "🏦",
                              })
                              setIsAddAccountModalOpen(false)
                            }}
                          >
                            Add Account
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{account.icon}</span>
                          <div>
                            <h3 className="font-semibold">{account.name}</h3>
                            <p className="text-sm text-gray-600">{account.bank}</p>
                          </div>
                        </div>
                        <Dialog
                          open={isEditAccountModalOpen && editingAccount?.id === account.id}
                          onOpenChange={(open) => {
                            setIsEditAccountModalOpen(open)
                            if (!open) setEditingAccount(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setEditingAccount(account)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-50">
                            <DialogHeader>
                              <DialogTitle>Edit Account</DialogTitle>
                            </DialogHeader>
                            {editingAccount && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-account-name">Account Name</Label>
                                  <Input
                                    id="edit-account-name"
                                    value={editingAccount.name}
                                    onChange={(e) =>
                                      setEditingAccount((prev) => (prev ? { ...prev, name: e.target.value } : null))
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-account-balance">Balance (€)</Label>
                                  <Input
                                    id="edit-account-balance"
                                    type="number"
                                    value={editingAccount.balance}
                                    onChange={(e) =>
                                      setEditingAccount((prev) =>
                                        prev ? { ...prev, balance: Number(e.target.value) } : null,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-account-bank">Bank</Label>
                                  <Input
                                    id="edit-account-bank"
                                    value={editingAccount.bank}
                                    onChange={(e) =>
                                      setEditingAccount((prev) => (prev ? { ...prev, bank: e.target.value } : null))
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-account-url">Website URL</Label>
                                  <Input
                                    id="edit-account-url"
                                    value={editingAccount.url}
                                    onChange={(e) =>
                                      setEditingAccount((prev) => (prev ? { ...prev, url: e.target.value } : null))
                                    }
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => deleteAccount(editingAccount.id)}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      updateAccount(editingAccount.id, editingAccount)
                                      setIsEditAccountModalOpen(false)
                                      setEditingAccount(null)
                                    }}
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        €{(account.balance ?? 0).toLocaleString()}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() => window.open(account.url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Account
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "trading" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Trading Accounts</h3>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setIsAddTradingAccountModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Trading Account
              </Button>
            </div>
            {/* Removed duplicate Add Trading Account button from header */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Trading Accounts
                  <Dialog open={isAddTradingAccountModalOpen} onOpenChange={setIsAddTradingAccountModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Trading Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-50">
                      <DialogHeader>
                        <DialogTitle>Add Trading Account</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="trading-account-name">Account Name</Label>
                          <Input
                            id="trading-account-name"
                            value={newTradingAccount.name}
                            onChange={(e) => setNewTradingAccount((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="trading-account-broker">Broker</Label>
                          <Select
                            value={newTradingAccount.broker}
                            onValueChange={(value) => setNewTradingAccount((prev) => ({ ...prev, broker: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="XTB">XTB</SelectItem>
                              <SelectItem value="Trading Republic">Trading Republic</SelectItem>
                              <SelectItem value="IC Markets">IC Markets</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="trading-starting-balance">Starting Balance (€)</Label>
                          <Input
                            id="trading-starting-balance"
                            type="number"
                            value={newTradingAccount.startingBalance}
                            onChange={(e) =>
                              setNewTradingAccount((prev) => ({
                                ...prev,
                                startingBalance: Number(e.target.value),
                                currentBalance: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="trading-account-url">Platform URL</Label>
                          <Input
                            id="trading-account-url"
                            value={newTradingAccount.url}
                            onChange={(e) => setNewTradingAccount((prev) => ({ ...prev, url: e.target.value }))}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddTradingAccountModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              addTradingAccount(newTradingAccount)
                              setNewTradingAccount({
                                name: "",
                                broker: "",
                                startingBalance: 0,
                                currentBalance: 0,
                                url: "",
                                icon: "📊",
                              })
                              setIsAddTradingAccountModalOpen(false)
                            }}
                          >
                            Add Account
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tradingAccounts.map((account) => (
                    <div key={account.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{account.icon}</span>
                          <div>
                            <h3 className="font-semibold">{account.name}</h3>
                            <p className="text-sm text-gray-600">{account.broker}</p>
                          </div>
                        </div>
                        <Dialog
                          open={isEditTradingAccountModalOpen && editingTradingAccount?.id === account.id}
                          onOpenChange={(open) => {
                            setIsEditTradingAccountModalOpen(open)
                            if (!open) setEditingTradingAccount(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setEditingTradingAccount(account)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-50">
                            <DialogHeader>
                              <DialogTitle>Edit Trading Account</DialogTitle>
                            </DialogHeader>
                            {editingTradingAccount && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-trading-name">Account Name</Label>
                                  <Input
                                    id="edit-trading-name"
                                    value={editingTradingAccount.name}
                                    onChange={(e) =>
                                      setEditingTradingAccount((prev) =>
                                        prev ? { ...prev, name: e.target.value } : null,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-trading-starting">Starting Balance (€)</Label>
                                  <Input
                                    id="edit-trading-starting"
                                    type="number"
                                    value={editingTradingAccount.startingBalance}
                                    onChange={(e) =>
                                      setEditingTradingAccount((prev) =>
                                        prev ? { ...prev, startingBalance: Number(e.target.value) } : null,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-trading-current">Current Balance (€)</Label>
                                  <Input
                                    id="edit-trading-current"
                                    type="number"
                                    value={editingTradingAccount.currentBalance}
                                    onChange={(e) =>
                                      setEditingTradingAccount((prev) =>
                                        prev ? { ...prev, currentBalance: Number(e.target.value) } : null,
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => deleteTradingAccount(editingTradingAccount.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      updateTradingAccount(editingTradingAccount.id, editingTradingAccount)
                                      setIsEditTradingAccountModalOpen(false)
                                      setEditingTradingAccount(null)
                                    }}
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Starting:</span>
                          <span>€{(account.startingBalance ?? 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current:</span>
                          <span
                            className={`font-bold ${(account.currentBalance ?? 0) >= (account.startingBalance ?? 0) ? "text-green-600" : "text-red-600"}`}
                          >
                            €{(account.currentBalance ?? 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>P&L:</span>
                          <span
                            className={`font-semibold ${(account.currentBalance ?? 0) >= (account.startingBalance ?? 0) ? "text-green-600" : "text-red-600"}`}
                          >
                            {(account.currentBalance ?? 0) >= (account.startingBalance ?? 0) ? "+" : ""}€
                            {((account.currentBalance ?? 0) - (account.startingBalance ?? 0)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() => window.open(account.url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Platform
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Trading Transactions
                  <Dialog open={isAddTransactionModalOpen} onOpenChange={setIsAddTransactionModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Transaction
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-50">
                      <DialogHeader>
                        <DialogTitle>Add Transaction</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="transaction-account">Trading Account</Label>
                          <Select
                            value={newTransaction.accountId}
                            onValueChange={(value) => setNewTransaction((prev) => ({ ...prev, accountId: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {tradingAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="transaction-type">Type</Label>
                          <Select
                            value={newTransaction.type}
                            onValueChange={(value: "buy" | "sell") =>
                              setNewTransaction((prev) => ({ ...prev, type: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="buy">Buy</SelectItem>
                              <SelectItem value="sell">Sell</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="transaction-symbol">Symbol</Label>
                          <Input
                            id="transaction-symbol"
                            value={newTransaction.symbol}
                            onChange={(e) => setNewTransaction((prev) => ({ ...prev, symbol: e.target.value }))}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="transaction-quantity">Quantity</Label>
                            <Input
                              id="transaction-quantity"
                              type="number"
                              value={newTransaction.quantity}
                              onChange={(e) => {
                                const quantity = Number(e.target.value)
                                const total = quantity * newTransaction.price
                                setNewTransaction((prev) => ({ ...prev, quantity, total }))
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor="transaction-price">Price (€)</Label>
                            <Input
                              id="transaction-price"
                              type="number"
                              step="0.01"
                              value={newTransaction.price}
                              onChange={(e) => {
                                const price = Number(e.target.value)
                                const total = newTransaction.quantity * price
                                setNewTransaction((prev) => ({ ...prev, price, total }))
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="transaction-pnl">P&L (€)</Label>
                          <Input
                            id="transaction-pnl"
                            type="number"
                            step="0.01"
                            value={newTransaction.pnl}
                            onChange={(e) => setNewTransaction((prev) => ({ ...prev, pnl: Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="transaction-notes">Notes</Label>
                          <Input
                            id="transaction-notes"
                            value={newTransaction.notes}
                            onChange={(e) => setNewTransaction((prev) => ({ ...prev, notes: e.target.value }))}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddTransactionModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              addTransaction(newTransaction)
                              setNewTransaction({
                                accountId: "",
                                type: "buy",
                                symbol: "",
                                quantity: 0,
                                price: 0,
                                total: 0,
                                pnl: 0,
                                date: new Date().toISOString().split("T")[0],
                                notes: "",
                              })
                              setIsAddTransactionModalOpen(false)
                            }}
                          >
                            Add Transaction
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Badge variant={transaction.type === "buy" ? "default" : "secondary"}>
                            {transaction.type.toUpperCase()}
                          </Badge>
                          <div>
                            <h3 className="font-semibold">{transaction.symbol}</h3>
                            <p className="text-sm text-gray-600">
                              {transaction.quantity} shares @ €{transaction.price}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-semibold">€{(transaction.total ?? 0).toLocaleString()}</div>
                            <div
                              className={`text-sm ${(transaction.pnl ?? 0) >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {(transaction.pnl ?? 0) >= 0 ? "+" : ""}€{transaction.pnl ?? 0}
                            </div>
                          </div>
                          <Dialog
                            open={isEditTransactionModalOpen && editingTransaction?.id === transaction.id}
                            onOpenChange={(open) => {
                              setIsEditTransactionModalOpen(open)
                              if (!open) setEditingTransaction(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setEditingTransaction(transaction)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-50">
                              <DialogHeader>
                                <DialogTitle>Edit Transaction</DialogTitle>
                              </DialogHeader>
                              {editingTransaction && (
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="edit-transaction-symbol">Symbol</Label>
                                    <Input
                                      id="edit-transaction-symbol"
                                      value={editingTransaction.symbol}
                                      onChange={(e) =>
                                        setEditingTransaction((prev) =>
                                          prev ? { ...prev, symbol: e.target.value } : null,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-transaction-quantity">Quantity</Label>
                                      <Input
                                        id="edit-transaction-quantity"
                                        type="number"
                                        value={editingTransaction.quantity}
                                        onChange={(e) => {
                                          const quantity = Number(e.target.value)
                                          const total = quantity * editingTransaction.price
                                          setEditingTransaction((prev) => (prev ? { ...prev, quantity, total } : null))
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-transaction-price">Price (€)</Label>
                                      <Input
                                        id="edit-transaction-price"
                                        type="number"
                                        step="0.01"
                                        value={editingTransaction.price}
                                        onChange={(e) => {
                                          const price = Number(e.target.value)
                                          const total = editingTransaction.quantity * price
                                          setEditingTransaction((prev) => (prev ? { ...prev, price, total } : null))
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-transaction-pnl">P&L (€)</Label>
                                    <Input
                                      id="edit-transaction-pnl"
                                      type="number"
                                      step="0.01"
                                      value={editingTransaction.pnl}
                                      onChange={(e) =>
                                        setEditingTransaction((prev) =>
                                          prev ? { ...prev, pnl: Number(e.target.value) } : null,
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-transaction-notes">Notes</Label>
                                    <Input
                                      id="edit-transaction-notes"
                                      value={editingTransaction.notes}
                                      onChange={(e) =>
                                        setEditingTransaction((prev) =>
                                          prev ? { ...prev, notes: e.target.value } : null,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => deleteTransaction(editingTransaction.id)}>
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        updateTransaction(editingTransaction.id, editingTransaction)
                                        setIsEditTransactionModalOpen(false)
                                        setEditingTransaction(null)
                                      }}
                                    >
                                      Save Changes
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      {transaction.notes && <p className="text-sm text-gray-600 mt-2">{transaction.notes}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  const FavoritesSection = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [sortBy, setSortBy] = useState<"name" | "date" | "priority">("name")
    const [editingCategory, setEditingCategory] = useState<FavoriteCategory | null>(null)
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
    const [newFavoriteCategory, setNewFavoriteCategory] = useState<Omit<FavoriteCategory, "id">>({
      name: "",
      icon: "⭐",
      color: "bg-blue-500",
    })
    const [newFavorite, setNewFavorite] = useState<Omit<Favorite, "id">>({
      name: "",
      url: "",
      description: "",
      icon: "🔗",
    })

    const availableCategories = Object.keys(favorites)
    const filteredFavorites =
      selectedCategory === "all"
        ? Object.entries(favorites).flatMap(([category, items]) => items.map((item) => ({ ...item, category })))
        : favorites[selectedCategory] || []

    const searchedFavorites = filteredFavorites.filter(
      (favorite) =>
        searchTerm === "" ||
        favorite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        favorite.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Favorites</h2>
          <div className="flex items-center space-x-4">
            <Dialog open={isAddFavoriteModalOpen} onOpenChange={setIsAddFavoriteModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Favorite
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-50">
                <DialogHeader>
                  <DialogTitle>Add New Favorite</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="favorite-category">Category</Label>
                    <Select value={selectedFavoriteCategory} onValueChange={setSelectedFavoriteCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="favorite-name">Name</Label>
                    <Input
                      id="favorite-name"
                      value={newFavorite.name}
                      onChange={(e) => setNewFavorite((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="favorite-url">URL</Label>
                    <Input
                      id="favorite-url"
                      value={newFavorite.url}
                      onChange={(e) => setNewFavorite((prev) => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="favorite-description">Description</Label>
                    <Input
                      id="favorite-description"
                      value={newFavorite.description}
                      onChange={(e) => setNewFavorite((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="favorite-icon">Icon</Label>
                    <Input
                      id="favorite-icon"
                      value={newFavorite.icon}
                      onChange={(e) => setNewFavorite((prev) => ({ ...prev, icon: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddFavoriteModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (selectedFavoriteCategory) {
                          addFavorite(selectedFavoriteCategory, newFavorite)
                          setNewFavorite({
                            name: "",
                            url: "",
                            description: "",
                            icon: "🔗",
                          })
                          setIsAddFavoriteModalOpen(false)
                          setSelectedFavoriteCategory("")
                        }
                      }}
                    >
                      Add Favorite
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddFavoriteCategoryModalOpen} onOpenChange={setIsAddFavoriteCategoryModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-50">
                <DialogHeader>
                  <DialogTitle>Add Favorite Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input
                      id="category-name"
                      value={newFavoriteCategory.name}
                      onChange={(e) => setNewFavoriteCategory((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category-icon">Icon</Label>
                    <Input
                      id="category-icon"
                      value={newFavoriteCategory.icon}
                      onChange={(e) => setNewFavoriteCategory((prev) => ({ ...prev, icon: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category-color">Color</Label>
                    <Select
                      value={newFavoriteCategory.color}
                      onValueChange={(value) => setNewFavoriteCategory((prev) => ({ ...prev, color: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-red-500">Red</SelectItem>
                        <SelectItem value="bg-blue-500">Blue</SelectItem>
                        <SelectItem value="bg-green-500">Green</SelectItem>
                        <SelectItem value="bg-purple-500">Purple</SelectItem>
                        <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                        <SelectItem value="bg-pink-500">Pink</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddFavoriteCategoryModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        addFavoriteCategory(newFavoriteCategory)
                        setNewFavoriteCategory({
                          name: "",
                          icon: "⭐",
                          color: "bg-blue-500",
                        })
                        setIsAddFavoriteCategoryModalOpen(false)
                      }}
                    >
                      Add Category
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={sortBy} onValueChange={(value: "name" | "date" | "priority") => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="priority">Sort by Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            All Categories
          </Button>
          {availableCategories.map((category) => {
            const categoryData = favoriteCategories.find((cat) => cat.name === category)
            const count = favorites[category]?.length || 0
            return (
              <div key={category} className="relative group">
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""
                  }`}
                >
                  <span>{categoryData?.icon || "⭐"}</span>
                  <span>{category}</span>
                  <Badge variant="secondary" className="ml-2">
                    {count}
                  </Badge>
                </Button>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (categoryData) {
                        setEditingCategory(categoryData)
                        setIsEditCategoryModalOpen(true)
                      }
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white border-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (categoryData && window.confirm(`Delete category "${category}"?`)) {
                        deleteFavoriteCategory(categoryData.id)
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <Dialog open={isEditCategoryModalOpen} onOpenChange={setIsEditCategoryModalOpen}>
          <DialogContent className="bg-gray-50">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            {editingCategory && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-category-name">Category Name</Label>
                  <Input
                    id="edit-category-name"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category-icon">Icon</Label>
                  <Input
                    id="edit-category-icon"
                    value={editingCategory.icon}
                    onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category-color">Color</Label>
                  <Select
                    value={editingCategory.color}
                    onValueChange={(value) => setEditingCategory({ ...editingCategory, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bg-red-500">Red</SelectItem>
                      <SelectItem value="bg-blue-500">Blue</SelectItem>
                      <SelectItem value="bg-green-500">Green</SelectItem>
                      <SelectItem value="bg-purple-500">Purple</SelectItem>
                      <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                      <SelectItem value="bg-pink-500">Pink</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditCategoryModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      editFavoriteCategory(editingCategory.id, editingCategory)
                      setIsEditCategoryModalOpen(false)
                      setEditingCategory(null)
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {searchedFavorites.map((favorite) => (
            <Card key={favorite.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <span className="text-2xl">{favorite.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{favorite.name}</h3>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          High
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{favorite.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Added: 2024-01-01</span>
                        <div className="flex space-x-2">
                          <Badge variant="secondary">entertainment</Badge>
                          <Badge variant="secondary">movies</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => window.open(favorite.url, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Dialog
                      open={isEditFavoriteModalOpen && editingFavorite?.id === favorite.id}
                      onOpenChange={(open) => {
                        setIsEditFavoriteModalOpen(open)
                        if (!open) setEditingFavorite(null)
                        else setEditingFavorite(favorite)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-50">
                        <DialogHeader>
                          <DialogTitle>Edit Favorite</DialogTitle>
                        </DialogHeader>
                        {editingFavorite && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-favorite-name">Name</Label>
                              <Input
                                id="edit-favorite-name"
                                value={editingFavorite.name}
                                onChange={(e) =>
                                  setEditingFavorite((prev) => (prev ? { ...prev, name: e.target.value } : null))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-favorite-url">URL</Label>
                              <Input
                                id="edit-favorite-url"
                                value={editingFavorite.url}
                                onChange={(e) =>
                                  setEditingFavorite((prev) => (prev ? { ...prev, url: e.target.value } : null))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-favorite-description">Description</Label>
                              <Input
                                id="edit-favorite-description"
                                value={editingFavorite.description}
                                onChange={(e) =>
                                  setEditingFavorite((prev) => (prev ? { ...prev, description: e.target.value } : null))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-favorite-icon">Icon</Label>
                              <Input
                                id="edit-favorite-icon"
                                value={editingFavorite.icon}
                                onChange={(e) =>
                                  setEditingFavorite((prev) => (prev ? { ...prev, icon: e.target.value } : null))
                                }
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const category =
                                    selectedCategory === "all" ? (favorite as any).category : selectedCategory
                                  deleteFavorite(category, editingFavorite.id)
                                  setIsEditFavoriteModalOpen(false)
                                  setEditingFavorite(null)
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                              <Button
                                onClick={() => {
                                  const category =
                                    selectedCategory === "all" ? (favorite as any).category : selectedCategory
                                  updateFavorite(category, editingFavorite.id, editingFavorite)
                                  setIsEditFavoriteModalOpen(false)
                                  setEditingFavorite(null)
                                }}
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const PortfolioSection = () => {
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
    const [isEditMainProjectModalOpen, setIsEditMainProjectModalOpen] = useState(false)
    const [newProject, setNewProject] = useState<Omit<Project, "id">>({
      name: "",
      description: "",
      technologies: [],
      status: "planned",
      liveUrl: "",
      githubUrl: "",
      image: "/placeholder-eqew7.png",
    })

    const [mainProjectData, setMainProjectData] = useState({
      title: "The Odin Project Progress",
      description: "Full-Stack JavaScript Development Path",
      progress: 75,
      phases: [
        { name: "Foundations", completed: true },
        { name: "JavaScript Basics", completed: true },
        { name: "React", completed: false },
        { name: "Node.js", completed: false },
        { name: "Getting Hired", completed: false },
      ],
    })

    const [editingMainProject, setEditingMainProject] = useState(mainProjectData)

    const handleSaveMainProject = () => {
      setMainProjectData(editingMainProject)
      localStorage.setItem("mainProject", JSON.stringify(editingMainProject))
      setIsEditMainProjectModalOpen(false)
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Portfolio</h2>
          <Dialog open={isAddProjectModalOpen} onOpenChange={setIsAddProjectModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-50">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={newProject.name}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Input
                    id="project-description"
                    value={newProject.description}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="project-technologies">Technologies (comma separated)</Label>
                  <Input
                    id="project-technologies"
                    value={newProject.technologies.join(", ")}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        technologies: e.target.value.split(", ").filter((t) => t.trim()),
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="project-status">Status</Label>
                  <Select
                    value={newProject.status}
                    onValueChange={(value: Project["status"]) => setNewProject((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="project-live">Live URL (optional)</Label>
                  <Input
                    id="project-live"
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, liveUrl: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="project-github">GitHub URL (optional)</Label>
                  <Input
                    id="project-github"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, githubUrl: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddProjectModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      addProject(newProject)
                      setNewProject({
                        name: "",
                        description: "",
                        technologies: [],
                        status: "planned",
                        liveUrl: "",
                        githubUrl: "",
                        image: "/placeholder-eqew7.png",
                      })
                      setIsAddProjectModalOpen(false)
                    }}
                  >
                    Add Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Featured Project
              <Button
                className="bg-violet-600 hover:bg-violet-700 text-white"
                size="sm"
                onClick={() => {
                  setEditingMainProject(mainProjectData)
                  setIsEditMainProjectModalOpen(true)
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Main Project
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{mainProjectData.title}</h3>
              <p className="mb-4">{mainProjectData.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{mainProjectData.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${mainProjectData.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {mainProjectData.phases.map((phase, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-sm font-bold ${
                        phase.completed ? "bg-green-500" : "bg-white/20"
                      }`}
                    >
                      {phase.completed ? "✓" : index + 1}
                    </div>
                    <div className="text-xs">{phase.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isEditMainProjectModalOpen} onOpenChange={setIsEditMainProjectModalOpen}>
          <DialogContent className="bg-gray-50 max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Main Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="main-project-title">Project Title</Label>
                <Input
                  id="main-project-title"
                  value={editingMainProject.title}
                  onChange={(e) => setEditingMainProject((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="main-project-description">Description</Label>
                <Input
                  id="main-project-description"
                  value={editingMainProject.description}
                  onChange={(e) => setEditingMainProject((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="main-project-progress">Progress (%)</Label>
                <Input
                  id="main-project-progress"
                  type="number"
                  min="0"
                  max="100"
                  value={editingMainProject.progress}
                  onChange={(e) =>
                    setEditingMainProject((prev) => ({ ...prev, progress: Number.parseInt(e.target.value) || 0 }))
                  }
                />
              </div>
              <div>
                <Label>Project Phases</Label>
                <div className="space-y-2">
                  {editingMainProject.phases.map((phase, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={phase.name}
                        onChange={(e) => {
                          const newPhases = [...editingMainProject.phases]
                          newPhases[index].name = e.target.value
                          setEditingMainProject((prev) => ({ ...prev, phases: newPhases }))
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant={phase.completed ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const newPhases = [...editingMainProject.phases]
                          newPhases[index].completed = !newPhases[index].completed
                          setEditingMainProject((prev) => ({ ...prev, phases: newPhases }))
                        }}
                      >
                        {phase.completed ? "✓" : "○"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditMainProjectModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={handleSaveMainProject}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{project.name}</h3>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <Dialog
                          open={isEditProjectModalOpen && editingProject?.id === project.id}
                          onOpenChange={(open) => {
                            setIsEditProjectModalOpen(open)
                            if (!open) setEditingProject(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setEditingProject(project)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-50">
                            <DialogHeader>
                              <DialogTitle>Edit Project</DialogTitle>
                            </DialogHeader>
                            {editingProject && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-project-name">Project Name</Label>
                                  <Input
                                    id="edit-project-name"
                                    value={editingProject.name}
                                    onChange={(e) =>
                                      setEditingProject((prev) => (prev ? { ...prev, name: e.target.value } : null))
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-project-description">Description</Label>
                                  <Input
                                    id="edit-project-description"
                                    value={editingProject.description}
                                    onChange={(e) =>
                                      setEditingProject((prev) =>
                                        prev ? { ...prev, description: e.target.value } : null,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-project-technologies">Technologies</Label>
                                  <Input
                                    id="edit-project-technologies"
                                    value={editingProject.technologies.join(", ")}
                                    onChange={(e) =>
                                      setEditingProject((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              technologies: e.target.value.split(", ").filter((t) => t.trim()),
                                            }
                                          : null,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-project-status">Status</Label>
                                  <Select
                                    value={editingProject.status}
                                    onValueChange={(value: Project["status"]) =>
                                      setEditingProject((prev) => (prev ? { ...prev, status: value } : null))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="planned">Planned</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-project-live">Live URL</Label>
                                  <Input
                                    id="edit-project-live"
                                    value={editingProject.liveUrl || ""}
                                    onChange={(e) =>
                                      setEditingProject((prev) => (prev ? { ...prev, liveUrl: e.target.value } : null))
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-project-github">GitHub URL</Label>
                                  <Input
                                    id="edit-project-github"
                                    value={editingProject.githubUrl || ""}
                                    onChange={(e) =>
                                      setEditingProject((prev) =>
                                        prev ? { ...prev, githubUrl: e.target.value } : null,
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      deleteProject(editingProject.id)
                                      setIsEditProjectModalOpen(false)
                                      setEditingProject(null)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      updateProject(editingProject.id, editingProject)
                                      setIsEditProjectModalOpen(false)
                                      setEditingProject(null)
                                    }}
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" onClick={() => deleteProject(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" onClick={() => window.open(project.liveUrl, "_blank")}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" onClick={() => window.open(project.githubUrl, "_blank")}>
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </Button>
                      )}
                      <Badge
                        variant={
                          project.status === "completed"
                            ? "default"
                            : project.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                        className="ml-auto"
                      >
                        {project.status === "completed"
                          ? "Completed"
                          : project.status === "in-progress"
                            ? "In Progress"
                            : "Planned"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const LearningSection = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [sortBy, setSortBy] = useState<"name" | "progress" | "date">("name")
    const [editingLearningCategory, setEditingLearningCategory] = useState<LearningCategory | null>(null)
    const [isEditLearningCategoryModalOpen, setIsEditLearningCategoryModalOpen] = useState(false)
    const [newLearningCategory, setNewLearningCategory] = useState<Omit<LearningCategory, "id">>({
      name: "",
      icon: "📚",
      color: "bg-blue-500",
    })
    const [newLearningResource, setNewLearningResource] = useState<Omit<LearningResource, "id">>({
      categoryId: "",
      name: "",
      type: "course",
      url: "",
      progress: 0,
      status: "not-started",
      notes: "",
    })

    const totalResources = Object.values(learningResources).flat().length
    const completedResources = Object.values(learningResources)
      .flat()
      .filter((r) => r.status === "completed").length
    const inProgressResources = Object.values(learningResources)
      .flat()
      .filter((r) => r.status === "in-progress").length
    const averageProgress =
      totalResources > 0
        ? Math.round(
            Object.values(learningResources)
              .flat()
              .reduce((sum, r) => sum + r.progress, 0) / totalResources,
          )
        : 0

    const availableCategories = Object.keys(learningResources)
    const filteredResources =
      selectedCategory === "all"
        ? Object.entries(learningResources).flatMap(([category, items]) => items.map((item) => ({ ...item, category })))
        : learningResources[selectedCategory] || []

    const searchedResources = filteredResources.filter(
      (resource) =>
        searchTerm === "" ||
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.notes.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Learning Area</h2>
          <div className="flex items-center space-x-4">
            <Dialog open={isAddLearningResourceModalOpen} onOpenChange={setIsAddLearningResourceModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-50">
                <DialogHeader>
                  <DialogTitle>Add Learning Resource</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resource-category">Category</Label>
                    <Select value={selectedLearningCategory} onValueChange={setSelectedLearningCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="resource-name">Resource Name</Label>
                    <Input
                      id="resource-name"
                      value={newLearningResource.name}
                      onChange={(e) => setNewLearningResource((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resource-type">Type</Label>
                    <Select
                      value={newLearningResource.type}
                      onValueChange={(value: LearningResource["type"]) =>
                        setNewLearningResource((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course">Course</SelectItem>
                        <SelectItem value="book">Book</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="practice">Practice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="resource-url">URL</Label>
                    <Input
                      id="resource-url"
                      value={newLearningResource.url}
                      onChange={(e) => setNewLearningResource((prev) => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resource-progress">Progress (%)</Label>
                    <Input
                      id="resource-progress"
                      type="number"
                      min="0"
                      max="100"
                      value={newLearningResource.progress}
                      onChange={(e) =>
                        setNewLearningResource((prev) => ({ ...prev, progress: Number(e.target.value) }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="resource-status">Status</Label>
                    <Select
                      value={newLearningResource.status}
                      onValueChange={(value: LearningResource["status"]) =>
                        setNewLearningResource((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="resource-notes">Notes</Label>
                    <Input
                      id="resource-notes"
                      value={newLearningResource.notes}
                      onChange={(e) => setNewLearningResource((prev) => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddLearningResourceModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (selectedLearningCategory) {
                          addLearningResource(selectedLearningCategory, newLearningResource)
                          setNewLearningResource({
                            categoryId: "",
                            name: "",
                            type: "course",
                            url: "",
                            progress: 0,
                            status: "not-started",
                            notes: "",
                          })
                          setIsAddLearningResourceModalOpen(false)
                          setSelectedLearningCategory("")
                        }
                      }}
                    >
                      Add Resource
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddLearningCategoryModalOpen} onOpenChange={setIsAddLearningCategoryModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-50">
                <DialogHeader>
                  <DialogTitle>Add Learning Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="learning-category-name">Category Name</Label>
                    <Input
                      id="learning-category-name"
                      value={newLearningCategory.name}
                      onChange={(e) => setNewLearningCategory((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="learning-category-icon">Icon</Label>
                    <Input
                      id="learning-category-icon"
                      value={newLearningCategory.icon}
                      onChange={(e) => setNewLearningCategory((prev) => ({ ...prev, icon: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="learning-category-color">Color</Label>
                    <Select
                      value={newLearningCategory.color}
                      onValueChange={(value) => setNewLearningCategory((prev) => ({ ...prev, color: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-red-500">Red</SelectItem>
                        <SelectItem value="bg-blue-500">Blue</SelectItem>
                        <SelectItem value="bg-green-500">Green</SelectItem>
                        <SelectItem value="bg-purple-500">Purple</SelectItem>
                        <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                        <SelectItem value="bg-pink-500">Pink</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddLearningCategoryModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        addLearningCategory(newLearningCategory)
                        setNewLearningCategory({
                          name: "",
                          icon: "📚",
                          color: "bg-blue-500",
                        })
                        setIsAddLearningCategoryModalOpen(false)
                      }}
                    >
                      Add Category
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resources</p>
                  <p className="text-2xl font-bold text-purple-600">{totalResources}</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedResources}</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-orange-600">{inProgressResources}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{averageProgress}%</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search learning resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={sortBy} onValueChange={(value: "name" | "progress" | "date") => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="progress">Sort by Progress</SelectItem>
              <SelectItem value="date">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            All Categories
          </Button>
          {availableCategories.map((category) => {
            const categoryData = learningCategories.find((cat) => cat.name === category)
            const count = learningResources[category]?.length || 0
            return (
              <div key={category} className="relative group">
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""
                  }`}
                >
                  <span>{categoryData?.icon || "📚"}</span>
                  <span>{category}</span>
                  <Badge variant="secondary" className="ml-2">
                    {count}
                  </Badge>
                </Button>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (categoryData) {
                        setEditingLearningCategory(categoryData)
                        setIsEditLearningCategoryModalOpen(true)
                      }
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white border-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (categoryData && window.confirm(`Delete category "${category}"?`)) {
                        deleteLearningCategory(categoryData.id)
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <Dialog open={isEditLearningCategoryModalOpen} onOpenChange={setIsEditLearningCategoryModalOpen}>
          <DialogContent className="bg-gray-50">
            <DialogHeader>
              <DialogTitle>Edit Learning Category</DialogTitle>
            </DialogHeader>
            {editingLearningCategory && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-learning-category-name">Category Name</Label>
                  <Input
                    id="edit-learning-category-name"
                    value={editingLearningCategory.name}
                    onChange={(e) => setEditingLearningCategory({ ...editingLearningCategory, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-learning-category-icon">Icon</Label>
                  <Input
                    id="edit-learning-category-icon"
                    value={editingLearningCategory.icon}
                    onChange={(e) => setEditingLearningCategory({ ...editingLearningCategory, icon: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-learning-category-color">Color</Label>
                  <Select
                    value={editingLearningCategory.color}
                    onValueChange={(value) => setEditingLearningCategory({ ...editingLearningCategory, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bg-red-500">Red</SelectItem>
                      <SelectItem value="bg-blue-500">Blue</SelectItem>
                      <SelectItem value="bg-green-500">Green</SelectItem>
                      <SelectItem value="bg-purple-500">Purple</SelectItem>
                      <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                      <SelectItem value="bg-pink-500">Pink</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditLearningCategoryModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      editLearningCategory(editingLearningCategory.id, editingLearningCategory)
                      setIsEditLearningCategoryModalOpen(false)
                      setEditingLearningCategory(null)
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {searchedResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        High
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">Full-stack web development curriculum</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{resource.progress}%</span>
                      </div>
                      <Progress value={resource.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                          {resource.status}
                        </span>
                        <span>Added: 2024-01-01</span>
                      </div>
                      {resource.notes && (
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {resource.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => window.open(resource.url, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    <Dialog
                      open={isEditLearningResourceModalOpen && editingLearningResource?.id === resource.id}
                      onOpenChange={(open) => {
                        setIsEditLearningResourceModalOpen(open)
                        if (!open) setEditingLearningResource(null)
                        else setEditingLearningResource(resource)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-50">
                        <DialogHeader>
                          <DialogTitle>Edit Learning Resource</DialogTitle>
                        </DialogHeader>
                        {editingLearningResource && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-resource-name">Resource Name</Label>
                              <Input
                                id="edit-resource-name"
                                value={editingLearningResource.name}
                                onChange={(e) =>
                                  setEditingLearningResource((prev) =>
                                    prev ? { ...prev, name: e.target.value } : null,
                                  )
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-resource-url">URL</Label>
                              <Input
                                id="edit-resource-url"
                                value={editingLearningResource.url}
                                onChange={(e) =>
                                  setEditingLearningResource((prev) => (prev ? { ...prev, url: e.target.value } : null))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-resource-progress">Progress (%)</Label>
                              <Input
                                id="edit-resource-progress"
                                type="number"
                                min="0"
                                max="100"
                                value={editingLearningResource.progress}
                                onChange={(e) =>
                                  setEditingLearningResource((prev) =>
                                    prev ? { ...prev, progress: Number(e.target.value) } : null,
                                  )
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-resource-status">Status</Label>
                              <Select
                                value={editingLearningResource.status}
                                onChange={(value: LearningResource["status"]) =>
                                  setEditingLearningResource((prev) => (prev ? { ...prev, status: value } : null))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-resource-notes">Notes</Label>
                              <Input
                                id="edit-resource-notes"
                                value={editingLearningResource.notes}
                                onChange={(e) =>
                                  setEditingLearningResource((prev) =>
                                    prev ? { ...prev, notes: e.target.value } : null,
                                  )
                                }
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const category =
                                    selectedCategory === "all" ? (resource as any).category : selectedCategory
                                  deleteLearningResource(category, editingLearningResource.id)
                                  setIsEditLearningResourceModalOpen(false)
                                  setEditingLearningResource(null)
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                              <Button
                                onClick={() => {
                                  const category =
                                    selectedCategory === "all" ? (resource as any).category : selectedCategory
                                  updateLearningResource(category, editingLearningResource.id, editingLearningResource)
                                  setIsEditLearningResourceModalOpen(false)
                                  setEditingLearningResource(null)
                                }}
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />
      case "money":
        return <MoneySection />
      case "favorites":
        return <FavoritesSection />
      case "portfolio":
        return <PortfolioSection />
      case "learning":
        return <LearningSection />
      default:
        return <ProfileSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Personal Dashboard</h1>
        </div>
        <nav className="mt-6">
          {[
            { id: "profile", name: "Profile", icon: User },
            { id: "money", name: "Money", icon: DollarSign },
            { id: "favorites", name: "Favorites", icon: Heart },
            { id: "portfolio", name: "Portfolio", icon: FolderOpen },
            { id: "learning", name: "Learning Area", icon: BookOpen },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeSection === item.id
                    ? "bg-violet-50 text-violet-600 border-r-2 border-violet-600"
                    : "text-gray-600"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 min-h-screen">{renderActiveSection()}</div>
    </div>
  )
}
