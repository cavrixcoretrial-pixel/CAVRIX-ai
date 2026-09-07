"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Database,
  Sparkles,
  Sun,
  Moon,
  Monitor,
  Trash2,
  Download,
  UserX,
  Check,
  KeyRound,
  Fingerprint,
  MonitorSmartphone,
  Globe,
  Type,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type TabKey = "general" | "appearance" | "personalization" | "data" | "notifications" | "security";

const TABS: { key: TabKey; label: string; icon: typeof Settings }[] = [
  { key: "general", label: "General", icon: Settings },
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "personalization", label: "Personalization", icon: Sparkles },
  { key: "data", label: "Data Controls", icon: Database },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [darkMode, setDarkMode] = useState(true);
  const [lightMode, setLightMode] = useState(false);
  const [systemTheme, setSystemTheme] = useState(false);
  const [customInstructions, setCustomInstructions] = useState("");
  const [preferredModel, setPreferredModel] = useState("gpt-4o");
  const [responseStyle, setResponseStyle] = useState<"concise" | "balanced" | "detailed">("balanced");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [confirmDeleteChats, setConfirmDeleteChats] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);

  const activeSessions = [
    { name: "Chrome on Windows", location: "New York, US", current: true },
    { name: "Firefox on Mac", location: "San Francisco, US", current: false },
    { name: "Cavrix Mobile App", location: "London, UK", current: false },
  ];

  const glassCard = "rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl";

  const selectClass =
    "flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cavrix-500 focus:outline-none focus:ring-1 focus:ring-cavrix-500 transition-colors duration-200";

  const handleGeneralSave = () => {
    toast.success("Settings saved");
  };

  const handleAppearanceApply = () => {
    if (darkMode) setTheme("dark");
    if (lightMode) setTheme("light");
    if (systemTheme) setTheme("system");
    toast.success("Appearance updated");
  };

  const handlePersonalizationSave = () => {
    toast.success("Personalization saved");
  };

  const handleExport = () => {
    toast.success("Chat export started");
  };

  const handleDeleteChats = () => {
    setConfirmDeleteChats(false);
    toast.success("All chats deleted");
  };

  const handleDeleteAccount = () => {
    setConfirmDeleteAccount(false);
    toast.success("Account deletion requested");
  };

  const handlePasswordSave = () => {
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated");
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto scrollbar-thin">
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-56 lg:flex-shrink-0">
            <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex flex-shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-cavrix-600/15 text-cavrix-300 shadow-cavrix"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="min-w-0 flex-1 space-y-6">
            {activeTab === "general" && (
              <div className="space-y-6 animate-fade-in">
                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Theme</h2>
                  <div className="space-y-4">
                    <Switch
                      id="dark-mode-toggle"
                      label="Dark mode"
                      description="Use dark theme across Cavrix"
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => {
                        setTheme(checked ? "dark" : "light");
                        setDarkMode(checked);
                        setLightMode(!checked);
                        setSystemTheme(false);
                      }}
                    />
                    <Switch
                      id="light-mode-toggle"
                      label="Light mode"
                      description="Use light theme across Cavrix"
                      checked={theme === "light"}
                      onCheckedChange={(checked) => {
                        setTheme(checked ? "light" : "dark");
                        setLightMode(checked);
                        setDarkMode(!checked);
                        setSystemTheme(false);
                      }}
                    />
                    <Switch
                      id="system-theme-toggle"
                      label="System theme"
                      description="Follow your system appearance"
                      checked={theme === "system"}
                      onCheckedChange={(checked) => {
                        setTheme(checked ? "system" : "dark");
                        setSystemTheme(checked);
                        setDarkMode(!checked);
                        setLightMode(false);
                      }}
                    />
                  </div>
                </div>

                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Language</h2>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-slate-500" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={selectClass}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </div>

                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Font size</h2>
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-slate-500" />
                    <div className="grid flex-1 grid-cols-3 gap-2">
                      {(["small", "medium", "large"] as const).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFontSize(size)}
                          className={cn(
                            "rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-all duration-200",
                            fontSize === size
                              ? "border-cavrix-500 bg-cavrix-600/15 text-cavrix-300"
                              : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleGeneralSave}>
                    <Check className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6 animate-fade-in">
                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Appearance</h2>
                  <p className="mb-6 text-sm text-slate-500">
                    Choose your preferred theme appearance.
                  </p>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setDarkMode(true);
                        setLightMode(false);
                        setSystemTheme(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                        darkMode
                          ? "border-cavrix-500 bg-cavrix-600/10"
                          : "border-slate-700 hover:border-slate-600"
                      )}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-cyan-400">
                        <Moon className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Dark mode</p>
                        <p className="text-xs text-slate-500">Always use the dark theme</p>
                      </div>
                      {darkMode && <Check className="h-4 w-4 text-cavrix-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLightMode(true);
                        setDarkMode(false);
                        setSystemTheme(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                        lightMode
                          ? "border-cavrix-500 bg-cavrix-600/10"
                          : "border-slate-700 hover:border-slate-600"
                      )}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-amber-400">
                        <Sun className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Light mode</p>
                        <p className="text-xs text-slate-500">Always use the light theme</p>
                      </div>
                      {lightMode && <Check className="h-4 w-4 text-cavrix-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSystemTheme(true);
                        setDarkMode(false);
                        setLightMode(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                        systemTheme
                          ? "border-cavrix-500 bg-cavrix-600/10"
                          : "border-slate-700 hover:border-slate-600"
                      )}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-purple-400">
                        <Monitor className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">System theme</p>
                        <p className="text-xs text-slate-500">Follow your system preference</p>
                      </div>
                      {systemTheme && <Check className="h-4 w-4 text-cavrix-400" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleAppearanceApply}>
                    <Check className="mr-2 h-4 w-4" />
                    Apply appearance
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "personalization" && (
              <div className="space-y-6 animate-fade-in">
                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Custom instructions</h2>
                  <Textarea
                    placeholder="Tell Cavrix how to respond. E.g. Always respond in a friendly tone, use markdown lists, and keep answers concise."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    className="min-h-[140px]"
                  />
                </div>

                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Preferred AI model</h2>
                  <select
                    value={preferredModel}
                    onChange={(e) => setPreferredModel(e.target.value)}
                    className={selectClass}
                  >
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="claude-3-opus">Claude 3 Opus</option>
                    <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                    <option value="gemini-ultra">Gemini Ultra</option>
                  </select>
                </div>

                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Response style</h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {(["concise", "balanced", "detailed"] as const).map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setResponseStyle(style)}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-center text-sm font-medium capitalize transition-all duration-200",
                          responseStyle === style
                            ? "border-cavrix-500 bg-cavrix-600/15 text-cavrix-300 shadow-cavrix"
                            : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white"
                        )}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handlePersonalizationSave}>
                    <Check className="mr-2 h-4 w-4" />
                    Save preferences
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "data" && (
              <div className="space-y-6 animate-fade-in">
                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Export data</h2>
                  <p className="mb-4 text-sm text-slate-500">
                    Download a copy of all your chat history and data.
                  </p>
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Export all chats
                  </Button>
                </div>

                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-red-400">Danger zone</h2>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Delete all chats</p>
                        <p className="text-xs text-slate-500">
                          Permanently remove all your conversations. This cannot be undone.
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setConfirmDeleteChats(true)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete all chats
                      </Button>
                    </div>

                    <div className="flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Delete account</p>
                        <p className="text-xs text-slate-500">
                          Permanently delete your account and all associated data.
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setConfirmDeleteAccount(true)}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Delete account
                      </Button>
                    </div>
                  </div>
                </div>

                {confirmDeleteChats && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-glow-lg animate-slide-up">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                        <Trash2 className="h-6 w-6 text-red-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Delete all chats?</h3>
                      <p className="mt-2 text-sm text-slate-400">
                        This will permanently delete all your conversations. This action cannot be undone.
                      </p>
                      <div className="mt-6 flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setConfirmDeleteChats(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteChats}>
                          Delete all
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {confirmDeleteAccount && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-glow-lg animate-slide-up">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                        <UserX className="h-6 w-6 text-red-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Delete your account?</h3>
                      <p className="mt-2 text-sm text-slate-400">
                        Your account, chat history, and all associated data will be permanently deleted. This action cannot be undone.
                      </p>
                      <div className="mt-6 flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setConfirmDeleteAccount(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          Delete account
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6 animate-fade-in">
                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Email notifications</h2>
                  <div className="space-y-4">
                    <Switch
                      id="email-notifications"
                      label="Email notifications"
                      description="Receive email notifications about your activity"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                    <Switch
                      id="product-updates"
                      label="Product updates"
                      description="Get notified about new features and improvements"
                      checked={productUpdates}
                      onCheckedChange={setProductUpdates}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6 animate-fade-in">
                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Change password</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Current password
                      </label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="new-password" className="mb-1.5 block text-sm font-medium text-slate-300">
                        New password
                      </label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Confirm new password
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handlePasswordSave}>
                        <KeyRound className="mr-2 h-4 w-4" />
                        Update password
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={glassCard}>
                  <h2 className="mb-4 text-lg font-semibold text-white">Active sessions</h2>
                  <div className="space-y-3">
                    {activeSessions.map((session) => (
                      <div
                        key={session.name}
                        className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/30 p-4"
                      >
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-cyan-400">
                          <MonitorSmartphone className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">{session.name}</p>
                          <p className="text-xs text-slate-500">{session.location}</p>
                        </div>
                        {session.current ? (
                          <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-medium text-cyan-400">
                            Current
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={glassCard}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-purple-400">
                        <Fingerprint className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">Two-factor authentication</p>
                        <p className="text-xs text-slate-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="two-factor-auth"
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
