import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Copy, Trash, Edit } from "lucide-react";
import { toast } from "sonner";

export interface PasswordCardData {
  id: string;
  name: string;
  url: string;
  username: string;
  password: string;
}

interface PasswordCardProps {
  data: PasswordCardData;
  onEdit: (card: PasswordCardData) => void;
  onDelete: (id: string) => void;
}

export function PasswordCard({ data, onEdit, onDelete }: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{data.name}</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(data)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(data.id)}
              className="h-8 w-8 text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">URL</label>
          <p className="truncate">{data.url}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Username</label>
          <div className="flex items-center gap-2">
            <p className="truncate">{data.username}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(data.username)}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Password</label>
          <div className="flex items-center gap-2">
            <p className="truncate font-mono">
              {showPassword ? data.password : "•".repeat(12)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="h-8 w-8"
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
              onClick={() => copyToClipboard(data.password)}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}