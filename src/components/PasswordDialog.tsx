import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PasswordCardData } from "./PasswordCard";
import { Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { passwordService } from "@/services/passwords";

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<PasswordCardData, "id">) => void;
  initialData?: PasswordCardData;
}

export function PasswordDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
}: PasswordDialogProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { data: password, isLoading } = useQuery({
    queryKey: ["password", initialData?.id],
    queryFn: ({ queryKey }) => passwordService.getById(queryKey[1]),
    enabled: !!initialData?.id,
  });

  const [formData, setFormData] = useState<Omit<PasswordCardData, "id">>({
    name: !isLoading && password ? password.name : "",
    url: !isLoading && password ? password.url : "",
    username: !isLoading && password ? password.username : "",
    password: !isLoading && password ? password.password : "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Password" : "Add Password"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center gap-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="h-8 w-8"
                type="button"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(formData.password)}
                className="h-8 w-8"
                type="button"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {initialData ? "Save Changes" : "Add Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
