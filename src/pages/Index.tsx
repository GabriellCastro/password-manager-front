import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { PasswordCard, type PasswordCardData } from "@/components/PasswordCard";
import { PasswordDialog } from "@/components/PasswordDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { passwordService } from "@/services/passwords";
import { toast } from "sonner";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<PasswordCardData | null>();
  const queryClient = useQueryClient();

  const { data: passwords = [], isLoading } = useQuery({
    queryKey: ["passwords"],
    queryFn: passwordService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: passwordService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
      toast.success("Password saved successfully");
    },
    onError: () => {
      toast.error("Failed to save password");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<PasswordCardData, "id">;
    }) => passwordService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
      toast.success("Password updated successfully");
    },
    onError: () => {
      toast.error("Failed to update password");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: passwordService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
      toast.success("Password deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete password");
    },
  });

  const filteredPasswords = passwords.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = async (data: Omit<PasswordCardData, "id">) => {
    if (editingCard) {
      await updateMutation.mutateAsync({ id: editingCard.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    setEditingCard(null);
    setDialogOpen(false);
  };

  const handleEdit = (card: PasswordCardData) => {
    setEditingCard(card);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-3xl font-bold">Password Manager</h1>
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Password
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search passwords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : filteredPasswords.length === 0 ? (
          <div className="text-center">No passwords found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPasswords.map((card) => (
              <PasswordCard
                key={card.id}
                data={card}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <PasswordDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            if (!open) setEditingCard(null);
            setDialogOpen(open);
          }}
          onSave={handleSave}
          initialData={editingCard}
        />
      </div>
    </div>
  );
}
