'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Thermometer, Zap, MessageSquare, Code, GitBranch, Bell } from 'lucide-react'

export function Settings() {
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [streamingEnabled, setStreamingEnabled] = useState(false)

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Thermometer className="h-6 w-6" />
          LLM Controls
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature: {temperature}</Label>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={([value]) => setTemperature(value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxTokens">Maximum Tokens: {maxTokens}</Label>
            <Slider
              id="maxTokens"
              min={100}
              max={2000}
              step={100}
              value={[maxTokens]}
              onValueChange={([value]) => setMaxTokens(value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="streaming"
              checked={streamingEnabled}
              onCheckedChange={setStreamingEnabled}
            />
            <Label htmlFor="streaming">Enable streaming responses</Label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Code className="h-6 w-6" />
          Language Preference
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultLanguage">Default Programming Language</Label>
            <Select>
              <SelectTrigger id="defaultLanguage">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryLanguage">Secondary Programming Language</Label>
            <Select>
              <SelectTrigger id="secondaryLanguage">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="autoDetect" />
            <Label htmlFor="autoDetect">Auto-detect coding language</Label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <GitBranch className="h-6 w-6" />
          Connect to Version Control
        </h2>
        <div className="space-y-4">
          <Button className="w-full">
            Connect to GitHub
          </Button>
          <Button className="w-full">
            Connect to GitLab
          </Button>
          <Button variant="outline" className="w-full">
            Create New Repository
          </Button>
          <div className="space-y-2">
            <Label htmlFor="repository">Select Repository</Label>
            <Select>
              <SelectTrigger id="repository">
                <SelectValue placeholder="Select a repository" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="repo1">Repository 1</SelectItem>
                <SelectItem value="repo2">Repository 2</SelectItem>
                <SelectItem value="repo3">Repository 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="branch">Select Branch</Label>
            <Select>
              <SelectTrigger id="branch">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">main</SelectItem>
                <SelectItem value="develop">develop</SelectItem>
                <SelectItem value="feature">feature</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="inAppAlerts" />
            <Label htmlFor="inAppAlerts">In-app build progress alerts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="emailNotifications" />
            <Label htmlFor="emailNotifications">Email notifications</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notificationFrequency">Notification Frequency</Label>
            <Select>
              <SelectTrigger id="notificationFrequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Notification Types</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="buildComplete" />
                <Label htmlFor="buildComplete">Build complete</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="errorReports" />
                <Label htmlFor="errorReports">Error reports</Label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}