"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  Sparkles,
  Mic,
  Search,
  Bot,
  Globe,
  Wrench,
  Megaphone,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const featureFlags = [
  {
    key: "imageGeneration",
    label: "Enable Image Generation",
    description: "Allow users to generate images with AI",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-600/15",
  },
  {
    key: "voiceMode",
    label: "Enable Voice Mode",
    description: "Allow real-time voice conversations",
    icon: Mic,
    color: "text-cavrix-400",
    bgColor: "bg-cavrix-600/15",
  },
  {
    key: "deepResearch",
    label: "Enable Deep Research",
    description: "Allow deep research and long-form analysis",
    icon: Search,
    color: "text-cyan-400",
    bgColor: "bg-cyan-600/15",
  },
  {
    key: "aiAgents",
    label: "Enable AI Agents",
    description: "Allow users to create and run AI agents",
    icon: Bot,
    color: "text-purple-400",
    bgColor: "bg-purple-600/15",
  },
  {
    key: "webSearch",
    label: "Enable Web Search",
    description: "Allow AI to search the web for live content",
    icon: Globe,
    color: "text-cavrix-400",
    bgColor: "bg-cavrix-600/15",
  },
];

export default function AdminSystemPage() {
  const [features, setFeatures] = useState<Record<string, boolean>>({
    imageGeneration: true,
    voiceMode: false,
    deepResearch: true,
    aiAgents: false,
    webSearch: true,
  });

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleFeatureToggle = (key: string, label: string, value: boolean) => {
    setFeatures((prev) => ({ ...prev, [key]: value }));
    toast.success(`${label} ${value ? "enabled" : "disabled"}`);
  };

  const handleMaintenanceToggle = (value: boolean) => {
    setMaintenanceMode(value);
    toast.success(
      value
        ? "Maintenance mode activated"
        : "Maintenance mode deactivated"
    );
  };

  const handlePostAnnouncement = () => {
    if (!announcement.trim()) {
      toast.error("Announcement cannot be empty");
      return;
    }
    toast.success("Announcement posted successfully");
    setAnnouncement("");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">System Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Configure platform features, maintenance, and announcements
        </p>
      </div>

      <div className="space-y-8 animate-fade-in">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cavrix-600/15">
              <Wrench className="h-5 w-5 text-cavrix-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Feature Flags</h2>
              <p className="text-xs text-slate-500">
                Toggle platform features on or off globally
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureFlags.map((feature) => {
              const Icon = feature.icon;
              const isEnabled = features[feature.key];
              return (
                <div
                  key={feature.key}
                  className={cn(
                    "rounded-xl border p-4 transition-colors",
                    isEnabled
                      ? "border-slate-700 bg-slate-800/30"
                      : "border-slate-800 bg-slate-800/10"
                  )}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg",
                        feature.bgColor,
                        !isEnabled && "opacity-50"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", feature.color)} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">
                        {feature.label}
                      </p>
                      <p className="text-xs text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(value: boolean) =>
                      handleFeatureToggle(feature.key, feature.label, value)
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/15">
                <Settings className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Maintenance Mode
                </h2>
                <p className="text-xs text-slate-500">
                  Take the platform offline for maintenance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium",
                  maintenanceMode
                    ? "bg-red-500/10 text-red-400"
                    : "bg-green-500/10 text-green-400"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    maintenanceMode ? "bg-red-400" : "bg-green-400"
                  )}
                />
                {maintenanceMode ? "Maintenance" : "Active"}
              </span>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={handleMaintenanceToggle}
              />
            </div>
          </div>

          {maintenanceMode && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
              <div>
                <p className="text-sm font-semibold text-red-300">
                  Maintenance mode is enabled
                </p>
                <p className="mt-0.5 text-xs text-red-400/80">
                  Users will see a maintenance notice and will not be able to
                  access the platform until this is turned off.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/15">
              <Megaphone className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Announcements
              </h2>
              <p className="text-xs text-slate-500">
                Broadcast a message to all users
              </p>
            </div>
          </div>

          <Textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Write an announcement to broadcast to all users..."
            className="min-h-[120px]"
          />

          <div className="mt-4 flex justify-end">
            <Button
              variant="gradient"
              onClick={handlePostAnnouncement}
              className="flex items-center gap-2"
            >
              <Megaphone className="h-4 w-4" />
              Post Announcement
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
