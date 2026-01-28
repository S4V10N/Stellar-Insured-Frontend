"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { FileUpload } from "@/components/ui/FileUpload";

export default function TestComponentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackVariant, setFeedbackVariant] = useState<
    "loading" | "empty" | "error"
  >("loading");

  return (
    <div className="min-h-screen bg-[var(--color-stellar-bg)] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Design System Playground
          </h1>
          <p className="max-w-2xl text-sm text-[var(--color-brand-text-muted)]">
            Explore the reusable Stellar Insured UI components. This page is
            only for development/testing and maps to{" "}
            <code className="rounded bg-slate-900/70 px-1.5 py-0.5 text-xs">
              /testcomponent
            </code>
            .
          </p>
        </header>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button isLoading>Loading</Button>
            <Button fullWidth className="max-w-xs">
              Full width
            </Button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Badges</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        </section>

        {/* Cards & Form */}
        <section className="grid gap-6 md:grid-cols-2">
          <Card variant="elevated" interactive className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Form Inputs</h2>
            <Input
              id="email"
              label="Email"
              placeholder="you@example.com"
              helperText="Used for policy notifications."
            />
            <Input
              id="email-error"
              label="Email (error)"
              placeholder="you@example.com"
              state="error"
              error="This email address is invalid."
            />
            <Select
              label="Policy Type"
              placeholder="Select policy"
              options={[
                { value: "health", label: "Health" },
                { value: "vehicle", label: "Vehicle" },
                { value: "property", label: "Property" },
              ]}
            />
            <Textarea
              label="Claim Description"
              placeholder="Describe what happened..."
            />
          </Card>

          <Card variant="outline" interactive className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">File Upload & Modal</h2>
            <FileUpload
              label="Upload Supporting Document"
              onChange={() => {}}
            />
            <Button onClick={() => setIsModalOpen(true)}>
              Open Preview Modal
            </Button>
          </Card>
        </section>

        {/* Feedback States */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Feedback States</h2>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={feedbackVariant === "loading" ? "primary" : "outline"}
                onClick={() => setFeedbackVariant("loading")}
              >
                Loading
              </Button>
              <Button
                size="sm"
                variant={feedbackVariant === "empty" ? "primary" : "outline"}
                onClick={() => setFeedbackVariant("empty")}
              >
                Empty
              </Button>
              <Button
                size="sm"
                variant={feedbackVariant === "error" ? "primary" : "outline"}
                onClick={() => setFeedbackVariant("error")}
              >
                Error
              </Button>
            </div>
          </div>
          <FeedbackState
            variant={feedbackVariant}
            actionLabel={feedbackVariant === "error" ? "Retry" : undefined}
            onAction={
              feedbackVariant === "error"
                ? () => setFeedbackVariant("loading")
                : undefined
            }
          />
        </section>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal example"
        description="This is how the modal component looks in the Stellar Insured design system."
      >
        <p className="text-sm text-[var(--color-brand-text-muted)]">
          You can drop any content here – forms, confirmation dialogs, claim
          details, etc.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(false)}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
}

