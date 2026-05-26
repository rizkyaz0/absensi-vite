"use client";

import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { assetService } from "@/services/assetService";
import { categoryService } from "@/services/categoryService";
import { assetFormSchema, type AssetFormValues } from "../schemas";
import type { Asset } from "@/types/asset";
import { Plus } from "lucide-react";

const statusOptions = [
  { value: "tersedia", label: "Available" },
  { value: "digunakan", label: "In Use" },
  { value: "dalam_perawatan", label: "Maintenance" },
  { value: "rusak", label: "Damaged" },
  { value: "dihapus", label: "Retired" },
];

interface AssetFormDialogProps {
  mode?: "create" | "edit";
  asset?: Asset;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AssetFormDialog({
  mode = "create",
  asset,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
}: AssetFormDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled =
    controlledOpen !== undefined && controlledSetOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledSetOpen : setInternalOpen;

  const queryClient = useQueryClient();
  const isEdit = mode === "edit" && !!asset;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.list(),
  });

  const defaultValues: AssetFormValues = isEdit
    ? {
        kode: asset!.kode,
        nama: asset!.nama,
        kategori_id: asset!.kategori_id,
        merek: asset!.merek,
        model: asset!.model,
        nomor_seri: asset!.nomor_seri,
        lokasi: asset!.lokasi,
        status: asset!.status,
        nilai_perolehan: asset!.nilai_perolehan,
        tanggal_perolehan: asset!.tanggal_perolehan.split("T")[0],
        masa_manfaat: asset!.masa_manfaat,
        deskripsi: asset!.deskripsi ?? "",
      }
    : {
        kode: "",
        nama: "",
        kategori_id: "",
        merek: "",
        model: "",
        nomor_seri: "",
        lokasi: "",
        status: "tersedia" as const,
        nilai_perolehan: 0,
        tanggal_perolehan: "",
        masa_manfaat: 0,
        deskripsi: "",
      };

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues,
  });

  async function onSubmit(data: AssetFormValues) {
    try {
      if (isEdit && asset) {
        await assetService.update(asset.id, data);
        toast.success("Asset updated successfully");
      } else {
        await assetService.create(data);
        toast.success("Asset created successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      if (asset) {
        queryClient.invalidateQueries({ queryKey: ["asset", asset.id] });
      }
      setOpen(false);
      form.reset();
    } catch {
      toast.error(isEdit ? "Failed to update asset" : "Failed to create asset");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Asset" : "Add Asset"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the asset information below."
              : "Fill in the details to register a new asset."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="kode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Code</FormLabel>
                    <FormControl>
                      <Input placeholder="AST-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dell Latitude 5420" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="kategori_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="merek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Dell" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Latitude 5420" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nomor_seri"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="SN-12345-XYZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lokasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Jakarta HQ - Floor 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nilai_perolehan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acquisition Value (Rp)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} placeholder="15000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="masa_manfaat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Useful Life (years)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tanggal_perolehan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acquisition Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional description or notes..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : isEdit
                    ? "Update Asset"
                    : "Create Asset"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
