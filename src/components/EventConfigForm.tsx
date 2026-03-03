import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2 } from "lucide-react";

export interface EventProduct {
  id: string;
  title: string;
  price: number;
}

interface EventConfigFormProps {
  products: EventProduct[];
  onAddProduct: (product: EventProduct) => void;
  onEditProduct: (product: EventProduct) => void;
  onDeleteProduct: (id: string) => void;
}

const EventConfigForm = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: EventConfigFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!title.trim() || !price.trim()) return;
    const product: EventProduct = {
      id: editingId || crypto.randomUUID(),
      title: title.trim(),
      price: parseFloat(price),
    };
    if (editingId) {
      onEditProduct(product);
    } else {
      onAddProduct(product);
    }
    resetForm();
  };

  const startEdit = (p: EventProduct) => {
    setEditingId(p.id);
    setTitle(p.title);
    setPrice(p.price.toString());
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <Label className="text-sm font-semibold text-foreground">Product Options</Label>

        {products.length === 0 && !isAdding ? (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2 rounded-md border border-dashed border-border bg-accent/50 px-4 py-6 text-center">
              <div className="w-full text-sm text-muted-foreground">
                No product option created yet
              </div>
            </div>
            <Button onClick={() => setIsAdding(true)} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Set Option
            </Button>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-md border border-border bg-accent/30 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{p.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => startEdit(p)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDeleteProduct(p.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {!isAdding && (
              <Button variant="outline" onClick={() => setIsAdding(true)} className="mt-2 w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Another Option
              </Button>
            )}
          </div>
        )}

        {isAdding && (
          <div className="mt-4 space-y-3 rounded-md border border-border bg-accent/20 p-4">
            <div>
              <Label className="text-sm font-medium text-foreground">
                Option Title <span className="text-destructive">*</span>
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Basic Package"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">
                Price <span className="text-destructive">*</span>
              </Label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                type="number"
                min="0"
                className="mt-1.5"
              />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button size="sm" onClick={handleSave} disabled={!title.trim() || !price.trim()}>
                {editingId ? "Save Changes" : "Add Option"}
              </Button>
              <Button size="sm" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventConfigForm;
