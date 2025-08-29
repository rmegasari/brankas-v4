"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { CategoryManager } from "@/components/category-manager"
import { Calendar, AlertTriangle, SettingsIcon, Palette, Globe, User, LogOut } from "lucide-react"
import type { AppSettings } from "@/types"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    payrollDate: 28,
    customSubcategories: {
      expense: ["Bensin", "Internet", "Belanja Bulanan", "Hiburan", "Transportasi", "Makan", "Kesehatan"],
      income: ["Gaji", "Freelance", "Bonus", "Investasi", "Lainnya"],
    },
    budgetWarningThreshold: 80,
  })

  const [language, setLanguage] = useState("id")
  const { signOut, user } = useAuth()

  const saveSettings = () => {
    // In a real app, this would save to backend/localStorage
    console.log("[v0] Saving settings:", settings)
    alert("Pengaturan berhasil disimpan!")
  }

  const handleLogout = async () => {
    console.log("[v0] Logging out user")
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      await signOut()
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="h-8 w-8" />
        <h1 className="text-3xl font-bold font-manrope">Pengaturan</h1>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Profile Settings */}
        <Card className="neobrutalism-card">
          <CardHeader className="border-b-2 border-black bg-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Pengaturan Profil
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Bahasa
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="neobrutalism-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Tema
                </Label>
                <ThemeToggle />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-black">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm">Akun</h3>
                  <p className="text-sm text-muted-foreground">Kelola sesi akun Anda</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="neobrutalism-button bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Date Settings */}
        <Card className="neobrutalism-card">
          <CardHeader className="border-b-2 border-black bg-secondary text-secondary-foreground">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tanggal Gajian
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="payrollDate" className="text-sm font-semibold">
                  Tanggal Gajian Setiap Bulan
                </Label>
                <Input
                  id="payrollDate"
                  type="number"
                  min="1"
                  max="31"
                  value={settings.payrollDate}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, payrollDate: Number.parseInt(e.target.value) || 1 }))
                  }
                  className="neobrutalism-input mt-2 max-w-32"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Periode bulanan akan dihitung dari tanggal {settings.payrollDate} hingga tanggal{" "}
                  {settings.payrollDate - 1} bulan berikutnya
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Warning Settings */}
        <Card className="neobrutalism-card">
          <CardHeader className="border-b-2 border-black bg-destructive text-destructive-foreground">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Peringatan Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="warningThreshold" className="text-sm font-semibold">
                  Ambang Batas Peringatan (%)
                </Label>
                <Input
                  id="warningThreshold"
                  type="number"
                  min="50"
                  max="100"
                  value={settings.budgetWarningThreshold}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, budgetWarningThreshold: Number.parseInt(e.target.value) || 80 }))
                  }
                  className="neobrutalism-input mt-2 max-w-32"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Peringatan akan muncul ketika pengeluaran mencapai {settings.budgetWarningThreshold}% dari budget
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <CategoryManager />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={saveSettings}
            className="neobrutalism-button bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
          >
            Simpan Pengaturan
          </Button>
        </div>
      </div>
    </div>
  )
}
