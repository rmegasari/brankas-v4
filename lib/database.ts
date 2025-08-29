import { supabase, type Transaction, type Platform, type Debt, type Goal } from "./supabase"

export class DatabaseService {
  // Transactions
  static async getTransactions(): Promise<Transaction[]> {
    const { data, error } = await supabase.from("transactions").select("*").order("date", { ascending: false })

    if (error) {
      console.error("Error fetching transactions:", error)
      return []
    }

    return data || []
  }

  static async addTransaction(transaction: Omit<Transaction, "id" | "created_at">): Promise<Transaction | null> {
    const { data, error } = await supabase.from("transactions").insert([transaction]).select().single()

    if (error) {
      console.error("Error adding transaction:", error)
      return null
    }

    return data
  }

  static async updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction | null> {
    const { data, error } = await supabase.from("transactions").update(transaction).eq("id", id).select().single()

    if (error) {
      console.error("Error updating transaction:", error)
      return null
    }

    return data
  }

  static async deleteTransaction(id: number): Promise<boolean> {
    const { error } = await supabase.from("transactions").delete().eq("id", id)

    if (error) {
      console.error("Error deleting transaction:", error)
      return false
    }

    return true
  }

  // Platforms
  static async getPlatforms(): Promise<Platform[]> {
    const { data, error } = await supabase.from("platforms").select("*").order("account")

    if (error) {
      console.error("Error fetching platforms:", error)
      return []
    }

    return data || []
  }

  static async addPlatform(platform: Omit<Platform, "id" | "created_at">): Promise<Platform | null> {
    const { data, error } = await supabase.from("platforms").insert([platform]).select().single()

    if (error) {
      console.error("Error adding platform:", error)
      return null
    }

    return data
  }

  static async updatePlatform(id: number, platform: Partial<Platform>): Promise<Platform | null> {
    const { data, error } = await supabase.from("platforms").update(platform).eq("id", id).select().single()

    if (error) {
      console.error("Error updating platform:", error)
      return null
    }

    return data
  }

  static async deletePlatform(id: number): Promise<boolean> {
    const { error } = await supabase.from("platforms").delete().eq("id", id)

    if (error) {
      console.error("Error deleting platform:", error)
      return false
    }

    return true
  }

  // Debts
  static async getDebts(): Promise<Debt[]> {
    const { data, error } = await supabase.from("debts").select("*").order("due-date")

    if (error) {
      console.error("Error fetching debts:", error)
      return []
    }

    return data || []
  }

  static async addDebt(debt: Omit<Debt, "id" | "created_at">): Promise<Debt | null> {
    const { data, error } = await supabase.from("debts").insert([debt]).select().single()

    if (error) {
      console.error("Error adding debt:", error)
      return null
    }

    return data
  }

  static async updateDebt(id: number, debt: Partial<Debt>): Promise<Debt | null> {
    const { data, error } = await supabase.from("debts").update(debt).eq("id", id).select().single()

    if (error) {
      console.error("Error updating debt:", error)
      return null
    }

    return data
  }

  static async deleteDebt(id: number): Promise<boolean> {
    const { error } = await supabase.from("debts").delete().eq("id", id)

    if (error) {
      console.error("Error deleting debt:", error)
      return false
    }

    return true
  }

  // Goals
  static async getGoals(): Promise<Goal[]> {
    const { data, error } = await supabase.from("goals").select("*").order("deadline")

    if (error) {
      console.error("Error fetching goals:", error)
      return []
    }

    return data || []
  }

  static async addGoal(goal: Omit<Goal, "id" | "created_at">): Promise<Goal | null> {
    const { data, error } = await supabase.from("goals").insert([goal]).select().single()

    if (error) {
      console.error("Error adding goal:", error)
      return null
    }

    return data
  }

  static async updateGoal(id: number, goal: Partial<Goal>): Promise<Goal | null> {
    const { data, error } = await supabase.from("goals").update(goal).eq("id", id).select().single()

    if (error) {
      console.error("Error updating goal:", error)
      return null
    }

    return data
  }

  static async deleteGoal(id: number): Promise<boolean> {
    const { error } = await supabase.from("goals").delete().eq("id", id)

    if (error) {
      console.error("Error deleting goal:", error)
      return false
    }

    return true
  }

  // Budgets
  static async getBudgets(): Promise<any[]> {
    const { data, error } = await supabase.from("budgets").select("*").order("category")

    if (error) {
      console.error("Error fetching budgets:", error)
      return []
    }

    return data || []
  }

  static async addBudget(budget: any): Promise<any | null> {
    const { data, error } = await supabase.from("budgets").insert([budget]).select().single()

    if (error) {
      console.error("Error adding budget:", error)
      return null
    }

    return data
  }

  static async updateBudget(id: number, budget: any): Promise<any | null> {
    const { data, error } = await supabase.from("budgets").update(budget).eq("id", id).select().single()

    if (error) {
      console.error("Error updating budget:", error)
      return null
    }

    return data
  }

  static async deleteBudget(id: number): Promise<boolean> {
    const { error } = await supabase.from("budgets").delete().eq("id", id)

    if (error) {
      console.error("Error deleting budget:", error)
      return false
    }

    return true
  }

  // Categories
  static async getCategories(): Promise<any[]> {
    const { data, error } = await supabase.from("categories").select("*").eq("is_active", true).order("name")

    if (error) {
      console.error("Error fetching categories:", error)
      return []
    }

    return data || []
  }

  static async getCategoriesWithSubcategories(): Promise<any[]> {
    const { data, error } = await supabase
      .from("categories")
      .select(`
        id,
        name,
        type,
        parent_id,
        is_default,
        subcategories:categories!parent_id(id, name, type, is_default)
      `)
      .is("parent_id", null)
      .eq("is_active", true)
      .order("name")

    if (error) {
      console.error("Error fetching categories with subcategories:", error)
      return []
    }

    return data || []
  }

  static async addCategory(category: {
    name: string
    type: string
    parent_id?: number
    is_default?: boolean
  }): Promise<any | null> {
    const { data, error } = await supabase.from("categories").insert([category]).select().single()

    if (error) {
      console.error("Error adding category:", error)
      return null
    }

    return data
  }

  static async updateCategory(id: number, category: Partial<any>): Promise<any | null> {
    const { data, error } = await supabase.from("categories").update(category).eq("id", id).select().single()

    if (error) {
      console.error("Error updating category:", error)
      return null
    }

    return data
  }

  static async deleteCategory(id: number): Promise<boolean> {
    // Soft delete by setting is_active to false
    const { error } = await supabase.from("categories").update({ is_active: false }).eq("id", id)

    if (error) {
      console.error("Error deleting category:", error)
      return false
    }

    return true
  }

  static async getSubcategoriesByType(type: string): Promise<any[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("type", type)
      .not("parent_id", "is", null)
      .eq("is_active", true)
      .order("name")

    if (error) {
      console.error("Error fetching subcategories:", error)
      return []
    }

    return data || []
  }
}
